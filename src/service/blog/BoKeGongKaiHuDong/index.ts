import { request } from '@/service/request'
import type { RequestConfig } from '@/service/request'

/**
 * @description 上报阅读
 * @param params PostApiBlogPostsViewsBySlugRequestType
 * @returns Promise<PostApiBlogPostsViewsBySlugResultType>
 */
export interface PostApiBlogPostsViewsBySlugRequestType {
  /** @description URL 标识 */
  slug: string
}

/**
 * @description 上报阅读 的返回数据类型
 */
export interface PostApiBlogPostsViewsBySlugResultType {
  /** @description  */
  message: string
}

/**
 * @description 上报阅读
 * @param params PostApiBlogPostsViewsBySlugRequestType
 * @returns Promise<PostApiBlogPostsViewsBySlugResultType>
 */
export async function postApiBlogPostsViewsBySlugFunc(
  params: PostApiBlogPostsViewsBySlugRequestType,
  options: Omit<RequestConfig, 'url' | 'method' | 'data' | 'params'> = {}
): Promise<PostApiBlogPostsViewsBySlugResultType> {
  const config: RequestConfig = {
    ...options,
    url: `/api/blog/posts/${params.slug}/views`,
    method: 'POST',
  }
  return request<PostApiBlogPostsViewsBySlugResultType>(config)
}

/**
 * @description 点赞
 * @param params PostApiBlogPostsLikeBySlugRequestType
 * @returns Promise<PostApiBlogPostsLikeBySlugResultType>
 */
export interface PostApiBlogPostsLikeBySlugRequestType {
  /** @description URL 标识 */
  slug: string
}

/**
 * @description 点赞 的返回数据类型
 */
export interface PostApiBlogPostsLikeBySlugResultType {
  /** @description 当前有效点赞数 */
  count: number
  /** @description 当前访客是否已点赞 */
  liked: boolean
}

/**
 * @description 点赞
 * @param params PostApiBlogPostsLikeBySlugRequestType
 * @returns Promise<PostApiBlogPostsLikeBySlugResultType>
 */
export async function postApiBlogPostsLikeBySlugFunc(
  params: PostApiBlogPostsLikeBySlugRequestType,
  options: Omit<RequestConfig, 'url' | 'method' | 'data' | 'params'> = {}
): Promise<PostApiBlogPostsLikeBySlugResultType> {
  const config: RequestConfig = {
    ...options,
    url: `/api/blog/posts/${params.slug}/like`,
    method: 'POST',
  }
  return request<PostApiBlogPostsLikeBySlugResultType>(config)
}

/**
 * @description 取消点赞
 * @param params DeleteApiBlogPostsLikeBySlugRequestType
 * @returns Promise<DeleteApiBlogPostsLikeBySlugResultType>
 */
export interface DeleteApiBlogPostsLikeBySlugRequestType {
  /** @description URL 标识 */
  slug: string
}

/**
 * @description 取消点赞 的返回数据类型
 */
export interface DeleteApiBlogPostsLikeBySlugResultType {
  /** @description 当前有效点赞数 */
  count: number
  /** @description 当前访客是否已点赞 */
  liked: boolean
}

/**
 * @description 取消点赞
 * @param params DeleteApiBlogPostsLikeBySlugRequestType
 * @returns Promise<DeleteApiBlogPostsLikeBySlugResultType>
 */
export async function deleteApiBlogPostsLikeBySlugFunc(
  params: DeleteApiBlogPostsLikeBySlugRequestType,
  options: Omit<RequestConfig, 'url' | 'method' | 'data' | 'params'> = {}
): Promise<DeleteApiBlogPostsLikeBySlugResultType> {
  const config: RequestConfig = {
    ...options,
    url: `/api/blog/posts/${params.slug}/like`,
    method: 'DELETE',
  }
  return request<DeleteApiBlogPostsLikeBySlugResultType>(config)
}
