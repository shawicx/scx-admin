import { request } from '@/service/request'
import type { RequestConfig } from '@/service/request'
import type { PostAdminListItemDto } from '@/service/blog/types'

/**
 * @description 文章详情
 * @param params GetApiBlogAdminPostsByIdRequestType
 * @returns Promise<GetApiBlogAdminPostsByIdResultType>
 */
export interface GetApiBlogAdminPostsByIdRequestType {
  /** @description 文章 ID */
  id: string
}

/**
 * @description 文章详情 的返回数据类型
 */
export interface GetApiBlogAdminPostsByIdResultType {
  /** @description 文章 ID */
  id: string
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
  /** @description 分类 ID（未分类为 null） */
  categoryId: string | null
  /** @description 标签 ID 列表 */
  tagIds: string[]
  /** @description 状态（0 草稿 / 1 已发布 / 2 已归档） */
  status: number
  /** @description 可见性（0 公开 / 1 私密） */
  visibility: number
  /** @description 是否置顶 */
  isTop: boolean
  /** @description 是否允许评论 */
  allowComment: boolean
  /** @description 发布时间 */
  publishedAt: string | null
  /** @description SEO 标题 */
  seoTitle: string | null
  /** @description SEO 描述 */
  seoDescription: string | null
  /** @description 创建时间 */
  createdAt: string
  /** @description 更新时间 */
  updatedAt: string
}

/**
 * @description 文章详情
 * @param params GetApiBlogAdminPostsByIdRequestType
 * @returns Promise<GetApiBlogAdminPostsByIdResultType>
 */
export async function getApiBlogAdminPostsByIdFunc(
  params: GetApiBlogAdminPostsByIdRequestType,
  options: Omit<RequestConfig, 'url' | 'method' | 'data' | 'params'> = {}
): Promise<GetApiBlogAdminPostsByIdResultType> {
  const config: RequestConfig = {
    ...options,
    url: `/api/blog/admin/posts/${params.id}`,
    method: 'GET',
  }
  return request<GetApiBlogAdminPostsByIdResultType>(config)
}

/**
 * @description 更新文章
 * @param params PutApiBlogAdminPostsByIdRequestType
 * @returns Promise<PutApiBlogAdminPostsByIdResultType>
 */
export interface PutApiBlogAdminPostsByIdRequestType {
  /** @description 文章标题 */
  title: string
  /** @description URL 标识（修改已发布文章的 slug 需自行处理旧链接重定向） */
  slug?: string | null
  /** @description 文章摘要 */
  summary?: string | null
  /** @description Markdown 正文 */
  content: string
  /** @description 封面文件 ID */
  coverFileId?: string | null
  /** @description 分类 ID（传空表示改为未分类） */
  categoryId?: string | null
  /** @description 标签 ID 列表（整体替换，缺省为空） */
  tagIds?: string[] | null
  /** @description 可见性（0 公开 / 1 私密，缺省公开） */
  visibility?: number | null
  /** @description 是否置顶（缺省不置顶） */
  isTop?: boolean | null
  /** @description 是否允许评论（缺省允许） */
  allowComment?: boolean | null
  /** @description SEO 标题 */
  seoTitle?: string | null
  /** @description SEO 描述 */
  seoDescription?: string | null
  /** @description 文章 ID */
  id: string
}

/**
 * @description 更新文章 的返回数据类型
 */
export interface PutApiBlogAdminPostsByIdResultType {
  /** @description 文章 ID */
  id: string
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
  /** @description 分类 ID（未分类为 null） */
  categoryId: string | null
  /** @description 标签 ID 列表 */
  tagIds: string[]
  /** @description 状态（0 草稿 / 1 已发布 / 2 已归档） */
  status: number
  /** @description 可见性（0 公开 / 1 私密） */
  visibility: number
  /** @description 是否置顶 */
  isTop: boolean
  /** @description 是否允许评论 */
  allowComment: boolean
  /** @description 发布时间 */
  publishedAt: string | null
  /** @description SEO 标题 */
  seoTitle: string | null
  /** @description SEO 描述 */
  seoDescription: string | null
  /** @description 创建时间 */
  createdAt: string
  /** @description 更新时间 */
  updatedAt: string
}

/**
 * @description 更新文章
 * @param params PutApiBlogAdminPostsByIdRequestType
 * @returns Promise<PutApiBlogAdminPostsByIdResultType>
 */
