/**
 * @description 菜单与按钮权限 store（内存态，不持久化）
 *
 * 登录后由 MainLayout 触发 fetchPermissions 拉取当前用户可见菜单树与权限点；
 * 登出/凭证失效时调用 clear 清空。
 */
'use client'

import { create } from 'zustand'
import { getApiUsersMeMenusFunc } from '@/service/identity'
import type { MeMenuNodeDto } from '@/service/identity'

type PermissionStatus = 'idle' | 'loading' | 'ready' | 'error'

interface PermissionState {
  /** 当前用户可见菜单树（管理员为全量） */
  menus: MeMenuNodeDto[]
  /** 按钮权限点集合，格式 resource:action；管理员为 ['*'] */
  permissions: string[]
  status: PermissionStatus
  fetchPermissions: () => Promise<void>
  clear: () => void
}

export const usePermissionStore = create<PermissionState>()(set => ({
  menus: [],
  permissions: [],
  status: 'idle',

  /**
   * @description 拉取当前用户菜单与权限点；失败时清空数据并置 error，避免残留陈旧授权
   */
  fetchPermissions: async () => {
    set({ status: 'loading' })
    try {
      const data = await getApiUsersMeMenusFunc({})
      set({
        menus: data.menus ?? [],
        permissions: data.permissions ?? [],
        status: 'ready',
      })
    } catch (error) {
      console.error('Failed to fetch permissions:', error)
      set({ menus: [], permissions: [], status: 'error' })
    }
  },

  /**
   * @description 清空菜单与权限数据并回到 idle（登出/凭证失效时调用）
   */
  clear: () => set({ menus: [], permissions: [], status: 'idle' }),
}))
