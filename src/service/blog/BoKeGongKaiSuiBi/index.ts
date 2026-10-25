import { request } from '@/service/request'
import type { RequestConfig } from '@/service/request'
import type { NotePublicListItemDto } from '@/service/blog/types'

/**
 * @description 公开随笔列表
 * @param params GetApiBlogNotesRequestType
 * @returns Promise<GetApiBlogNotesResultType>
 */
export interface GetApiBlogNotesRequestType {
  /** @description 页码，从 1 开始 */
  page?: number
  /** @description 每页条数（上限 50） */
  limit?: number
}

/**
 * @description 公开随笔列表 的返回数据类型
 */
export interface GetApiBlogNotesResultType {
  /** @description 随笔列表（发布时间倒序） */
  list: NotePublicListItemDto[]
  /** @description 总数 */
  total: number
  /** @description 页码 */
  page: number
  /** @description 每页条数 */
  limit: number
}

/**
 * @description 公开随笔列表
 * @param params GetApiBlogNotesRequestType
 * @returns Promise<GetApiBlogNotesResultType>
 */
export async function getApiBlogNotesFunc(
  params: GetApiBlogNotesRequestType,
  options: Omit<RequestConfig, 'url' | 'method' | 'data' | 'params'> = {}
): Promise<GetApiBlogNotesResultType> {
  const config: RequestConfig = {
    ...options,
    url: '/api/blog/notes',
    method: 'GET',
    params: params,
  }
  return request<GetApiBlogNotesResultType>(config)
}
