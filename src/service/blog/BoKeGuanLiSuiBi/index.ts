import { request } from '@/service/request'
import type { RequestConfig } from '@/service/request'
import type { NoteAdminDto } from '@/service/blog/types'

/**
 * @description 随笔详情
 * @param params GetApiBlogAdminNotesByIdRequestType
 * @returns Promise<GetApiBlogAdminNotesByIdResultType>
 */
export interface GetApiBlogAdminNotesByIdRequestType {
  /** @description 随笔 ID */
  id: string
}

/**
 * @description 随笔详情 的返回数据类型
 */
export interface GetApiBlogAdminNotesByIdResultType {
  /** @description 随笔 ID */
  id: string
  /** @description 随笔内容 */
  content: string
  /** @description 状态（0 草稿 / 1 已发布 / 2 已归档） */
  status: number
  /** @description 发布时间（未发布为 null） */
  publishedAt: string | null
  /** @description 创建时间 */
  createdAt: string
  /** @description 更新时间 */
  updatedAt: string
}

/**
 * @description 随笔详情
 * @param params GetApiBlogAdminNotesByIdRequestType
 * @returns Promise<GetApiBlogAdminNotesByIdResultType>
 */
export async function getApiBlogAdminNotesByIdFunc(
  params: GetApiBlogAdminNotesByIdRequestType,
  options: Omit<RequestConfig, 'url' | 'method' | 'data' | 'params'> = {}
): Promise<GetApiBlogAdminNotesByIdResultType> {
  const config: RequestConfig = {
    ...options,
    url: `/api/blog/admin/notes/${params.id}`,
    method: 'GET',
  }
  return request<GetApiBlogAdminNotesByIdResultType>(config)
}

/**
 * @description 更新随笔
 * @param params PutApiBlogAdminNotesByIdRequestType
 * @returns Promise<PutApiBlogAdminNotesByIdResultType>
 */
export interface PutApiBlogAdminNotesByIdRequestType {
  /** @description 随笔内容 */
  content: string
  /** @description 随笔 ID */
  id: string
}

/**
 * @description 更新随笔 的返回数据类型
 */
export interface PutApiBlogAdminNotesByIdResultType {
  /** @description 随笔 ID */
  id: string
  /** @description 随笔内容 */
  content: string
  /** @description 状态（0 草稿 / 1 已发布 / 2 已归档） */
  status: number
  /** @description 发布时间（未发布为 null） */
  publishedAt: string | null
  /** @description 创建时间 */
  createdAt: string
  /** @description 更新时间 */
  updatedAt: string
}

/**
 * @description 更新随笔
 * @param params PutApiBlogAdminNotesByIdRequestType
 * @returns Promise<PutApiBlogAdminNotesByIdResultType>
 */
export async function putApiBlogAdminNotesByIdFunc(
  params: PutApiBlogAdminNotesByIdRequestType,
  options: Omit<RequestConfig, 'url' | 'method' | 'data' | 'params'> = {}
): Promise<PutApiBlogAdminNotesByIdResultType> {
  const { id, ...body } = params
  const config: RequestConfig = {
    ...options,
    url: `/api/blog/admin/notes/${params.id}`,
    method: 'PUT',
    data: body,
  }
  return request<PutApiBlogAdminNotesByIdResultType>(config)
}

/**
 * @description 删除随笔
 * @param params DeleteApiBlogAdminNotesByIdRequestType
 * @returns Promise<DeleteApiBlogAdminNotesByIdResultType>
 */
export interface DeleteApiBlogAdminNotesByIdRequestType {
  /** @description 随笔 ID */
  id: string
}

/**
 * @description 删除随笔 的返回数据类型
 */
export interface DeleteApiBlogAdminNotesByIdResultType {
  /** @description  */
  message: string
}

/**
 * @description 删除随笔
 * @param params DeleteApiBlogAdminNotesByIdRequestType
 * @returns Promise<DeleteApiBlogAdminNotesByIdResultType>
 */
