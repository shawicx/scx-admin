'use client'

/**
 * @description AI 对话会话侧边栏：新建对话、会话列表切换、重命名/删除（每项下拉菜单）、清空全部会话
 */
import { MoreHorizontal, Pencil, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import type { SessionResponseDto } from '@/service/ai'

interface SessionSidebarProps {
  sessions: SessionResponseDto[]
  currentSessionId: string | null
  disabled?: boolean
  onSelect: (id: string) => void
  onNew: () => void
  onRename: (session: SessionResponseDto) => void
  onDelete: (session: SessionResponseDto) => void
  onClearAll: () => void
}

/**
 * @description 会话侧边栏渲染（列表按最后活跃倒序，由父组件保证顺序）
 * @param props 会话列表、当前选中与操作回调
 */
export function SessionSidebar({
  sessions,
  currentSessionId,
  disabled,
  onSelect,
  onNew,
  onRename,
  onDelete,
  onClearAll,
}: SessionSidebarProps) {
  return (
    <div className="hidden w-64 shrink-0 flex-col rounded-lg border bg-card md:flex">
      <div className="border-b p-3">
        <Button
          size="sm"
          className="w-full"
          onClick={onNew}
          disabled={disabled}
        >
          <Plus className="mr-2 h-4 w-4" />
          新建对话
        </Button>
      </div>
      <div className="flex-1 space-y-1 overflow-y-auto p-2">
        {sessions.length === 0 ? (
          <p className="px-2 py-4 text-center text-xs text-muted-foreground">
            暂无历史会话
          </p>
        ) : (
          sessions.map(session => (
            <div
              key={session.id}
              role="button"
              tabIndex={0}
              onClick={() => onSelect(session.id)}
              onKeyDown={event => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  onSelect(session.id)
                }
              }}
              className={cn(
                'group flex cursor-pointer items-center gap-1 rounded-md px-2 py-1.5 text-sm hover:bg-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
                currentSessionId === session.id && 'bg-accent'
              )}
            >
              <div className="min-w-0 flex-1 truncate" title={session.title}>
                {session.title}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 shrink-0 opacity-0 focus-visible:opacity-100 group-hover:opacity-100"
                    onClick={event => event.stopPropagation()}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onRename(session)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    重命名
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-600 focus:text-red-600"
                    onClick={() => onDelete(session)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    删除会话
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))
        )}
      </div>
      <div className="border-t p-3">
        <Button
          variant="ghost"
          size="sm"
          className="w-full text-muted-foreground hover:text-red-600"
          onClick={onClearAll}
          disabled={disabled || sessions.length === 0}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          清空全部会话
        </Button>
      </div>
    </div>
  )
}
