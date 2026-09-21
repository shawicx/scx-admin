'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { deleteApiDictsTypeDeleteFunc } from '@/service/rbac'
import { toast } from '@/components/ui/use-toast'
import { AlertCircle } from 'lucide-react'
import type { DictTypeResponseDto } from '@/service/rbac'

interface DeleteDictTypeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  dictType: DictTypeResponseDto | null
  onSuccess?: () => void
}

export function DeleteDictTypeDialog({
  open,
  onOpenChange,
  dictType,
  onSuccess,
}: DeleteDictTypeDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleDelete = async () => {
    if (!dictType) return

    setIsSubmitting(true)
    try {
      await deleteApiDictsTypeDeleteFunc({ id: dictType.id })
      toast({
        title: '成功',
        description: '字典类型删除成功',
      })
      onOpenChange(false)
      onSuccess?.()
    } catch (error) {
      console.error('Failed to delete dict type:', error)
      toast({
        variant: 'destructive',
        title: '错误',
        description: '字典类型删除失败',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            确认删除字典类型
          </DialogTitle>
          <DialogDescription>
            您正在删除字典类型
            <span className="mx-1 font-medium text-foreground">
              {dictType?.name}
            </span>
            （{dictType?.code}），此操作不可逆。
            <p className="mt-2 text-destructive font-medium">
              删除字典类型可能影响其下字典数据的使用。
            </p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            取消
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isSubmitting}
          >
            {isSubmitting ? '删除中...' : '确认删除'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
