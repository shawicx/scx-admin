import { request } from '@/service/request'
import type { RequestConfig } from '@/service/request'
import type { TagAdminResponseDto } from '@/service/blog/types'

/**
 * @description 更新标签
 * @param params PutApiBlogAdminTagsByIdRequestType
 * @returns Promise<PutApiBlogAdminTagsByIdResultType>
 */
export interface PutApiBlogAdminTagsByIdRequestType {
  /** @description 标签名称 */
  name: string
  /** @description URL 标识 */
  slug?: string | null
  /** @description 标签描述 */
  description?: string | null
  /** @description 排序号（缺省 0） */
  sort?: number | null
  /** @description 状态（0 停用 / 1 启用） */
  status?: number | null
  /** @description 标签 ID */
  id: string
}

/**
 * @description 更新标签 的返回数据类型
 */
export interface PutApiBlogAdminTagsByIdResultType {
  /** @description 标签 ID */
  id: string
  /** @description 标签名称 */
  name: string
  /** @description URL 标识 */
  slug: string
  /** @description 标签描述 */
  description: string | null
  /** @description 排序号 */
  sort: number
  /** @description 状态（0 停用 / 1 启用） */
  status: number
  /** @description 公开可见文章数 */
  publicPostCount: number
}

/**
 * @description 更新标签
 * @param params PutApiBlogAdminTagsByIdRequestType
 * @returns Promise<PutApiBlogAdminTagsByIdResultType>
 */
export async function putApiBlogAdminTagsByIdFunc(
  params: PutApiBlogAdminTagsByIdRequestType,
  options: Omit<RequestConfig, 'url' | 'method' | 'data' | 'params'> = {}
): Promise<PutApiBlogAdminTagsByIdResultType> {
  const { id, ...body } = params
  const config: RequestConfig = {
    ...options,
    url: `/api/blog/admin/tags/${params.id}`,
    method: 'PUT',
    data: body,
  }
  return request<PutApiBlogAdminTagsByIdResultType>(config)
}

/**
 * @description 删除标签
 * @param params DeleteApiBlogAdminTagsByIdRequestType
 * @returns Promise<DeleteApiBlogAdminTagsByIdResultType>
 */
export interface DeleteApiBlogAdminTagsByIdRequestType {
  /** @description 标签 ID */
  id: string
}

/**
 * @description 删除标签 的返回数据类型
 */
export interface DeleteApiBlogAdminTagsByIdResultType {
  /** @description  */
  message: string
}

/**
 * @description 删除标签
 * @param params DeleteApiBlogAdminTagsByIdRequestType
 * @returns Promise<DeleteApiBlogAdminTagsByIdResultType>
 */
export async function deleteApiBlogAdminTagsByIdFunc(
  params: DeleteApiBlogAdminTagsByIdRequestType,
  options: Omit<RequestConfig, 'url' | 'method' | 'data' | 'params'> = {}
): Promise<DeleteApiBlogAdminTagsByIdResultType> {
  const config: RequestConfig = {
    ...options,
    url: `/api/blog/admin/tags/${params.id}`,
    method: 'DELETE',
  }
  return request<DeleteApiBlogAdminTagsByIdResultType>(config)
}

/**
 * @description 标签列表
 * @returns Promise<GetApiBlogAdminTagsResultType>
 */
export interface GetApiBlogAdminTagsRequestType {}

/**
 * @description 标签列表 的返回数据类型
 */
export interface GetApiBlogAdminTagsResultType {
  /** @description 标签列表（排序号升序） */
  list: TagAdminResponseDto[]
}

/**
 * @description 标签列表
 * @param params GetApiBlogAdminTagsRequestType
 * @returns Promise<GetApiBlogAdminTagsResultType>
 */
export async function getApiBlogAdminTagsFunc(
  params: GetApiBlogAdminTagsRequestType,
  options: Omit<RequestConfig, 'url' | 'method' | 'data' | 'params'> = {}
): Promise<GetApiBlogAdminTagsResultType> {
  const config: RequestConfig = {
    ...options,
    url: '/api/blog/admin/tags',
    method: 'GET',
  }
  return request<GetApiBlogAdminTagsResultType>(config)
}

/**
 * @description 创建标签
 * @param params PostApiBlogAdminTagsRequestType
 * @returns Promise<PostApiBlogAdminTagsResultType>
 */
export interface PostApiBlogAdminTagsRequestType {
  /** @description 标签名称 */
  name: string
  /** @description URL 标识（缺省时由名称生成） */
  slug?: string | null
  /** @description 标签描述 */
  description?: string | null
  /** @description 排序号（越小越靠前，缺省 0） */
  sort?: number | null
  /** @description 状态（0 停用 / 1 启用，缺省启用） */
  status?: number | null
}

/**
 * @description 创建标签 的返回数据类型
 */
export interface PostApiBlogAdminTagsResultType {
  /** @description 标签 ID */
  id: string
  /** @description 标签名称 */
  name: string
  /** @description URL 标识 */
  slug: string
  /** @description 标签描述 */
  description: string | null
  /** @description 排序号 */
  sort: number
  /** @description 状态（0 停用 / 1 启用） */
  status: number
  /** @description 公开可见文章数 */
  publicPostCount: number
}

/**
 * @description 创建标签
 * @param params PostApiBlogAdminTagsRequestType
 * @returns Promise<PostApiBlogAdminTagsResultType>
 */
export async function postApiBlogAdminTagsFunc(
  params: PostApiBlogAdminTagsRequestType,
  options: Omit<RequestConfig, 'url' | 'method' | 'data' | 'params'> = {}
): Promise<PostApiBlogAdminTagsResultType> {
  const config: RequestConfig = {
    ...options,
    url: '/api/blog/admin/tags',
    method: 'POST',
    data: params,
  }
  return request<PostApiBlogAdminTagsResultType>(config)
}
