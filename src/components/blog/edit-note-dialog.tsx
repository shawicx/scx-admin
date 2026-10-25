'use client'

/**
 * @description 编辑随笔弹窗：打开时用行数据回填，Markdown 编辑器 + react-hook-form/zod 校验
 */

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
import { Label } from '@/components/ui/label'
import { MarkdownEditor } from '@/components/blog/markdown-editor'
import { putApiBlogAdminNotesByIdFunc } from '@/service/blog'
import type { NoteAdminDto } from '@/service/blog'
import { toast } from '@/components/ui/use-toast'

const editNoteSchema = z.object({
  content: z
    .string()
    .min(1, '随笔内容不能为空')
    .max(10000, '随笔内容不能超过10000个字符'),
})

type EditNoteFormValues = z.infer<typeof editNoteSchema>

interface EditNoteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  note: NoteAdminDto | null
  onSuccess?: () => void
}

/**
 * @description 编辑随笔
 * @param open 是否打开
 * @param onOpenChange 开关回调
 * @param note 待编辑的随笔（行数据）
 * @param onSuccess 保存成功后的回调（通常用于刷新列表）
 */
export function EditNoteDialog({
  open,
  onOpenChange,
  note,
  onSuccess,
}: EditNoteDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<EditNoteFormValues>({
    resolver: zodResolver(editNoteSchema),
    defaultValues: {
      content: '',
    },
  })

  useEffect(() => {
    if (open && note) {
      form.reset({
        content: note.content,
      })
    }
  }, [open, note, form])

  const handleSubmit = async (data: EditNoteFormValues) => {
    if (!note) return
    setIsSubmitting(true)
    try {
      await putApiBlogAdminNotesByIdFunc({
        id: note.id,
        content: data.content,
      })
      toast({ title: '成功', description: '随笔更新成功' })
      onOpenChange(false)
      onSuccess?.()
    } catch (error) {
      console.error('Failed to update note:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[640px]">
        <DialogHeader>
          <DialogTitle>编辑随笔</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-note-content">
              随笔内容 <span className="text-red-500">*</span>
            </Label>
            <MarkdownEditor
              id="edit-note-content"
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
              {isSubmitting ? '提交中...' : '保存'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
