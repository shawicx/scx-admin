import { request } from '@/service/request'
import type { RequestConfig } from '@/service/request'
import type { TagPublicResponseDto } from '@/service/blog/types'

/**
 * @description 公开标签列表
 * @returns Promise<GetApiBlogTagsResultType>
 */
export interface GetApiBlogTagsRequestType {}

/**
 * @description 公开标签列表 的返回数据类型
 */
export interface GetApiBlogTagsResultType {
  /** @description 标签列表（仅启用，排序号升序） */
  list: TagPublicResponseDto[]
}

/**
 * @description 公开标签列表
 * @param params GetApiBlogTagsRequestType
 * @returns Promise<GetApiBlogTagsResultType>
 */
export async function getApiBlogTagsFunc(
  params: GetApiBlogTagsRequestType,
  options: Omit<RequestConfig, 'url' | 'method' | 'data' | 'params'> = {}
): Promise<GetApiBlogTagsResultType> {
  const config: RequestConfig = {
    ...options,
    url: '/api/blog/tags',
    method: 'GET',
  }
  return request<GetApiBlogTagsResultType>(config)
}
