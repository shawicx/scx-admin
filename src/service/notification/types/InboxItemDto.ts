/**
 * @description 收件箱/公告条目
 */
export interface InboxItemDto {
  /** @description 投递记录 ID */
  id: string
  /** @description 消息 ID */
  notificationId: string
  /** @description 标题 */
  title: string
  /** @description 内容 */
  content: string
  /** @description 前端跳转路由 */
  link?: string | null
  /** @description 级别 INFO/WARNING/URGENT */
  level: string
  /** @description 渠道编码 */
  channelCode: string
  /** @description 渠道名称 */
  channelName: string
  /** @description 是否置顶（公告） */
  pinned: boolean
  /** @description 是否已读 */
  read: boolean
  /** @description 已读时间 */
  readAt?: string | null
  /** @description 发送时间 */
  createdAt: string
}
