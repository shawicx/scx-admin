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
import { deleteApiFilesBatchDeleteFunc } from '@/service/file'
import { toast } from '@/components/ui/use-toast'

interface DeleteFileDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  fileIds: string[]
  onSuccess?: () => void
}

export function DeleteFileDialog({
  open,
  onOpenChange,
  fileIds,
  onSuccess,
}: DeleteFileDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const result = await deleteApiFilesBatchDeleteFunc({ ids: fileIds })
      toast({
        title: '成功',
        description: result.message || `已成功删除 ${fileIds.length} 个文件`,
      })
      onOpenChange(false)
      onSuccess?.()
    } catch (error) {
      console.error('删除文件失败:', error)
      toast({
        variant: 'destructive',
        title: '错误',
        description: '删除文件失败',
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>确认删除</DialogTitle>
          <DialogDescription>
            {fileIds.length === 1
              ? '确定要删除此文件吗？此操作不可恢复。'
              : `确定要删除选中的 ${fileIds.length} 个文件吗？此操作不可恢复。`}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
          >
            取消
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? '删除中...' : '确认删除'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
