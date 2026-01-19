'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">系统设置</h1>
        <p className="text-muted-foreground">管理您的系统配置和偏好设置</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>基本设置</CardTitle>
            <CardDescription>配置系统的基本信息和参数</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="site-name">站点名称</Label>
              <Input
                id="site-name"
                placeholder="请输入站点名称"
                defaultValue="SCX Admin"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="site-description">站点描述</Label>
              <Input
                id="site-description"
                placeholder="请输入站点描述"
                defaultValue="现代化的管理后台系统"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="admin-email">管理员邮箱</Label>
              <Input
                id="admin-email"
                type="email"
                placeholder="请输入管理员邮箱"
                defaultValue="admin@example.com"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>功能设置</CardTitle>
            <CardDescription>启用或禁用系统功能</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>用户注册</Label>
                <p className="text-sm text-muted-foreground">
                  允许新用户注册账号
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>邮件通知</Label>
                <p className="text-sm text-muted-foreground">
                  发送系统通知邮件
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>数据分析</Label>
                <p className="text-sm text-muted-foreground">
                  收集用户行为数据用于分析
                </p>
              </div>
              <Switch />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>维护模式</Label>
                <p className="text-sm text-muted-foreground">
                  启用后普通用户无法访问系统
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>安全设置</CardTitle>
            <CardDescription>配置系统安全相关参数</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="session-timeout">会话超时时间（分钟）</Label>
              <Input
                id="session-timeout"
                type="number"
                placeholder="30"
                defaultValue="30"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="max-login-attempts">最大登录尝试次数</Label>
              <Input
                id="max-login-attempts"
                type="number"
                placeholder="5"
                defaultValue="5"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password-min-length">密码最小长度</Label>
              <Input
                id="password-min-length"
                type="number"
                placeholder="6"
                defaultValue="6"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-2">
          <Button variant="outline">重置</Button>
          <Button>保存设置</Button>
        </div>
      </div>
    </div>
  )
}
