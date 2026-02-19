'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useAuth as useAuthHook } from '@/hooks/use-auth'
import { IndexedDBManager } from '@/lib/indexeddb-manager'
import type { PostUsersLoginPasswordResponseType } from '@/service'

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
  sendVerificationCode: (email: string) => Promise<void>
  logout: () => Promise<void>
  checkAuthStatus: () => Promise<void>
}

export const useAuth = create<AuthState>()(
  persist(
    set => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        const { login: loginHook } = useAuthHook()
        const userData = await loginHook({ email, password })
        const user = {
          id: userData.id,
          email: userData.email,
          name: userData.name,
        }
        set({ user, isAuthenticated: true })
      },

      loginWithCode: async (email: string, code: string) => {
        const { loginWithCode: loginWithCodeHook } = useAuthHook()
        const userData = await loginWithCodeHook({
          email,
          emailVerificationCode: code,
        })

        const user = {
          id: userData.id,
          email: userData.email,
          name: userData.name,
        }
        set({ user, isAuthenticated: true })
      },

      register: async (email: string, password: string, code: string) => {
        const { register: registerHook } = useAuthHook()
        const userData = await registerHook({
          email,
          password,
          emailVerificationCode: code,
        })

        const user = {
          id: userData.id,
          email: userData.email,
          name: userData.name,
        }
        set({ user, isAuthenticated: true })
      },

      sendVerificationCode: async (email: string) => {
        const { sendVerificationCode: sendCodeHook } = useAuthHook()
        await sendCodeHook(email)
      },

      logout: async () => {
        const { logout: logoutHook } = useAuthHook()
        await logoutHook()
        set({ user: null, isAuthenticated: false })
      },

      checkAuthStatus: async () => {
        try {
          const indexedDB = IndexedDBManager.getInstance()
          const token = await indexedDB.getItem('accessToken')
          const userData = (await indexedDB.getItem(
            'user'
          )) as PostUsersLoginPasswordResponseType | null

          if (token && userData) {
            set({
              user: {
                id: userData.id,
                email: userData.email,
                name: userData.name,
              },
              isAuthenticated: true,
            })
          } else {
            set({ user: null, isAuthenticated: false })
          }
        } catch (error) {
          console.error('Failed to check auth status:', error)
          set({ user: null, isAuthenticated: false })
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: state => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
