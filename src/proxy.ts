import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 需要保护的路径前缀
const protectedPaths = ['/dashboard', '/settings', '/users', '/table-demo']

// 不需要重定向的路径
const publicPaths = ['/login', '/register']

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 如果是公共路径，直接放行
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  // 检查是否需要保护
  const isProtected = protectedPaths.some(path => pathname.startsWith(path))

  if (isProtected) {
    // 检查是否有认证 cookie
    const token = request.cookies.get('accessToken')

    if (!token) {
      // 重定向到登录页面
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

// 配置 proxy 匹配的路径
export const proxyConfig = {
  matcher: [
    /*
     * 匹配所有请求路径，除了以下情况：
     * 1. 以 /_ 开头的路径（Next.js 内部路径）
     * 2. 以 /api 开头的路径
     * 3. 以 /static 开头的路径
     * 4. 包含 . 的路径（如 /favicon.ico 等静态文件）
     */
    '/((?!_next|_proxy|api|static|.*\\..*|favicon.ico).*)',
  ],
}
