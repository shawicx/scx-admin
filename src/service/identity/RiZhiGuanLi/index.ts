import { RequestConfig, request } from '@/service/request'
import type {
  OperationLogResponseDto,
  LoginLogResponseDto,
} from '@/service/identity/types'

/**
 * @description 操作日志查询
 * @param params GetApiLogsOperationsRequestType
 * @returns Promise<GetApiLogsOperationsResultType>
 */
export interface GetApiLogsOperationsRequestType {
  /** @description 页码，从 1 开始 */
  page?: string
  /** @description 每页条数（1-100） */
  limit?: string
  /** @description 搜索关键字（按模块/动作/操作人邮箱/URI 模糊匹配） */
  search?: string
  /** @description 按模块精确过滤（如：用户管理） */
  module?: string
  /** @description 按动作精确过滤（如：创建用户） */
  action?: string
  /** @description 按操作人用户 ID 精确过滤 */
  userId?: string
  /** @description 按成功与否过滤 */
  success?: string
  /** @description 创建时间起（yyyy-MM-dd HH:mm:ss） */
  startTime?: string
  /** @description 创建时间止（yyyy-MM-dd HH:mm:ss） */
  endTime?: string
  /** @description 排序字段 */
  sortBy?: string
  /** @description 排序方向：ASC / DESC */
  sortOrder?: string
}

/**
 * @description 操作日志查询 的返回数据类型
 */
export interface GetApiLogsOperationsResultType {
  /** @description 操作日志列表 */
  list: OperationLogResponseDto[]
  /** @description 总数 */
  total: number
  /** @description 当前页码 */
  page: number
  /** @description 每页条数 */
  limit: number
}

/**
 * @description 操作日志查询
 * @param params GetApiLogsOperationsRequestType
 * @returns Promise<GetApiLogsOperationsResultType>
 */
export async function getApiLogsOperationsFunc(
  params: GetApiLogsOperationsRequestType
): Promise<GetApiLogsOperationsResultType> {
  const config: RequestConfig = {
    url: '/api/logs/operations',
    method: 'GET',
    params,
  }
  return request<GetApiLogsOperationsResultType>(config)
}

/**
 * @description 登录日志查询
 * @param params GetApiLogsLoginsRequestType
 * @returns Promise<GetApiLogsLoginsResultType>
 */
export interface GetApiLogsLoginsRequestType {
  /** @description 页码，从 1 开始 */
  page?: string
  /** @description 每页条数（1-100） */
  limit?: string
  /** @description 搜索关键字（按邮箱/IP 模糊匹配） */
  search?: string
  /** @description 按登录类型精确过滤：PASSWORD / EMAIL_CODE / LOGOUT / REFRESH */
  loginType?: string
  /** @description 按用户 ID 精确过滤 */
  userId?: string
  /** @description 按成功与否过滤 */
  success?: string
  /** @description 创建时间起（yyyy-MM-dd HH:mm:ss） */
  startTime?: string
  /** @description 创建时间止（yyyy-MM-dd HH:mm:ss） */
  endTime?: string
  /** @description 排序字段 */
  sortBy?: string
  /** @description 排序方向：ASC / DESC */
  sortOrder?: string
}

/**
 * @description 登录日志查询 的返回数据类型
 */
export interface GetApiLogsLoginsResultType {
  /** @description 登录日志列表 */
  list: LoginLogResponseDto[]
  /** @description 总数 */
  total: number
  /** @description 当前页码 */
  page: number
  /** @description 每页条数 */
  limit: number
}

/**
 * @description 登录日志查询
 * @param params GetApiLogsLoginsRequestType
 * @returns Promise<GetApiLogsLoginsResultType>
 */
export async function getApiLogsLoginsFunc(
  params: GetApiLogsLoginsRequestType
): Promise<GetApiLogsLoginsResultType> {
  const config: RequestConfig = {
    url: '/api/logs/logins',
    method: 'GET',
    params,
  }
  return request<GetApiLogsLoginsResultType>(config)
}
