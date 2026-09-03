/**
 * @description: 全局认证拦截器，token 过期或缺失时清理凭证并跳转登录页
 */
import axios from 'axios'
import { toast } from '@/components/ui/use-toast'
import { clearLocalAuth } from '@/hooks/use-auth'
import { useAuth as useAuthStore } from '@/stores/auth'

const MISSING_TOKEN_CODE = 9000

let isInstalled = false
let isHandlingAuthError = false

const isAuthPage = () => {
  const { pathname } = window.location
  return pathname === '/login' || pathname === '/register'
}

const forceLogout = () => {
  if (isHandlingAuthError || isAuthPage()) return
  isHandlingAuthError = true

  clearLocalAuth()
  useAuthStore.setState({ user: null, isAuthenticated: false })

  toast({
    variant: 'destructive',
    title: '提示',
    description: '登录状态已失效，请重新登录',
  })

  const redirect = encodeURIComponent(
    window.location.pathname + window.location.search
  )
  window.location.replace(`/login?redirect=${redirect}`)
}

export function installAuthInterceptor() {
  if (isInstalled || typeof window === 'undefined') return
  isInstalled = true

  axios.interceptors.response.use(
    response => {
      // 后端在 HTTP 200 中返回业务码 9000（缺少 token）
      if (response.data?.statusCode === MISSING_TOKEN_CODE) {
        forceLogout()
      }
      return response
    },
    error => {
      // 后端直接返回 HTTP 401（token 无效或过期）
      if (error?.response?.status === 401) {
        forceLogout()
      }
      return Promise.reject(error)
    }
  )
}

installAuthInterceptor()
