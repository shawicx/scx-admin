'use client'

import { useState } from 'react'
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
import { postPermissionsApi } from '@/service/QuanXianGuanLi'
import { toast } from '@/components/ui/use-toast'

const createPermissionSchema = z.object({
  name: z
    .string()
    .min(1, '权限名称不能为空')
    .max(100, '权限名称不能超过100个字符'),
  action: z
    .string()
    .min(1, '操作动作不能为空')
    .max(50, '操作动作不能超过50个字符'),
  resource: z
    .string()
    .min(1, '资源名称不能为空')
    .max(50, '资源名称不能超过50个字符'),
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

  const form = useForm<CreatePermissionFormValues>({
    resolver: zodResolver(createPermissionSchema),
    defaultValues: {
      name: '',
      action: '',
      resource: '',
      description: '',
    },
  })

  const handleSubmit = async (data: CreatePermissionFormValues) => {
    setIsSubmitting(true)
    try {
      await postPermissionsApi({
        name: data.name,
        action: data.action,
        resource: data.resource,
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>创建权限</DialogTitle>
          <DialogDescription>填写以下信息创建新权限</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
            <Label htmlFor="action">
              操作动作 <span className="text-red-500">*</span>
            </Label>
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
            <Label htmlFor="resource">
              资源名称 <span className="text-red-500">*</span>
            </Label>
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
