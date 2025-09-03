'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { menuItems, MenuItem } from '@/lib/menu'
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
      ? item.children.some(child => pathname.startsWith(child.href))
      : false
  )
  const Icon = item.icon
  const hasChildren = item.children && item.children.length > 0
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
      {!hasChildren ? (
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
          {item.badge && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
              {item.badge}
            </span>
          )}
        </Link>
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
          {item.badge && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
              {item.badge}
            </span>
          )}
          <div className="ml-auto">
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </div>
        </div>
      )}

      {/* Render children if expanded */}
      {hasChildren && isExpanded && (
        <div className="ml-4 mt-1 space-y-1">
          {item.children?.map(child => (
            <Link
              key={child.href}
              href={child.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground',
                pathname === child.href
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground'
              )}
            >
              <child.icon className="h-4 w-4" />
              {child.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col bg-background border-r">
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-xl font-semibold">SCX Admin</h1>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {menuItems.map(item => (
          <MenuItemComponent key={item.id} item={item} pathname={pathname} />
        ))}
      </nav>
    </div>
  )
}
