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
import { Switch } from '@/components/ui/switch'
import { patchUsersToggleStatusApi } from '@/service/YongHuGuanLi'
import { toast } from '@/components/ui/use-toast'

interface UserStatusSwitchProps {
  userIds: string[]
  currentStatus: boolean
  onSuccess?: () => void
}

export function UserStatusSwitch({
  userIds,
  currentStatus,
  onSuccess,
}: UserStatusSwitchProps) {
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [isToggling, setIsToggling] = useState(false)

  const handleToggle = () => {
    const newStatus = !currentStatus
    if (newStatus === false) {
      setConfirmDialogOpen(true)
    } else {
      performToggle(newStatus)
    }
  }

  const performToggle = async (status: boolean) => {
    setIsToggling(true)
    try {
      await patchUsersToggleStatusApi({
        userIds,
        isActive: status,
      })
      toast({
        variant: 'default',
        title: '成功',
        description: `用户状态已${status ? '启用' : '禁用'}`,
      })
      onSuccess?.()
    } finally {
      setIsToggling(false)
      setConfirmDialogOpen(false)
    }
  }

  return (
    <>
      <Switch
        checked={currentStatus}
        onCheckedChange={handleToggle}
        disabled={isToggling}
      />
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认禁用</DialogTitle>
            <DialogDescription>
              {userIds.length === 1
                ? '确定要禁用此用户吗？禁用后用户将无法登录系统。'
                : `确定要禁用选中的 ${userIds.length} 个用户吗？禁用后用户将无法登录系统。`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setConfirmDialogOpen(false)}
              disabled={isToggling}
            >
              取消
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => performToggle(false)}
              disabled={isToggling}
            >
              {isToggling ? '处理中...' : '确认禁用'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
