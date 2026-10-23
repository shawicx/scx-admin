'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
  Plus,
  MoreVertical,
  Send,
  Undo2,
  Archive,
  Trash2,
  Pencil,
  Eye,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DataTable } from '@/components/table/data-table'
import { ConfirmDialog } from '@/components/blog/confirm-dialog'
import { HasPermission } from '@/components/has-permission'
import {
  getApiBlogAdminPostsFunc,
  postApiBlogAdminPostsPublishByIdFunc,
  postApiBlogAdminPostsWithdrawByIdFunc,
  postApiBlogAdminPostsArchiveByIdFunc,
  postApiBlogAdminPostsTopByIdFunc,
  deleteApiBlogAdminPostsByIdFunc,
} from '@/service/blog'
import type { PostAdminListItemDto } from '@/service/blog'
import type { TableColumn } from '@/components/table/types'
import { formatDate } from '@/lib/utils'
import { toast } from '@/components/ui/use-toast'

const STATUS_LABELS: Record<number, string> = {
  0: '草稿',
  1: '已发布',
  2: '已归档',
}

export default function BlogPostsPage() {
  const router = useRouter()
  const [deleteTarget, setDeleteTarget] = useState<PostAdminListItemDto | null>(
    null
  )
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleRefresh = useCallback(() => {
    setRefreshTrigger(prev => prev + 1)
  }, [])

  const runAction = async (
    action: () => Promise<unknown>,
    fallbackMessage = '操作失败'
  ) => {
    try {
      await action()
      handleRefresh()
    } catch (error) {
      console.error(fallbackMessage, error)
    }
  }

  const columns: TableColumn<PostAdminListItemDto>[] = [
    {
      key: 'title',
      title: '标题',
      dataIndex: 'title',
      width: 260,
      searchable: true,
      searchType: 'input',
      searchProps: { placeholder: '搜索标题/slug' },
      render: (_, record) => (
        <div>
          <div className="font-medium">{record.title}</div>
          <div className="text-sm text-muted-foreground">/{record.slug}</div>
        </div>
      ),
    },
    {
      key: 'category',
      title: '分类',
      dataIndex: 'category',
      width: 110,
      render: value => (value ? value.name : '未分类'),
    },
    {
      key: 'tags',
      title: '标签',
      dataIndex: 'tags',
      width: 180,
      render: (_, record) => (
        <div className="flex flex-wrap gap-1">
          {record.tags.map(tag => (
            <Badge key={tag.id} variant="secondary">
              {tag.name}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      key: 'status',
      title: '状态',
      dataIndex: 'status',
      width: 100,
      align: 'center',
      searchable: true,
      searchType: 'select',
      searchProps: {
        options: [
          { label: '全部状态', value: 'all' },
          { label: '草稿', value: '0' },
          { label: '已发布', value: '1' },
          { label: '已归档', value: '2' },
        ],
      },
      render: (_, record) => (
        <div className="flex flex-col items-center gap-1">
          <Badge variant={record.status === 1 ? 'default' : 'secondary'}>
            {STATUS_LABELS[record.status]}
          </Badge>
          {record.visibility === 1 && <Badge variant="outline">私密</Badge>}
          {record.isTop && <Badge variant="outline">置顶</Badge>}
        </div>
      ),
    },
    {
      key: 'publishedAt',
      title: '发布时间',
      dataIndex: 'publishedAt',
      width: 170,
      sortable: true,
      render: value => (value ? formatDate(value) : '-'),
    },
    {
      key: 'viewCount',
      title: '阅读',
      dataIndex: 'viewCount',
      width: 80,
      align: 'center',
    },
    {
      key: 'likeCount',
      title: '点赞',
      dataIndex: 'likeCount',
      width: 80,
      align: 'center',
    },
    {
      key: 'commentCount',
      title: '评论',
      dataIndex: 'commentCount',
      width: 80,
      align: 'center',
    },
    {
      key: 'createdAt',
      title: '创建时间',
      dataIndex: 'createdAt',
      width: 170,
      sortable: true,
      render: value => formatDate(value),
    },
    {
      key: 'actions',
      title: '操作',
      width: 100,
      align: 'center',
      render: (_, record) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => router.push(`/blog/posts/${record.id}/edit`)}
            >
              <Pencil className="mr-2 h-4 w-4" />
              编辑
            </DropdownMenuItem>
            <HasPermission resource="blog-post" action="publish">
              {record.status === 1 ? (
                <DropdownMenuItem
                  onClick={() =>
                    runAction(() =>
                      postApiBlogAdminPostsWithdrawByIdFunc({ id: record.id })
                    )
                  }
                >
                  <Undo2 className="mr-2 h-4 w-4" />
                  撤回发布
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  onClick={() =>
                    runAction(() =>
                      postApiBlogAdminPostsPublishByIdFunc({ id: record.id })
                    )
                  }
                >
                  <Send className="mr-2 h-4 w-4" />
                  发布
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                onClick={() =>
                  runAction(() =>
                    postApiBlogAdminPostsArchiveByIdFunc({ id: record.id })
                  )
                }
              >
                <Archive className="mr-2 h-4 w-4" />
                归档
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  runAction(() =>
                    postApiBlogAdminPostsTopByIdFunc({
                      id: record.id,
                      isTop: !record.isTop,
                    })
                  )
                }
              >
                <Eye className="mr-2 h-4 w-4" />
                {record.isTop ? '取消置顶' : '设为置顶'}
              </DropdownMenuItem>
            </HasPermission>
            <HasPermission resource="blog-post" action="delete">
              <DropdownMenuItem
                onClick={() => setDeleteTarget(record)}
                className="text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                删除
              </DropdownMenuItem>
            </HasPermission>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  const loadData = async (params: any) => {
    const { pagination, searchValues, sorter } = params

    const queryParams: any = {
      page: String(pagination.current),
      limit: String(pagination.pageSize),
    }

    if (searchValues.title) {
      queryParams.search = searchValues.title
    }
    if (
      searchValues.status !== undefined &&
      searchValues.status !== '' &&
      searchValues.status !== 'all'
    ) {
      queryParams.status = searchValues.status
    }
    if (sorter?.field) {
      queryParams.sortBy = sorter.field
      queryParams.sortOrder = sorter.order
    }

    const result = await getApiBlogAdminPostsFunc(queryParams)

    return {
      data: result.list,
      total: result.total,
    }
  }

  return (
    <div className="space-y-6">
      <DataTable
        columns={columns}
        loadData={loadData}
        pagination={{
          current: 1,
          pageSize: 10,
          total: 0,
          pageSizeOptions: [10, 20, 50, 100],
          showSizeChanger: true,
          showQuickJumper: true,
        }}
        rowKey="id"
        autoLoad={true}
        key={refreshTrigger}
        headerConfig={{
          actions: (
            <HasPermission resource="blog-post" action="create">
              <Button onClick={() => router.push('/blog/posts/new')}>
                <Plus className="mr-2 h-4 w-4" />
                新建文章
              </Button>
            </HasPermission>
          ),
        }}
      />

      <ConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={open => {
          if (!open) setDeleteTarget(null)
        }}
        title="删除文章"
        description={`确定删除文章「${deleteTarget?.title ?? ''}」吗？删除后公开页面将不再可见。`}
        confirmText="删除"
        destructive
        onConfirm={async () => {
          if (!deleteTarget) return
          await deleteApiBlogAdminPostsByIdFunc({ id: deleteTarget.id })
          toast({ title: '成功', description: '文章已删除' })
        }}
        onSuccess={handleRefresh}
      />
    </div>
  )
}
