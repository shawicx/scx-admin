import { request } from '@/service/request'
import type { RequestConfig } from '@/service/request'
import type { CategoryAdminResponseDto } from '@/service/blog/types'

/**
 * @description 更新分类
 * @param params PutApiBlogAdminCategoriesByIdRequestType
 * @returns Promise<PutApiBlogAdminCategoriesByIdResultType>
 */
export interface PutApiBlogAdminCategoriesByIdRequestType {
  /** @description 分类名称 */
  name: string
  /** @description URL 标识 */
  slug?: string | null
  /** @description 分类描述 */
  description?: string | null
  /** @description 排序号（缺省 0） */
  sort?: number | null
  /** @description 状态（0 停用 / 1 启用） */
  status?: number | null
  /** @description 分类 ID */
  id: string
}

/**
 * @description 更新分类 的返回数据类型
 */
export interface PutApiBlogAdminCategoriesByIdResultType {
  /** @description 分类 ID */
  id: string
  /** @description 分类名称 */
  name: string
  /** @description URL 标识 */
  slug: string
  /** @description 分类描述 */
  description: string | null
  /** @description 排序号 */
  sort: number
  /** @description 状态（0 停用 / 1 启用） */
  status: number
  /** @description 未删除文章数 */
  postCount: number
  /** @description 公开可见文章数 */
  publicPostCount: number
}

/**
 * @description 更新分类
 * @param params PutApiBlogAdminCategoriesByIdRequestType
 * @returns Promise<PutApiBlogAdminCategoriesByIdResultType>
 */
export async function putApiBlogAdminCategoriesByIdFunc(
  params: PutApiBlogAdminCategoriesByIdRequestType,
  options: Omit<RequestConfig, 'url' | 'method' | 'data' | 'params'> = {}
): Promise<PutApiBlogAdminCategoriesByIdResultType> {
  const { id, ...body } = params
  const config: RequestConfig = {
    ...options,
    url: `/api/blog/admin/categories/${params.id}`,
    method: 'PUT',
    data: body,
  }
  return request<PutApiBlogAdminCategoriesByIdResultType>(config)
}

/**
 * @description 删除分类
 * @param params DeleteApiBlogAdminCategoriesByIdRequestType
 * @returns Promise<DeleteApiBlogAdminCategoriesByIdResultType>
 */
export interface DeleteApiBlogAdminCategoriesByIdRequestType {
  /** @description 分类 ID */
  id: string
}

/**
 * @description 删除分类 的返回数据类型
 */
export interface DeleteApiBlogAdminCategoriesByIdResultType {
  /** @description  */
  message: string
}

/**
 * @description 删除分类
 * @param params DeleteApiBlogAdminCategoriesByIdRequestType
 * @returns Promise<DeleteApiBlogAdminCategoriesByIdResultType>
 */
export async function deleteApiBlogAdminCategoriesByIdFunc(
  params: DeleteApiBlogAdminCategoriesByIdRequestType,
  options: Omit<RequestConfig, 'url' | 'method' | 'data' | 'params'> = {}
): Promise<DeleteApiBlogAdminCategoriesByIdResultType> {
  const config: RequestConfig = {
    ...options,
    url: `/api/blog/admin/categories/${params.id}`,
    method: 'DELETE',
  }
  return request<DeleteApiBlogAdminCategoriesByIdResultType>(config)
}

/**
 * @description 分类列表
 * @returns Promise<GetApiBlogAdminCategoriesResultType>
 */
export interface GetApiBlogAdminCategoriesRequestType {}

/**
 * @description 分类列表 的返回数据类型
 */
export interface GetApiBlogAdminCategoriesResultType {
  /** @description 分类列表（排序号升序） */
  list: CategoryAdminResponseDto[]
}

/**
 * @description 分类列表
 * @param params GetApiBlogAdminCategoriesRequestType
 * @returns Promise<GetApiBlogAdminCategoriesResultType>
 */
export async function getApiBlogAdminCategoriesFunc(
  params: GetApiBlogAdminCategoriesRequestType,
  options: Omit<RequestConfig, 'url' | 'method' | 'data' | 'params'> = {}
): Promise<GetApiBlogAdminCategoriesResultType> {
  const config: RequestConfig = {
    ...options,
    url: '/api/blog/admin/categories',
    method: 'GET',
  }
  return request<GetApiBlogAdminCategoriesResultType>(config)
}

/**
 * @description 创建分类
 * @param params PostApiBlogAdminCategoriesRequestType
 * @returns Promise<PostApiBlogAdminCategoriesResultType>
 */
export interface PostApiBlogAdminCategoriesRequestType {
  /** @description 分类名称 */
  name: string
  /** @description URL 标识（缺省时由名称生成） */
  slug?: string | null
  /** @description 分类描述 */
  description?: string | null
  /** @description 排序号（越小越靠前，缺省 0） */
  sort?: number | null
  /** @description 状态（0 停用 / 1 启用，缺省启用） */
  status?: number | null
}

/**
 * @description 创建分类 的返回数据类型
 */
export interface PostApiBlogAdminCategoriesResultType {
  /** @description 分类 ID */
  id: string
  /** @description 分类名称 */
  name: string
  /** @description URL 标识 */
  slug: string
  /** @description 分类描述 */
  description: string | null
  /** @description 排序号 */
  sort: number
  /** @description 状态（0 停用 / 1 启用） */
  status: number
  /** @description 未删除文章数 */
  postCount: number
  /** @description 公开可见文章数 */
  publicPostCount: number
}

/**
 * @description 创建分类
 * @param params PostApiBlogAdminCategoriesRequestType
 * @returns Promise<PostApiBlogAdminCategoriesResultType>
 */
export async function postApiBlogAdminCategoriesFunc(
  params: PostApiBlogAdminCategoriesRequestType,
  options: Omit<RequestConfig, 'url' | 'method' | 'data' | 'params'> = {}
): Promise<PostApiBlogAdminCategoriesResultType> {
  const config: RequestConfig = {
    ...options,
    url: '/api/blog/admin/categories',
    method: 'POST',
    data: params,
  }
  return request<PostApiBlogAdminCategoriesResultType>(config)
}
