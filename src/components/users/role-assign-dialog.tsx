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
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { getUsersRolesApi } from '@/service/YongHuGuanLi'
import { getRolesApi } from '@/service/JueSeGuanLi'
import { toast } from '@/components/ui/use-toast'

interface Role {
  id: string
  name: string
  code: string
}

interface UserRole {
  id: string
  userId: string
  roleId: string
}

interface RoleAssignDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  userId: string
}

export function RoleAssignDialog({
  open,
  onOpenChange,
  userId,
}: RoleAssignDialogProps) {
  const [allRoles, setAllRoles] = useState<Role[]>([])
  const [assignedRoles, setAssignedRoles] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(false)

  const loadRoles = async () => {
    setIsLoading(true)
    try {
      const [rolesRes, userRolesRes] = await Promise.all([
        getRolesApi({}),
        getUsersRolesApi({ id: userId }),
      ])
      setAllRoles(rolesRes.list)
      const userRoles = userRolesRes?.data || []
      setAssignedRoles(
        new Set((userRoles as any).map((role: UserRole) => role.roleId))
      )
    } catch (error) {
      console.error('Failed to load roles:', error)
      toast({
        variant: 'destructive',
        title: '错误',
        description: '加载角色列表失败',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (open && userId) {
      loadRoles()
    }
  }, [open, userId])

  const toggleRole = (roleId: string, roleName: string) => {
    setAssignedRoles(prev => {
      const newSet = new Set(prev)
      if (newSet.has(roleId)) {
        newSet.delete(roleId)
        toast({
          description: `已移除角色: ${roleName}`,
        })
      } else {
        newSet.add(roleId)
        toast({
          description: `已添加角色: ${roleName}`,
        })
      }
      return newSet
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>分配角色</DialogTitle>
          <DialogDescription>为用户分配或移除角色权限</DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            <span className="ml-2 text-sm text-muted-foreground">
              加载中...
            </span>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              <div>
                <Label>当前角色</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {assignedRoles.size === 0 ? (
                    <span className="text-sm text-muted-foreground">
                      暂无角色
                    </span>
                  ) : (
                    allRoles
                      .filter(role => assignedRoles.has(role.id))
                      .map(role => (
                        <Badge key={role.id} variant="default">
                          {role.name}
                        </Badge>
                      ))
                  )}
                </div>
              </div>

              <div>
                <Label>可用角色</Label>
                <div className="mt-2 border rounded-md p-4 max-h-60 overflow-y-auto">
                  {allRoles.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      暂无可用角色
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {allRoles.map(role => {
                        const isChecked = assignedRoles.has(role.id)
                        return (
                          <div
                            key={role.id}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`role-${role.id}`}
                              checked={isChecked}
                              onChange={() => toggleRole(role.id, role.name)}
                            />
                            <Label
                              htmlFor={`role-${role.id}`}
                              className="flex-1 cursor-pointer"
                            >
                              {role.name}
                              <span className="ml-2 text-sm text-muted-foreground">
                                ({role.code})
                              </span>
                            </Label>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                关闭
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
