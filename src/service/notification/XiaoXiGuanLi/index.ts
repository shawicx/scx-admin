import { RequestConfig, request } from '@/service/request'
import type { NotificationAdminDto } from '@/service/notification/types'

/**
 * @description 发送消息
 * @param params PostApiNotificationsSendRequestType
 * @returns Promise<PostApiNotificationsSendResultType>
 */
export interface PostApiNotificationsSendRequestType {
  /** @description 渠道 ID（必填——发消息必须指定渠道） */
  channelId: string
  /** @description 消息标题（最长 200 字符） */
  title: string
  /** @description 消息内容（站内信纯文本/HTML，EMAIL 渠道按 HTML 投递） */
  content: string
  /** @description 目标类型：ALL（全体）/ USERS（指定用户）/ ROLES（指定角色） */
  targetType: string
  /** @description 目标 ID 列表（USERS 为用户 ID、ROLES 为角色 ID；ALL 时忽略） */
  targetIds?: string[] | null
  /** @description 前端跳转路由（可选，最长 200 字符） */
  link?: string | null
  /** @description 级别：INFO/WARNING/URGENT（公告字段，默认 INFO） */
  level?: string | null
  /** @description 是否置顶（公告字段，默认 false） */
  pinned?: boolean | null
}

/**
 * @description 发送消息 的返回数据类型
 */
export interface PostApiNotificationsSendResultType {
  /** @description 消息 ID */
  notificationId: string
  /** @description 实际投递人数 */
  recipientCount: number
}

/**
 * @description 发送消息
 * @param params PostApiNotificationsSendRequestType
 * @returns Promise<PostApiNotificationsSendResultType>
 */
export async function postApiNotificationsSendFunc(
  params: PostApiNotificationsSendRequestType
): Promise<PostApiNotificationsSendResultType> {
  const config: RequestConfig = {
    url: '/api/notifications/send',
    method: 'POST',
    data: params,
  }
  return request<PostApiNotificationsSendResultType>(config)
}

/**
 * @description 消息分页列表
 * @param params GetApiNotificationsListRequestType
 * @returns Promise<GetApiNotificationsListResultType>
 */
export interface GetApiNotificationsListRequestType {
  /** @description 页码，从 1 开始 */
  page?: string
  /** @description 每页条数 */
  limit?: string
  /** @description 渠道 ID */
  channelId?: string
  /** @description 目标类型 ALL/USERS/ROLES/DIRECT */
  targetType?: string
}

/**
 * @description 消息分页列表 的返回数据类型
 */
export interface GetApiNotificationsListResultType {
  /** @description 消息列表 */
  list: NotificationAdminDto[]
  /** @description 总数 */
  total: number
  /** @description 当前页码 */
  page: number
  /** @description 每页条数 */
  limit: number
}

/**
 * @description 消息分页列表
 * @param params GetApiNotificationsListRequestType
 * @returns Promise<GetApiNotificationsListResultType>
 */
export async function getApiNotificationsListFunc(
  params: GetApiNotificationsListRequestType
): Promise<GetApiNotificationsListResultType> {
  const config: RequestConfig = {
    url: '/api/notifications/list',
    method: 'GET',
    params,
  }
  return request<GetApiNotificationsListResultType>(config)
}

/**
 * @description 消息详情
 * @param params GetApiNotificationsDetailRequestType
 * @returns Promise<GetApiNotificationsDetailResultType>
 */
export interface GetApiNotificationsDetailRequestType {
  /** @description 消息 ID */
  id: string
}

/**
 * @description 消息详情 的返回数据类型
 */
export interface GetApiNotificationsDetailResultType {
  /** @description 基础信息 */
  notification: NotificationAdminDto
  /** @description 目标 ID 列表 */
  targetIdList: string[] | null
}

/**
 * @description 消息详情
 * @param params GetApiNotificationsDetailRequestType
 * @returns Promise<GetApiNotificationsDetailResultType>
 */
export async function getApiNotificationsDetailFunc(
  params: GetApiNotificationsDetailRequestType
): Promise<GetApiNotificationsDetailResultType> {
  const config: RequestConfig = {
    url: '/api/notifications/detail',
    method: 'GET',
    params,
  }
  return request<GetApiNotificationsDetailResultType>(config)
}
