'use client'

import { useState, useCallback } from 'react'
import { Plus, MoreVertical, Trash2, Edit, Shield } from 'lucide-react'
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
import { CreateRoleDialog } from '@/components/roles/create-role-dialog'
import { EditRoleDialog } from '@/components/roles/edit-role-dialog'
import { DeleteRoleDialog } from '@/components/roles/delete-role-dialog'
import { PermissionAssignDialog } from '@/components/roles/permission-assign-dialog'
import { getRolesApi } from '@/service/JueSeGuanLi'
import type { RoleResponseDto } from '@/service/types'
import type { TableColumn } from '@/components/table/types'
import { formatDate } from '@/lib/utils'

export default function RolesPage() {
  const [selectedRoleIds, setSelectedRoleIds] = useState<string[]>([])
  const [selectedRoleNames, setSelectedRoleNames] = useState<string[]>([])
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [permissionDialogOpen, setPermissionDialogOpen] = useState(false)
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleRefresh = useCallback(() => {
    setRefreshTrigger(prev => prev + 1)
  }, [])

  const handleEdit = (role: RoleResponseDto) => {
    setSelectedRoleId(role.id)
    setEditDialogOpen(true)
  }

  const handleDelete = (role: RoleResponseDto) => {
    setSelectedRoleIds([role.id])
    setSelectedRoleNames([role.name])
    setDeleteDialogOpen(true)
  }

  const handleBulkDelete = () => {
    if (selectedRoleIds.length > 0) {
      setDeleteDialogOpen(true)
    }
  }

  const handleAssignPermission = (role: RoleResponseDto) => {
    setSelectedRoleId(role.id)
    setPermissionDialogOpen(true)
  }

  const columns: TableColumn<RoleResponseDto>[] = [
    {
      key: 'select',
      title: '',
      width: 50,
      render: (_, record) => (
        <Checkbox
          checked={selectedRoleIds.includes(record.id)}
          onChange={e => {
            if (e.target.checked) {
              setSelectedRoleIds(prev => [...prev, record.id])
              setSelectedRoleNames(prev => [...prev, record.name])
            } else {
              setSelectedRoleIds(prev => prev.filter(id => id !== record.id))
              setSelectedRoleNames(prev =>
                prev.filter(name => name !== record.name)
              )
            }
          }}
        />
      ),
    },
    {
      key: 'name',
      title: '角色名称',
      dataIndex: 'name',
      width: 200,
      searchable: true,
      searchType: 'input',
      render: (value, record) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-muted-foreground">{record.code}</div>
        </div>
      ),
    },
    {
      key: 'code',
      title: '角色代码',
      dataIndex: 'code',
      width: 150,
    },
    {
      key: 'description',
      title: '角色描述',
      dataIndex: 'description',
      width: 250,
      render: value => value || '-',
    },
    {
      key: 'isSystem',
      title: '系统角色',
      dataIndex: 'isSystem',
      width: 100,
      align: 'center',
      render: value => (
        <Badge variant={value ? 'default' : 'secondary'}>
          {value ? '是' : '否'}
        </Badge>
      ),
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
            <DropdownMenuItem onClick={() => handleAssignPermission(record)}>
              <Shield className="mr-2 h-4 w-4" />
              分配权限
            </DropdownMenuItem>
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

    const result = await getRolesApi(queryParams)

    return {
      data: result.list,
      total: result.total,
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">角色管理</h1>
          <p className="text-muted-foreground">管理系统中的所有角色</p>
        </div>
        <div className="flex items-center gap-2">
          {selectedRoleIds.length > 0 && (
            <Button variant="destructive" onClick={handleBulkDelete}>
              <Trash2 className="mr-2 h-4 w-4" />
              删除选中 ({selectedRoleIds.length})
            </Button>
          )}
          <Button onClick={() => setCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            添加角色
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
          statistics: selectedRoleIds.length > 0 && (
            <span className="text-sm text-muted-foreground">
              已选择 {selectedRoleIds.length} 项
            </span>
          ),
        }}
      />

      <CreateRoleDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSuccess={handleRefresh}
      />

      <EditRoleDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        roleId={selectedRoleId}
        onSuccess={handleRefresh}
      />

      <DeleteRoleDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        roleIds={selectedRoleIds}
        roleNames={selectedRoleNames}
        onSuccess={() => {
          setSelectedRoleIds([])
          setSelectedRoleNames([])
          handleRefresh()
        }}
      />

      {selectedRoleId && (
        <PermissionAssignDialog
          open={permissionDialogOpen}
          onOpenChange={setPermissionDialogOpen}
          roleId={selectedRoleId}
          onSuccess={handleRefresh}
        />
      )}
    </div>
  )
}
