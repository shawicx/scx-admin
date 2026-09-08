'use client'

/**
 * @description 侧边栏导航：固定菜单项 + 后端动态菜单（usePermissionStore 驱动），
 * 含菜单加载中 / 加载失败重试 / 就绪三种渲染分支
 */
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { FIXED_MENU_ITEMS, toMenuItems, MenuItem } from '@/lib/menu'
import { usePermissionStore } from '@/stores/permission'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronRight } from 'lucide-react'

interface MenuItemComponentProps {
  item: MenuItem
  pathname: string
  level?: number
}

function MenuItemComponent({
  item,
  pathname,
  level = 0,
}: MenuItemComponentProps) {
  const [isExpanded, setIsExpanded] = useState(
    item.children
      ? item.children.some(
          child => child.href !== '' && pathname.startsWith(child.href)
        )
      : false
  )
  const Icon = item.icon
  const hasChildren = item.children && item.children.length > 0
  const isLeafLink = !hasChildren && item.href !== ''
  const isActive = pathname === item.href
  const isParentActive =
    hasChildren && item.children?.some(child => pathname === child.href)

  const handleClick = (e: React.MouseEvent) => {
    if (hasChildren) {
      e.preventDefault()
      setIsExpanded(!isExpanded)
    }
  }

  return (
    <div>
      {isLeafLink ? (
        <Link
          href={item.href}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
            level === 0 ? 'text-sm font-semibold' : 'text-sm ml-4',
            isActive
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
          )}
        >
          <Icon className="h-4 w-4" />
          <span className="flex-1">{item.title}</span>
        </Link>
      ) : !hasChildren ? (
        // 无路由且无子项的叶子：不可点击占位，避免 Link href="" 跳回当前页
        <div
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground',
            level === 0 ? 'text-sm font-semibold' : 'text-sm ml-4'
          )}
        >
          <Icon className="h-4 w-4" />
          <span className="flex-1">{item.title}</span>
        </div>
      ) : (
        <div
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors cursor-pointer',
            level === 0 ? 'text-sm font-semibold' : 'text-sm ml-4',
            isParentActive
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
          )}
          onClick={handleClick}
        >
          <Icon className="h-4 w-4" />
          <span className="flex-1">{item.title}</span>
          <div className="ml-auto">
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </div>
        </div>
      )}

      {/* 递归渲染子项：MenuItemComponent 的 level 样式自带缩进（ml-4），容器嵌套容器也正确 */}
      {hasChildren && isExpanded && (
        <div className="mt-1 space-y-1">
          {item.children?.map(child => (
            <MenuItemComponent
              key={child.id}
              item={child}
              pathname={pathname}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function Sidebar() {
  const pathname = usePathname()
  const { menus, status, fetchPermissions } = usePermissionStore()

  const items = [...FIXED_MENU_ITEMS, ...toMenuItems(menus)]

  return (
    <div className="flex h-full w-64 flex-col bg-background border-r">
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-xl font-semibold">SCX Admin</h1>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {status === 'loading' && (
          <>
            {/* 加载中仍渲染固定导航项，避免侧边栏闪空 */}
            {FIXED_MENU_ITEMS.map(item => (
              <MenuItemComponent
                key={item.id}
                item={item}
                pathname={pathname}
              />
            ))}
            <div className="flex items-center justify-center py-8 text-sm text-muted-foreground">
              菜单加载中...
            </div>
          </>
        )}
        {status === 'error' && (
          <div className="flex flex-col items-center gap-2 py-8 text-sm text-muted-foreground">
            <span>菜单加载失败</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => void fetchPermissions()}
            >
              重试
            </Button>
          </div>
        )}
        {(status === 'ready' || status === 'idle') &&
          items.map(item => (
            <MenuItemComponent key={item.id} item={item} pathname={pathname} />
          ))}
      </nav>
    </div>
  )
}
