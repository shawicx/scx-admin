import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * @description 路由级认证守卫：除登录/注册/403 外全部路径要求 accessToken cookie
 */

// 无需登录即可访问的路径前缀
const publicPaths = ['/login', '/register', '/403']

// Next 内部/静态资源路径前缀（与 proxyConfig.matcher 的排除意图一致）
const bypassPrefixes = ['/_next', '/_proxy', '/api', '/static', '/favicon.ico']

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 实测（Next 16 proxy 机制）：proxyConfig.matcher 的负向前瞻排除未可靠生效，
  // /_next/static/chunks/*.js 会被本守卫 307 到 /login，登录页 HTML 被当作 JS 执行，
  // 导致 hydration 失败。因此在函数内显式 bypass 作为权威防线（matcher 保留原样仅作参考）。
  // chunk 路径含 %5B 等编码字符，需先解码再判断；解码失败（非法编码序列）时使用原始 pathname。
  let decodedPathname = pathname
  try {
    decodedPathname = decodeURIComponent(pathname)
  } catch {
    // 解码失败时保留原始 pathname
    decodedPathname = pathname
  }

  // Next 内部路径 / 静态资源（路径含 '.'）直接放行，不做认证判断
  if (
    bypassPrefixes.some(prefix => pathname.startsWith(prefix)) ||
    decodedPathname.includes('.')
  ) {
    return NextResponse.next()
  }

  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  const token = request.cookies.get('accessToken')
  if (!token) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

// 注：matcher 的排除规则在 Next 16 proxy 下未可靠生效（见上方函数内注释），函数内 bypass 为权威防线
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
