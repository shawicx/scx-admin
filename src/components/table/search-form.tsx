'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { ChevronDown, ChevronUp, Search, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DatePicker } from '@/components/ui/date-picker'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { cn } from '@/lib/utils'
import type {
  TableColumn,
  SearchFormValues,
  SelectSearchProps,
  NumberSearchProps,
} from './types'

interface SearchFormProps {
  columns: TableColumn[]
  onSearch: (values: SearchFormValues) => void
  onReset: () => void
  loading?: boolean
}

export function SearchForm({
  columns,
  onSearch,
  onReset,
  loading,
}: SearchFormProps) {
  const [expanded, setExpanded] = useState(false)
  const { register, handleSubmit, reset, setValue, watch, control } =
    useForm<SearchFormValues>()

  // 获取可搜索的列
  const searchableColumns = columns.filter(col => col.searchable)

  // 显示的列数量（收起时最多6个，展开时显示全部）
  const visibleColumns = expanded
    ? searchableColumns
    : searchableColumns.slice(0, 6)

  // 是否需要显示展开/收起按钮
  const showExpandButton = searchableColumns.length > 6

  const onSubmit = (values: SearchFormValues) => {
    // 过滤掉空值
    const filteredValues = Object.entries(values).reduce(
      (acc, [key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          acc[key] = value
        }
        return acc
      },
      {} as SearchFormValues
    )

    onSearch(filteredValues)
  }

  const handleReset = () => {
    reset()
    onReset()
  }

  const renderSearchField = (column: TableColumn) => {
    const { key, searchType = 'input', searchProps = {} } = column

    switch (searchType) {
      case 'select': {
        const selectProps = searchProps as SelectSearchProps
        return (
          <Select
            onValueChange={value => setValue(key, value)}
            disabled={selectProps.disabled}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={selectProps.placeholder || `请选择${column.title}`}
              />
            </SelectTrigger>
            <SelectContent>
              {selectProps.options?.map(option => (
                <SelectItem key={option.value} value={String(option.value)}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      }

      case 'number': {
        const numberProps = searchProps as NumberSearchProps
        return (
          <Input
            type="number"
            placeholder={numberProps.placeholder || `请输入${column.title}`}
            disabled={numberProps.disabled}
            min={numberProps.min}
            max={numberProps.max}
            step={numberProps.step}
            {...register(key, { valueAsNumber: true })}
          />
        )
      }

      case 'date': {
        return (
          <DatePicker
            placeholder={searchProps.placeholder || `请选择${column.title}`}
            disabled={searchProps.disabled}
            onChange={date => setValue(key, date)}
          />
        )
      }

      case 'dateRange': {
        return (
          <DateRangePicker
            placeholder={searchProps.placeholder || `请选择${column.title}范围`}
            disabled={searchProps.disabled}
            onChange={range => setValue(key, range)}
          />
        )
      }

      default: {
        return (
          <Input
            placeholder={searchProps.placeholder || `请输入${column.title}`}
            disabled={searchProps.disabled}
            {...register(key)}
          />
        )
      }
    }
  }

  if (searchableColumns.length === 0) {
    return null
  }

  return (
    <div className="bg-background border rounded-lg p-4 mb-4 w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* 搜索字段网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {visibleColumns.map(column => (
            <div key={column.key} className="space-y-2">
              <Label htmlFor={column.key} className="text-sm font-medium">
                {column.title}
              </Label>
              {renderSearchField(column)}
            </div>
          ))}
        </div>

        {/* 展开/收起按钮 */}
        {showExpandButton && (
          <div className="flex justify-center">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setExpanded(!expanded)}
              className="text-muted-foreground hover:text-foreground"
            >
              {expanded ? (
                <>
                  收起 <ChevronUp className="ml-1 h-4 w-4" />
                </>
              ) : (
                <>
                  展开 <ChevronDown className="ml-1 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        )}

        {/* 操作按钮 */}
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            disabled={loading}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            重置
          </Button>
          <Button type="submit" disabled={loading}>
            <Search className="mr-2 h-4 w-4" />
            搜索
          </Button>
        </div>
      </form>
    </div>
  )
}
