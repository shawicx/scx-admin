'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import {
  BookText,
  MoreVertical,
  Plus,
  Search,
  Trash2,
  Edit,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DataTable } from '@/components/table/data-table'
import { CreateDictTypeDialog } from '@/components/dicts/create-dict-type-dialog'
import { EditDictTypeDialog } from '@/components/dicts/edit-dict-type-dialog'
import { DeleteDictTypeDialog } from '@/components/dicts/delete-dict-type-dialog'
import { CreateDictDataDialog } from '@/components/dicts/create-dict-data-dialog'
import { EditDictDataDialog } from '@/components/dicts/edit-dict-data-dialog'
import { DeleteDictDataDialog } from '@/components/dicts/delete-dict-data-dialog'
import { HasPermission } from '@/components/has-permission'
import { usePermission } from '@/hooks/use-permission'
import {
  getApiDictsTypeListFunc,
  getApiDictsDataListFunc,
  putApiDictsDataUpdateFunc,
} from '@/service/rbac'
import type { DictTypeResponseDto, DictDataResponseDto } from '@/service/rbac'
import type { TableColumn } from '@/components/table/types'
import { formatDate } from '@/lib/utils'

const TYPE_PAGE_SIZE = 50
const MAX_TYPE_PAGES = 20

type DictTreeRow = DictTypeResponseDto | DictDataResponseDto

function isTypeRow(row: DictTreeRow): row is DictTypeResponseDto {
  return !('typeId' in row)
}

function StatusBadge({ status }: { status: number }) {
  return (
    <Badge variant={status === 1 ? 'default' : 'secondary'}>
      {status === 1 ? '启用' : '停用'}
    </Badge>
  )
}

