import { request } from '@/service/request'
import type { RequestConfig } from '@/service/request'
import type { SessionResponseDto } from '@/service/ai/types'

/**
 * @description 重命名会话
 * @param params PutApiAiSessionsUpdateRequestType
 * @returns Promise<PutApiAiSessionsUpdateResultType>
 */
export interface PutApiAiSessionsUpdateRequestType {
  /** @description 会话 ID */
  id: string
  /** @description 新标题 */
  title: string
}

/**
 * @description 重命名会话 的返回数据类型
 */
export interface PutApiAiSessionsUpdateResultType {
  /** @description 会话 ID */
  id: string
  /** @description 会话标题 */
  title: string
  /** @description 创建时间 */
  createdAt: string
  /** @description 最后活跃时间 */
  updatedAt: string
}

/**
 * @description 重命名会话
 * @param params PutApiAiSessionsUpdateRequestType
 * @returns Promise<PutApiAiSessionsUpdateResultType>
 */
export async function putApiAiSessionsUpdateFunc(
  params: PutApiAiSessionsUpdateRequestType,
  options: Omit<RequestConfig, 'url' | 'method' | 'data' | 'params'> = {}
): Promise<PutApiAiSessionsUpdateResultType> {
  const config: RequestConfig = {
    ...options,
    url: '/api/ai/sessions/update',
    method: 'PUT',
    data: params,
  }
  return request<PutApiAiSessionsUpdateResultType>(config)
}

/**
 * @description 会话列表
 * @returns Promise<GetApiAiSessionsListResultType>
 */
export interface GetApiAiSessionsListRequestType {}

/**
 * @description 会话列表 的返回数据类型
 */
export interface GetApiAiSessionsListResultType {
  /** @description 会话列表 */
  list: SessionResponseDto[]
}

/**
 * @description 会话列表
 * @param params GetApiAiSessionsListRequestType
 * @returns Promise<GetApiAiSessionsListResultType>
 */
export async function getApiAiSessionsListFunc(
  params: GetApiAiSessionsListRequestType,
  options: Omit<RequestConfig, 'url' | 'method' | 'data' | 'params'> = {}
): Promise<GetApiAiSessionsListResultType> {
  const config: RequestConfig = {
    ...options,
    url: '/api/ai/sessions/list',
    method: 'GET',
  }
  return request<GetApiAiSessionsListResultType>(config)
}

/**
 * @description 删除会话
 * @param params DeleteApiAiSessionsDeleteRequestType
 * @returns Promise<DeleteApiAiSessionsDeleteResultType>
 */
export interface DeleteApiAiSessionsDeleteRequestType {
  /** @description 会话 ID */
  id: string
}

/**
 * @description 删除会话 的返回数据类型
 */
export interface DeleteApiAiSessionsDeleteResultType {
  /** @description  */
  message: string
}

/**
 * @description 删除会话
 * @param params DeleteApiAiSessionsDeleteRequestType
 * @returns Promise<DeleteApiAiSessionsDeleteResultType>
 */
export async function deleteApiAiSessionsDeleteFunc(
  params: DeleteApiAiSessionsDeleteRequestType,
  options: Omit<RequestConfig, 'url' | 'method' | 'data' | 'params'> = {}
): Promise<DeleteApiAiSessionsDeleteResultType> {
  const config: RequestConfig = {
    ...options,
    url: '/api/ai/sessions/delete',
    method: 'DELETE',
    params: params,
  }
  return request<DeleteApiAiSessionsDeleteResultType>(config)
}
