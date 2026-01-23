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
import { deletePermissionsApi } from '@/service/QuanXianGuanLi'
import { toast } from '@/components/ui/use-toast'
import { AlertCircle } from 'lucide-react'

interface DeletePermissionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  permissionIds: string[]
  permissionNames?: string[]
  onSuccess?: () => void
}

export function DeletePermissionDialog({
  open,
  onOpenChange,
  permissionIds,
  permissionNames,
  onSuccess,
}: DeletePermissionDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      for (const id of permissionIds) {
        await deletePermissionsApi({ id })
      }
      toast({
        title: '成功',
        description: `已删除 ${permissionIds.length} 个权限`,
      })
      onOpenChange(false)
      onSuccess?.()
    } catch (error) {
      console.error('Failed to delete permissions:', error)
      toast({
        variant: 'destructive',
        title: '错误',
        description: '删除权限失败',
      })
    } finally {
      setIsDeleting(false)
    }
  }

  const displayNames = permissionNames || permissionIds

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>确认删除权限</DialogTitle>
          <DialogDescription>
            此操作无法撤销，删除后权限将从系统中永久移除。
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-start space-x-3 rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900 dark:bg-yellow-900/20">
          <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
              注意
            </p>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              {permissionIds.length === 1
                ? '您正在删除 1 个权限，此操作可能会影响相关角色的权限配置。'
                : `您正在删除 ${permissionIds.length} 个权限，此操作可能会影响相关角色的权限配置。`}
            </p>
          </div>
        </div>

        {permissionIds.length > 0 && (
          <div className="max-h-40 overflow-y-auto rounded-md border p-3">
            <p className="mb-2 text-sm font-medium">将被删除的权限：</p>
            <ul className="space-y-1">
              {displayNames.map((name, index) => (
                <li key={index} className="text-sm text-muted-foreground">
                  • {name}
                </li>
              ))}
            </ul>
          </div>
        )}

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
