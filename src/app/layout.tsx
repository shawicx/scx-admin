import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { MainLayout } from '@/components/layout/main-layout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SCX Admin - 现代化管理后台',
  description: '基于 Next.js 构建的现代化管理后台系统',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <MainLayout>
            {children}
          </MainLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}