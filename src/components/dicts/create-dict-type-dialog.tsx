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
import { postApiDictsTypeCreateFunc } from '@/service/rbac'
import { toast } from '@/components/ui/use-toast'

const createDictTypeSchema = z.object({
  name: z
    .string()
    .min(1, '字典名称不能为空')
    .max(100, '字典名称不能超过100个字符'),
  code: z
    .string()
    .min(1, '字典编码不能为空')
    .max(100, '字典编码不能超过100个字符')
    .regex(
      /^[a-z][a-z0-9_-]*$/,
      '字典编码需以小写字母开头，仅含小写字母、数字、下划线和中划线'
    ),
  description: z.string().max(255, '描述不能超过255个字符').optional(),
})

type CreateDictTypeFormValues = z.infer<typeof createDictTypeSchema>

interface CreateDictTypeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function CreateDictTypeDialog({
  open,
  onOpenChange,
  onSuccess,
}: CreateDictTypeDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<CreateDictTypeFormValues>({
    resolver: zodResolver(createDictTypeSchema),
    defaultValues: {
      name: '',
      code: '',
      description: '',
    },
  })

  const handleSubmit = async (data: CreateDictTypeFormValues) => {
    setIsSubmitting(true)
    try {
      await postApiDictsTypeCreateFunc({
        name: data.name,
        code: data.code,
        description: data.description,
      })
      toast({
        title: '成功',
        description: '字典类型创建成功',
      })
      form.reset()
      onOpenChange(false)
      onSuccess?.()
    } catch (error) {
      console.error('Failed to create dict type:', error)
      toast({
        variant: 'destructive',
        title: '错误',
        description: '字典类型创建失败',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>新增字典类型</DialogTitle>
          <DialogDescription>填写以下信息创建新的字典类型</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dict-type-name">
              字典名称 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="dict-type-name"
              {...form.register('name')}
              placeholder="请输入字典名称（如：用户性别）"
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="dict-type-code">
              字典编码 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="dict-type-code"
              {...form.register('code')}
              placeholder="请输入字典编码（如：user_gender）"
            />
            <p className="text-xs text-muted-foreground">
              小写字母开头，仅含小写字母、数字、下划线和中划线，创建后不可修改
            </p>
            {form.formState.errors.code && (
              <p className="text-sm text-red-500">
                {form.formState.errors.code.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="dict-type-description">描述</Label>
            <textarea
              id="dict-type-description"
              {...form.register('description')}
              placeholder="请输入描述（可选）"
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
