'use client'

import { useState, useCallback } from 'react'
import { Plus, MoreVertical, Trash2, Edit } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTable } from '@/components/table/data-table'
import { CreatePermissionDialog } from '@/components/permissions/create-permission-dialog'
import { EditPermissionDialog } from '@/components/permissions/edit-permission-dialog'
import { DeletePermissionDialog } from '@/components/permissions/delete-permission-dialog'
import { getPermissionsApi } from '@/service/QuanXianGuanLi'
import type { PermissionResponseDto } from '@/service/types'
import type { TableColumn } from '@/components/table/types'
import { formatDate } from '@/lib/utils'

export default function PermissionsPage() {
  const [selectedPermissionIds, setSelectedPermissionIds] = useState<string[]>(
    []
  )
  const [selectedPermissionNames, setSelectedPermissionNames] = useState<
    string[]
  >([])
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedPermissionId, setSelectedPermissionId] = useState<
    string | null
  >(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleRefresh = useCallback(() => {
    setRefreshTrigger(prev => prev + 1)
  }, [])

  const handleEdit = (permission: PermissionResponseDto) => {
    setSelectedPermissionId(permission.id)
    setEditDialogOpen(true)
  }

  const handleDelete = (permission: PermissionResponseDto) => {
    setSelectedPermissionIds([permission.id])
    setSelectedPermissionNames([permission.name])
    setDeleteDialogOpen(true)
  }

  const handleBulkDelete = () => {
    if (selectedPermissionIds.length > 0) {
      setDeleteDialogOpen(true)
    }
  }

  const columns: TableColumn<PermissionResponseDto>[] = [
    {
      key: 'select',
      title: '',
      width: 50,
      render: (_, record) => (
        <Checkbox
          checked={selectedPermissionIds.includes(record.id)}
          onChange={e => {
            if (e.target.checked) {
              setSelectedPermissionIds(prev => [...prev, record.id])
              setSelectedPermissionNames(prev => [...prev, record.name])
            } else {
              setSelectedPermissionIds(prev =>
                prev.filter(id => id !== record.id)
              )
              setSelectedPermissionNames(prev =>
                prev.filter(name => name !== record.name)
              )
            }
          }}
        />
      ),
    },
    {
      key: 'name',
      title: '权限名称',
      dataIndex: 'name',
      width: 200,
      searchable: true,
      searchType: 'input',
    },
    {
      key: 'action',
      title: '操作动作',
      dataIndex: 'action',
      width: 120,
      render: value => <Badge variant="outline">{value}</Badge>,
    },
    {
      key: 'resource',
      title: '资源名称',
      dataIndex: 'resource',
      width: 120,
      render: value => <Badge variant="secondary">{value}</Badge>,
    },
    {
      key: 'description',
      title: '权限描述',
      dataIndex: 'description',
      width: 250,
      render: value => value || '-',
    },
    {
      key: 'createdAt',
      title: '创建时间',
      dataIndex: 'createdAt',
      width: 180,
      sortable: true,
      render: value => formatDate(value),
    },
    {
      key: 'updatedAt',
      title: '更新时间',
      dataIndex: 'updatedAt',
      width: 180,
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
            <DropdownMenuItem onClick={() => handleEdit(record)}>
              <Edit className="mr-2 h-4 w-4" />
              编辑
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDelete(record)}
              className="text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              删除
            </DropdownMenuItem>
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

    if (searchValues.search) {
      queryParams.search = searchValues.search
    }

    if (sorter?.field) {
      queryParams.sortBy = sorter.field
      queryParams.sortOrder = sorter.order
    }

    const result = await getPermissionsApi(queryParams)

    return {
      data: result.permissions,
      total: result.total,
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">权限管理</h1>
          <p className="text-muted-foreground">管理系统中的所有权限</p>
        </div>
        <div className="flex items-center gap-2">
          {selectedPermissionIds.length > 0 && (
            <Button variant="destructive" onClick={handleBulkDelete}>
              <Trash2 className="mr-2 h-4 w-4" />
              删除选中 ({selectedPermissionIds.length})
            </Button>
          )}
          <Button onClick={() => setCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            添加权限
          </Button>
        </div>
      </div>

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
          statistics: selectedPermissionIds.length > 0 && (
            <span className="text-sm text-muted-foreground">
              已选择 {selectedPermissionIds.length} 项
            </span>
          ),
        }}
      />

      <CreatePermissionDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSuccess={handleRefresh}
      />

      <EditPermissionDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        permissionId={selectedPermissionId}
        onSuccess={handleRefresh}
      />

      <DeletePermissionDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        permissionIds={selectedPermissionIds}
        permissionNames={selectedPermissionNames}
        onSuccess={() => {
          setSelectedPermissionIds([])
          setSelectedPermissionNames([])
          handleRefresh()
        }}
      />
    </div>
  )
}
