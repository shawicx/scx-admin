/**
 * @description 发送消息请求
 */
export interface ChatRequestDto {
  /** @description 会话 ID（缺省时新建会话） */
  sessionId?: string | null
  /** @description 用户消息内容 */
  content: string
}