export async function putApiBlogAdminPostsByIdFunc(
  params: PutApiBlogAdminPostsByIdRequestType,
  options: Omit<RequestConfig, 'url' | 'method' | 'data' | 'params'> = {}
): Promise<PutApiBlogAdminPostsByIdResultType> {
  const { id, ...body } = params
  const config: RequestConfig = {
    ...options,
    url: `/api/blog/admin/posts/${params.id}`,
    method: 'PUT',
    data: body,
  }
  return request<PutApiBlogAdminPostsByIdResultType>(config)
}

/**
 * @description 删除文章
 * @param params DeleteApiBlogAdminPostsByIdRequestType
 * @returns Promise<DeleteApiBlogAdminPostsByIdResultType>
 */
export interface DeleteApiBlogAdminPostsByIdRequestType {
  /** @description 文章 ID */
  id: string
}

/**
 * @description 删除文章 的返回数据类型
 */
export interface DeleteApiBlogAdminPostsByIdResultType {
  /** @description  */
  message: string
}

/**
 * @description 删除文章
 * @param params DeleteApiBlogAdminPostsByIdRequestType
 * @returns Promise<DeleteApiBlogAdminPostsByIdResultType>
 */
export async function deleteApiBlogAdminPostsByIdFunc(
  params: DeleteApiBlogAdminPostsByIdRequestType,
  options: Omit<RequestConfig, 'url' | 'method' | 'data' | 'params'> = {}
): Promise<DeleteApiBlogAdminPostsByIdResultType> {
  const config: RequestConfig = {
    ...options,
    url: `/api/blog/admin/posts/${params.id}`,
    method: 'DELETE',
  }
  return request<DeleteApiBlogAdminPostsByIdResultType>(config)
}

/**
 * @description 文章管理列表
 * @param params GetApiBlogAdminPostsRequestType
 * @returns Promise<GetApiBlogAdminPostsResultType>
 */
export interface GetApiBlogAdminPostsRequestType {
  /** @description 页码，从 1 开始 */
  page?: number
  /** @description 每页条数 */
  limit?: number
  /** @description 搜索关键字（标题 / slug） */
  search?: string | null
  /** @description 按状态过滤（0 草稿 / 1 已发布 / 2 已归档） */
  status?: number | null
  /** @description 按分类 ID 过滤 */
  categoryId?: string | null
  /** @description 按是否置顶过滤 */
  isTop?: boolean | null
  /** @description 排序字段（createdAt / updatedAt / publishedAt / title） */
  sortBy?: string
  /** @description 排序方向（asc / desc） */
  sortOrder?: string
}

/**
 * @description 文章管理列表 的返回数据类型
 */
export interface GetApiBlogAdminPostsResultType {
  /** @description 文章列表 */
  list: PostAdminListItemDto[]
  /** @description 总数 */
  total: number
  /** @description 页码 */
  page: number
  /** @description 每页条数 */
  limit: number
}

/**
 * @description 文章管理列表
 * @param params GetApiBlogAdminPostsRequestType
 * @returns Promise<GetApiBlogAdminPostsResultType>
 */
export async function getApiBlogAdminPostsFunc(
  params: GetApiBlogAdminPostsRequestType,
  options: Omit<RequestConfig, 'url' | 'method' | 'data' | 'params'> = {}
): Promise<GetApiBlogAdminPostsResultType> {
  const config: RequestConfig = {
    ...options,
    url: '/api/blog/admin/posts',
    method: 'GET',
    params: params,
  }
  return request<GetApiBlogAdminPostsResultType>(config)
}

/**
 * @description 创建文章
 * @param params PostApiBlogAdminPostsRequestType
 * @returns Promise<PostApiBlogAdminPostsResultType>
 */
export interface PostApiBlogAdminPostsRequestType {
  /** @description 文章标题 */
  title: string
  /** @description URL 标识（缺省时由标题生成） */
  slug?: string | null
  /** @description 文章摘要 */
  summary?: string | null
  /** @description Markdown 正文 */
  content: string
  /** @description 封面文件 ID（file-service 文件标识） */
  coverFileId?: string | null
  /** @description 分类 ID */
  categoryId?: string | null
  /** @description 标签 ID 列表（缺省为空） */
  tagIds?: string[] | null
  /** @description 可见性（0 公开 / 1 私密，缺省公开） */
  visibility?: number | null
  /** @description 是否置顶 */
  isTop?: boolean | null
  /** @description 是否允许评论 */
  allowComment?: boolean | null
  /** @description SEO 标题（空则回退文章标题） */
  seoTitle?: string | null
  /** @description SEO 描述（空则回退摘要） */
  seoDescription?: string | null
}

/**
 * @description 创建文章 的返回数据类型
 */
