'use client'

import { AuthProtected } from '@/components/auth-protected'

export default function HomePage() {
  return (
    <AuthProtected>
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-3xl font-bold mb-4">欢迎来到 SCX Admin</h1>
        <p className="text-gray-600">您已成功登录管理系统</p>
      </div>
    </AuthProtected>
  )
}
