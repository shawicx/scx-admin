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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { postPermissionsApi, getPermissionsApi } from '@/service/QuanXianGuanLi'
import { toast } from '@/components/ui/use-toast'
import type { PermissionResponseDto } from '@/service/types'

const createPermissionSchema = z.object({
  name: z
    .string()
    .min(1, '权限名称不能为空')
    .max(100, '权限名称不能超过100个字符'),
  type: z
    .string()
    .min(1, '权限类型不能为空')
    .max(20, '权限类型不能超过20个字符'),
  action: z.string().max(50, '操作动作不能超过50个字符').optional(),
  resource: z.string().max(50, '资源名称不能超过50个字符').optional(),
  parentId: z.string().optional(),
  path: z.string().max(200, '路由路径不能超过200个字符').optional(),
  icon: z.string().max(50, '图标不能超过50个字符').optional(),
  sort: z.number().optional(),
  visible: z.number().optional(),
  status: z.number().optional(),
  description: z.string().max(500, '权限描述不能超过500个字符').optional(),
})

type CreatePermissionFormValues = z.infer<typeof createPermissionSchema>

interface CreatePermissionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function CreatePermissionDialog({
  open,
  onOpenChange,
  onSuccess,
}: CreatePermissionDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [parentPermissions, setParentPermissions] = useState<
    PermissionResponseDto[]
  >([])
  const [isLoadingPermissions, setIsLoadingPermissions] = useState(false)

  const form = useForm<CreatePermissionFormValues>({
    resolver: zodResolver(createPermissionSchema),
    defaultValues: {
      name: '',
      type: 'BUTTON',
      action: '',
      resource: '',
      parentId: '',
      path: '',
      icon: '',
      sort: 0,
      visible: 1,
      status: 1,
      description: '',
    },
  })

  useEffect(() => {
    const loadPermissions = async () => {
      if (!open) return
      setIsLoadingPermissions(true)
      try {
        const result = await getPermissionsApi({ limit: '1000' })
        setParentPermissions(result.permissions)
      } catch (error) {
        console.error('Failed to load permissions:', error)
      } finally {
        setIsLoadingPermissions(false)
      }
    }
    loadPermissions()
  }, [open])

  const handleSubmit = async (data: CreatePermissionFormValues) => {
    setIsSubmitting(true)
    try {
      await postPermissionsApi({
        name: data.name,
        type: data.type,
        action: data.action || undefined,
        resource: data.resource || undefined,
        parentId: data.parentId || undefined,
        path: data.path || undefined,
        icon: data.icon || undefined,
        sort: data.sort,
        visible: data.visible,
        status: data.status,
        description: data.description,
      })
      toast({
        title: '成功',
        description: '权限创建成功',
      })
      form.reset()
      onOpenChange(false)
      onSuccess?.()
    } catch (error) {
      console.error('Failed to create permission:', error)
      toast({
        variant: 'destructive',
        title: '错误',
        description: '权限创建失败',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedType = form.watch('type')

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>创建权限</DialogTitle>
          <DialogDescription>填写以下信息创建新权限</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                权限名称 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                {...form.register('name')}
                placeholder="请输入权限名称"
              />
              {form.formState.errors.name && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">
                权限类型 <span className="text-red-500">*</span>
              </Label>
              <Select
                value={form.watch('type')}
                onValueChange={value => form.setValue('type', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="请选择权限类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MENU">菜单</SelectItem>
                  <SelectItem value="BUTTON">按钮</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.type && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.type.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="action">操作动作</Label>
              <Input
                id="action"
                {...form.register('action')}
                placeholder="请输入操作动作（如：create, read, update, delete）"
              />
              {form.formState.errors.action && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.action.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="resource">资源名称</Label>
              <Input
                id="resource"
                {...form.register('resource')}
                placeholder="请输入资源名称（如：users, roles, permissions）"
              />
              {form.formState.errors.resource && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.resource.message}
                </p>
              )}
            </div>
          </div>

          {selectedType === 'MENU' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="path">路由路径</Label>
                <Input
                  id="path"
                  {...form.register('path')}
                  placeholder="请输入路由路径"
                />
                {form.formState.errors.path && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.path.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="icon">图标</Label>
                <Input
                  id="icon"
                  {...form.register('icon')}
                  placeholder="请输入图标名称"
                />
                {form.formState.errors.icon && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.icon.message}
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="parentId">父权限</Label>
              <Select
                value={form.watch('parentId') || undefined}
                onValueChange={value => form.setValue('parentId', value)}
                disabled={isLoadingPermissions}
              >
                <SelectTrigger>
                  <SelectValue placeholder="请选择父权限（可选）" />
                </SelectTrigger>
                <SelectContent>
                  {parentPermissions
                    .filter(p => p.type === 'MENU')
                    .map(perm => (
                      <SelectItem key={perm.id} value={perm.id}>
                        {perm.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sort">排序</Label>
              <Input
                id="sort"
                type="number"
                {...form.register('sort', { valueAsNumber: true })}
                placeholder="请输入排序值（数字越小越靠前）"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="visible">是否可见</Label>
              <Select
                value={String(form.watch('visible'))}
                onValueChange={value =>
                  form.setValue('visible', parseInt(value))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">可见</SelectItem>
                  <SelectItem value="0">隐藏</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">状态</Label>
              <Select
                value={String(form.watch('status'))}
                onValueChange={value =>
                  form.setValue('status', parseInt(value))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">启用</SelectItem>
                  <SelectItem value="0">禁用</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">权限描述</Label>
            <textarea
              id="description"
              {...form.register('description')}
              placeholder="请输入权限描述（可选）"
              rows={3}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            {form.formState.errors.description && (
              <p className="text-sm text-red-500">
                {form.formState.errors.description.message}
              </p>
            )}
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
