/**
 * @description 菜单元数据：固定公共导航、后端菜单 icon 映射、路由守卫公共路径与菜单树工具函数
 */
import {
  LucideIcon,
  Home,
  UserCircle,
  Users,
  UserCog,
  Shield,
  FolderOpen,
  ClipboardList,
  LogIn,
  CircleDot,
  BookText,
} from 'lucide-react'
import type { MeMenuNodeDto } from '@/service/identity'

export interface MenuItem {
  id: string
  title: string
  icon: LucideIcon
  href: string
  children?: MenuItem[]
}

/** 与角色无关的账户级导航，始终显示（不进 RBAC） */
export const FIXED_MENU_ITEMS: MenuItem[] = [
  { id: 'dashboard', title: '仪表板', icon: Home, href: '/' },
  { id: 'profile', title: '个人资料', icon: UserCircle, href: '/profile' },
]

/** 路由守卫始终放行的路径（含 403 页自身，避免守卫死循环） */
export const PUBLIC_ROUTES = ['/', '/profile', '/403']

/** 后端菜单 icon 字符串 → lucide 图标组件 */
export const iconMap: Record<string, LucideIcon> = {
  users: Users,
  roles: UserCog,
  permissions: Shield,
  files: FolderOpen,
  'operation-logs': ClipboardList,
  'login-logs': LogIn,
  dicts: BookText,
}

/**
 * @description 后端菜单树节点转前端菜单项（icon 未配置时兜底圆点图标）
 * @param nodes 后端菜单树
 * @returns MenuItem[] 前端菜单项
 *
 * @example toMenuItems(meMenuNodes)
 */
export function toMenuItems(nodes: MeMenuNodeDto[]): MenuItem[] {
  return nodes.map(node => ({
    id: node.id,
    title: node.name,
    icon: iconMap[node.icon ?? ''] ?? CircleDot,
    href: node.path ?? '',
    children: node.children?.length ? toMenuItems(node.children) : undefined,
  }))
}

/**
 * @description 展平菜单树的全部 path（路由守卫的白名单来源）
 * @param nodes 后端菜单树
 * @returns string[] path 列表（容器节点无 path 时跳过自身）
 *
 * @example flattenMenuPaths(meMenuNodes)
 */
export function flattenMenuPaths(nodes: MeMenuNodeDto[]): string[] {
  return nodes.flatMap(node => [
    ...(node.path ? [node.path] : []),
    ...flattenMenuPaths(node.children ?? []),
  ])
}
