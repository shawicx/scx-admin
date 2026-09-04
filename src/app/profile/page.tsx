'use client'

import { useCallback, useEffect, useState } from 'react'
import { Pencil, RefreshCw } from 'lucide-react'
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
import { ProfileEditForm } from '@/components/user/profile-edit-form'
import { useAuth } from '@/stores/auth'
import { IndexedDBManager } from '@/lib/indexeddb-manager'
import { getApiUsersListFunc } from '@/service/identity'
import type {
  PostApiUsersLoginPasswordResultType,
  UserListItemDto,
} from '@/service/identity'
import { formatDate } from '@/lib/utils'

interface LocalAccount extends PostApiUsersLoginPasswordResultType {
  avatar?: string | null
}

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
  const [isEditing, setIsEditing] = useState(false)
  const [account, setAccount] = useState<LocalAccount | null>(null)
  const [detail, setDetail] = useState<UserListItemDto | null>(null)

  const loadProfile = useCallback(async () => {
    setIsLoading(true)
    try {
      const indexedDB = IndexedDBManager.getInstance()
      const localUser = await indexedDB.getItem<LocalAccount>('user')
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

  const handleProfileSaved = useCallback(
    async (profile: { name: string; avatar: string | null }) => {
      setIsEditing(false)
      try {
        const indexedDB = IndexedDBManager.getInstance()
        const localUser = await indexedDB.getItem<LocalAccount>('user')
        if (localUser) {
          const updated: LocalAccount = { ...localUser, ...profile }
          await indexedDB.setItem('user', updated)
          setAccount(updated)
        }
        useAuth.setState(state => ({
          user: {
            id: state.user?.id ?? localUser?.id ?? '',
            email: state.user?.email ?? localUser?.email ?? '',
            name: profile.name,
            avatar: profile.avatar || undefined,
          },
        }))
        await loadProfile()
      } catch (error) {
        console.error('同步本地用户数据失败:', error)
      }
    },
    [loadProfile]
  )

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
  const avatarUrl = account?.avatar || user?.avatar || null
  const preferences = account?.preferences ?? null

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {isEditing ? (
          <Card>
            <CardHeader>
              <CardTitle>编辑个人信息</CardTitle>
              <CardDescription>修改头像和用户名称</CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileEditForm
                defaultName={account?.name || user?.name || ''}
                email={email}
                currentAvatar={avatarUrl}
                onCancel={() => setIsEditing(false)}
                onSaved={handleProfileSaved}
              />
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <div className="space-y-1.5">
                <CardTitle>个人信息</CardTitle>
                <CardDescription>当前登录账号的基础信息</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  编辑
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={loadProfile}
                  disabled={isLoading}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  {isLoading ? '刷新中...' : '刷新'}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={avatarUrl || '/assets/avatar.png'}
                    alt="用户头像"
                  />
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
        )}

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
