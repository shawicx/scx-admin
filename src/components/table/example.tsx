'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DataTable } from './data-table'
import type { TableColumn, LoadDataParams } from './types'

// 示例数据类型
interface User {
  id: string
  name: string
  email: string
  age: number
  status: 'active' | 'inactive'
  department: string
  createdAt: string
}

// 模拟数据
const mockUsers: User[] = Array.from({ length: 100 }, (_, i) => ({
  id: `user-${i + 1}`,
  name: `用户${i + 1}`,
  email: `user${i + 1}@example.com`,
  age: 20 + (i % 40),
  status: i % 3 === 0 ? 'inactive' : 'active',
  department: ['技术部', '产品部', '运营部', '市场部'][i % 4],
  createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0],
}))

// 表格列配置
const columns: TableColumn<User>[] = [
  {
    key: 'name',
    title: '姓名',
    dataIndex: 'name',
    width: 120,
    searchable: true,
    searchType: 'input',
    searchProps: {
      placeholder: '请输入姓名',
    },
    sortable: true,
  },
  {
    key: 'email',
    title: '邮箱',
    dataIndex: 'email',
    width: 200,
    searchable: true,
    searchType: 'input',
    searchProps: {
      placeholder: '请输入邮箱',
    },
  },
  {
    key: 'age',
    title: '年龄',
    dataIndex: 'age',
    width: 80,
    align: 'center',
    searchable: true,
    searchType: 'number',
    searchProps: {
      placeholder: '请输入年龄',
      min: 0,
      max: 100,
    },
    sortable: true,
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
      placeholder: '请选择状态',
      options: [
        { label: '激活', value: 'active' },
        { label: '未激活', value: 'inactive' },
      ],
    },
    render: (value: string) => (
      <Badge variant={value === 'active' ? 'default' : 'secondary'}>
        {value === 'active' ? '激活' : '未激活'}
      </Badge>
    ),
  },
  {
    key: 'department',
    title: '部门',
    dataIndex: 'department',
    width: 120,
    searchable: true,
    searchType: 'select',
    searchProps: {
      placeholder: '请选择部门',
      options: [
        { label: '技术部', value: '技术部' },
        { label: '产品部', value: '产品部' },
        { label: '运营部', value: '运营部' },
        { label: '市场部', value: '市场部' },
      ],
    },
  },
  {
    key: 'createdAt',
    title: '创建时间',
    dataIndex: 'createdAt',
    width: 120,
    searchable: true,
    searchType: 'dateRange',
    searchProps: {
      placeholder: '请选择创建时间范围',
    },
    sortable: true,
  },
  {
    key: 'actions',
    title: '操作',
    width: 150,
    align: 'center',
    fixed: 'right',
    render: _ => (
      <div className="flex gap-2">
        <Button size="sm" variant="outline">
          编辑
        </Button>
        <Button size="sm" variant="outline">
          删除
        </Button>
      </div>
    ),
  },
]

export function TableExample() {
  const [loading, setLoading] = useState(false)

  // 模拟异步加载数据
  const loadData = async (params: LoadDataParams) => {
    setLoading(true)

    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 1000))

    let filteredData = [...mockUsers]

    // 应用搜索过滤
    if (params.searchValues) {
      Object.entries(params.searchValues).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          if (key === 'createdAt' && value.from && value.to) {
            // 日期范围过滤
            filteredData = filteredData.filter(item => {
              const itemDate = new Date(item.createdAt)
              return itemDate >= value.from && itemDate <= value.to
            })
          } else if (typeof value === 'string') {
            filteredData = filteredData.filter(item =>
              String((item as any)[key])
                .toLowerCase()
                .includes(value.toLowerCase())
            )
          } else {
            filteredData = filteredData.filter(
              item => (item as any)[key] === value
            )
          }
        }
      })
    }

    // 应用排序
    if (params.sorter) {
      filteredData.sort((a, b) => {
        const aValue = (a as any)[params.sorter!.field]
        const bValue = (b as any)[params.sorter!.field]

        if (params.sorter!.order === 'asc') {
          return aValue > bValue ? 1 : -1
        } else {
          return aValue < bValue ? 1 : -1
        }
      })
    }

    // 应用分页
    const { current, pageSize } = params.pagination
    const start = (current - 1) * pageSize
    const end = start + pageSize
    const paginatedData = filteredData.slice(start, end)

    setLoading(false)

    return {
      data: paginatedData,
      total: filteredData.length,
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">表格组件示例</h1>

      <DataTable<User>
        columns={columns}
        loadData={loadData}
        loading={loading}
        pagination={{
          current: 1,
          pageSize: 10,
          total: 0,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: true,
          hideOnSinglePage: false, // 演示用，显示分页
          minShowTotal: 0,
        }}
        height={400} // 设置表格高度
        headerConfig={{
          statistics: (
            <div className="text-sm text-muted-foreground">用户管理</div>
          ),
          actions: (
            <div className="flex gap-2">
              <Button>新增用户</Button>
              <Button variant="outline">导出</Button>
            </div>
          ),
        }}
        autoLoad={true}
        bordered={true}
      />
    </div>
  )
}
