'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

/**
 * @description 无权限访问页（403）
 */
export default function ForbiddenPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-6xl font-bold text-muted-foreground">403</h1>
      <p className="text-muted-foreground">抱歉，您没有访问该页面的权限</p>
      <Button asChild>
        <Link href="/">返回首页</Link>
      </Button>
    </div>
  )
}
