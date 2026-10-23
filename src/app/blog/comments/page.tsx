'use client'

import { useState, useCallback } from 'react'
import { Check, X, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DataTable } from '@/components/table/data-table'
import { ConfirmDialog } from '@/components/blog/confirm-dialog'
import { HasPermission } from '@/components/has-permission'
import {
  getApiBlogAdminCommentsFunc,
  postApiBlogAdminCommentsApproveByIdFunc,
  postApiBlogAdminCommentsRejectByIdFunc,
  deleteApiBlogAdminCommentsByIdFunc,
} from '@/service/blog'
import type { CommentAdminListItemDto } from '@/service/blog'
import type { TableColumn } from '@/components/table/types'
import { formatDate } from '@/lib/utils'
import { toast } from '@/components/ui/use-toast'

const STATUS_LABELS: Record<
  number,
  { label: string; variant: 'default' | 'secondary' | 'destructive' }
> = {
  0: { label: '待审核', variant: 'secondary' },
  1: { label: '已通过', variant: 'default' },
  2: { label: '已拒绝', variant: 'destructive' },
}

export default function BlogCommentsPage() {
  const [deleteTarget, setDeleteTarget] =
    useState<CommentAdminListItemDto | null>(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleRefresh = useCallback(() => {
    setRefreshTrigger(prev => prev + 1)
  }, [])

  const runAction = async (
    action: () => Promise<unknown>,
    successMessage: string
  ) => {
    try {
      await action()
      toast({ title: '成功', description: successMessage })
      handleRefresh()
    } catch (error) {
      console.error('Comment action failed:', error)
    }
  }

  const columns: TableColumn<CommentAdminListItemDto>[] = [
    {
      key: 'nickname',
      title: '访客',
      dataIndex: 'nickname',
      width: 140,
      searchable: true,
      searchType: 'input',
      searchProps: { placeholder: '搜索昵称/内容' },
      render: (_, record) => (
        <div>
          <div className="font-medium">{record.nickname}</div>
          {record.email && (
            <div className="text-sm text-muted-foreground">{record.email}</div>
          )}
        </div>
      ),
    },
    {
      key: 'content',
      title: '评论内容',
      dataIndex: 'content',
      render: value => (
        <div className="max-w-[360px] whitespace-pre-wrap break-words text-sm">
          {value}
        </div>
      ),
    },
    {
      key: 'postTitle',
      title: '所属文章',
      dataIndex: 'postTitle',
      width: 180,
      render: value => (
        <span className="line-clamp-2 text-sm">{value || '-'}</span>
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
          { label: '待审核', value: '0' },
          { label: '已通过', value: '1' },
          { label: '已拒绝', value: '2' },
        ],
      },
      render: value => {
        const status = STATUS_LABELS[value] ?? STATUS_LABELS[0]
        return <Badge variant={status.variant}>{status.label}</Badge>
      },
    },
    {
      key: 'createdAt',
      title: '提交时间',
      dataIndex: 'createdAt',
      width: 170,
      sortable: true,
      render: value => formatDate(value),
    },
    {
      key: 'actions',
      title: '操作',
      width: 130,
      align: 'center',
      render: (_, record) => (
        <div className="flex justify-center gap-1">
          <HasPermission resource="blog-comment" action="audit">
            {record.status !== 1 && (
              <Button
                variant="ghost"
                size="sm"
                title="审核通过"
                onClick={() =>
                  runAction(
                    () =>
                      postApiBlogAdminCommentsApproveByIdFunc({
                        id: record.id,
                      }),
                    '评论已通过'
                  )
                }
              >
                <Check className="h-4 w-4 text-green-600" />
              </Button>
            )}
            {record.status !== 2 && (
              <Button
                variant="ghost"
                size="sm"
                title="拒绝"
                onClick={() =>
                  runAction(
                    () =>
                      postApiBlogAdminCommentsRejectByIdFunc({ id: record.id }),
                    '评论已拒绝'
                  )
                }
              >
                <X className="h-4 w-4 text-orange-600" />
              </Button>
            )}
          </HasPermission>
          <HasPermission resource="blog-comment" action="delete">
            <Button
              variant="ghost"
              size="sm"
              title="删除"
              onClick={() => setDeleteTarget(record)}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </HasPermission>
        </div>
      ),
    },
  ]

  const loadData = async (params: any) => {
    const { pagination, searchValues, sorter } = params

    const queryParams: any = {
      page: String(pagination.current),
      limit: String(pagination.pageSize),
    }

    if (searchValues.nickname) {
      queryParams.search = searchValues.nickname
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

    const result = await getApiBlogAdminCommentsFunc(queryParams)

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
      />

      <ConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={open => {
          if (!open) setDeleteTarget(null)
        }}
        title="删除评论"
        description={`确定删除「${deleteTarget?.nickname ?? ''}」的评论吗？删除后前台将不再展示。`}
        confirmText="删除"
        destructive
        onConfirm={async () => {
          if (!deleteTarget) return
          await deleteApiBlogAdminCommentsByIdFunc({ id: deleteTarget.id })
          toast({ title: '成功', description: '评论已删除' })
        }}
        onSuccess={handleRefresh}
      />
    </div>
  )
}
