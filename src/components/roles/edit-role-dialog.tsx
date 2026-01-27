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
import { putRolesApi, getRolesDetailApi } from '@/service/JueSeGuanLi'
import { toast } from '@/components/ui/use-toast'

const editRoleSchema = z.object({
  name: z
    .string()
    .min(1, '角色名称不能为空')
    .max(100, '角色名称不能超过100个字符'),
  code: z
    .string()
    .min(1, '角色代码不能为空')
    .max(50, '角色代码不能超过50个字符')
    .regex(/^[a-zA-Z0-9_-]+$/, '角色代码只能包含字母、数字、下划线和连字符'),
  description: z.string().max(500, '角色描述不能超过500个字符').optional(),
  isSystem: z.boolean().optional(),
})

type EditRoleFormValues = z.infer<typeof editRoleSchema>

interface EditRoleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  roleId: string | null
  onSuccess?: () => void
}

export function EditRoleDialog({
  open,
  onOpenChange,
  roleId,
  onSuccess,
}: EditRoleDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<EditRoleFormValues>({
    resolver: zodResolver(editRoleSchema),
    defaultValues: {
      name: '',
      code: '',
      description: '',
      isSystem: false,
    },
  })

  useEffect(() => {
    const loadRole = async () => {
      if (open && roleId) {
        setIsLoading(true)
        try {
          const role = await getRolesDetailApi({ id: roleId })
          form.reset({
            name: role.name,
            code: role.code,
            description: role.description || '',
            isSystem: role.isSystem,
          })
        } catch (error) {
          console.error('Failed to load role:', error)
          toast({
            variant: 'destructive',
            title: '错误',
            description: '加载角色详情失败',
          })
        } finally {
          setIsLoading(false)
        }
      }
    }

    loadRole()
  }, [open, roleId, form])

  const handleSubmit = async (data: EditRoleFormValues) => {
    if (!roleId) return

    setIsSubmitting(true)
    try {
      await putRolesApi({
        id: roleId,
        name: data.name,
        code: data.code,
        description: data.description,
        isSystem: data.isSystem,
      })
      toast({
        title: '成功',
        description: '角色更新成功',
      })
      onOpenChange(false)
      onSuccess?.()
    } catch (error) {
      console.error('Failed to update role:', error)
      toast({
        variant: 'destructive',
        title: '错误',
        description: '角色更新失败',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>编辑角色</DialogTitle>
          <DialogDescription>修改角色信息</DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-sm text-muted-foreground">加载中...</div>
          </div>
        ) : (
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="name">
                角色名称 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                {...form.register('name')}
                placeholder="请输入角色名称"
              />
              {form.formState.errors.name && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="code">
                角色代码 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="code"
                {...form.register('code')}
                placeholder="请输入角色代码（如：admin, user, manager）"
              />
              {form.formState.errors.code && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.code.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">角色描述</Label>
              <textarea
                id="description"
                {...form.register('description')}
                placeholder="请输入角色描述（可选）"
                rows={3}
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              {form.formState.errors.description && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.description.message}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isSystem"
                {...form.register('isSystem')}
                onChange={e => form.setValue('isSystem', e.target.checked)}
              />
              <Label htmlFor="isSystem" className="cursor-pointer">
                系统内置角色
              </Label>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting || isLoading}
              >
                取消
              </Button>
              <Button type="submit" disabled={isSubmitting || isLoading}>
                {isSubmitting ? '更新中...' : '更新'}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
