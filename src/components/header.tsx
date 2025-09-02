'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Bell, Search, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { ThemeToggle } from '@/components/theme-toggle'
import { useAuth } from '@/stores/auth'

const routeMap: Record<string, string> = {
  '/': '仪表板',
  '/users': '用户管理',
  '/analytics': '数据分析',
  '/analytics/reports': '报表',
  '/analytics/charts': '图表',
  '/settings': '系统设置',
  '/settings/general': '常规设置',
  '/settings/security': '安全设置',
  '/login': '登录',
  '/register': '注册',
}

export function Header() {
  const { user, logout } = useAuth()
  const pathname = usePathname()

  const generateBreadcrumbs = () => {
    const paths = pathname.split('/').filter(Boolean)
    const breadcrumbs = [{ name: '仪表板', href: '/' }]

    let currentPath = ''
    paths.forEach((path) => {
      currentPath += `/${path}`
      const name = routeMap[currentPath] || path
      breadcrumbs.push({ name, href: currentPath })
    })

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  return (
    <header className="border-b bg-background px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((breadcrumb, index) => (
                <div key={breadcrumb.href} className="flex items-center">
                  <BreadcrumbItem>
                    {index === breadcrumbs.length - 1 ? (
                      <BreadcrumbPage>{breadcrumb.name}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link href={breadcrumb.href}>{breadcrumb.name}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                </div>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          <Button variant="ghost" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                {user?.email || '用户'}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>个人资料</DropdownMenuItem>
              <DropdownMenuItem>设置</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                退出登录
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}