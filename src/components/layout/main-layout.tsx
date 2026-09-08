'use client'

/**
 * @description 全局主布局：认证检查、权限拉取、路由级权限守卫与侧边栏/头部骨架
 */
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Sidebar } from './sidebar'
import { Header } from './header'
import { IndexedDBManager } from '@/lib/indexeddb-manager'
import { usePermissionStore } from '@/stores/permission'
import { flattenMenuPaths, PUBLIC_ROUTES } from '@/lib/menu'
import '@/lib/auth-interceptor'

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const { menus, status, fetchPermissions } = usePermissionStore()

  // 不需要显示侧边栏和头部的页面
  const authPages = ['/login', '/register']
  const isAuthPage = authPages.includes(pathname)

  // 检查用户认证状态
  useEffect(() => {
    const checkAuthStatus = async () => {
      if (isAuthPage) {
        setIsAuthenticated(true)
        return
      }

      try {
        const indexedDB = IndexedDBManager.getInstance()
        const token = await indexedDB.getItem('accessToken')
        const isAuthenticated = !!token
        setIsAuthenticated(isAuthenticated)

        // 如果未认证且不是认证页面，重定向到登录页
        if (!isAuthenticated && !isAuthPage) {
          router.push('/login')
        }
      } catch (error) {
        console.error('Failed to check auth status:', error)
        setIsAuthenticated(false)
        if (!isAuthPage) {
          router.push('/login')
        }
      }
    }

    checkAuthStatus()
  }, [pathname, router, isAuthPage])

  // 认证通过后拉取权限（idle 时触发一次）
  useEffect(() => {
    if (isAuthPage || isAuthenticated !== true) return
    if (status === 'idle') void fetchPermissions()
  }, [isAuthPage, isAuthenticated, status])

  // 路由级权限守卫：权限就绪（或加载失败）后，未授权路径跳 403
  // error 状态下菜单为空，allowed 仅剩 PUBLIC_ROUTES：公共路由放行、受限路由拦截（与 spec 边界一致）
  useEffect(() => {
    if (isAuthPage || isAuthenticated !== true) return
    if (status !== 'ready' && status !== 'error') return
    const menuPaths = status === 'ready' ? flattenMenuPaths(menus) : []
    const allowed = [...menuPaths, ...PUBLIC_ROUTES]
    const isAllowed = allowed.some(
      route => pathname === route || pathname.startsWith(route + '/')
    )
    // 未授权时 replace 到 403，避免返回键在 /403 与受限页之间回环
    if (!isAllowed) router.replace('/403')
  }, [pathname, status, menus, isAuthenticated, isAuthPage, router])

  // 如果认证状态还在检查中，显示加载状态
  if (isAuthenticated === null && !isAuthPage) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-2 text-sm text-gray-500">正在验证身份...</p>
        </div>
      </div>
    )
  }

  // 如果未认证且不是认证页面，不渲染内容
  if (!isAuthenticated && !isAuthPage) {
    return null
  }

  if (isAuthPage) {
    return <>{children}</>
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}
