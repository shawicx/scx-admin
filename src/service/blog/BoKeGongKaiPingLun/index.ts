import { request } from '@/service/request'
import type { RequestConfig } from '@/service/request'
import type { CommentPublicResponseDto } from '@/service/blog/types'

/**
 * @description 已审核评论列表
 * @param params GetApiBlogPostsCommentsBySlugRequestType
 * @returns Promise<GetApiBlogPostsCommentsBySlugResultType>
 */
export interface GetApiBlogPostsCommentsBySlugRequestType {
  /** @description 页码，从 1 开始 */
  page?: number
  /** @description 每页条数 */
  limit?: number
  /** @description URL 标识 */
  slug: string
}

/**
 * @description 已审核评论列表 的返回数据类型
 */
export interface GetApiBlogPostsCommentsBySlugResultType {
  /** @description 已审核评论列表（时间正序） */
  list: CommentPublicResponseDto[]
  /** @description 总数 */
  total: number
  /** @description 页码 */
  page: number
  /** @description 每页条数 */
  limit: number
}

/**
 * @description 已审核评论列表
 * @param params GetApiBlogPostsCommentsBySlugRequestType
 * @returns Promise<GetApiBlogPostsCommentsBySlugResultType>
 */
export async function getApiBlogPostsCommentsBySlugFunc(
  params: GetApiBlogPostsCommentsBySlugRequestType,
  options: Omit<RequestConfig, 'url' | 'method' | 'data' | 'params'> = {}
): Promise<GetApiBlogPostsCommentsBySlugResultType> {
  const { slug, page, limit } = params
  const config: RequestConfig = {
    ...options,
    url: `/api/blog/posts/${params.slug}/comments`,
    method: 'GET',
    params: { page, limit },
  }
  return request<GetApiBlogPostsCommentsBySlugResultType>(config)
}

/**
 * @description 发表评论
 * @param params PostApiBlogPostsCommentsBySlugRequestType
 * @returns Promise<PostApiBlogPostsCommentsBySlugResultType>
 */
export interface PostApiBlogPostsCommentsBySlugRequestType {
  /** @description 访客昵称 */
  nickname: string
  /** @description 邮箱（选填，不公开） */
  email?: string | null
  /** @description 个人网站（选填） */
  website?: string | null
  /** @description 评论正文（纯文本） */
  content: string
  /** @description 回复的评论 ID（仅支持回复一级评论，选填） */
  parentId?: string | null
  /** @description URL 标识 */
  slug: string
}

/**
 * @description 发表评论 的返回数据类型
 */
export interface PostApiBlogPostsCommentsBySlugResultType {
  /** @description  */
  message: string
}

/**
 * @description 发表评论
 * @param params PostApiBlogPostsCommentsBySlugRequestType
 * @returns Promise<PostApiBlogPostsCommentsBySlugResultType>
 */
export async function postApiBlogPostsCommentsBySlugFunc(
  params: PostApiBlogPostsCommentsBySlugRequestType,
  options: Omit<RequestConfig, 'url' | 'method' | 'data' | 'params'> = {}
): Promise<PostApiBlogPostsCommentsBySlugResultType> {
  const { slug, ...body } = params
  const config: RequestConfig = {
    ...options,
    url: `/api/blog/posts/${params.slug}/comments`,
    method: 'POST',
    data: body,
  }
  return request<PostApiBlogPostsCommentsBySlugResultType>(config)
}
