/**
 * @description 管理端消息条目
 */
export interface NotificationAdminDto {
  /** @description 消息 ID */
  id: string
  /** @description 渠道 ID */
  channelId: string
  /** @description 渠道编码 */
  channelCode: string
  /** @description 渠道名称 */
  channelName: string
  /** @description 标题 */
  title: string
  /** @description 级别 */
  level: string
  /** @description 是否置顶 */
  pinned: boolean
  /** @description 目标类型 ALL/USERS/ROLES/DIRECT */
  targetType: string
  /** @description 目标 ID JSON 字符串（审计） */
  targetIds?: string | null
  /** @description 事务邮件收件邮箱 */
  recipientEmail?: string | null
  /** @description 实际投递人数 */
  recipientCount: number
  /** @description 发送者用户 ID */
  senderId?: string | null
  /** @description 发送时间 */
  createdAt: string
}
