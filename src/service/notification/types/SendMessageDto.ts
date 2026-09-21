/**
 * @description 发送消息请求
 */
export interface SendMessageDto {
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
