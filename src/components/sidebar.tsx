'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { menuItems, type MenuItem } from '@/lib/menu'
import { Button } from '@/components/ui/button'

interface SidebarItemProps {
  item: MenuItem
  level?: number
}

function SidebarItem({ item, level = 0 }: SidebarItemProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const hasChildren = item.children && item.children.length > 0
  const isActive = pathname === item.href || (hasChildren && item.children?.some(child => pathname === child.href))

  return (
    <div>
      <div className={cn('flex items-center', level > 0 && 'ml-4')}>
        {hasChildren ? (
          <Button
            variant="ghost"
            className={cn(
              'w-full justify-start gap-2 h-9',
              isActive && 'bg-accent text-accent-foreground'
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            <item.icon className="h-4 w-4" />
            <span className="flex-1 text-left">{item.title}</span>
            {item.badge && (
              <span className="ml-auto bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded">
                {item.badge}
              </span>
            )}
            {isOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        ) : (
          <Button
            variant="ghost"
            className={cn(
              'w-full justify-start gap-2 h-9',
              isActive && 'bg-accent text-accent-foreground'
            )}
            asChild
          >
            <Link href={item.href}>
              <item.icon className="h-4 w-4" />
              <span className="flex-1 text-left">{item.title}</span>
              {item.badge && (
                <span className="ml-auto bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded">
                  {item.badge}
                </span>
              )}
            </Link>
          </Button>
        )}
      </div>
      {hasChildren && isOpen && (
        <div className="mt-1 space-y-1">
          {item.children?.map((child) => (
            <SidebarItem key={child.id} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

export function Sidebar() {
  return (
    <div className="w-64 border-r bg-background p-4">
      <div className="mb-8">
        <h2 className="text-lg font-semibold">SCX Admin</h2>
      </div>
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <SidebarItem key={item.id} item={item} />
        ))}
      </nav>
    </div>
  )
}