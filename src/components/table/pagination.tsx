'use client'

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import type { PaginationConfig } from './types'

interface PaginationProps {
  pagination: PaginationConfig
  onChange: (page: number, pageSize: number) => void
  className?: string
}

export function Pagination({
  pagination,
  onChange,
  className,
}: PaginationProps) {
  const {
    current,
    pageSize,
    total,
    showSizeChanger = true,
    showQuickJumper = true,
    showTotal = true,
    pageSizeOptions = [10, 20, 50, 100],
  } = pagination

  const totalPages = Math.ceil(total / pageSize)
  const startItem = (current - 1) * pageSize + 1
  const endItem = Math.min(current * pageSize, total)

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== current) {
      onChange(page, pageSize)
    }
  }

  const handlePageSizeChange = (newPageSize: string) => {
    const size = parseInt(newPageSize)
    const newPage = Math.min(current, Math.ceil(total / size))
    onChange(newPage, size)
  }

  const handleQuickJump = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const page = parseInt((e.target as HTMLInputElement).value)
      if (page && page >= 1 && page <= totalPages) {
        handlePageChange(page)
        ;(e.target as HTMLInputElement).value = ''
      }
    }
  }

  // 生成页码按钮
  const generatePageNumbers = () => {
    const pages: (number | string)[] = []
    const showPages = 5 // 显示的页码数量

    if (totalPages <= showPages) {
      // 总页数少于等于显示页数，显示所有页码
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // 总页数多于显示页数，需要省略
      const half = Math.floor(showPages / 2)
      let start = Math.max(1, current - half)
      let end = Math.min(totalPages, start + showPages - 1)

      if (end - start < showPages - 1) {
        start = Math.max(1, end - showPages + 1)
      }

      if (start > 1) {
        pages.push(1)
        if (start > 2) {
          pages.push('...')
        }
      }

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (end < totalPages) {
        if (end < totalPages - 1) {
          pages.push('...')
        }
        pages.push(totalPages)
      }
    }

    return pages
  }

  if (total === 0) {
    return null
  }

  return (
    <div className={cn('flex items-center justify-between mt-4', className)}>
      {/* 左侧：总数信息 */}
      <div className="flex items-center gap-4">
        {showTotal && (
          <span className="text-sm text-muted-foreground">
            共 {total} 条，显示第 {startItem}-{endItem} 条
          </span>
        )}

        {showSizeChanger && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">每页</span>
            <Select
              value={String(pageSize)}
              onValueChange={handlePageSizeChange}
            >
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {pageSizeOptions.map(size => (
                  <SelectItem key={size} value={String(size)}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground">条</span>
          </div>
        )}
      </div>

      {/* 右侧：分页控件 */}
      <div className="flex items-center gap-2">
        {/* 快速跳转 */}
        {showQuickJumper && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">跳至</span>
            <Input
              className="w-16 text-center"
              placeholder=""
              onKeyDown={handleQuickJump}
            />
            <span className="text-sm text-muted-foreground">页</span>
          </div>
        )}

        {/* 分页按钮 */}
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(1)}
            disabled={current === 1}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(current - 1)}
            disabled={current === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {generatePageNumbers().map((page, index) => (
            <Button
              key={index}
              variant={page === current ? 'default' : 'outline'}
              size="sm"
              onClick={() => typeof page === 'number' && handlePageChange(page)}
              disabled={typeof page === 'string'}
              className="min-w-[32px]"
            >
              {page}
            </Button>
          ))}

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(current + 1)}
            disabled={current === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(totalPages)}
            disabled={current === totalPages}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
