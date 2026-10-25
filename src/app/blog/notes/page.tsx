'use client'

import { useState, useCallback } from 'react'
import {
  Plus,
  MoreVertical,
  Send,
  Undo2,
  Archive,
  Trash2,
  Pencil,
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
import { CreateNoteDialog } from '@/components/blog/create-note-dialog'
import { EditNoteDialog } from '@/components/blog/edit-note-dialog'
import { HasPermission } from '@/components/has-permission'
import {
  getApiBlogAdminNotesFunc,
  postApiBlogAdminNotesPublishByIdFunc,
  postApiBlogAdminNotesWithdrawByIdFunc,
  postApiBlogAdminNotesArchiveByIdFunc,
  deleteApiBlogAdminNotesByIdFunc,
} from '@/service/blog'
import type { NoteAdminDto } from '@/service/blog'
import type { TableColumn } from '@/components/table/types'
import { formatDate } from '@/lib/utils'
import { toast } from '@/components/ui/use-toast'

const STATUS_LABELS: Record<number, string> = {
  0: '草稿',
  1: '已发布',
  2: '已归档',
}

/** 内容摘要：折叠换行并截断至 80 字符 */
function summarize(content: string): string {
  const flat = content.replace(/\s+/g, ' ').trim()
  return flat.length > 80 ? `${flat.slice(0, 80)}…` : flat
}

/**
 * @description 随笔管理页：分页列表 + 状态筛选 + 发布/撤回/归档/编辑/删除
 */
export default function BlogNotesPage() {
  const [createOpen, setCreateOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<NoteAdminDto | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<NoteAdminDto | null>(null)
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

  const columns: TableColumn<NoteAdminDto>[] = [
    {
      key: 'content',
      title: '内容',
      dataIndex: 'content',
      render: (_, record) => (
        <div
          className="max-w-[480px] cursor-default truncate text-muted-foreground"
          title={record.content}
        >
          {summarize(record.content)}
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
        <Badge variant={record.status === 1 ? 'default' : 'secondary'}>
          {STATUS_LABELS[record.status]}
        </Badge>
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
            <HasPermission resource="blog-note" action="update">
              <DropdownMenuItem onClick={() => setEditTarget(record)}>
                <Pencil className="mr-2 h-4 w-4" />
                编辑
              </DropdownMenuItem>
            </HasPermission>
            <HasPermission resource="blog-note" action="publish">
              {record.status === 1 ? (
                <DropdownMenuItem
                  onClick={() =>
                    runAction(() =>
                      postApiBlogAdminNotesWithdrawByIdFunc({ id: record.id })
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
                      postApiBlogAdminNotesPublishByIdFunc({ id: record.id })
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
                    postApiBlogAdminNotesArchiveByIdFunc({ id: record.id })
                  )
                }
              >
                <Archive className="mr-2 h-4 w-4" />
                归档
              </DropdownMenuItem>
            </HasPermission>
            <HasPermission resource="blog-note" action="delete">
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

    const result = await getApiBlogAdminNotesFunc(queryParams)

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
            <HasPermission resource="blog-note" action="create">
              <Button onClick={() => setCreateOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                新建随笔
              </Button>
            </HasPermission>
          ),
        }}
      />

      <CreateNoteDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSuccess={handleRefresh}
      />

      <EditNoteDialog
        open={editTarget !== null}
        onOpenChange={open => {
          if (!open) setEditTarget(null)
        }}
        note={editTarget}
        onSuccess={handleRefresh}
      />

      <ConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={open => {
          if (!open) setDeleteTarget(null)
        }}
        title="删除随笔"
        description={`确定删除这条随笔吗？「${summarize(deleteTarget?.content ?? '')}」删除后不可恢复。`}
        confirmText="删除"
        destructive
        onConfirm={async () => {
          if (!deleteTarget) return
          await deleteApiBlogAdminNotesByIdFunc({ id: deleteTarget.id })
          toast({ title: '成功', description: '随笔已删除' })
        }}
        onSuccess={handleRefresh}
      />
    </div>
  )
}
