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
import { deleteUsersApi } from '@/service/YongHuGuanLi'
import { toast } from '@/components/ui/use-toast'

interface DeleteUserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  userIds: string[]
  onSuccess?: () => void
}

export function DeleteUserDialog({
  open,
  onOpenChange,
  userIds,
  onSuccess,
}: DeleteUserDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteUsersApi({ userIds })
      toast({
        title: '成功',
        description: `已成功删除 ${userIds.length} 个用户`,
      })
      onOpenChange(false)
      onSuccess?.()
    } catch (error) {
      console.error('Failed to delete users:', error)
      toast({
        variant: 'destructive',
        title: '错误',
        description: '删除用户失败',
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
            {userIds.length === 1
              ? '确定要删除此用户吗？此操作不可恢复。'
              : `确定要删除选中的 ${userIds.length} 个用户吗？此操作不可恢复。`}
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
