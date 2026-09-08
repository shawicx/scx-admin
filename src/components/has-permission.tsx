/**
 * @description 按钮级权限包装组件：无权限时不渲染子元素
 */
'use client'

import { usePermission } from '@/hooks/use-permission'

interface HasPermissionProps {
  resource: string
  action: string
  children: React.ReactNode
}

export function HasPermission({
  resource,
  action,
  children,
}: HasPermissionProps) {
  const { hasPermission } = usePermission()
  if (!hasPermission(resource, action)) return null
  return <>{children}</>
}