export async function deleteApiBlogAdminNotesByIdFunc(
  params: DeleteApiBlogAdminNotesByIdRequestType,
  options: Omit<RequestConfig, 'url' | 'method' | 'data' | 'params'> = {}
): Promise<DeleteApiBlogAdminNotesByIdResultType> {
  const config: RequestConfig = {
    ...options,
    url: `/api/blog/admin/notes/${params.id}`,
    method: 'DELETE',
  }
  return request<DeleteApiBlogAdminNotesByIdResultType>(config)
}

/**
 * @description 随笔管理列表
 * @param params GetApiBlogAdminNotesRequestType
 * @returns Promise<GetApiBlogAdminNotesResultType>
 */
export interface GetApiBlogAdminNotesRequestType {
  /** @description 页码，从 1 开始 */
  page?: number
  /** @description 每页条数 */
  limit?: number
  /** @description 按状态过滤（0 草稿 / 1 已发布 / 2 已归档） */
  status?: number | null
}

/**
 * @description 随笔管理列表 的返回数据类型
 */
export interface GetApiBlogAdminNotesResultType {
  /** @description 随笔列表（创建时间倒序） */
  list: NoteAdminDto[]
  /** @description 总数 */
  total: number
  /** @description 页码 */
  page: number
  /** @description 每页条数 */
  limit: number
}

/**
 * @description 随笔管理列表
 * @param params GetApiBlogAdminNotesRequestType
 * @returns Promise<GetApiBlogAdminNotesResultType>
 */
export async function getApiBlogAdminNotesFunc(
  params: GetApiBlogAdminNotesRequestType,
  options: Omit<RequestConfig, 'url' | 'method' | 'data' | 'params'> = {}
): Promise<GetApiBlogAdminNotesResultType> {
  const config: RequestConfig = {
    ...options,
    url: '/api/blog/admin/notes',
    method: 'GET',
    params: params,
  }
  return request<GetApiBlogAdminNotesResultType>(config)
}

/**
 * @description 创建随笔
 * @param params PostApiBlogAdminNotesRequestType
 * @returns Promise<PostApiBlogAdminNotesResultType>
 */
export interface PostApiBlogAdminNotesRequestType {
  /** @description 随笔内容 */
  content: string
}

/**
 * @description 创建随笔 的返回数据类型
 */
export interface PostApiBlogAdminNotesResultType {
  /** @description 随笔 ID */
  id: string
  /** @description 随笔内容 */
  content: string
  /** @description 状态（0 草稿 / 1 已发布 / 2 已归档） */
  status: number
  /** @description 发布时间（未发布为 null） */
  publishedAt: string | null
  /** @description 创建时间 */
  createdAt: string
  /** @description 更新时间 */
  updatedAt: string
}

/**
 * @description 创建随笔
 * @param params PostApiBlogAdminNotesRequestType
 * @returns Promise<PostApiBlogAdminNotesResultType>
 */
export async function postApiBlogAdminNotesFunc(
  params: PostApiBlogAdminNotesRequestType,
  options: Omit<RequestConfig, 'url' | 'method' | 'data' | 'params'> = {}
): Promise<PostApiBlogAdminNotesResultType> {
  const config: RequestConfig = {
    ...options,
    url: '/api/blog/admin/notes',
    method: 'POST',
    data: params,
  }
  return request<PostApiBlogAdminNotesResultType>(config)
}

/**
 * @description 撤回随笔
 * @param params PostApiBlogAdminNotesWithdrawByIdRequestType
 * @returns Promise<PostApiBlogAdminNotesWithdrawByIdResultType>
 */
export interface PostApiBlogAdminNotesWithdrawByIdRequestType {
  /** @description 随笔 ID */
  id: string
}

/**
 * @description 撤回随笔 的返回数据类型
 */
export interface PostApiBlogAdminNotesWithdrawByIdResultType {
  /** @description 随笔 ID */
  id: string
  /** @description 随笔内容 */
  content: string
  /** @description 状态（0 草稿 / 1 已发布 / 2 已归档） */
  status: number
  /** @description 发布时间（未发布为 null） */
  publishedAt: string | null
  /** @description 创建时间 */
  createdAt: string
  /** @description 更新时间 */
  updatedAt: string
}