export interface PostApiBlogAdminPostsResultType {
  /** @description 文章 ID */
  id: string
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
  /** @description 分类 ID（未分类为 null） */
  categoryId: string | null
  /** @description 标签 ID 列表 */
  tagIds: string[]
  /** @description 状态（0 草稿 / 1 已发布 / 2 已归档） */
  status: number
  /** @description 可见性（0 公开 / 1 私密） */
  visibility: number
  /** @description 是否置顶 */
  isTop: boolean
  /** @description 是否允许评论 */
  allowComment: boolean
  /** @description 发布时间 */
  publishedAt: string | null
  /** @description SEO 标题 */
  seoTitle: string | null
  /** @description SEO 描述 */
  seoDescription: string | null
  /** @description 创建时间 */
  createdAt: string
  /** @description 更新时间 */
  updatedAt: string
}

/**
 * @description 创建文章
 * @param params PostApiBlogAdminPostsRequestType
 * @returns Promise<PostApiBlogAdminPostsResultType>
 */
export async function postApiBlogAdminPostsFunc(
  params: PostApiBlogAdminPostsRequestType,
  options: Omit<RequestConfig, 'url' | 'method' | 'data' | 'params'> = {}
): Promise<PostApiBlogAdminPostsResultType> {
  const config: RequestConfig = {
    ...options,
    url: '/api/blog/admin/posts',
    method: 'POST',
    data: params,
  }
  return request<PostApiBlogAdminPostsResultType>(config)
}

/**
 * @description 撤回发布
 * @param params PostApiBlogAdminPostsWithdrawByIdRequestType
 * @returns Promise<PostApiBlogAdminPostsWithdrawByIdResultType>
 */
export interface PostApiBlogAdminPostsWithdrawByIdRequestType {
  /** @description 文章 ID */
  id: string
}

/**
 * @description 撤回发布 的返回数据类型
 */
export interface PostApiBlogAdminPostsWithdrawByIdResultType {
  /** @description 文章 ID */
  id: string
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
  /** @description 分类 ID（未分类为 null） */
  categoryId: string | null
  /** @description 标签 ID 列表 */
  tagIds: string[]
  /** @description 状态（0 草稿 / 1 已发布 / 2 已归档） */
  status: number
  /** @description 可见性（0 公开 / 1 私密） */
  visibility: number
  /** @description 是否置顶 */
  isTop: boolean
  /** @description 是否允许评论 */
  allowComment: boolean
  /** @description 发布时间 */
  publishedAt: string | null
  /** @description SEO 标题 */
  seoTitle: string | null
  /** @description SEO 描述 */
  seoDescription: string | null
  /** @description 创建时间 */
  createdAt: string
  /** @description 更新时间 */
  updatedAt: string
}

/**
 * @description 撤回发布
 * @param params PostApiBlogAdminPostsWithdrawByIdRequestType
 * @returns Promise<PostApiBlogAdminPostsWithdrawByIdResultType>
 */
export async function postApiBlogAdminPostsWithdrawByIdFunc(
  params: PostApiBlogAdminPostsWithdrawByIdRequestType,
  options: Omit<RequestConfig, 'url' | 'method' | 'data' | 'params'> = {}
): Promise<PostApiBlogAdminPostsWithdrawByIdResultType> {
  const config: RequestConfig = {
    ...options,
    url: `/api/blog/admin/posts/${params.id}/withdraw`,
    method: 'POST',
  }
  return request<PostApiBlogAdminPostsWithdrawByIdResultType>(config)
}

/**
 * @description 设置置顶
 * @param params PostApiBlogAdminPostsTopByIdRequestType
 * @returns Promise<PostApiBlogAdminPostsTopByIdResultType>
 */
export interface PostApiBlogAdminPostsTopByIdRequestType {
  /** @description 是否置顶 */
  isTop: boolean
  /** @description 文章 ID */
  id: string
}

/**
 * @description 设置置顶 的返回数据类型
 */
export interface PostApiBlogAdminPostsTopByIdResultType {
  /** @description 文章 ID */
  id: string
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
  /** @description 分类 ID（未分类为 null） */
  categoryId: string | null
  /** @description 标签 ID 列表 */
  tagIds: string[]
  /** @description 状态（0 草稿 / 1 已发布 / 2 已归档） */
  status: number
  /** @description 可见性（0 公开 / 1 私密） */
  visibility: number
  /** @description 是否置顶 */
  isTop: boolean
  /** @description 是否允许评论 */
  allowComment: boolean
  /** @description 发布时间 */
  publishedAt: string | null
  /** @description SEO 标题 */
  seoTitle: string | null
  /** @description SEO 描述 */
  seoDescription: string | null
  /** @description 创建时间 */
  createdAt: string
  /** @description 更新时间 */
  updatedAt: string
}

