import { RequestConfig, request } from '@/service/request'
import type { ChannelResponseDto } from '@/service/notification/types'

/**
 * @description 更新渠道
 * @param params PutApiChannelsUpdateRequestType
 * @returns Promise<PutApiChannelsUpdateResultType>
 */
export interface PutApiChannelsUpdateRequestType {
  /** @description 渠道 ID */
  id: string
  /** @description 渠道名称（2-50 字符） */
  name?: string | null
  /** @description 渠道描述（最长 255 字符） */
  description?: string | null
  /** @description 是否启用（停用后不可用于发消息） */
  isActive?: boolean | null
}

/**
 * @description 更新渠道 的返回数据类型
 */
export interface PutApiChannelsUpdateResultType {
  /** @description 渠道 ID */
  id: string
  /** @description 渠道编码 */
  code: string
  /** @description 渠道名称 */
  name: string
  /** @description 投递类型 EMAIL/INBOX/ANNOUNCEMENT */
  type: string
  /** @description 渠道描述 */
  description: string | null
  /** @description 是否系统渠道（不可删除） */
  isSystem: boolean
  /** @description 是否启用 */
  isActive: boolean
  /** @description 创建时间 */
  createdAt: string
  /** @description 更新时间 */
  updatedAt: string
}

/**
 * @description 更新渠道
 * @param params PutApiChannelsUpdateRequestType
 * @returns Promise<PutApiChannelsUpdateResultType>
 */
export async function putApiChannelsUpdateFunc(
  params: PutApiChannelsUpdateRequestType
): Promise<PutApiChannelsUpdateResultType> {
  const config: RequestConfig = {
    url: '/api/channels/update',
    method: 'PUT',
    data: params,
  }
  return request<PutApiChannelsUpdateResultType>(config)
}

/**
 * @description 创建渠道
 * @param params PostApiChannelsCreateRequestType
 * @returns Promise<PostApiChannelsCreateResultType>
 */
export interface PostApiChannelsCreateRequestType {
  /** @description 渠道编码（大写字母开头，大写字母/数字/下划线，2-50 字符，唯一） */
  code: string
  /** @description 渠道名称（2-50 字符） */
  name: string
  /** @description 投递类型：EMAIL（邮件）/ INBOX（站内信）/ ANNOUNCEMENT（公告） */
  type: string
  /** @description 渠道描述（最长 255 字符） */
  description?: string | null
}

/**
 * @description 创建渠道 的返回数据类型
 */
export interface PostApiChannelsCreateResultType {
  /** @description 渠道 ID */
  id: string
  /** @description 渠道编码 */
  code: string
  /** @description 渠道名称 */
  name: string
  /** @description 投递类型 EMAIL/INBOX/ANNOUNCEMENT */
  type: string
  /** @description 渠道描述 */
  description: string | null
  /** @description 是否系统渠道（不可删除） */
  isSystem: boolean
  /** @description 是否启用 */
  isActive: boolean
  /** @description 创建时间 */
  createdAt: string
  /** @description 更新时间 */
  updatedAt: string
}

/**
 * @description 创建渠道
 * @param params PostApiChannelsCreateRequestType
 * @returns Promise<PostApiChannelsCreateResultType>
 */
export async function postApiChannelsCreateFunc(
  params: PostApiChannelsCreateRequestType
): Promise<PostApiChannelsCreateResultType> {
  const config: RequestConfig = {
    url: '/api/channels/create',
    method: 'POST',
    data: params,
  }
  return request<PostApiChannelsCreateResultType>(config)
}

/**
 * @description 渠道分页列表
 * @param params GetApiChannelsListRequestType
 * @returns Promise<GetApiChannelsListResultType>
 */
export interface GetApiChannelsListRequestType {
  /** @description 页码，从 1 开始 */
  page?: string
  /** @description 每页条数 */
  limit?: string
  /** @description 投递类型 EMAIL/INBOX/ANNOUNCEMENT */
  type?: string
  /** @description 关键字（code/name 模糊） */
  keyword?: string
}

/**
 * @description 渠道分页列表 的返回数据类型
 */
export interface GetApiChannelsListResultType {
  /** @description 渠道列表 */
  list: ChannelResponseDto[]
  /** @description 总数 */
  total: number
  /** @description 当前页码 */
  page: number
  /** @description 每页条数 */
  limit: number
}

/**
 * @description 渠道分页列表
 * @param params GetApiChannelsListRequestType
 * @returns Promise<GetApiChannelsListResultType>
 */
export async function getApiChannelsListFunc(
  params: GetApiChannelsListRequestType
): Promise<GetApiChannelsListResultType> {
  const config: RequestConfig = {
    url: '/api/channels/list',
    method: 'GET',
    params,
  }
  return request<GetApiChannelsListResultType>(config)
}

/**
 * @description 全量启用渠道
 * @param params GetApiChannelsAllRequestType
 * @returns Promise<GetApiChannelsAllResultType>
 */
export interface GetApiChannelsAllRequestType {}

/**
 * @description 全量启用渠道 的返回数据类型
 */
export interface GetApiChannelsAllResultType {
  /** @description 响应数据数组 */
  data: ChannelResponseDto[]
}

/**
 * @description 全量启用渠道
 * @param params GetApiChannelsAllRequestType
 * @returns Promise<GetApiChannelsAllResultType>
 */
export async function getApiChannelsAllFunc(
  params: GetApiChannelsAllRequestType
): Promise<GetApiChannelsAllResultType> {
  const config: RequestConfig = {
    url: '/api/channels/all',
    method: 'GET',
    params,
  }
  return request<GetApiChannelsAllResultType>(config)
}

/**
 * @description 删除渠道
 * @param params DeleteApiChannelsDeleteRequestType
 * @returns Promise<DeleteApiChannelsDeleteResultType>
 */
export interface DeleteApiChannelsDeleteRequestType {
  /** @description 渠道 ID */
  id: string
}

/**
 * @description 删除渠道 的返回数据类型
 */
export interface DeleteApiChannelsDeleteResultType {
  /** @description  */
  message: string
}

/**
 * @description 删除渠道
 * @param params DeleteApiChannelsDeleteRequestType
 * @returns Promise<DeleteApiChannelsDeleteResultType>
 */
export async function deleteApiChannelsDeleteFunc(
  params: DeleteApiChannelsDeleteRequestType
): Promise<DeleteApiChannelsDeleteResultType> {
  const config: RequestConfig = {
    url: '/api/channels/delete',
    method: 'DELETE',
    params,
  }
  return request<DeleteApiChannelsDeleteResultType>(config)
}
