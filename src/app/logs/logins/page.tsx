'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DataTable } from '@/components/table/data-table'
import { LoginLogDetailDialog } from '@/components/logs/login-log-detail-dialog'
import { LOGIN_TYPE_LABELS } from '@/components/logs/login-type-labels'
import { getApiLogsLoginsFunc } from '@/service/identity'
import type { LoginLogResponseDto } from '@/service/identity'
import type { TableColumn } from '@/components/table/types'
import { cn, formatDate } from '@/lib/utils'

const LOGIN_TYPE_OPTIONS = [
  { label: '全部类型', value: 'all' },
  { label: '密码登录', value: 'PASSWORD' },
  { label: '邮箱验证码', value: 'EMAIL_CODE' },
  { label: '登出', value: 'LOGOUT' },
  { label: '刷新令牌', value: 'REFRESH' },
]

const SUCCESS_OPTIONS = [
  { label: '全部结果', value: 'all' },
  { label: '成功', value: 'true' },
  { label: '失败', value: 'false' },
]

export default function LoginLogsPage() {
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [selectedLog, setSelectedLog] = useState<LoginLogResponseDto | null>(
    null
  )

  const handleDetail = (log: LoginLogResponseDto) => {
    setSelectedLog(log)
    setDetailDialogOpen(true)
  }

  const columns: TableColumn<LoginLogResponseDto>[] = [
    {
      key: 'search',
      title: '登录邮箱',
      dataIndex: 'email',
      width: 260,
      searchable: true,
      searchType: 'input',
      searchProps: { placeholder: '邮箱 / IP' },
      render: (value, record) => (
        <div className="min-w-0">
          <div className="truncate" title={value || ''}>
            {value || '-'}
          </div>
          {record.userId && (
            <div className="truncate text-xs text-muted-foreground">
              {record.userId}
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'loginType',
      title: '登录类型',
      dataIndex: 'loginType',
      width: 110,
      searchable: true,
      searchType: 'select',
      searchProps: { options: LOGIN_TYPE_OPTIONS },
      render: value => (
        <Badge variant="outline" className="font-normal">
          {LOGIN_TYPE_LABELS[value] || value}
        </Badge>
      ),
    },
    {
      key: 'success',
      title: '结果',
      dataIndex: 'success',
      width: 90,
      align: 'center',
      searchable: true,
      searchType: 'select',
      searchProps: { options: SUCCESS_OPTIONS },
      render: (value, record) => (
        <Badge
          variant={value ? 'default' : 'destructive'}
          className={cn('font-normal', value && 'bg-emerald-600')}
          title={!value && record.failReason ? record.failReason : undefined}
        >
          {value ? '成功' : '失败'}
        </Badge>
      ),
    },
    {
      key: 'ip',
      title: 'IP',
      dataIndex: 'ip',
      width: 150,
      render: value => value || '-',
    },
    {
      key: 'dateRange',
      title: '时间',
      dataIndex: 'createdAt',
      width: 170,
      sortable: true,
      searchable: true,
      searchType: 'dateRange',
      render: value => formatDate(value),
    },
    {
      key: 'actions',
      title: '操作',
      width: 80,
      align: 'center',
      render: (_, record) => (
        <Button variant="ghost" size="sm" onClick={() => handleDetail(record)}>
          <Eye className="h-4 w-4" />
        </Button>
      ),
    },
  ]

  const loadData = async (params: any) => {
    const { pagination, searchValues, sorter } = params

    const queryParams: any = {
      page: String(pagination.current),
      limit: String(pagination.pageSize),
    }

    if (searchValues.search) {
      queryParams.search = searchValues.search
    }

    if (
      searchValues.loginType !== undefined &&
      searchValues.loginType !== '' &&
      searchValues.loginType !== 'all'
    ) {
      queryParams.loginType = searchValues.loginType
    }

    if (
      searchValues.success !== undefined &&
      searchValues.success !== '' &&
      searchValues.success !== 'all'
    ) {
      queryParams.success = searchValues.success
    }

    if (searchValues.dateRange?.from) {
      queryParams.startTime = format(
        searchValues.dateRange.from,
        'yyyy-MM-dd 00:00:00'
      )
    }
    if (searchValues.dateRange?.to) {
      queryParams.endTime = format(
        searchValues.dateRange.to,
        'yyyy-MM-dd 23:59:59'
      )
    }

    if (sorter?.field) {
      queryParams.sortBy = sorter.field
      queryParams.sortOrder = sorter.order === 'asc' ? 'ASC' : 'DESC'
    }

    const result = await getApiLogsLoginsFunc(queryParams)

    return {
      data: result.list,
      total: result.total,
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">登录日志</h1>
        <p className="text-muted-foreground">
          查看系统中的所有登录记录，包含登录类型与失败原因
        </p>
      </div>

      <DataTable
        columns={columns}
        loadData={loadData}
        pagination={{
          current: 1,
          pageSize: 20,
          total: 0,
          pageSizeOptions: [10, 20, 50, 100],
          showSizeChanger: true,
          showQuickJumper: true,
        }}
        rowKey="id"
        autoLoad={true}
      />

      <LoginLogDetailDialog
        open={detailDialogOpen}
        onOpenChange={setDetailDialogOpen}
        log={selectedLog}
      />
    </div>
  )
}
