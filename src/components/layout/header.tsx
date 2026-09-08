'use client'

/**
 * @description 顶部栏：面包屑（由后端菜单树推导）、主题切换与用户下拉菜单
 */
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { Moon, Sun, User, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { useTheme } from '@/stores/theme'
import { useAuth } from '@/stores/auth'
import { usePermissionStore } from '@/stores/permission'
import type { MeMenuNodeDto } from '@/service/identity'
import { useRouter } from 'next/navigation'

export function Header() {
  const pathname = usePathname()
  const { setTheme } = useTheme()
  const { logout, user } = useAuth()
  const { menus } = usePermissionStore()
  const router = useRouter()

  const routeMap = useMemo(() => {
    const map: Record<string, string> = {
      '/': '首页',
      '/profile': '个人资料',
      '/403': '无权限',
      // 日志容器段中文名：后端菜单树只 seed 了两个日志叶子，无 /logs 容器行
      '/logs': '日志管理',
    }
    /** @description 深度优先遍历菜单树，将 path → name 写入面包屑映射 */
    const walk = (nodes: MeMenuNodeDto[]) => {
      nodes.forEach(node => {
        if (node.path) map[node.path] = node.name
        walk(node.children ?? [])
      })
    }
    walk(menus)
    return map
  }, [menus])

  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }

  const generateBreadcrumbs = () => {
    const paths = pathname.split('/').filter(Boolean)
    const breadcrumbs = [{ name: '首页', href: '/' }]

    let currentPath = ''
    paths.forEach(path => {
      currentPath += `/${path}`
      const name = routeMap[currentPath] || path
      breadcrumbs.push({ name, href: currentPath })
    })

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains('dark')
    setTheme(isDark ? 'light' : 'dark')
  }

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <div className="flex items-center">
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((breadcrumb, index) => (
              <div key={breadcrumb.href} className="flex items-center">
                <BreadcrumbItem>
                  {index === breadcrumbs.length - 1 ? (
                    <BreadcrumbPage>{breadcrumb.name}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={breadcrumb.href}>
                      {breadcrumb.name}
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
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="h-9 w-9"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">切换主题</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src={user?.avatar || '/assets/avatar.png'}
                  alt="用户头像"
                />
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuItem onClick={() => router.push('/profile')}>
              <User className="mr-2 h-4 w-4" />
              <span>个人资料</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>退出登录</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
