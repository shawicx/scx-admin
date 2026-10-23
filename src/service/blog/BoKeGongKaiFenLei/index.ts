import { request } from '@/service/request'
import type { RequestConfig } from '@/service/request'
import type { CategoryPublicResponseDto } from '@/service/blog/types'

/**
 * @description 公开分类列表
 * @returns Promise<GetApiBlogCategoriesResultType>
 */
export interface GetApiBlogCategoriesRequestType {}

/**
 * @description 公开分类列表 的返回数据类型
 */
export interface GetApiBlogCategoriesResultType {
  /** @description 分类列表（仅启用，排序号升序） */
  list: CategoryPublicResponseDto[]
}

/**
 * @description 公开分类列表
 * @param params GetApiBlogCategoriesRequestType
 * @returns Promise<GetApiBlogCategoriesResultType>
 */
export async function getApiBlogCategoriesFunc(
  params: GetApiBlogCategoriesRequestType,
  options: Omit<RequestConfig, 'url' | 'method' | 'data' | 'params'> = {}
): Promise<GetApiBlogCategoriesResultType> {
  const config: RequestConfig = {
    ...options,
    url: '/api/blog/categories',
    method: 'GET',
  }
  return request<GetApiBlogCategoriesResultType>(config)
}
