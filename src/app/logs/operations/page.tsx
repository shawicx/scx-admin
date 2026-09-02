'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DataTable } from '@/components/table/data-table'
import { OperationLogDetailDialog } from '@/components/logs/operation-log-detail-dialog'
import { getApiLogsOperationsFunc } from '@/service/identity'
import type { OperationLogResponseDto } from '@/service/identity'
import type { TableColumn } from '@/components/table/types'
import { cn, formatDate } from '@/lib/utils'

const SUCCESS_OPTIONS = [
  { label: '全部结果', value: 'all' },
  { label: '成功', value: 'true' },
  { label: '失败', value: 'false' },
]

export default function OperationLogsPage() {
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [selectedLog, setSelectedLog] =
    useState<OperationLogResponseDto | null>(null)

  const handleDetail = (log: OperationLogResponseDto) => {
    setSelectedLog(log)
    setDetailDialogOpen(true)
  }

  const columns: TableColumn<OperationLogResponseDto>[] = [
    {
      key: 'search',
      title: '操作人',
      dataIndex: 'userEmail',
      width: 220,
      searchable: true,
      searchType: 'input',
      searchProps: { placeholder: '模块/动作/操作人/URI' },
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
      key: 'module',
      title: '模块',
      dataIndex: 'module',
      width: 110,
      render: value => (
        <Badge variant="outline" className="font-normal">
          {value}
        </Badge>
      ),
    },
    {
      key: 'action',
      title: '动作',
      dataIndex: 'action',
      width: 130,
      render: value => (
        <span className="truncate" title={value}>
          {value}
        </span>
      ),
    },
    {
      key: 'uri',
      title: '请求',
      width: 240,
      render: (_, record) => (
        <span
          className="truncate font-mono text-xs"
          title={`${record.httpMethod || ''} ${record.uri || ''}`}
        >
          {record.httpMethod || record.uri
            ? `${record.httpMethod} ${record.uri}`
            : '-'}
        </span>
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
          title={
            !value && record.errorMessage ? record.errorMessage : undefined
          }
        >
          {value ? '成功' : '失败'}
        </Badge>
      ),
    },
    {
      key: 'costMs',
      title: '耗时',
      dataIndex: 'costMs',
      width: 90,
      align: 'right',
      sortable: true,
      render: value => (
        <span className={cn(value >= 1000 && 'text-amber-600')}>
          {value} ms
        </span>
      ),
    },
    {
      key: 'ip',
      title: 'IP',
      dataIndex: 'ip',
      width: 140,
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

    const result = await getApiLogsOperationsFunc(queryParams)

    return {
      data: result.list,
      total: result.total,
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">操作日志</h1>
        <p className="text-muted-foreground">
          查看系统中的所有操作记录，包含请求参数与耗时信息
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

      <OperationLogDetailDialog
        open={detailDialogOpen}
        onOpenChange={setDetailDialogOpen}
        log={selectedLog}
      />
    </div>
  )
}
