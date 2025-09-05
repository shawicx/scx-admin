'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface TableHeaderProps {
  statistics?: ReactNode
  extra?: ReactNode
  actions?: ReactNode
  className?: string
}

export function TableHeader({
  statistics,
  extra,
  actions,
  className,
}: TableHeaderProps) {
  // 如果没有任何内容，不渲染
  if (!statistics && !extra && !actions) {
    return null
  }

  return (
    <div className={cn('flex items-center justify-between mb-4', className)}>
      {/* 左侧：统计信息 */}
      <div className="flex-1">{statistics}</div>

      {/* 中间：额外内容 */}
      <div className="flex-1 flex justify-center">{extra}</div>

      {/* 右侧：操作按钮 */}
      <div className="flex-1 flex justify-end">{actions}</div>
    </div>
  )
}
