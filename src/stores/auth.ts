'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  email: string
  name?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  loginWithCode: (email: string, code: string) => Promise<void>
  register: (email: string, password: string, code: string) => Promise<void>
  logout: () => void
  sendVerificationCode: (email: string) => Promise<void>
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      
      login: async (email: string, password: string) => {
        // 模拟登录 API 调用
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // 使用 password 参数进行验证（这里是模拟）
        if (password.length < 6) {
          throw new Error('密码长度至少6位')
        }
        
        const user = { id: '1', email, name: email.split('@')[0] }
        set({ user, isAuthenticated: true })
      },
      
      loginWithCode: async (email: string, code: string) => {
        // 模拟验证码登录 API 调用
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        if (code === '123456') {
          const user = { id: '1', email, name: email.split('@')[0] }
          set({ user, isAuthenticated: true })
        } else {
          throw new Error('验证码错误')
        }
      },
      
      register: async (email: string, password: string, code: string) => {
        // 模拟注册 API 调用
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        if (code === '123456') {
          const user = { id: '1', email, name: email.split('@')[0] }
          set({ user, isAuthenticated: true })
        } else {
          throw new Error('验证码错误')
        }
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false })
      },
      
      sendVerificationCode: async (email: string) => {
        // 模拟发送验证码 API 调用
        await new Promise(resolve => setTimeout(resolve, 1000))
        console.log(`验证码已发送到 ${email}`)
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)