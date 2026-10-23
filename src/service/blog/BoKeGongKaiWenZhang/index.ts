import { request } from '@/service/request'
import type { RequestConfig } from '@/service/request'
import type {
  PostPublicListItemDto,
  CategoryBriefDto,
  TagBriefDto,
  AdjacentPostDto,
  RelatedPostDto,
} from '@/service/blog/types'

/**
 * @description 公开文章列表
 * @param params GetApiBlogPostsRequestType
 * @returns Promise<GetApiBlogPostsResultType>
 */
export interface GetApiBlogPostsRequestType {
  /** @description 页码，从 1 开始 */
  page?: number
  /** @description 每页条数 */
  limit?: number
  /** @description 按分类 slug 过滤 */
  categorySlug?: string | null
  /** @description 按标签 slug 过滤 */
  tagSlug?: string | null
  /** @description 按标题/摘要关键字搜索 */
  search?: string | null
}

/**
 * @description 公开文章列表 的返回数据类型
 */
export interface GetApiBlogPostsResultType {
  /** @description 文章列表（置顶优先、发布时间倒序） */
  list: PostPublicListItemDto[]
  /** @description 总数 */
  total: number
  /** @description 页码 */
  page: number
  /** @description 每页条数 */
  limit: number
}

/**
 * @description 公开文章列表
 * @param params GetApiBlogPostsRequestType
 * @returns Promise<GetApiBlogPostsResultType>
 */
export async function getApiBlogPostsFunc(
  params: GetApiBlogPostsRequestType,
  options: Omit<RequestConfig, 'url' | 'method' | 'data' | 'params'> = {}
): Promise<GetApiBlogPostsResultType> {
  const config: RequestConfig = {
    ...options,
    url: '/api/blog/posts',
    method: 'GET',
    params: params,
  }
  return request<GetApiBlogPostsResultType>(config)
}

/**
 * @description 文章详情
 * @param params GetApiBlogPostsBySlugRequestType
 * @returns Promise<GetApiBlogPostsBySlugResultType>
 */
export interface GetApiBlogPostsBySlugRequestType {
  /** @description URL 标识 */
  slug: string
}

/**
 * @description 文章详情 的返回数据类型
 */
export interface GetApiBlogPostsBySlugResultType {
  /** @description 文章标题 */
  title: string
  /** @description URL 标识 */
  slug: string
  /** @description 文章摘要 */
  summary: string | null
  /** @description Markdown 正文 */
  content: string
  /** @description 封面文件 ID */
  coverFileId: string | null
  /** @description  */
  category: CategoryBriefDto | null
  /** @description 标签列表 */
  tags: TagBriefDto[]
  /** @description 发布时间 */
  publishedAt: string | null
  /** @description 更新时间 */
  updatedAt: string
  /** @description 累计阅读数 */
  viewCount: number
  /** @description 当前有效点赞数 */
  likeCount: number
  /** @description 已审核评论数 */
  commentCount: number
  /** @description 是否允许评论 */
  allowComment: boolean
  /** @description SEO 标题（空则前端回退文章标题） */
  seoTitle: string | null
  /** @description SEO 描述（空则前端回退摘要） */
  seoDescription: string | null
  /** @description  */
  prev: AdjacentPostDto | null
  /** @description  */
  next: AdjacentPostDto | null
}

/**
 * @description 文章详情
 * @param params GetApiBlogPostsBySlugRequestType
 * @returns Promise<GetApiBlogPostsBySlugResultType>
 */
export async function getApiBlogPostsBySlugFunc(
  params: GetApiBlogPostsBySlugRequestType,
  options: Omit<RequestConfig, 'url' | 'method' | 'data' | 'params'> = {}
): Promise<GetApiBlogPostsBySlugResultType> {
  const config: RequestConfig = {
    ...options,
    url: `/api/blog/posts/${params.slug}`,
    method: 'GET',
  }
  return request<GetApiBlogPostsBySlugResultType>(config)
}

/**
 * @description 相关文章
 * @param params GetApiBlogPostsRelatedBySlugRequestType
 * @returns Promise<GetApiBlogPostsRelatedBySlugResultType>
 */
export interface GetApiBlogPostsRelatedBySlugRequestType {
  /** @description URL 标识 */
  slug: string
}

/**
 * @description 相关文章 的返回数据类型
 */
export interface GetApiBlogPostsRelatedBySlugResultType {
  /** @description 相关文章列表（最多 5 条） */
  list: RelatedPostDto[]
}

/**
 * @description 相关文章
 * @param params GetApiBlogPostsRelatedBySlugRequestType
 * @returns Promise<GetApiBlogPostsRelatedBySlugResultType>
 */
export async function getApiBlogPostsRelatedBySlugFunc(
  params: GetApiBlogPostsRelatedBySlugRequestType,
  options: Omit<RequestConfig, 'url' | 'method' | 'data' | 'params'> = {}
): Promise<GetApiBlogPostsRelatedBySlugResultType> {
  const config: RequestConfig = {
    ...options,
    url: `/api/blog/posts/${params.slug}/related`,
    method: 'GET',
  }
  return request<GetApiBlogPostsRelatedBySlugResultType>(config)
}