/**
 * @description 撤回随笔
 * @param params PostApiBlogAdminNotesWithdrawByIdRequestType
 * @returns Promise<PostApiBlogAdminNotesWithdrawByIdResultType>
 */
export async function postApiBlogAdminNotesWithdrawByIdFunc(
  params: PostApiBlogAdminNotesWithdrawByIdRequestType,
  options: Omit<RequestConfig, 'url' | 'method' | 'data' | 'params'> = {}
): Promise<PostApiBlogAdminNotesWithdrawByIdResultType> {
  const config: RequestConfig = {
    ...options,
    url: `/api/blog/admin/notes/${params.id}/withdraw`,
    method: 'POST',
  }
  return request<PostApiBlogAdminNotesWithdrawByIdResultType>(config)
}

/**
 * @description 发布随笔
 * @param params PostApiBlogAdminNotesPublishByIdRequestType
 * @returns Promise<PostApiBlogAdminNotesPublishByIdResultType>
 */
export interface PostApiBlogAdminNotesPublishByIdRequestType {
  /** @description 随笔 ID */
  id: string
}

/**
 * @description 发布随笔 的返回数据类型
 */
export interface PostApiBlogAdminNotesPublishByIdResultType {
  /** @description 随笔 ID */
  id: string
  /** @description 随笔内容 */
  content: string
  /** @description 状态（0 草稿 / 1 已发布 / 2 已归档） */
  status: number
  /** @description 发布时间（未发布为 null） */
  publishedAt: string | null
  /** @description 创建时间 */
  createdAt: string
  /** @description 更新时间 */
  updatedAt: string
}

/**
 * @description 发布随笔
 * @param params PostApiBlogAdminNotesPublishByIdRequestType
 * @returns Promise<PostApiBlogAdminNotesPublishByIdResultType>
 */
export async function postApiBlogAdminNotesPublishByIdFunc(
  params: PostApiBlogAdminNotesPublishByIdRequestType,
  options: Omit<RequestConfig, 'url' | 'method' | 'data' | 'params'> = {}
): Promise<PostApiBlogAdminNotesPublishByIdResultType> {
  const config: RequestConfig = {
    ...options,
    url: `/api/blog/admin/notes/${params.id}/publish`,
    method: 'POST',
  }
  return request<PostApiBlogAdminNotesPublishByIdResultType>(config)
}

/**
 * @description 归档随笔
 * @param params PostApiBlogAdminNotesArchiveByIdRequestType
 * @returns Promise<PostApiBlogAdminNotesArchiveByIdResultType>
 */
export interface PostApiBlogAdminNotesArchiveByIdRequestType {
  /** @description 随笔 ID */
  id: string
}

/**
 * @description 归档随笔 的返回数据类型
 */
export interface PostApiBlogAdminNotesArchiveByIdResultType {
  /** @description 随笔 ID */
  id: string
  /** @description 随笔内容 */
  content: string
  /** @description 状态（0 草稿 / 1 已发布 / 2 已归档） */
  status: number
  /** @description 发布时间（未发布为 null） */
  publishedAt: string | null
  /** @description 创建时间 */
  createdAt: string
  /** @description 更新时间 */
  updatedAt: string
}

/**
 * @description 归档随笔
 * @param params PostApiBlogAdminNotesArchiveByIdRequestType
 * @returns Promise<PostApiBlogAdminNotesArchiveByIdResultType>
 */
export async function postApiBlogAdminNotesArchiveByIdFunc(
  params: PostApiBlogAdminNotesArchiveByIdRequestType,
  options: Omit<RequestConfig, 'url' | 'method' | 'data' | 'params'> = {}
): Promise<PostApiBlogAdminNotesArchiveByIdResultType> {
  const config: RequestConfig = {
    ...options,
    url: `/api/blog/admin/notes/${params.id}/archive`,
    method: 'POST',
  }
  return request<PostApiBlogAdminNotesArchiveByIdResultType>(config)
}
