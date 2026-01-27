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
import { deleteRolesApi } from '@/service/JueSeGuanLi'
import { toast } from '@/components/ui/use-toast'
import { AlertCircle } from 'lucide-react'

interface DeleteRoleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  roleIds: string[]
  roleNames: string[]
  onSuccess?: () => void
}

export function DeleteRoleDialog({
  open,
  onOpenChange,
  roleIds,
  roleNames,
  onSuccess,
}: DeleteRoleDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleDelete = async () => {
    setIsSubmitting(true)
    try {
      const deletePromises = roleIds.map(id => deleteRolesApi({ id }))
      await Promise.all(deletePromises)
      toast({
        title: '成功',
        description: `已删除 ${roleIds.length} 个角色`,
      })
      onOpenChange(false)
      onSuccess?.()
    } catch (error) {
      console.error('Failed to delete roles:', error)
      toast({
        variant: 'destructive',
        title: '错误',
        description: '角色删除失败',
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
            确认删除角色
          </DialogTitle>
          <DialogDescription>
            您正在删除 {roleIds.length} 个角色，此操作不可逆。
            {roleNames.length > 0 && (
              <div className="mt-2 text-sm">
                <span className="font-medium">将删除的角色：</span>
                <ul className="mt-1 list-disc list-inside text-muted-foreground">
                  {roleNames.map(name => (
                    <li key={name}>{name}</li>
                  ))}
                </ul>
              </div>
            )}
            <p className="mt-2 text-destructive font-medium">
              删除角色可能会影响使用该角色的用户。
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
