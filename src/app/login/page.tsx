'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import AnimatedBackground from '@/components/ui/animated-background'
import { useAuth as useAuthHook } from '@/hooks/use-auth'
import { useCountdown } from '@/hooks/use-countdown'
import {
  loginSchema,
  loginWithCodeSchema,
  type LoginFormData,
  type LoginWithCodeFormData,
} from '@/lib/validations/auth'
import { IndexedDBManager } from '@/lib/indexeddb-manager'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login, loginWithCode } = useAuthHook()
  const { count, isActive, start } = useCountdown(60)
  const [isLoading, setIsLoading] = useState(false)

  const passwordForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const codeForm = useForm<LoginWithCodeFormData>({
    resolver: zodResolver(loginWithCodeSchema),
    defaultValues: {
      email: '',
      code: '',
    },
  })

  // 检查用户是否已经登录
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const indexedDB = IndexedDBManager.getInstance()
        const token = await indexedDB.getItem('accessToken')
        if (token) {
          // 如果已经登录，重定向到首页或指定页面
          const redirect = searchParams.get('redirect') || '/'
          router.push(redirect)
        }
      } catch (error) {
        console.error('Failed to check auth status:', error)
      }
    }

    checkAuthStatus()
  }, [router, searchParams])

  const onPasswordSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    try {
      const result = await login({
        email: data.email,
        password: data.password,
      })
      if (result.success) {
        // 登录成功，重定向到首页或指定页面
        const redirect = searchParams.get('redirect') || '/'
        console.log('Redirecting to:', redirect)
        router.push(redirect)
        router.refresh()
      }
    } catch (error: any) {
      console.error('登录失败:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const onCodeSubmit = async (data: LoginWithCodeFormData) => {
    setIsLoading(true)
    try {
      const result = await loginWithCode({
        email: data.email,
        emailVerificationCode: data.code,
      })

      if (result.success) {
        // 登录成功，重定向到首页或指定页面
        const redirect = searchParams.get('redirect') || '/'
        router.push(redirect)
        router.refresh()
      }
    } catch (error: any) {
      console.error('登录失败:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendCode = async () => {
    const email = codeForm.getValues('email')
    if (!email) {
      codeForm.setError('email', { message: '请先输入邮箱地址' })
      return
    }

    try {
      // 这里应该调用发送验证码的API
      // 暂时模拟发送成功
      start()
    } catch (error) {
      console.error('发送验证码失败:', error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Canvas动画背景 */}
      <AnimatedBackground />

      {/* 登录卡片 */}
      <Card className="w-full max-w-md relative z-10 backdrop-blur-md bg-white/95 border-white/20 shadow-2xl shadow-purple-500/10">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-gray-900">登录</CardTitle>
          <CardDescription className="text-gray-600">
            选择您的登录方式
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="password" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="password">密码登录</TabsTrigger>
              <TabsTrigger value="code">验证码登录</TabsTrigger>
            </TabsList>

            <TabsContent value="password">
              <form
                onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="email">邮箱</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="请输入邮箱地址"
                    {...passwordForm.register('email')}
                  />
                  {passwordForm.formState.errors.email && (
                    <p className="text-sm text-destructive">
                      {passwordForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">密码</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="请输入密码"
                    {...passwordForm.register('password')}
                  />
                  {passwordForm.formState.errors.password && (
                    <p className="text-sm text-destructive">
                      {passwordForm.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? '登录中...' : '登录'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="code">
              <form
                onSubmit={codeForm.handleSubmit(onCodeSubmit)}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="code-email">邮箱</Label>
                  <Input
                    id="code-email"
                    type="email"
                    placeholder="请输入邮箱地址"
                    {...codeForm.register('email')}
                  />
                  {codeForm.formState.errors.email && (
                    <p className="text-sm text-destructive">
                      {codeForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="code">验证码</Label>
                  <div className="flex gap-2">
                    <Input
                      id="code"
                      placeholder="请输入6位验证码"
                      {...codeForm.register('code')}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleSendCode}
                      disabled={isActive}
                      className="whitespace-nowrap"
                    >
                      {isActive ? `${count}s` : '发送验证码'}
                    </Button>
                  </div>
                  {codeForm.formState.errors.code && (
                    <p className="text-sm text-destructive">
                      {codeForm.formState.errors.code.message}
                    </p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? '登录中...' : '登录'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center text-sm">
            还没有账号？{' '}
            <Link href="/register" className="text-primary hover:underline">
              立即注册
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