export default function DictsPage() {
  const { hasPermission } = usePermission()

  const [types, setTypes] = useState<DictTypeResponseDto[]>([])
  const [dataItems, setDataItems] = useState<DictDataResponseDto[]>([])
  const [loading, setLoading] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const [keyword, setKeyword] = useState('')
  const [keywordInput, setKeywordInput] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [togglingDataId, setTogglingDataId] = useState<string | null>(null)

  // 弹窗状态
  const [createTypeOpen, setCreateTypeOpen] = useState(false)
  const [editTypeOpen, setEditTypeOpen] = useState(false)
  const [editingTypeId, setEditingTypeId] = useState<string | null>(null)
  const [deleteTypeOpen, setDeleteTypeOpen] = useState(false)
  const [deletingType, setDeletingType] = useState<DictTypeResponseDto | null>(
    null
  )
  const [createDataOpen, setCreateDataOpen] = useState(false)
  const [createDataTypeId, setCreateDataTypeId] = useState<string | null>(null)
  const [editDataOpen, setEditDataOpen] = useState(false)
  const [editingDataId, setEditingDataId] = useState<string | null>(null)
  const [deleteDataOpen, setDeleteDataOpen] = useState(false)
  const [deletingData, setDeletingData] = useState<DictDataResponseDto | null>(
    null
  )

  const fetchAll = useCallback(async () => {
    setLoading(true)
    try {
      const allTypes: DictTypeResponseDto[] = []
      let page = 1
      let total = Infinity
      while (allTypes.length < total && page <= MAX_TYPE_PAGES) {
        const result = await getApiDictsTypeListFunc({
          page: String(page),
          limit: String(TYPE_PAGE_SIZE),
        })
        total = result.total
        allTypes.push(...result.list)
        if (result.list.length === 0) {
          break
        }
        page += 1
      }

      // data/list 运行时返回裸数组，与生成类型 { data: [] } 不符（service 层禁改，此处收敛）
      const dataLists = await Promise.all(
        allTypes.map(type => getApiDictsDataListFunc({ typeId: type.id }))
      )

      setTypes(allTypes)
      setDataItems(
        dataLists.flatMap(result => result as unknown as DictDataResponseDto[])
      )
      setRefreshKey(key => key + 1)
    } catch (error) {
      console.error('Failed to load dicts:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  const handleSearch = () => {
    setKeyword(keywordInput.trim())
  }

  const handleResetSearch = () => {
    setKeywordInput('')
    setKeyword('')
    setStatusFilter('all')
  }

  const handleDataStatusToggle = async (item: DictDataResponseDto) => {
    const newStatus = item.status === 1 ? 0 : 1
    setTogglingDataId(item.id)
    try {
      await putApiDictsDataUpdateFunc({ id: item.id, status: newStatus })
      fetchAll()
    } catch (error) {
      console.error('Failed to toggle dict data status:', error)
    } finally {
      setTogglingDataId(null)
    }
  }

  const rows = useMemo<DictTreeRow[]>(() => {
    const kw = keyword.trim().toLowerCase()
    const visibleTypes = types.filter(type => {
      const matchKeyword =
        !kw ||
        type.name.toLowerCase().includes(kw) ||
        type.code.toLowerCase().includes(kw)
      const matchStatus =
        statusFilter === 'all' || String(type.status) === statusFilter
      return matchKeyword && matchStatus
    })
    const typeIds = new Set(visibleTypes.map(type => type.id))
    const visibleItems = dataItems.filter(item => typeIds.has(item.typeId))
    return [...visibleTypes, ...visibleItems]
  }, [types, dataItems, keyword, statusFilter])

  const columns: TableColumn<DictTreeRow>[] = [
    {
      key: 'name',
      title: '名称 / 显示文本',
      width: 220,
      render: (_, record) =>
        isTypeRow(record) ? (
          <span className="flex items-center gap-1.5 font-medium">
            {record.name}
            {record.isSystem && <Badge variant="outline">系统</Badge>}
          </span>
        ) : (
          <span className="font-medium">{record.label}</span>
        ),
    },
    {
      key: 'code',
      title: '编码 / 存储值',
      width: 200,
      render: (_, record) =>
        isTypeRow(record) ? (
          <Badge variant="secondary">{record.code}</Badge>
        ) : (
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
            {record.value}
          </code>
        ),
    },
    {
      key: 'sort',
      title: '排序',
      width: 80,
      align: 'center',
      render: (_, record) => (isTypeRow(record) ? '—' : record.sort),
    },
    {
      key: 'status',
      title: '状态',
      width: 90,
      align: 'center',
      render: (_, record) =>
        isTypeRow(record) ? (
          <StatusBadge status={record.status} />
        ) : hasPermission('dict', 'update') ? (
          <Switch
            checked={record.status === 1}
            onCheckedChange={() => handleDataStatusToggle(record)}
            disabled={togglingDataId === record.id}
          />
        ) : (
          <StatusBadge status={record.status} />
        ),
    },
    {
      key: 'createdAt',
      title: '创建时间',
      width: 170,
      render: (_, record) => formatDate(record.createdAt),
    },
    {
      key: 'updatedAt',
      title: '更新时间',
      width: 170,
      render: (_, record) => formatDate(record.updatedAt),
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
            {isTypeRow(record) ? (
              <>
                <HasPermission resource="dict" action="update">
                  <DropdownMenuItem
                    onClick={() => {
                      setEditingTypeId(record.id)
                      setEditTypeOpen(true)
                    }}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    编辑
                  </DropdownMenuItem>
                </HasPermission>
                <HasPermission resource="dict" action="create">
                  <DropdownMenuItem
                    disabled={record.status !== 1}
                    onClick={() => {
                      setCreateDataTypeId(record.id)
                      setCreateDataOpen(true)
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    新增数据
                  </DropdownMenuItem>
                </HasPermission>
                <HasPermission resource="dict" action="delete">
                  <DropdownMenuItem
                    onClick={() => {
                      setDeletingType(record)
                      setDeleteTypeOpen(true)
                    }}
                    className="text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    删除
                  </DropdownMenuItem>
                </HasPermission>
              </>
            ) : (
              <>
                <HasPermission resource="dict" action="update">
                  <DropdownMenuItem
                    onClick={() => {
                      setEditingDataId(record.id)
                      setEditDataOpen(true)
                    }}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    编辑
                  </DropdownMenuItem>
                </HasPermission>
                <HasPermission resource="dict" action="delete">
                  <DropdownMenuItem
                    onClick={() => {
                      setDeletingData(record)
                      setDeleteDataOpen(true)
                    }}
                    className="text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    删除
                  </DropdownMenuItem>
                </HasPermission>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CardTitle className="flex items-center gap-2">
              <BookText className="h-5 w-5" />
              字典管理
            </CardTitle>
            <HasPermission resource="dict" action="create">
              <Button size="sm" onClick={() => setCreateTypeOpen(true)}>
                <Plus className="mr-1 h-4 w-4" />
                新增类型
              </Button>
            </HasPermission>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Input
              value={keywordInput}
              onChange={e => setKeywordInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  handleSearch()
                }
              }}
              placeholder="搜索名称/编码"
              className="h-9 w-64"
            />
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 flex-shrink-0"
              onClick={handleSearch}
            >
              <Search className="h-4 w-4" />
            </Button>
            <Select
              value={statusFilter}
              onValueChange={value => setStatusFilter(value)}
            >
              <SelectTrigger className="h-9 w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部状态</SelectItem>
                <SelectItem value="1">启用</SelectItem>
                <SelectItem value="0">停用</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="ghost"
              size="sm"
              className="h-9 flex-shrink-0"
              onClick={handleResetSearch}
            >
              重置
            </Button>
          </div>

          <DataTable
            key={refreshKey}
            columns={columns}
            dataSource={rows}
            loading={loading}
            pagination={false}
            rowKey="id"
            treeData
            parentKey="typeId"
            defaultExpandAll
          />
        </CardContent>
      </Card>

      <CreateDictTypeDialog
        open={createTypeOpen}
        onOpenChange={setCreateTypeOpen}
        onSuccess={fetchAll}
      />

      {editingTypeId && (
        <EditDictTypeDialog
          open={editTypeOpen}
          onOpenChange={setEditTypeOpen}
          typeId={editingTypeId}
          onSuccess={fetchAll}
        />
      )}

      <DeleteDictTypeDialog
        open={deleteTypeOpen}
        onOpenChange={setDeleteTypeOpen}
        dictType={deletingType}
        onSuccess={fetchAll}
      />

      {createDataTypeId && (
        <CreateDictDataDialog
          open={createDataOpen}
          onOpenChange={setCreateDataOpen}
          typeId={createDataTypeId}
          onSuccess={fetchAll}
        />
      )}

      {editingDataId && (
        <EditDictDataDialog
          open={editDataOpen}
          onOpenChange={setEditDataOpen}
          dictDataId={editingDataId}
          onSuccess={fetchAll}
        />
      )}

      <DeleteDictDataDialog
        open={deleteDataOpen}
        onOpenChange={setDeleteDataOpen}
        dictData={deletingData}
        onSuccess={fetchAll}
      />
    </div>
  )
}
