'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { postUsersCreateApi } from '@/service/YongHuGuanLi'
import { getRolesApi } from '@/service/JueSeGuanLi'
import { toast } from '@/components/ui/use-toast'

const createUserSchema = z.object({
  name: z.string().min(1, '姓名不能为空').max(50, '姓名不能超过50个字符'),
  email: z.string().min(1, '邮箱不能为空').email('邮箱格式不正确'),
  password: z.string().min(6, '密码至少6个字符'),
  isActive: z.boolean().default(true),
  roleIds: z.array(z.string()).optional(),
})

type CreateUserFormValues = z.infer<typeof createUserSchema>

interface CreateUserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function CreateUserDialog({
  open,
  onOpenChange,
  onSuccess,
}: CreateUserDialogProps) {
  const [roles, setRoles] = useState<
    Array<{ id: string; name: string; code: string }>
  >([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<CreateUserFormValues>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      isActive: true,
      roleIds: [],
    },
  })

  const loadRoles = async () => {
    setIsLoading(true)
    try {
      const result = await getRolesApi({})
      setRoles(result.list || [])
    } catch (error) {
      console.error('Failed to load roles:', error)
      toast({
        variant: 'destructive',
        title: '错误',
        description: '加载角色列表失败',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (open) {
      loadRoles()
    }
  }, [open])

  const handleSubmit = async (data: CreateUserFormValues) => {
    setIsSubmitting(true)
    try {
      await postUsersCreateApi({
        name: data.name,
        email: data.email,
        password: data.password,
        isActive: data.isActive,
        roleIds: data.roleIds?.length ? data.roleIds : undefined,
      })
      toast({
        title: '成功',
        description: '用户创建成功',
      })
      form.reset()
      onOpenChange(false)
      onSuccess?.()
    } catch (error) {
      console.error('Failed to create user:', error)
      toast({
        variant: 'destructive',
        title: '错误',
        description: '用户创建失败',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleRole = (roleId: string) => {
    const currentRoles = form.getValues('roleIds') || []
    const newRoles = currentRoles.includes(roleId)
      ? currentRoles.filter(id => id !== roleId)
      : [...currentRoles, roleId]
    form.setValue('roleIds', newRoles)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>创建用户</DialogTitle>
          <DialogDescription>填写以下信息创建新用户账号</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              姓名 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              {...form.register('name')}
              placeholder="请输入用户姓名"
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              邮箱 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              {...form.register('email')}
              placeholder="请输入邮箱地址"
              type="email"
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-500">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">
              密码 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="password"
              {...form.register('password')}
              placeholder="请输入密码（至少6个字符）"
              type="password"
            />
            {form.formState.errors.password && (
              <p className="text-sm text-red-500">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>角色</Label>
            <div className="border rounded-md p-4 max-h-40 overflow-y-auto">
              {isLoading ? (
                <p className="text-sm text-muted-foreground">加载中...</p>
              ) : roles.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  暂无可用角色，请先创建角色
                </p>
              ) : (
                <div className="space-y-2">
                  {roles.map(role => {
                    const isChecked =
                      form.watch('roleIds')?.includes(role.id) || false
                    return (
                      <div
                        key={role.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`role-${role.id}`}
                          checked={isChecked}
                          onChange={() => toggleRole(role.id)}
                        />
                        <Label
                          htmlFor={`role-${role.id}`}
                          className="cursor-pointer"
                        >
                          {role.name}
                        </Label>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="isActive"
              checked={form.watch('isActive')}
              onChange={e => form.setValue('isActive', e.target.checked)}
            />
            <Label htmlFor="isActive" className="cursor-pointer">
              立即启用此用户
            </Label>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              取消
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? '创建中...' : '创建'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
