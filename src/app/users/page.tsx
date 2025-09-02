'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, Plus, MoreHorizontal } from 'lucide-react'

export default function UsersPage() {
  const users = [
    {
      id: 1,
      name: '张三',
      email: 'zhangsan@example.com',
      role: '管理员',
      status: '活跃',
      lastLogin: '2024-01-15 10:30',
    },
    {
      id: 2,
      name: '李四',
      email: 'lisi@example.com',
      role: '用户',
      status: '活跃',
      lastLogin: '2024-01-14 16:45',
    },
    {
      id: 3,
      name: '王五',
      email: 'wangwu@example.com',
      role: '用户',
      status: '禁用',
      lastLogin: '2024-01-10 09:15',
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">用户管理</h1>
          <p className="text-muted-foreground">管理系统中的所有用户账号</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          添加用户
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>用户列表</CardTitle>
          <CardDescription>
            系统中所有用户的详细信息
          </CardDescription>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索用户..."
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">用户</th>
                  <th className="text-left p-2">角色</th>
                  <th className="text-left p-2">状态</th>
                  <th className="text-left p-2">最后登录</th>
                  <th className="text-left p-2">操作</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b">
                    <td className="p-2">
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {user.email}
                        </div>
                      </div>
                    </td>
                    <td className="p-2">
                      <Badge variant="outline">{user.role}</Badge>
                    </td>
                    <td className="p-2">
                      <Badge 
                        variant={user.status === '活跃' ? 'default' : 'destructive'}
                      >
                        {user.status}
                      </Badge>
                    </td>
                    <td className="p-2 text-sm text-muted-foreground">
                      {user.lastLogin}
                    </td>
                    <td className="p-2">
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}