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
import { putApiBlogAdminCategoriesByIdFunc } from '@/service/blog'
import type { CategoryAdminResponseDto } from '@/service/blog'
import { toast } from '@/components/ui/use-toast'

const editCategorySchema = z.object({
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
  status: z.number().int().min(0).max(1),
})

type EditCategoryFormValues = z.infer<typeof editCategorySchema>

interface EditCategoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  category: CategoryAdminResponseDto | null
  onSuccess?: () => void
}

export function EditCategoryDialog({
  open,
  onOpenChange,
  category,
  onSuccess,
}: EditCategoryDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<EditCategoryFormValues>({
    resolver: zodResolver(editCategorySchema),
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      sort: 0,
      status: 1,
    },
  })

  useEffect(() => {
    if (open && category) {
      form.reset({
        name: category.name,
        slug: category.slug,
        description: category.description ?? '',
        sort: category.sort,
        status: category.status,
      })
    }
  }, [open, category, form])

  const handleSubmit = async (data: EditCategoryFormValues) => {
    if (!category) return
    setIsSubmitting(true)
    try {
      await putApiBlogAdminCategoriesByIdFunc({
        id: category.id,
        name: data.name,
        slug: data.slug || undefined,
        description: data.description || undefined,
        sort: data.sort,
        status: data.status,
      })
      toast({ title: '成功', description: '分类更新成功' })
      onOpenChange(false)
      onSuccess?.()
    } catch (error) {
      console.error('Failed to update category:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>编辑分类</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-category-name">
              分类名称 <span className="text-red-500">*</span>
            </Label>
            <Input id="edit-category-name" {...form.register('name')} />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-category-slug">slug</Label>
            <Input id="edit-category-slug" {...form.register('slug')} />
            {form.formState.errors.slug && (
              <p className="text-sm text-red-500">
                {form.formState.errors.slug.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-category-description">描述</Label>
            <Textarea
              id="edit-category-description"
              rows={3}
              {...form.register('description')}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-category-sort">排序号</Label>
              <Input
                id="edit-category-sort"
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
