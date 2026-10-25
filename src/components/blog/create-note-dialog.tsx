'use client'

/**
 * @description 新建随笔弹窗：Markdown 编辑器 + react-hook-form/zod 校验
 */

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
import { Label } from '@/components/ui/label'
import { MarkdownEditor } from '@/components/blog/markdown-editor'
import { postApiBlogAdminNotesFunc } from '@/service/blog'
import { toast } from '@/components/ui/use-toast'

const createNoteSchema = z.object({
  content: z
    .string()
    .min(1, '随笔内容不能为空')
    .max(10000, '随笔内容不能超过10000个字符'),
})

type CreateNoteFormValues = z.infer<typeof createNoteSchema>

interface CreateNoteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

/**
 * @description 新建随笔
 * @param open 是否打开
 * @param onOpenChange 开关回调
 * @param onSuccess 创建成功后的回调（通常用于刷新列表）
 */
export function CreateNoteDialog({
  open,
  onOpenChange,
  onSuccess,
}: CreateNoteDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<CreateNoteFormValues>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: {
      content: '',
    },
  })

  const handleSubmit = async (data: CreateNoteFormValues) => {
    setIsSubmitting(true)
    try {
      await postApiBlogAdminNotesFunc({ content: data.content })
      toast({ title: '成功', description: '随笔创建成功' })
      form.reset()
      onOpenChange(false)
      onSuccess?.()
    } catch (error) {
      console.error('Failed to create note:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[640px]">
        <DialogHeader>
          <DialogTitle>新建随笔</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="note-content">
              随笔内容 <span className="text-red-500">*</span>
            </Label>
            <MarkdownEditor
              id="note-content"
              minHeight={280}
              {...form.register('content')}
            />
            {form.formState.errors.content && (
              <p className="text-sm text-red-500">
                {form.formState.errors.content.message}
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
              {isSubmitting ? '提交中...' : '创建'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
