'use client'

import { useState, useEffect, useCallback } from 'react'
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
import { Badge } from '@/components/ui/badge'
import {
  getApiRolesPermissionTreeFunc,
  postApiRolesAssignPermissionsFunc,
} from '@/service/rbac'
import type { RolePermissionTreeResponseDto } from '@/service/rbac'
import { toast } from '@/components/ui/use-toast'

interface PermissionAssignDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  roleId: string | null
  onSuccess?: () => void
}

type PermissionNode = RolePermissionTreeResponseDto

export function PermissionAssignDialog({
  open,
  onOpenChange,
  roleId,
  onSuccess,
}: PermissionAssignDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [tree, setTree] = useState<PermissionNode[]>([])
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({})

  const toggleNode = useCallback((node: PermissionNode, checked: boolean) => {
    const ids: string[] = []
    const collect = (n: PermissionNode) => {
      ids.push(n.id)
      ;(n.children ?? []).forEach(collect)
    }
    collect(node)

    setCheckedMap(prev => {
      const next = { ...prev }
      ids.forEach(id => {
        if (checked) next[id] = true
        else delete next[id]
      })
      return next
    })
  }, [])

  useEffect(() => {
    const loadData = async () => {
      if (open && roleId) {
        setIsLoading(true)
        try {
          const treeRes = await getApiRolesPermissionTreeFunc({ id: roleId })
          const nodes = treeRes.data || []
          setTree(nodes)

          const initialChecked: Record<string, boolean> = {}
          const walk = (node: PermissionNode) => {
            if (node.checked) initialChecked[node.id] = true
            ;(node.children ?? []).forEach(walk)
          }
          nodes.forEach(walk)
          setCheckedMap(initialChecked)
        } catch (error) {
          console.error('Failed to load permission tree:', error)
          toast({
            variant: 'destructive',
            title: '错误',
            description: '加载权限树失败',
          })
        } finally {
          setIsLoading(false)
        }
      }
    }

    loadData()
  }, [open, roleId])

  const hasCheckedDescendant = (node: PermissionNode): boolean => {
    return (node.children ?? []).some(
      child => !!checkedMap[child.id] || hasCheckedDescendant(child)
    )
  }

  // 勾选任一按钮时其父级菜单一并提交，避免角色拿到按钮却看不到所属菜单
  const collectCheckedIds = (nodes: PermissionNode[]): string[] => {
    const ids: string[] = []
    const walk = (node: PermissionNode): boolean => {
      const childrenSelected = (node.children ?? []).map(walk).some(Boolean)
      const selected = !!checkedMap[node.id] || childrenSelected
      if (selected) ids.push(node.id)
      return selected
    }
    nodes.forEach(walk)
    return ids
  }

  const handleSubmit = async () => {
    if (!roleId) return

    setIsSubmitting(true)
    try {
      await postApiRolesAssignPermissionsFunc({
        id: roleId,
        permissionIds: collectCheckedIds(tree),
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

  const renderNode = (node: PermissionNode) => {
    const isChecked = !!checkedMap[node.id]
    const indeterminate = !isChecked && hasCheckedDescendant(node)
    const hasChildren = (node.children?.length ?? 0) > 0
    const isMenu = node.type === 'MENU'

    return (
      <div key={node.id}>
        <div className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
          <Checkbox
            id={`permission-${node.id}`}
            checked={isChecked}
            indeterminate={indeterminate}
            onChange={e => toggleNode(node, e.target.checked)}
            className="mt-1"
          />
          <div className="flex-1 space-y-1 min-w-0">
            <Label
              htmlFor={`permission-${node.id}`}
              className="font-medium cursor-pointer"
            >
              {node.name}
              <Badge
                variant={isMenu ? 'secondary' : 'outline'}
                className="ml-2"
              >
                {isMenu ? '菜单' : '按钮'}
              </Badge>
            </Label>
            <div className="text-sm text-muted-foreground">
              {node.action && (
                <span className="inline-block px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground mr-2">
                  {node.action}
                </span>
              )}
              {node.resource && (
                <span className="inline-block px-2 py-0.5 rounded-md bg-muted text-muted-foreground mr-2">
                  {node.resource}
                </span>
              )}
              {node.path && (
                <span className="font-mono text-xs">{node.path}</span>
              )}
            </div>
            {node.description && (
              <p className="text-sm text-muted-foreground">
                {node.description}
              </p>
            )}
          </div>
        </div>
        {hasChildren && (
          <div className="ml-6 mt-2 space-y-2 border-l pl-4">
            {node.children!.map(child => renderNode(child))}
          </div>
        )}
      </div>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>分配权限</DialogTitle>
          <DialogDescription>
            为角色选择需要分配的权限，角色已有的权限默认勾选
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-sm text-muted-foreground">加载中...</div>
          </div>
        ) : tree.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-sm text-muted-foreground">
              暂无可分配的权限
            </div>
          </div>
        ) : (
          <div className="max-h-[60vh] overflow-y-auto pr-4 space-y-2">
            {tree.map(node => renderNode(node))}
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
