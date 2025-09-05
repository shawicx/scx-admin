'use client'

import { useState, useEffect, useMemo } from 'react'
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'
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
  searchFormProps,
  headerConfig,
  className,
  onPaginationChange,
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

  // 获取行键值
  const getRowKey = (record: T, index: number): string => {
    if (typeof rowKey === 'function') {
      return rowKey(record)
    }
    return (record as any)[rowKey] || String(index)
  }

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

    // 通知外部分页变化
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
      // 同一字段：asc -> desc -> undefined
      if (sorter.order === 'asc') {
        newSorter = { field, order: 'desc' }
      } else {
        newSorter = undefined
      }
    } else {
      // 不同字段：设置为 asc
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

  const displayDataSource = loadData ? internalDataSource : dataSource
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
      {/* 表格头部 */}
      <CustomTableHeader {...headerConfig} />

      {/* 搜索表单 */}
      <SearchForm
        columns={columns}
        onSearch={handleSearch}
        onReset={handleResetSearch}
        loading={displayLoading}
      />

      {/* 表格 */}
      <div
        className={cn(
          'rounded-md border bg-background relative',
          bordered && 'border-border'
        )}
      >
        {/* 加载遮罩层 */}
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
              {displayDataSource.length === 0 && !displayLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="text-center py-8 text-muted-foreground"
                  >
                    暂无数据
                  </TableCell>
                </TableRow>
              ) : (
                displayDataSource.map((record, index) => (
                  <TableRow key={getRowKey(record, index)}>
                    {columns.map(column => {
                      const value = column.dataIndex
                        ? (record as any)[column.dataIndex]
                        : record

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
                          {column.render
                            ? column.render(value, record, index)
                            : value}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* 分页 */}
      {shouldShowPagination && (
        <Pagination
          pagination={displayPagination}
          onChange={handlePaginationChange}
        />
      )}
    </div>
  )
}
