'use client'

import { useState } from 'react'
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
import { postApiBlogAdminTagsFunc } from '@/service/blog'
import { toast } from '@/components/ui/use-toast'

const createTagSchema = z.object({
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
})

type CreateTagFormValues = z.infer<typeof createTagSchema>

interface CreateTagDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function CreateTagDialog({
  open,
  onOpenChange,
  onSuccess,
}: CreateTagDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<CreateTagFormValues>({
    resolver: zodResolver(createTagSchema),
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      sort: 0,
    },
  })

  const handleSubmit = async (data: CreateTagFormValues) => {
    setIsSubmitting(true)
    try {
      await postApiBlogAdminTagsFunc({
        name: data.name,
        slug: data.slug || undefined,
        description: data.description || undefined,
        sort: data.sort,
      })
      toast({ title: '成功', description: '标签创建成功' })
      form.reset()
      onOpenChange(false)
      onSuccess?.()
    } catch (error) {
      console.error('Failed to create tag:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>新建标签</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tag-name">
              标签名称 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="tag-name"
              placeholder="如：Kotlin"
              {...form.register('name')}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="tag-slug">slug（缺省由名称生成）</Label>
            <Input
              id="tag-slug"
              placeholder="如：kotlin"
              {...form.register('slug')}
            />
            {form.formState.errors.slug && (
              <p className="text-sm text-red-500">
                {form.formState.errors.slug.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="tag-description">描述</Label>
            <Textarea
              id="tag-description"
              rows={2}
              {...form.register('description')}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tag-sort">排序号（越小越靠前）</Label>
            <Input
              id="tag-sort"
              type="number"
              {...form.register('sort', { valueAsNumber: true })}
            />
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
              {isSubmitting ? '提交中...' : '创建'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
