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
import { deleteApiDictsDataDeleteFunc } from '@/service/rbac'
import { toast } from '@/components/ui/use-toast'
import { AlertCircle } from 'lucide-react'
import type { DictDataResponseDto } from '@/service/rbac'

interface DeleteDictDataDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  dictData: DictDataResponseDto | null
  onSuccess?: () => void
}

export function DeleteDictDataDialog({
  open,
  onOpenChange,
  dictData,
  onSuccess,
}: DeleteDictDataDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleDelete = async () => {
    if (!dictData) return

    setIsSubmitting(true)
    try {
      await deleteApiDictsDataDeleteFunc({ id: dictData.id })
      toast({
        title: '成功',
        description: '字典数据删除成功',
      })
      onOpenChange(false)
      onSuccess?.()
    } catch (error) {
      console.error('Failed to delete dict data:', error)
      toast({
        variant: 'destructive',
        title: '错误',
        description: '字典数据删除失败',
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
            确认删除字典数据
          </DialogTitle>
          <DialogDescription>
            您正在删除字典数据
            <span className="mx-1 font-medium text-foreground">
              {dictData?.label}（{dictData?.value}）
            </span>
            ，此操作不可逆。
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
