'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3, Users, TrendingUp, Activity } from 'lucide-react'

export default function HomePage() {
  const stats = [
    {
      title: '总用户数',
      value: '2,543',
      description: '比上月增长 12%',
      icon: Users,
      trend: '+12%',
    },
    {
      title: '活跃用户',
      value: '1,234',
      description: '本月活跃用户',
      icon: Activity,
      trend: '+8%',
    },
    {
      title: '总收入',
      value: '¥45,231',
      description: '比上月增长 23%',
      icon: TrendingUp,
      trend: '+23%',
    },
    {
      title: '转化率',
      value: '12.5%',
      description: '比上月提升 2.1%',
      icon: BarChart3,
      trend: '+2.1%',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">仪表板</h1>
        <p className="text-muted-foreground">欢迎回来！这里是您的数据概览。</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
              <div className="mt-2">
                <span className="text-xs text-green-600 font-medium">
                  {stat.trend}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>最近活动</CardTitle>
            <CardDescription>
              您的最新系统活动记录
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">用户登录</p>
                  <p className="text-xs text-muted-foreground">2分钟前</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">数据同步完成</p>
                  <p className="text-xs text-muted-foreground">5分钟前</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">系统更新</p>
                  <p className="text-xs text-muted-foreground">1小时前</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>快速操作</CardTitle>
            <CardDescription>
              常用功能快速入口
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <button className="flex items-center justify-start space-x-2 p-2 rounded-md hover:bg-accent text-left">
                <Users className="h-4 w-4" />
                <span className="text-sm">用户管理</span>
              </button>
              <button className="flex items-center justify-start space-x-2 p-2 rounded-md hover:bg-accent text-left">
                <BarChart3 className="h-4 w-4" />
                <span className="text-sm">数据分析</span>
              </button>
              <button className="flex items-center justify-start space-x-2 p-2 rounded-md hover:bg-accent text-left">
                <Activity className="h-4 w-4" />
                <span className="text-sm">系统监控</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}