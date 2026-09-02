import {
  LucideIcon,
  Home,
  Users,
  UserCog,
  Shield,
  FolderOpen,
  ClipboardList,
  LogIn,
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
    id: 'files',
    title: '文件管理',
    icon: FolderOpen,
    href: '/files',
  },
  {
    id: 'operation-logs',
    title: '操作日志',
    icon: ClipboardList,
    href: '/logs/operations',
  },
  {
    id: 'login-logs',
    title: '登录日志',
    icon: LogIn,
    href: '/logs/logins',
  },
]
