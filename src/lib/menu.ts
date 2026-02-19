import {
  LucideIcon,
  Home,
  Users,
  UserCog,
  Settings,
  Shield,
} from 'lucide-react'

export interface MenuItem {
  id: string
  title: string
  icon: LucideIcon
  href: string
  children?: MenuItem[]
  badge?: string
}

export const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    title: '仪表板',
    icon: Home,
    href: '/',
  },
  {
    id: 'users',
    title: '用户管理',
    icon: Users,
    href: '/users',
    badge: '新',
  },
  {
    id: 'roles',
    title: '角色管理',
    icon: UserCog,
    href: '/roles',
  },
  {
    id: 'permissions',
    title: '权限管理',
    icon: Shield,
    href: '/permissions',
  },
  {
    id: 'settings',
    title: '系统设置',
    icon: Settings,
    href: '/settings',
    children: [
      {
        id: 'general',
        title: '常规设置',
        icon: Settings,
        href: '/settings/general',
      },
      {
        id: 'security',
        title: '安全设置',
        icon: Shield,
        href: '/settings/security',
      },
    ],
  },
]
