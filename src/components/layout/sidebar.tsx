"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Home,
  Users,
  Settings,
  BarChart3,
  FileText,
  Shield,
} from "lucide-react"

const menuItems = [
  {
    title: "首页",
    href: "/",
    icon: Home,
  },
  {
    title: "用户管理",
    href: "/users",
    icon: Users,
  },
  {
    title: "数据统计",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "文档管理",
    href: "/documents",
    icon: FileText,
  },
  {
    title: "权限管理",
    href: "/permissions",
    icon: Shield,
  },
  {
    title: "系统设置",
    href: "/settings",
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col bg-background border-r">
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-xl font-semibold">SCX Admin</h1>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.title}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}