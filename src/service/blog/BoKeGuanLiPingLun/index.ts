import { request } from '@/service/request'
import type { RequestConfig } from '@/service/request'
import type { CommentAdminListItemDto } from '@/service/blog/types'

/**
 * @description 审核拒绝
 * @param params PostApiBlogAdminCommentsRejectByIdRequestType
 * @returns Promise<PostApiBlogAdminCommentsRejectByIdResultType>
 */
export interface PostApiBlogAdminCommentsRejectByIdRequestType {
  /** @description 评论 ID */
  id: string
}

/**
 * @description 审核拒绝 的返回数据类型
 */
export interface PostApiBlogAdminCommentsRejectByIdResultType {
  /** @description  */
  message: string
}

/**
 * @description 审核拒绝
 * @param params PostApiBlogAdminCommentsRejectByIdRequestType
 * @returns Promise<PostApiBlogAdminCommentsRejectByIdResultType>
 */
export async function postApiBlogAdminCommentsRejectByIdFunc(
  params: PostApiBlogAdminCommentsRejectByIdRequestType,
  options: Omit<RequestConfig, 'url' | 'method' | 'data' | 'params'> = {}
): Promise<PostApiBlogAdminCommentsRejectByIdResultType> {
  const config: RequestConfig = {
    ...options,
    url: `/api/blog/admin/comments/${params.id}/reject`,
    method: 'POST',
  }
  return request<PostApiBlogAdminCommentsRejectByIdResultType>(config)
}

/**
 * @description 审核通过
 * @param params PostApiBlogAdminCommentsApproveByIdRequestType
 * @returns Promise<PostApiBlogAdminCommentsApproveByIdResultType>
 */
export interface PostApiBlogAdminCommentsApproveByIdRequestType {
  /** @description 评论 ID */
  id: string
}

/**
 * @description 审核通过 的返回数据类型
 */
export interface PostApiBlogAdminCommentsApproveByIdResultType {
  /** @description  */
  message: string
}

/**
 * @description 审核通过
 * @param params PostApiBlogAdminCommentsApproveByIdRequestType
 * @returns Promise<PostApiBlogAdminCommentsApproveByIdResultType>
 */
export async function postApiBlogAdminCommentsApproveByIdFunc(
  params: PostApiBlogAdminCommentsApproveByIdRequestType,
  options: Omit<RequestConfig, 'url' | 'method' | 'data' | 'params'> = {}
): Promise<PostApiBlogAdminCommentsApproveByIdResultType> {
  const config: RequestConfig = {
    ...options,
    url: `/api/blog/admin/comments/${params.id}/approve`,
    method: 'POST',
  }
  return request<PostApiBlogAdminCommentsApproveByIdResultType>(config)
}

/**
 * @description 评论管理列表
 * @param params GetApiBlogAdminCommentsRequestType
 * @returns Promise<GetApiBlogAdminCommentsResultType>
 */
export interface GetApiBlogAdminCommentsRequestType {
  /** @description 页码，从 1 开始 */
  page?: number
  /** @description 每页条数 */
  limit?: number
  /** @description 按状态过滤（0 待审核 / 1 已通过 / 2 已拒绝） */
  status?: number | null
  /** @description 按文章 ID 过滤 */
  postId?: string | null
  /** @description 搜索关键字（昵称 / 评论内容） */
  search?: string | null
}

/**
 * @description 评论管理列表 的返回数据类型
 */
export interface GetApiBlogAdminCommentsResultType {
  /** @description 评论列表（提交时间倒序） */
  list: CommentAdminListItemDto[]
  /** @description 总数 */
  total: number
  /** @description 页码 */
  page: number
  /** @description 每页条数 */
  limit: number
}

/**
 * @description 评论管理列表
 * @param params GetApiBlogAdminCommentsRequestType
 * @returns Promise<GetApiBlogAdminCommentsResultType>
 */
export async function getApiBlogAdminCommentsFunc(
  params: GetApiBlogAdminCommentsRequestType,
  options: Omit<RequestConfig, 'url' | 'method' | 'data' | 'params'> = {}
): Promise<GetApiBlogAdminCommentsResultType> {
  const config: RequestConfig = {
    ...options,
    url: '/api/blog/admin/comments',
    method: 'GET',
    params: params,
  }
  return request<GetApiBlogAdminCommentsResultType>(config)
}

/**
 * @description 删除评论
 * @param params DeleteApiBlogAdminCommentsByIdRequestType
 * @returns Promise<DeleteApiBlogAdminCommentsByIdResultType>
 */
export interface DeleteApiBlogAdminCommentsByIdRequestType {
  /** @description 评论 ID */
  id: string
}

/**
 * @description 删除评论 的返回数据类型
 */
export interface DeleteApiBlogAdminCommentsByIdResultType {
  /** @description  */
  message: string
}

/**
 * @description 删除评论
 * @param params DeleteApiBlogAdminCommentsByIdRequestType
 * @returns Promise<DeleteApiBlogAdminCommentsByIdResultType>
 */
export async function deleteApiBlogAdminCommentsByIdFunc(
  params: DeleteApiBlogAdminCommentsByIdRequestType,
  options: Omit<RequestConfig, 'url' | 'method' | 'data' | 'params'> = {}
): Promise<DeleteApiBlogAdminCommentsByIdResultType> {
  const config: RequestConfig = {
    ...options,
    url: `/api/blog/admin/comments/${params.id}`,
    method: 'DELETE',
  }
  return request<DeleteApiBlogAdminCommentsByIdResultType>(config)
}
