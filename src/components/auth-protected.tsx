'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { IndexedDBManager } from '@/lib/indexeddb-manager'

interface AuthProtectedProps {
  children: React.ReactNode
}

export function AuthProtected({ children }: AuthProtectedProps) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const indexedDB = IndexedDBManager.getInstance()
        const token = await indexedDB.getItem('accessToken')
        const isAuthenticated = !!token

        if (!isAuthenticated) {
          router.push('/login')
        } else {
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.error('Failed to check auth status:', error)
        router.push('/login')
      }
    }

    checkAuthStatus()
  }, [router])

  // 如果还在检查认证状态，显示加载指示器
  if (isAuthenticated === null) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-2 text-sm text-gray-500">正在验证身份...</p>
        </div>
      </div>
    )
  }

  // 如果已认证，渲染子组件
  return <>{children}</>
}