/**
 * @description 设置置顶
 * @param params PostApiBlogAdminPostsTopByIdRequestType
 * @returns Promise<PostApiBlogAdminPostsTopByIdResultType>
 */
export async function postApiBlogAdminPostsTopByIdFunc(
  params: PostApiBlogAdminPostsTopByIdRequestType,
  options: Omit<RequestConfig, 'url' | 'method' | 'data' | 'params'> = {}
): Promise<PostApiBlogAdminPostsTopByIdResultType> {
  const { id, ...body } = params
  const config: RequestConfig = {
    ...options,
    url: `/api/blog/admin/posts/${params.id}/top`,
    method: 'POST',
    data: body,
  }
  return request<PostApiBlogAdminPostsTopByIdResultType>(config)
}

/**
 * @description 发布文章
 * @param params PostApiBlogAdminPostsPublishByIdRequestType
 * @returns Promise<PostApiBlogAdminPostsPublishByIdResultType>
 */
export interface PostApiBlogAdminPostsPublishByIdRequestType {
  /** @description 文章 ID */
  id: string
}

/**
 * @description 发布文章 的返回数据类型
 */
export interface PostApiBlogAdminPostsPublishByIdResultType {
  /** @description 文章 ID */
  id: string
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
  /** @description 分类 ID（未分类为 null） */
  categoryId: string | null
  /** @description 标签 ID 列表 */
  tagIds: string[]
  /** @description 状态（0 草稿 / 1 已发布 / 2 已归档） */
  status: number
  /** @description 可见性（0 公开 / 1 私密） */
  visibility: number
  /** @description 是否置顶 */
  isTop: boolean
  /** @description 是否允许评论 */
  allowComment: boolean
  /** @description 发布时间 */
  publishedAt: string | null
  /** @description SEO 标题 */
  seoTitle: string | null
  /** @description SEO 描述 */
  seoDescription: string | null
  /** @description 创建时间 */
  createdAt: string
  /** @description 更新时间 */
  updatedAt: string
}

/**
 * @description 发布文章
 * @param params PostApiBlogAdminPostsPublishByIdRequestType
 * @returns Promise<PostApiBlogAdminPostsPublishByIdResultType>
 */
export async function postApiBlogAdminPostsPublishByIdFunc(
  params: PostApiBlogAdminPostsPublishByIdRequestType,
  options: Omit<RequestConfig, 'url' | 'method' | 'data' | 'params'> = {}
): Promise<PostApiBlogAdminPostsPublishByIdResultType> {
  const config: RequestConfig = {
    ...options,
    url: `/api/blog/admin/posts/${params.id}/publish`,
    method: 'POST',
  }
  return request<PostApiBlogAdminPostsPublishByIdResultType>(config)
}

/**
 * @description 归档文章
 * @param params PostApiBlogAdminPostsArchiveByIdRequestType
 * @returns Promise<PostApiBlogAdminPostsArchiveByIdResultType>
 */
export interface PostApiBlogAdminPostsArchiveByIdRequestType {
  /** @description 文章 ID */
  id: string
}

/**
 * @description 归档文章 的返回数据类型
 */
export interface PostApiBlogAdminPostsArchiveByIdResultType {
  /** @description 文章 ID */
  id: string
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
  /** @description 分类 ID（未分类为 null） */
  categoryId: string | null
  /** @description 标签 ID 列表 */
  tagIds: string[]
  /** @description 状态（0 草稿 / 1 已发布 / 2 已归档） */
  status: number
  /** @description 可见性（0 公开 / 1 私密） */
  visibility: number
  /** @description 是否置顶 */
  isTop: boolean
  /** @description 是否允许评论 */
  allowComment: boolean
  /** @description 发布时间 */
  publishedAt: string | null
  /** @description SEO 标题 */
  seoTitle: string | null
  /** @description SEO 描述 */
  seoDescription: string | null
  /** @description 创建时间 */
  createdAt: string
  /** @description 更新时间 */
  updatedAt: string
}

/**
 * @description 归档文章
 * @param params PostApiBlogAdminPostsArchiveByIdRequestType
 * @returns Promise<PostApiBlogAdminPostsArchiveByIdResultType>
 */
export async function postApiBlogAdminPostsArchiveByIdFunc(
  params: PostApiBlogAdminPostsArchiveByIdRequestType,
  options: Omit<RequestConfig, 'url' | 'method' | 'data' | 'params'> = {}
): Promise<PostApiBlogAdminPostsArchiveByIdResultType> {
  const config: RequestConfig = {
    ...options,
    url: `/api/blog/admin/posts/${params.id}/archive`,
    method: 'POST',
  }
  return request<PostApiBlogAdminPostsArchiveByIdResultType>(config)
}
