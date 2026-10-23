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
import { postApiBlogAdminCategoriesFunc } from '@/service/blog'
import { toast } from '@/components/ui/use-toast'

const createCategorySchema = z.object({
  name: z
    .string()
    .min(1, '分类名称不能为空')
    .max(80, '分类名称不能超过80个字符'),
  slug: z
    .string()
    .max(100, 'slug不能超过100个字符')
    .regex(/^[a-z0-9-]*$/, 'slug只能包含小写字母、数字和连字符'),
  description: z.string().max(500, '描述不能超过500个字符'),
  sort: z.number().int().min(0, '排序号不能为负数'),
})

type CreateCategoryFormValues = z.infer<typeof createCategorySchema>

interface CreateCategoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function CreateCategoryDialog({
  open,
  onOpenChange,
  onSuccess,
}: CreateCategoryDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<CreateCategoryFormValues>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      sort: 0,
    },
  })

  const handleSubmit = async (data: CreateCategoryFormValues) => {
    setIsSubmitting(true)
    try {
      await postApiBlogAdminCategoriesFunc({
        name: data.name,
        slug: data.slug || undefined,
        description: data.description || undefined,
        sort: data.sort,
      })
      toast({ title: '成功', description: '分类创建成功' })
      form.reset()
      onOpenChange(false)
      onSuccess?.()
    } catch (error) {
      console.error('Failed to create category:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>新建分类</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category-name">
              分类名称 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="category-name"
              placeholder="如：技术"
              {...form.register('name')}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="category-slug">slug（缺省由名称生成）</Label>
            <Input
              id="category-slug"
              placeholder="如：tech"
              {...form.register('slug')}
            />
            {form.formState.errors.slug && (
              <p className="text-sm text-red-500">
                {form.formState.errors.slug.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="category-description">描述</Label>
            <Textarea
              id="category-description"
              rows={3}
              {...form.register('description')}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category-sort">排序号（越小越靠前）</Label>
            <Input
              id="category-sort"
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
