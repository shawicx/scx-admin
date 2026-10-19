/**
 * @description 会话响应
 */
export interface SessionResponseDto {
  /** @description 会话 ID */
  id: string
  /** @description 会话标题 */
  title: string
  /** @description 创建时间 */
  createdAt: string
  /** @description 最后活跃时间 */
  updatedAt: string
}
