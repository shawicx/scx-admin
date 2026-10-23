'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { putApiBlogAdminTagsByIdFunc } from '@/service/blog'
import type { TagAdminResponseDto } from '@/service/blog'
import { toast } from '@/components/ui/use-toast'

const editTagSchema = z.object({
  name: z
    .string()
    .min(1, '标签名称不能为空')
    .max(60, '标签名称不能超过60个字符'),
  slug: z
    .string()
    .max(80, 'slug不能超过80个字符')
    .regex(/^[a-z0-9-]*$/, 'slug只能包含小写字母、数字和连字符'),
  description: z.string().max(255, '描述不能超过255个字符'),
  sort: z.number().int().min(0, '排序号不能为负数'),
  status: z.number().int().min(0).max(1),
})

type EditTagFormValues = z.infer<typeof editTagSchema>

interface EditTagDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  tag: TagAdminResponseDto | null
  onSuccess?: () => void
}

export function EditTagDialog({
  open,
  onOpenChange,
  tag,
  onSuccess,
}: EditTagDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<EditTagFormValues>({
    resolver: zodResolver(editTagSchema),
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      sort: 0,
      status: 1,
    },
  })

  useEffect(() => {
    if (open && tag) {
      form.reset({
        name: tag.name,
        slug: tag.slug,
        description: tag.description ?? '',
        sort: tag.sort,
        status: tag.status,
      })
    }
  }, [open, tag, form])

  const handleSubmit = async (data: EditTagFormValues) => {
    if (!tag) return
    setIsSubmitting(true)
    try {
      await putApiBlogAdminTagsByIdFunc({
        id: tag.id,
        name: data.name,
        slug: data.slug || undefined,
        description: data.description || undefined,
        sort: data.sort,
        status: data.status,
      })
      toast({ title: '成功', description: '标签更新成功' })
      onOpenChange(false)
      onSuccess?.()
    } catch (error) {
      console.error('Failed to update tag:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>编辑标签</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-tag-name">
              标签名称 <span className="text-red-500">*</span>
            </Label>
            <Input id="edit-tag-name" {...form.register('name')} />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-tag-slug">slug</Label>
            <Input id="edit-tag-slug" {...form.register('slug')} />
            {form.formState.errors.slug && (
              <p className="text-sm text-red-500">
                {form.formState.errors.slug.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-tag-description">描述</Label>
            <Textarea
              id="edit-tag-description"
              rows={2}
              {...form.register('description')}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-tag-sort">排序号</Label>
              <Input
                id="edit-tag-sort"
                type="number"
                {...form.register('sort', { valueAsNumber: true })}
              />
            </div>
            <div className="space-y-2">
              <Label>状态</Label>
              <Select
                value={String(form.watch('status'))}
                onValueChange={value => form.setValue('status', Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="选择状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">启用</SelectItem>
                  <SelectItem value="0">停用</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
              {isSubmitting ? '提交中...' : '保存'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
