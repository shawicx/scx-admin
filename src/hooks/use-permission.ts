/**
 * @description 按钮级权限 hook
 */
'use client'

import { usePermissionStore } from '@/stores/permission'

export function usePermission() {
  const permissions = usePermissionStore(state => state.permissions)

  /**
   * @description 判断当前用户是否拥有指定按钮权限（管理员通配 * 全通过）
   * @param resource 资源标识（如 user）
   * @param action 动作标识（如 delete）
   * @returns boolean 是否有权限
   */
  const hasPermission = (resource: string, action: string) =>
    permissions.includes('*') || permissions.includes(`${resource}:${action}`)

  return { hasPermission }
}
