'use client'

import { useCallback, useEffect, useState } from 'react'
import { RefreshCw } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/stores/auth'
import { IndexedDBManager } from '@/lib/indexeddb-manager'
import { getApiUsersListFunc } from '@/service/identity'
import type {
  PostApiUsersLoginPasswordResultType,
  UserListItemDto,
} from '@/service/identity'
import { formatDate } from '@/lib/utils'

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="text-sm font-medium break-all">{value}</div>
    </div>
  )
}

function PrefBadge({
  label,
  value,
}: {
  label: string
  value: boolean | null | undefined
}) {
  if (value === null || value === undefined) {
    return <Badge variant="outline">{label}：未设置</Badge>
  }
  return (
    <Badge variant={value ? 'default' : 'secondary'}>
      {label}：{value ? '开启' : '关闭'}
    </Badge>
  )
}

export default function ProfilePage() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [account, setAccount] =
    useState<PostApiUsersLoginPasswordResultType | null>(null)
  const [detail, setDetail] = useState<UserListItemDto | null>(null)

  const loadProfile = useCallback(async () => {
    setIsLoading(true)
    try {
      const indexedDB = IndexedDBManager.getInstance()
      const localUser = (await indexedDB.getItem(
        'user'
      )) as PostApiUsersLoginPasswordResultType | null
      setAccount(localUser)

      const email = localUser?.email || user?.email
      if (email) {
        const result = await getApiUsersListFunc({ search: email })
        const matched = result.list.find(item => item.email === email) ?? null
        setDetail(matched)
      }
    } catch (error) {
      console.error('加载个人资料失败:', error)
    } finally {
      setIsLoading(false)
    }
  }, [user?.email])

  useEffect(() => {
    loadProfile()
  }, [loadProfile])

  if (isLoading && !account) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-2 text-sm text-gray-500">正在加载个人资料...</p>
        </div>
      </div>
    )
  }

  const displayName = account?.name || user?.name || '未知用户'
  const email = account?.email || user?.email || '-'
  const preferences = account?.preferences ?? null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">个人资料</h1>
          <p className="text-sm text-muted-foreground">
            查看当前登录账号的详细信息
          </p>
        </div>
        <Button variant="outline" onClick={loadProfile} disabled={isLoading}>
          <RefreshCw className="mr-2 h-4 w-4" />
          {isLoading ? '刷新中...' : '刷新'}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>个人信息</CardTitle>
            <CardDescription>当前登录账号的基础信息</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/assets/avatar.png" alt="默认头像" />
                <AvatarFallback className="text-xl">
                  {displayName.slice(0, 1).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <div className="text-lg font-semibold">{displayName}</div>
                <div className="text-sm text-muted-foreground break-all">
                  {email}
                </div>
                <div className="flex gap-2 pt-1">
                  <Badge
                    variant={account?.emailVerified ? 'default' : 'secondary'}
                  >
                    {account?.emailVerified ? '邮箱已验证' : '邮箱未验证'}
                  </Badge>
                  {detail && (
                    <Badge
                      variant={detail.isActive ? 'default' : 'destructive'}
                    >
                      {detail.isActive ? '账号正常' : '账号已停用'}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <Separator />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoItem
                label="用户 ID"
                value={account?.id ?? user?.id ?? '-'}
              />
              <InfoItem
                label="创建时间"
                value={detail?.createdAt ? formatDate(detail.createdAt) : '-'}
              />
              <InfoItem
                label="最后登录"
                value={
                  detail?.lastLoginAt ? formatDate(detail.lastLoginAt) : '-'
                }
              />
              <InfoItem
                label="登录次数"
                value={detail ? String(detail.loginCount) : '-'}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>偏好设置</CardTitle>
            <CardDescription>账号中保存的偏好信息（只读）</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <InfoItem label="主题" value={preferences?.theme || '未设置'} />
              <InfoItem
                label="语言"
                value={preferences?.language || '未设置'}
              />
              <InfoItem
                label="时区"
                value={preferences?.timezone || '未设置'}
              />
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="text-sm font-medium">通知偏好</div>
              <div className="flex flex-wrap gap-2">
                <PrefBadge
                  label="邮件通知"
                  value={preferences?.notifications?.email ?? null}
                />
                <PrefBadge
                  label="推送通知"
                  value={preferences?.notifications?.push ?? null}
                />
                <PrefBadge
                  label="短信通知"
                  value={preferences?.notifications?.sms ?? null}
                />
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="text-sm font-medium">隐私设置</div>
              <div className="flex flex-wrap gap-2">
                <PrefBadge
                  label="资料可见"
                  value={preferences?.privacy?.profileVisible ?? null}
                />
                <PrefBadge
                  label="展示邮箱"
                  value={preferences?.privacy?.showEmail ?? null}
                />
                <PrefBadge
                  label="展示最后在线时间"
                  value={preferences?.privacy?.showLastSeen ?? null}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
