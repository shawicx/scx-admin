'use client'

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { getPermissionsApi } from '@/service/QuanXianGuanLi'
import {
  getRolesPermissionsApi,
  postRolesAssignPermissionsApi,
} from '@/service/JueSeGuanLi'
import { toast } from '@/components/ui/use-toast'
import type { PermissionResponseDto } from '@/service/types'

interface PermissionAssignDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  roleId: string | null
  onSuccess?: () => void
}

interface PermissionItem {
  id: string
  name: string
  action: string
  resource: string
  description?: string
  checked: boolean
}

export function PermissionAssignDialog({
  open,
  onOpenChange,
  roleId,
  onSuccess,
}: PermissionAssignDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [permissions, setPermissions] = useState<PermissionItem[]>([])

  useEffect(() => {
    const loadData = async () => {
      if (open && roleId) {
        setIsLoading(true)
        try {
          const [allPermissionsRes, rolePermissionsRes] = await Promise.all([
            getPermissionsApi({}),
            getRolesPermissionsApi({ id: roleId }),
          ])

          const rolePermissions =
            rolePermissionsRes.data as PermissionResponseDto[]
          const rolePermissionIds = new Set(rolePermissions.map(p => p.id))

          const allPermissions =
            (allPermissionsRes as any).data?.list || allPermissionsRes.list

          const permissionsWithCheck = allPermissions.map(
            (p: PermissionResponseDto) => ({
              ...p,
              checked: rolePermissionIds.has(p.id),
            })
          )

          setPermissions(permissionsWithCheck)
        } catch (error) {
          console.error('Failed to load permissions:', error)
          toast({
            variant: 'destructive',
            title: '错误',
            description: '加载权限列表失败',
          })
        } finally {
          setIsLoading(false)
        }
      }
    }

    loadData()
  }, [open, roleId])

  const handlePermissionToggle = (permissionId: string) => {
    setPermissions(prev =>
      prev.map(p => (p.id === permissionId ? { ...p, checked: !p.checked } : p))
    )
  }

  const handleSubmit = async () => {
    if (!roleId) return

    setIsSubmitting(true)
    try {
      const selectedPermissionIds = permissions
        .filter(p => p.checked)
        .map(p => p.id)

      await postRolesAssignPermissionsApi({
        id: roleId,
        permissionIds: selectedPermissionIds,
      })

      toast({
        title: '成功',
        description: '权限分配成功',
      })

      onOpenChange(false)
      onSuccess?.()
    } catch (error) {
      console.error('Failed to assign permissions:', error)
      toast({
        variant: 'destructive',
        title: '错误',
        description: '权限分配失败',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>分配权限</DialogTitle>
          <DialogDescription>
            为角色选择需要分配的权限，至少选择一个权限
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-sm text-muted-foreground">加载中...</div>
          </div>
        ) : (
          <div className="max-h-[60vh] overflow-y-auto pr-4 space-y-3">
            {permissions.map(permission => (
              <div
                key={permission.id}
                className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <Checkbox
                  id={`permission-${permission.id}`}
                  checked={permission.checked}
                  onChange={() => handlePermissionToggle(permission.id)}
                  className="mt-1"
                />
                <div className="flex-1 space-y-1">
                  <Label
                    htmlFor={`permission-${permission.id}`}
                    className="font-medium cursor-pointer"
                  >
                    {permission.name}
                  </Label>
                  <div className="text-sm text-muted-foreground">
                    <span className="inline-block px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground mr-2">
                      {permission.action}
                    </span>
                    <span className="inline-block px-2 py-0.5 rounded-md bg-muted text-muted-foreground">
                      {permission.resource}
                    </span>
                  </div>
                  {permission.description && (
                    <p className="text-sm text-muted-foreground">
                      {permission.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting || isLoading}
          >
            取消
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting || isLoading}
          >
            {isSubmitting ? '分配中...' : '确认分配'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
