'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronRight,
  ChevronDown,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { TableHeader as CustomTableHeader } from './table-header'
import { SearchForm } from './search-form'
import { Pagination } from './pagination'
import type {
  TableConfig,
  TableHeaderConfig,
  SearchFormValues,
  PaginationConfig,
  LoadDataParams,
} from './types'

interface DataTableProps<T = any> extends Omit<TableConfig<T>, 'pagination'> {
  headerConfig?: TableHeaderConfig
  className?: string
  pagination?: PaginationConfig | false
  onPaginationChange?: (pagination: PaginationConfig) => void
}

export function DataTable<T = any>({
  columns,
  dataSource = [],
  loading = false,
  pagination = {
    current: 1,
    pageSize: 10,
    total: 0,
    hideOnSinglePage: true,
    minShowTotal: 0,
  },
  rowKey = 'id',
  size = 'middle',
  bordered = false,
  showHeader = true,
  scroll,
  height,
  loadData,
  autoLoad = true,
  headerConfig,
  className,
  onPaginationChange,
  treeData = false,
  parentKey = 'parentId',
  childrenKey = 'children',
  defaultExpandAll = false,
  indentSize = 20,
}: DataTableProps<T>) {
  const [internalDataSource, setInternalDataSource] = useState<T[]>(dataSource)
  const [internalLoading, setInternalLoading] = useState(loading)
  const [internalPagination, setInternalPagination] =
    useState<PaginationConfig>(
      pagination === false
        ? {
            current: 1,
            pageSize: 10,
            total: 0,
            hideOnSinglePage: true,
            minShowTotal: 0,
          }
        : { hideOnSinglePage: true, minShowTotal: 0, ...pagination }
    )
  const [searchValues, setSearchValues] = useState<SearchFormValues>({})
  const [sorter, setSorter] = useState<
    { field: string; order: 'asc' | 'desc' } | undefined
  >()
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(
    defaultExpandAll ? new Set() : new Set()
  )

  // 获取行键值
  const getRowKey = (record: T, index: number): string => {
    if (typeof rowKey === 'function') {
      return rowKey(record)
    }
    return (record as any)[rowKey] || String(index)
  }

  // 扁平数组转树形结构
  const arrayToTree = (
    data: Record<string, any>[],
    keyField: string = 'id',
    parentField: string = parentKey,
    childrenField: string = childrenKey
  ): Record<string, any>[] => {
    const map = new Map<string, Record<string, any>>()
    const tree: Record<string, any>[] = []

    data.forEach(item => {
      map.set(String(item[keyField]), { ...item, [childrenField]: [] })
    })

    data.forEach(item => {
      const record = map.get(String(item[keyField]))
      if (!record) return

      const parentId = item[parentField]
      if (parentId && map.has(String(parentId))) {
        const parent = map.get(String(parentId))
        if (parent) {
          ;(parent[childrenField] as Record<string, any>[]).push(record)
        }
      } else {
        tree.push(record)
      }
    })

    const cleanTree = (nodes: Record<string, any>[]): Record<string, any>[] => {
      return nodes.map(node => {
        if (
          node[childrenField] &&
          (node[childrenField] as Record<string, any>[]).length === 0
        ) {
          delete node[childrenField]
        } else if (
          node[childrenField] &&
          (node[childrenField] as Record<string, any>[]).length > 0
        ) {
          node[childrenField] = cleanTree(
            node[childrenField] as Record<string, any>[]
          )
        }
        return node
      })
    }

    return cleanTree(tree)
  }

  // 将树形结构扁平化
  const flattenTree = (
    data: Record<string, any>[],
    childrenField: string = childrenKey,
    level: number = 0
  ): Array<
    Record<string, any> & {
      _level: number
      _hasChildren: boolean
      _expanded?: boolean
    }
  > => {
    const result: Array<
      Record<string, any> & {
        _level: number
        _hasChildren: boolean
        _expanded?: boolean
      }
    > = []

    data.forEach(item => {
      const hasChildren =
        item[childrenField] &&
        (item[childrenField] as Record<string, any>[]).length > 0
      const key = getRowKey(item as T, 0)

      result.push({
        ...item,
        _level: level,
        _hasChildren: hasChildren,
        _expanded: expandedKeys.has(key),
      })

      if (hasChildren && expandedKeys.has(key)) {
        result.push(
          ...flattenTree(
            item[childrenField] as Record<string, any>[],
            childrenField,
            level + 1
          )
        )
      }
    })

    return result
  }

  // 处理展开/折叠
  const handleExpand = (record: T) => {
    const key = getRowKey(record, 0)
    const newExpandedKeys = new Set(expandedKeys)

    if (newExpandedKeys.has(key)) {
      newExpandedKeys.delete(key)
    } else {
      newExpandedKeys.add(key)
    }

    setExpandedKeys(newExpandedKeys)
  }

  // 处理全部展开/折叠
  const handleExpandAll = (expand: boolean) => {
    if (expand) {
      const allKeys = new Set<string>()
      const collectKeys = (
        data: Record<string, any>[],
        childrenField: string = childrenKey
      ) => {
        data.forEach(item => {
          const key = getRowKey(item as T, 0)
          if (
            item[childrenField] &&
            (item[childrenField] as Record<string, any>[]).length > 0
          ) {
            allKeys.add(key)
            collectKeys(
              item[childrenField] as Record<string, any>[],
              childrenField
            )
          }
        })
      }
      const treeData = arrayToTree(internalDataSource as Record<string, any>[])
      collectKeys(treeData)
      setExpandedKeys(allKeys)
    } else {
      setExpandedKeys(new Set())
    }
  }

  // 处理数据转换
  const processDataSource = useMemo(() => {
    const displayDataSource = loadData ? internalDataSource : dataSource

    if (treeData) {
      return flattenTree(
        arrayToTree(displayDataSource as Record<string, any>[])
      )
    }

    return displayDataSource
  }, [
    dataSource,
    internalDataSource,
    treeData,
    expandedKeys,
    parentKey,
    childrenKey,
    loadData,
    rowKey,
  ])

  // 加载数据
  const fetchData = async (params?: Partial<LoadDataParams>) => {
    if (!loadData) return

    setInternalLoading(true)
    try {
      const loadParams: LoadDataParams = {
        pagination: params?.pagination || internalPagination,
        searchValues: params?.searchValues || searchValues,
        sorter: params?.sorter || sorter,
      }

      const result = await loadData(loadParams)
      setInternalDataSource(result.data)
      setInternalPagination(prev => ({
        ...prev,
        total: result.total,
      }))
    } catch (error) {
      console.error('Failed to load data:', error)
    } finally {
      setInternalLoading(false)
    }
  }

  // 初始化加载数据
  useEffect(() => {
    if (autoLoad && loadData) {
      fetchData()
    }
  }, [])

  // 外部数据源变化时更新内部状态
  useEffect(() => {
    if (!loadData) {
      setInternalDataSource(dataSource)
    }
  }, [dataSource, loadData])

  // 外部加载状态变化时更新内部状态
  useEffect(() => {
    if (!loadData) {
      setInternalLoading(loading)
    }
  }, [loading, loadData])

  // 外部分页配置变化时更新内部状态
  useEffect(() => {
    if (!loadData && pagination !== false) {
      setInternalPagination(pagination)
    }
  }, [pagination, loadData])

  // 处理搜索
  const handleSearch = (values: SearchFormValues) => {
    setSearchValues(values)
    const newPagination = { ...internalPagination, current: 1 }
    setInternalPagination(newPagination)

    if (loadData) {
      fetchData({
        pagination: newPagination,
        searchValues: values,
        sorter,
      })
    }
  }

  // 处理重置搜索
  const handleResetSearch = () => {
    setSearchValues({})
    const newPagination = { ...internalPagination, current: 1 }
    setInternalPagination(newPagination)

    if (loadData) {
      fetchData({
        pagination: newPagination,
        searchValues: {},
        sorter,
      })
    }
  }

  // 处理分页变化
  const handlePaginationChange = (page: number, pageSize: number) => {
    const newPagination = { ...internalPagination, current: page, pageSize }
    setInternalPagination(newPagination)

    onPaginationChange?.(newPagination)

    if (loadData) {
      fetchData({
        pagination: newPagination,
        searchValues,
        sorter,
      })
    }
  }

  // 处理排序
  const handleSort = (field: string) => {
    let newSorter: { field: string; order: 'asc' | 'desc' } | undefined

    if (sorter?.field === field) {
      if (sorter.order === 'asc') {
        newSorter = { field, order: 'desc' }
      } else {
        newSorter = undefined
      }
    } else {
      newSorter = { field, order: 'asc' }
    }

    setSorter(newSorter)

    if (loadData) {
      fetchData({
        pagination: internalPagination,
        searchValues,
        sorter: newSorter,
      })
    }
  }

  // 渲染排序图标
  const renderSortIcon = (field: string) => {
    if (sorter?.field !== field) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />
    }

    return sorter.order === 'asc' ? (
      <ArrowUp className="ml-2 h-4 w-4" />
    ) : (
      <ArrowDown className="ml-2 h-4 w-4" />
    )
  }

  // 计算表格样式
  const tableSize = {
    small: 'text-xs',
    middle: 'text-sm',
    large: 'text-base',
  }[size]

  const displayLoading = loadData ? internalLoading : loading
  const displayPagination = pagination === false ? false : internalPagination

  // 判断是否显示分页
  const shouldShowPagination =
    displayPagination &&
    (!displayPagination.hideOnSinglePage ||
      Math.ceil(displayPagination.total / displayPagination.pageSize) > 1) &&
    displayPagination.total >= (displayPagination.minShowTotal || 0)

  return (
    <div className={cn('space-y-4', className)}>
      <CustomTableHeader {...headerConfig} />

      <SearchForm
        columns={columns}
        onSearch={handleSearch}
        onReset={handleResetSearch}
        loading={displayLoading}
      />

      <div
        className={cn(
          'rounded-md border bg-background relative',
          bordered && 'border-border'
        )}
      >
        {displayLoading && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-md">
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              <span className="text-sm text-muted-foreground">加载中...</span>
            </div>
          </div>
        )}

        <div
          className="overflow-auto"
          style={{
            maxWidth: scroll?.x,
            height: height,
            maxHeight: scroll?.y || height,
          }}
        >
          <Table className={tableSize}>
            {showHeader && (
              <TableHeader>
                <TableRow>
                  {columns.map(column => (
                    <TableHead
                      key={column.key}
                      className={cn(
                        column.align === 'center' && 'text-center',
                        column.align === 'right' && 'text-right',
                        column.fixed === 'left' &&
                          'sticky left-0 bg-background',
                        column.fixed === 'right' &&
                          'sticky right-0 bg-background'
                      )}
                      style={{ width: column.width }}
                    >
                      {column.sortable ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 font-medium"
                          onClick={() =>
                            handleSort(column.dataIndex || column.key)
                          }
                        >
                          {column.title}
                          {renderSortIcon(column.dataIndex || column.key)}
                        </Button>
                      ) : (
                        column.title
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
            )}
            <TableBody>
              {processDataSource.length === 0 && !displayLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="text-center py-8 text-muted-foreground"
                  >
                    暂无数据
                  </TableCell>
                </TableRow>
              ) : (
                processDataSource.map((record, index) => {
                  const hasChildren = (record as any)._hasChildren
                  const isExpanded = (record as any)._expanded
                  const level = (record as any)._level || 0

                  return (
                    <TableRow key={getRowKey(record as T, index)}>
                      {columns.map(column => {
                        const value = column.dataIndex
                          ? (record as any)[column.dataIndex]
                          : record
                        const isFirstColumn = column.key === columns[0].key

                        return (
                          <TableCell
                            key={column.key}
                            className={cn(
                              column.align === 'center' && 'text-center',
                              column.align === 'right' && 'text-right',
                              column.fixed === 'left' &&
                                'sticky left-0 bg-background',
                              column.fixed === 'right' &&
                                'sticky right-0 bg-background'
                            )}
                          >
                            <div
                              className={cn(
                                'flex items-center',
                                isFirstColumn && 'w-full'
                              )}
                            >
                              {isFirstColumn && treeData && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-auto p-0 mr-2 flex-shrink-0"
                                  onClick={() => handleExpand(record as T)}
                                  disabled={!hasChildren}
                                >
                                  {hasChildren ? (
                                    isExpanded ? (
                                      <ChevronDown className="h-4 w-4" />
                                    ) : (
                                      <ChevronRight className="h-4 w-4" />
                                    )
                                  ) : (
                                    <span className="w-4 h-4" />
                                  )}
                                </Button>
                              )}
                              <span
                                className={cn(
                                  'flex-1',
                                  isFirstColumn &&
                                    treeData &&
                                    'flex items-center'
                                )}
                                style={{
                                  paddingLeft:
                                    isFirstColumn && treeData
                                      ? level * indentSize
                                      : 0,
                                }}
                              >
                                {column.render
                                  ? column.render(value, record as T, index)
                                  : value}
                              </span>
                            </div>
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {shouldShowPagination && (
        <Pagination
          pagination={displayPagination}
          onChange={handlePaginationChange}
        />
      )}
    </div>
  )
}
