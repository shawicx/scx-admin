'use client'

import { useEffect, useState } from 'react'
import {
  FileText,
  Send,
  Edit3,
  Eye,
  ThumbsUp,
  MessageSquare,
  TrendingUp,
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getApiBlogAdminStatsOverviewFunc } from '@/service/blog'
import type { BlogOverviewResponseDto } from '@/service/blog'
import { formatDate } from '@/lib/utils'

interface StatItem {
  title: string
  value: number
  icon: React.ReactNode
}

export default function BlogDashboardPage() {
  const [overview, setOverview] = useState<BlogOverviewResponseDto | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const result = await getApiBlogAdminStatsOverviewFunc({})
        setOverview(result)
      } catch (error) {
        console.error('Failed to load blog overview:', error)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-muted-foreground">
        加载中...
      </div>
    )
  }

  if (!overview) {
    return (
      <div className="flex h-64 items-center justify-center text-muted-foreground">
        暂无数据
      </div>
    )
  }

  const stats: StatItem[] = [
    {
      title: '文章总数',
      value: overview.totalPosts,
      icon: <FileText className="h-4 w-4" />,
    },
    {
      title: '已发布',
      value: overview.publishedPosts,
      icon: <Send className="h-4 w-4" />,
    },
    {
      title: '草稿',
      value: overview.draftPosts,
      icon: <Edit3 className="h-4 w-4" />,
    },
    {
      title: '累计阅读',
      value: overview.totalViews,
      icon: <Eye className="h-4 w-4" />,
    },
    {
      title: '今日阅读',
      value: overview.todayViews,
      icon: <TrendingUp className="h-4 w-4" />,
    },
    {
      title: '累计点赞',
      value: overview.totalLikes,
      icon: <ThumbsUp className="h-4 w-4" />,
    },
    {
      title: '待审核评论',
      value: overview.pendingComments,
      icon: <MessageSquare className="h-4 w-4" />,
    },
  ]

  const maxViews = Math.max(...overview.trend7d.map(point => point.views), 1)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
        {stats.map(stat => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>近 7 天阅读趋势</CardTitle>
            <CardDescription>全站每日阅读量</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-48 items-end gap-3">
              {overview.trend7d.map(point => (
                <div
                  key={point.date}
                  className="flex flex-1 flex-col items-center gap-2"
                >
                  <span className="text-xs text-muted-foreground">
                    {point.views}
                  </span>
                  <div
                    className="w-full rounded-t-md bg-primary/80"
                    style={{
                      height: `${Math.max((point.views / maxViews) * 100, 2)}%`,
                    }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {point.date.slice(5)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>最新评论</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {overview.recentComments.length === 0 && (
              <p className="text-sm text-muted-foreground">暂无评论</p>
            )}
            {overview.recentComments.map(comment => (
              <div
                key={comment.id}
                className="space-y-1 border-b pb-3 last:border-0"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {comment.nickname}
                  </span>
                  <Badge
                    variant={
                      comment.status === 1
                        ? 'default'
                        : comment.status === 2
                          ? 'destructive'
                          : 'secondary'
                    }
                  >
                    {comment.status === 0
                      ? '待审核'
                      : comment.status === 1
                        ? '已通过'
                        : '已拒绝'}
                  </Badge>
                </div>
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {comment.contentPreview}
                </p>
                <p className="text-xs text-muted-foreground">
                  {comment.postTitle} · {formatDate(comment.createdAt)}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>最近发布</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {overview.recentPosts.length === 0 && (
              <p className="text-sm text-muted-foreground">暂无文章</p>
            )}
            {overview.recentPosts.map(post => (
              <div
                key={post.id}
                className="flex items-center justify-between rounded-md border px-3 py-2"
              >
                <div className="min-w-0">
                  <span className="block truncate text-sm font-medium">
                    {post.title}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {post.publishedAt ? formatDate(post.publishedAt) : '未发布'}
                  </span>
                </div>
                <div className="flex shrink-0 items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Eye className="h-3.5 w-3.5" />
                    {post.viewCount}
                  </span>
                  <Badge variant={post.status === 1 ? 'default' : 'secondary'}>
                    {post.status === 0
                      ? '草稿'
                      : post.status === 1
                        ? '已发布'
                        : '已归档'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
