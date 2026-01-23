import {
  LucideIcon,
  Home,
  Users,
  Settings,
  BarChart3,
  FileText,
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
    id: 'permissions',
    title: '权限管理',
    icon: Shield,
    href: '/permissions',
  },
  {
    id: 'analytics',
    title: '数据分析',
    icon: BarChart3,
    href: '/analytics',
    children: [
      {
        id: 'reports',
        title: '报表',
        icon: FileText,
        href: '/analytics/reports',
      },
      {
        id: 'charts',
        title: '图表',
        icon: BarChart3,
        href: '/analytics/charts',
      },
    ],
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
