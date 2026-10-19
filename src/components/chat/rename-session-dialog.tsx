'use client'

/**
 * @description 会话重命名弹窗：输入新标题提交，成功后回调更新列表
 */
import { useEffect, useState } from 'react'
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
import { toast } from '@/components/ui/use-toast'
import {
  putApiAiSessionsUpdateFunc,
  type SessionResponseDto,
} from '@/service/ai'

const renameSessionSchema = z.object({
  title: z
    .string()
    .min(1, '会话标题不能为空')
    .max(50, '会话标题不能超过50个字符'),
})

type RenameSessionFormValues = z.infer<typeof renameSessionSchema>

interface RenameSessionDialogProps {
  session: SessionResponseDto | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onRenamed: (session: SessionResponseDto) => void
}

export function RenameSessionDialog({
  session,
  open,
  onOpenChange,
  onRenamed,
}: RenameSessionDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { reset, register, formState, handleSubmit } =
    useForm<RenameSessionFormValues>({
      resolver: zodResolver(renameSessionSchema),
      defaultValues: { title: '' },
    })

  // 打开时以目标会话当前标题初始化
  useEffect(() => {
    if (open && session) reset({ title: session.title })
  }, [open, session, reset])

  const onSubmit = async (data: RenameSessionFormValues) => {
    if (!session || isSubmitting) return
    setIsSubmitting(true)
    try {
      const updated = await putApiAiSessionsUpdateFunc({
        id: session.id,
        title: data.title.trim(),
      })
      toast({ title: '成功', description: '会话已重命名' })
      onOpenChange(false)
      onRenamed(updated)
    } catch (error) {
      console.error('重命名会话失败:', error)
      toast({
        variant: 'destructive',
        title: '错误',
        description: error instanceof Error ? error.message : '重命名会话失败',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>重命名会话</DialogTitle>
          <DialogDescription>修改当前会话的标题</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="session-title">
              会话标题 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="session-title"
              placeholder="请输入会话标题"
              autoFocus
              {...register('title')}
            />
            {formState.errors.title && (
              <p className="text-sm text-red-500">
                {formState.errors.title.message}
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
              {isSubmitting ? '保存中...' : '保存'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
