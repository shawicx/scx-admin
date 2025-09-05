import { ReactNode } from 'react'
import { DateRange } from 'react-day-picker'

// 搜索表单字段类型
export type SearchFieldType =
  | 'input'
  | 'select'
  | 'number'
  | 'date'
  | 'dateRange'

// 基础搜索配置
export interface BaseSearchProps {
  placeholder?: string
  disabled?: boolean
}

// 输入框搜索配置
export interface InputSearchProps extends BaseSearchProps {}

// 下拉选择搜索配置
export interface SelectSearchProps extends BaseSearchProps {
  options: Array<{ label: string; value: string | number }>
  multiple?: boolean
}

// 数字输入框搜索配置
export interface NumberSearchProps extends BaseSearchProps {
  min?: number
  max?: number
  step?: number
}

// 日期搜索配置
export interface DateSearchProps extends BaseSearchProps {}

// 日期范围搜索配置
export interface DateRangeSearchProps extends BaseSearchProps {}

// 搜索配置联合类型
export type SearchProps =
  | InputSearchProps
  | SelectSearchProps
  | NumberSearchProps
  | DateSearchProps
  | DateRangeSearchProps

// 列配置
export interface TableColumn<T = any> {
  key: string
  title: string
  dataIndex?: string
  width?: number | string
  align?: 'left' | 'center' | 'right'
  fixed?: 'left' | 'right'
  sortable?: boolean
  searchable?: boolean
  searchType?: SearchFieldType
  searchProps?: SearchProps
  render?: (value: any, record: T, index: number) => ReactNode
}

// 分页配置
export interface PaginationConfig {
  current: number
  pageSize: number
  total: number
  showSizeChanger?: boolean
  showQuickJumper?: boolean
  showTotal?: boolean
  pageSizeOptions?: number[]
  hideOnSinglePage?: boolean // 只有一页时隐藏分页
  minShowTotal?: number // 最小显示总数，小于此数时隐藏分页
}

// 搜索表单值类型
export interface SearchFormValues {
  [key: string]: any
}

// 加载数据参数
export interface LoadDataParams {
  pagination: PaginationConfig
  searchValues: SearchFormValues
  sorter?: {
    field: string
    order: 'asc' | 'desc'
  }
}

// 表格配置
export interface TableConfig<T = any> {
  columns: TableColumn<T>[]
  dataSource?: T[]
  loading?: boolean
  pagination?: PaginationConfig | false
  rowKey?: string | ((record: T) => string)
  size?: 'small' | 'middle' | 'large'
  bordered?: boolean
  showHeader?: boolean
  scroll?: {
    x?: number | string
    y?: number | string
  }
  height?: number | string // 表格主体高度，用于内部滚动
  loadData?: (params: LoadDataParams) => Promise<{
    data: T[]
    total: number
  }>
  autoLoad?: boolean
  searchFormProps?: {
    layout?: 'horizontal' | 'vertical'
    labelCol?: { span: number }
    wrapperCol?: { span: number }
  }
}

// 表格顶部配置
export interface TableHeaderConfig {
  statistics?: ReactNode
  extra?: ReactNode
  actions?: ReactNode
}
