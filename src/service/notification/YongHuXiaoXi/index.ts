import { RequestConfig, request } from '@/service/request'
import type { InboxItemDto } from '@/service/notification/types'

/**
 * @description 标记单条已读
 * @param params PutApiNotificationsReadRequestType
 * @returns Promise<PutApiNotificationsReadResultType>
 */
export interface PutApiNotificationsReadRequestType {
  /** @description 消息 ID */
  notificationId: string
}

/**
 * @description 标记单条已读 的返回数据类型
 */
export interface PutApiNotificationsReadResultType {
  /** @description  */
  message: string
}

/**
 * @description 标记单条已读
 * @param params PutApiNotificationsReadRequestType
 * @returns Promise<PutApiNotificationsReadResultType>
 */
export async function putApiNotificationsReadFunc(
  params: PutApiNotificationsReadRequestType
): Promise<PutApiNotificationsReadResultType> {
  const config: RequestConfig = {
    url: '/api/notifications/read',
    method: 'PUT',
    data: params,
  }
  return request<PutApiNotificationsReadResultType>(config)
}

/**
 * @description 全部已读
 * @param params PutApiNotificationsReadAllRequestType
 * @returns Promise<PutApiNotificationsReadAllResultType>
 */
export interface PutApiNotificationsReadAllRequestType {
  /** @description 渠道 ID 列表（可选，缩小标记范围） */
  channelIds?: string[] | null
}

/**
 * @description 全部已读 的返回数据类型
 */
export interface PutApiNotificationsReadAllResultType {
  /** @description  */
  message: string
}

/**
 * @description 全部已读
 * @param params PutApiNotificationsReadAllRequestType
 * @returns Promise<PutApiNotificationsReadAllResultType>
 */
export async function putApiNotificationsReadAllFunc(
  params: PutApiNotificationsReadAllRequestType
): Promise<PutApiNotificationsReadAllResultType> {
  const config: RequestConfig = {
    url: '/api/notifications/read-all',
    method: 'PUT',
    data: params,
  }
  return request<PutApiNotificationsReadAllResultType>(config)
}

/**
 * @description 未读数
 * @param params GetApiNotificationsUnreadCountRequestType
 * @returns Promise<GetApiNotificationsUnreadCountResultType>
 */
export interface GetApiNotificationsUnreadCountRequestType {}

/**
 * @description 未读数 的返回数据类型
 */
export interface GetApiNotificationsUnreadCountResultType {
  /** @description 站内信未读数 */
  inbox: number
  /** @description 公告未读数 */
  announcement: number
}

/**
 * @description 未读数
 * @param params GetApiNotificationsUnreadCountRequestType
 * @returns Promise<GetApiNotificationsUnreadCountResultType>
 */
export async function getApiNotificationsUnreadCountFunc(
  params: GetApiNotificationsUnreadCountRequestType
): Promise<GetApiNotificationsUnreadCountResultType> {
  const config: RequestConfig = {
    url: '/api/notifications/unread-count',
    method: 'GET',
    params,
  }
  return request<GetApiNotificationsUnreadCountResultType>(config)
}

/**
 * @description 我的收件箱
 * @param params GetApiNotificationsInboxRequestType
 * @returns Promise<GetApiNotificationsInboxResultType>
 */
export interface GetApiNotificationsInboxRequestType {
  /** @description 页码，从 1 开始 */
  page?: string
  /** @description 每页条数 */
  limit?: string
}

/**
 * @description 我的收件箱 的返回数据类型
 */
export interface GetApiNotificationsInboxResultType {
  /** @description 条目列表 */
  list: InboxItemDto[]
  /** @description 总数 */
  total: number
  /** @description 当前页码 */
  page: number
  /** @description 每页条数 */
  limit: number
}

/**
 * @description 我的收件箱
 * @param params GetApiNotificationsInboxRequestType
 * @returns Promise<GetApiNotificationsInboxResultType>
 */
export async function getApiNotificationsInboxFunc(
  params: GetApiNotificationsInboxRequestType
): Promise<GetApiNotificationsInboxResultType> {
  const config: RequestConfig = {
    url: '/api/notifications/inbox',
    method: 'GET',
    params,
  }
  return request<GetApiNotificationsInboxResultType>(config)
}

/**
 * @description 公告列表
 * @param params GetApiNotificationsAnnouncementsRequestType
 * @returns Promise<GetApiNotificationsAnnouncementsResultType>
 */
export interface GetApiNotificationsAnnouncementsRequestType {
  /** @description 页码，从 1 开始 */
  page?: string
  /** @description 每页条数 */
  limit?: string
}

/**
 * @description 公告列表 的返回数据类型
 */
export interface GetApiNotificationsAnnouncementsResultType {
  /** @description 条目列表 */
  list: InboxItemDto[]
  /** @description 总数 */
  total: number
  /** @description 当前页码 */
  page: number
  /** @description 每页条数 */
  limit: number
}

/**
 * @description 公告列表
 * @param params GetApiNotificationsAnnouncementsRequestType
 * @returns Promise<GetApiNotificationsAnnouncementsResultType>
 */
export async function getApiNotificationsAnnouncementsFunc(
  params: GetApiNotificationsAnnouncementsRequestType
): Promise<GetApiNotificationsAnnouncementsResultType> {
  const config: RequestConfig = {
    url: '/api/notifications/announcements',
    method: 'GET',
    params,
  }
  return request<GetApiNotificationsAnnouncementsResultType>(config)
}
