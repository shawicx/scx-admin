'use client'

import { useState, useCallback } from 'react'
import { Plus, MoreVertical, Shield, Trash2 } from 'lucide-react'
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
import { CreateUserDialog } from '@/components/users/create-user-dialog'
import { DeleteUserDialog } from '@/components/users/delete-user-dialog'
import { RoleAssignDialog } from '@/components/users/role-assign-dialog'
import { UserStatusSwitch } from '@/components/users/user-status-switch'
import { getUsersApi } from '@/service/YongHuGuanLi'
import type { UserListItemDto } from '@/service/types'
import type { TableColumn } from '@/components/table/types'
import { formatDate } from '@/lib/utils'

export default function UsersPage() {
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([])
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [roleDialogOpen, setRoleDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserListItemDto | null>(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleRefresh = useCallback(() => {
    setRefreshTrigger(prev => prev + 1)
  }, [])

  const handleDelete = (userId: string) => {
    setSelectedUserIds([userId])
    setDeleteDialogOpen(true)
  }

  const handleBulkDelete = () => {
    if (selectedUserIds.length > 0) {
      setDeleteDialogOpen(true)
    }
  }

  const handleAssignRole = (user: UserListItemDto) => {
    setSelectedUser(user)
    setRoleDialogOpen(true)
  }

  const columns: TableColumn<UserListItemDto>[] = [
    {
      key: 'select',
      title: '',
      width: 50,
      render: (_, record) => (
        <Checkbox
          checked={selectedUserIds.includes(record.id)}
          onChange={e => {
            if (e.target.checked) {
              setSelectedUserIds(prev => [...prev, record.id])
            } else {
              setSelectedUserIds(prev => prev.filter(id => id !== record.id))
            }
          }}
        />
      ),
    },
    {
      key: 'name',
      title: '用户',
      dataIndex: 'name',
      width: 200,
      searchable: true,
      searchType: 'input',
      render: (value, record) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-muted-foreground">{record.email}</div>
        </div>
      ),
    },
    {
      key: 'emailVerified',
      title: '邮箱验证',
      dataIndex: 'emailVerified',
      width: 100,
      render: value => (
        <Badge variant={value ? 'default' : 'secondary'}>
          {value ? '已验证' : '未验证'}
        </Badge>
      ),
    },
    {
      key: 'lastLoginAt',
      title: '最后登录',
      dataIndex: 'lastLoginAt',
      width: 180,
      sortable: true,
      render: value => (value ? formatDate(value) : '-'),
    },
    {
      key: 'loginCount',
      title: '登录次数',
      dataIndex: 'loginCount',
      width: 100,
      align: 'center',
      sortable: true,
    },
    {
      key: 'isActive',
      title: '状态',
      dataIndex: 'isActive',
      width: 100,
      align: 'center',
      searchable: true,
      searchType: 'select',
      searchProps: {
        options: [
          { label: '全部', value: 'all' },
          { label: '启用', value: 'true' },
          { label: '禁用', value: 'false' },
        ],
      },
      render: (_, record) => (
        <UserStatusSwitch
          userIds={[record.id]}
          currentStatus={record.isActive}
          onSuccess={handleRefresh}
        />
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
            <DropdownMenuItem onClick={() => handleAssignRole(record)}>
              <Shield className="mr-2 h-4 w-4" />
              分配角色
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDelete(record.id)}
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

    if (
      searchValues.isActive !== undefined &&
      searchValues.isActive !== '' &&
      searchValues.isActive !== 'all'
    ) {
      queryParams.isActive = searchValues.isActive
    }

    if (sorter?.field) {
      queryParams.sortBy = sorter.field
      queryParams.sortOrder = sorter.order
    }

    const result = await getUsersApi(queryParams)

    return {
      data: result.list,
      total: result.total,
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">用户管理</h1>
          <p className="text-muted-foreground">管理系统中的所有用户账号</p>
        </div>
        <div className="flex items-center gap-2">
          {selectedUserIds.length > 0 && (
            <Button variant="destructive" onClick={handleBulkDelete}>
              <Trash2 className="mr-2 h-4 w-4" />
              删除选中 ({selectedUserIds.length})
            </Button>
          )}
          <Button onClick={() => setCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            添加用户
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
          statistics: selectedUserIds.length > 0 && (
            <span className="text-sm text-muted-foreground">
              已选择 {selectedUserIds.length} 项
            </span>
          ),
        }}
      />

      <CreateUserDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSuccess={handleRefresh}
      />

      <DeleteUserDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        userIds={selectedUserIds}
        onSuccess={() => {
          setSelectedUserIds([])
          handleRefresh()
        }}
      />

      {selectedUser && (
        <RoleAssignDialog
          open={roleDialogOpen}
          onOpenChange={setRoleDialogOpen}
          userId={selectedUser.id}
        />
      )}
    </div>
  )
}
