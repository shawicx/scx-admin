import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { MainLayout } from '@/components/layout/main-layout'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

const themeInitScript = `(function(){try{var t=JSON.parse(localStorage.getItem('theme-storage')||'{}').state.theme;var d=t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.add(d?'dark':'light')}catch(e){}})()`

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
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <ThemeProvider>
          <MainLayout>{children}</MainLayout>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}
