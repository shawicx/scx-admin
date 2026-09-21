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
import { cn, formatDate } from '@/lib/utils'

const TYPE_PAGE_SIZE = 50

function StatusBadge({ status }: { status: number }) {
  return (
    <Badge variant={status === 1 ? 'default' : 'secondary'}>
      {status === 1 ? '启用' : '停用'}
    </Badge>
  )
}

export default function DictsPage() {
  const { hasPermission } = usePermission()

  // 左侧字典类型列表状态
  const [types, setTypes] = useState<DictTypeResponseDto[]>([])
  const [typesTotal, setTypesTotal] = useState(0)
  const [typesPage, setTypesPage] = useState(1)
  const [typesLoading, setTypesLoading] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [keywordInput, setKeywordInput] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // 选中的字典类型
  const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null)
  const selectedType = useMemo(
    () => types.find(item => item.id === selectedTypeId) ?? null,
    [types, selectedTypeId]
  )

  // 右侧字典数据表格
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [togglingDataId, setTogglingDataId] = useState<string | null>(null)

  // 弹窗状态
  const [createTypeOpen, setCreateTypeOpen] = useState(false)
  const [editTypeOpen, setEditTypeOpen] = useState(false)
  const [deleteTypeOpen, setDeleteTypeOpen] = useState(false)
  const [editingTypeId, setEditingTypeId] = useState<string | null>(null)
  const [deletingType, setDeletingType] = useState<DictTypeResponseDto | null>(
    null
  )
  const [createDataOpen, setCreateDataOpen] = useState(false)
  const [editDataOpen, setEditDataOpen] = useState(false)
  const [deleteDataOpen, setDeleteDataOpen] = useState(false)
  const [editingDataId, setEditingDataId] = useState<string | null>(null)
  const [deletingData, setDeletingData] = useState<DictDataResponseDto | null>(
    null
  )

  const fetchTypes = useCallback(
    async (targetPage: number, append: boolean) => {
      setTypesLoading(true)
      try {
        const params: {
          page: string
          limit: string
          keyword?: string
          status?: string
        } = {
          page: String(targetPage),
          limit: String(TYPE_PAGE_SIZE),
        }
        if (keyword) {
          params.keyword = keyword
        }
        if (statusFilter !== 'all') {
          params.status = statusFilter
        }

        const result = await getApiDictsTypeListFunc(params)
        setTypes(prev => (append ? [...prev, ...result.list] : result.list))
        setTypesTotal(result.total)
        setTypesPage(targetPage)

        if (!append) {
          setSelectedTypeId(prev => {
            if (prev && result.list.some(item => item.id === prev)) {
              return prev
            }
            return result.list[0]?.id ?? null
          })
        }
      } catch (error) {
        console.error('Failed to load dict types:', error)
      } finally {
        setTypesLoading(false)
      }
    },
    [keyword, statusFilter]
  )

  useEffect(() => {
    fetchTypes(1, false)
  }, [keyword, statusFilter, fetchTypes])

  const handleSearch = () => {
    setKeyword(keywordInput.trim())
  }

  const handleResetSearch = () => {
    setKeywordInput('')
    setKeyword('')
    setStatusFilter('all')
  }

  const hasMoreTypes = types.length < typesTotal

  const handleRefreshTypes = useCallback(() => {
    fetchTypes(1, false)
  }, [fetchTypes])

  const handleRefreshData = useCallback(() => {
    setRefreshTrigger(prev => prev + 1)
  }, [])

  const handleDeleteTypeSuccess = useCallback(() => {
    if (deletingType && deletingType.id === selectedTypeId) {
      setSelectedTypeId(null)
    }
    handleRefreshTypes()
  }, [deletingType, selectedTypeId, handleRefreshTypes])

  const handleDataStatusToggle = async (item: DictDataResponseDto) => {
    const newStatus = item.status === 1 ? 0 : 1
    setTogglingDataId(item.id)
    try {
      await putApiDictsDataUpdateFunc({ id: item.id, status: newStatus })
      handleRefreshData()
    } catch (error) {
      console.error('Failed to toggle dict data status:', error)
    } finally {
      setTogglingDataId(null)
    }
  }

  const dataColumns: TableColumn<DictDataResponseDto>[] = [
    {
      key: 'label',
      title: '显示文本',
      dataIndex: 'label',
      width: 200,
      render: value => <span className="font-medium">{value}</span>,
    },
    {
      key: 'value',
      title: '存储值',
      dataIndex: 'value',
      width: 200,
      render: value => (
        <code className="rounded bg-muted px-1.5 py-0.5 text-xs">{value}</code>
      ),
    },
    {
      key: 'sort',
      title: '排序',
      dataIndex: 'sort',
      width: 80,
      align: 'center',
    },
    {
      key: 'status',
      title: '状态',
      dataIndex: 'status',
      width: 90,
      align: 'center',
      render: (_, record) =>
        hasPermission('dict', 'update') ? (
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
      dataIndex: 'createdAt',
      width: 170,
      render: value => formatDate(value),
    },
    {
      key: 'updatedAt',
      title: '更新时间',
      dataIndex: 'updatedAt',
      width: 170,
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
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  const loadDataItems = async () => {
    if (!selectedType) {
      return { data: [], total: 0 }
    }
    const result = await getApiDictsDataListFunc({ typeId: selectedType.id })
    return { data: result.data, total: result.data.length }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[340px_1fr]">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <BookText className="h-5 w-5" />
                字典类型
              </CardTitle>
              <HasPermission resource="dict" action="create">
                <Button size="sm" onClick={() => setCreateTypeOpen(true)}>
                  <Plus className="mr-1 h-4 w-4" />
                  新增
                </Button>
              </HasPermission>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <Input
                value={keywordInput}
                onChange={e => setKeywordInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    handleSearch()
                  }
                }}
                placeholder="搜索名称/编码"
                className="h-9"
              />
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 flex-shrink-0"
                onClick={handleSearch}
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Select
                value={statusFilter}
                onValueChange={value => setStatusFilter(value)}
              >
                <SelectTrigger className="h-9 flex-1">
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

            <div className="max-h-[520px] space-y-2 overflow-y-auto">
              {typesLoading && types.length === 0 ? (
                <div className="py-8 text-center text-sm text-muted-foreground">
                  加载中...
                </div>
              ) : types.length === 0 ? (
                <div className="py-8 text-center text-sm text-muted-foreground">
                  暂无字典类型
                </div>
              ) : (
                <>
                  {types.map(item => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedTypeId(item.id)}
                      className={cn(
                        'cursor-pointer rounded-md border p-3 transition-colors hover:bg-accent',
                        selectedTypeId === item.id && 'border-primary bg-accent'
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="truncate font-medium">
                              {item.name}
                            </span>
                            {item.isSystem && (
                              <Badge
                                variant="outline"
                                className="flex-shrink-0"
                              >
                                系统
                              </Badge>
                            )}
                          </div>
                          <div className="truncate text-sm text-muted-foreground">
                            {item.code}
                          </div>
                        </div>
                        <div
                          className="flex flex-shrink-0 items-center gap-1"
                          onClick={e => e.stopPropagation()}
                        >
                          <StatusBadge status={item.status} />
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <HasPermission resource="dict" action="update">
                                <DropdownMenuItem
                                  onClick={() => {
                                    setEditingTypeId(item.id)
                                    setEditTypeOpen(true)
                                  }}
                                >
                                  <Edit className="mr-2 h-4 w-4" />
                                  编辑
                                </DropdownMenuItem>
                              </HasPermission>
                              <HasPermission resource="dict" action="delete">
                                <DropdownMenuItem
                                  onClick={() => {
                                    setDeletingType(item)
                                    setDeleteTypeOpen(true)
                                  }}
                                  className="text-destructive"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  删除
                                </DropdownMenuItem>
                              </HasPermission>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      {item.description && (
                        <p className="mt-1 truncate text-xs text-muted-foreground">
                          {item.description}
                        </p>
                      )}
                    </div>
                  ))}
                  {hasMoreTypes && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full"
                      disabled={typesLoading}
                      onClick={() => fetchTypes(typesPage + 1, true)}
                    >
                      {typesLoading
                        ? '加载中...'
                        : `加载更多（${types.length}/${typesTotal}）`}
                    </Button>
                  )}
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          {selectedType ? (
            <>
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="min-w-0">
                    <CardTitle className="flex flex-wrap items-center gap-2">
                      <span className="truncate">{selectedType.name}</span>
                      <Badge variant="secondary">{selectedType.code}</Badge>
                      <StatusBadge status={selectedType.status} />
                      {selectedType.isSystem && (
                        <Badge variant="outline">系统内置</Badge>
                      )}
                    </CardTitle>
                    {selectedType.description && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {selectedType.description}
                      </p>
                    )}
                  </div>
                  <HasPermission resource="dict" action="create">
                    <Button
                      size="sm"
                      onClick={() => setCreateDataOpen(true)}
                      disabled={selectedType.status !== 1}
                    >
                      <Plus className="mr-1 h-4 w-4" />
                      新增数据
                    </Button>
                  </HasPermission>
                </div>
              </CardHeader>
              <CardContent>
                <DataTable
                  key={`${selectedType.id}-${refreshTrigger}`}
                  columns={dataColumns}
                  loadData={loadDataItems}
                  pagination={false}
                  rowKey="id"
                  autoLoad={true}
                />
              </CardContent>
            </>
          ) : (
            <div className="flex min-h-[400px] flex-col items-center justify-center gap-2 text-muted-foreground">
              <BookText className="h-10 w-10 opacity-40" />
              <p className="text-sm">请先选择左侧字典类型</p>
            </div>
          )}
        </Card>
      </div>

      <CreateDictTypeDialog
        open={createTypeOpen}
        onOpenChange={setCreateTypeOpen}
        onSuccess={handleRefreshTypes}
      />

      {editingTypeId && (
        <EditDictTypeDialog
          open={editTypeOpen}
          onOpenChange={setEditTypeOpen}
          typeId={editingTypeId}
          onSuccess={handleRefreshTypes}
        />
      )}

      <DeleteDictTypeDialog
        open={deleteTypeOpen}
        onOpenChange={setDeleteTypeOpen}
        dictType={deletingType}
        onSuccess={handleDeleteTypeSuccess}
      />

      {selectedType && (
        <CreateDictDataDialog
          open={createDataOpen}
          onOpenChange={setCreateDataOpen}
          typeId={selectedType.id}
          onSuccess={handleRefreshData}
        />
      )}

      {editingDataId && (
        <EditDictDataDialog
          open={editDataOpen}
          onOpenChange={setEditDataOpen}
          dictDataId={editingDataId}
          onSuccess={handleRefreshData}
        />
      )}

      <DeleteDictDataDialog
        open={deleteDataOpen}
        onOpenChange={setDeleteDataOpen}
        dictData={deletingData}
        onSuccess={handleRefreshData}
      />
    </div>
  )
}
