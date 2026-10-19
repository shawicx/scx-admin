/**
 * @description 会话消息响应
 */
export interface MessageResponseDto {
  /** @description 消息 ID */
  id: string
  /** @description 角色 user/assistant */
  role: string
  /** @description 消息内容 */
  content: string
  /** @description 创建时间 */
  createdAt: string
}
