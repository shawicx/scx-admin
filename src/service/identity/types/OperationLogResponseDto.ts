/**
 * @description 操作日志响应
 */
export interface OperationLogResponseDto {
  /** @description 日志 ID */
  id: string
  /** @description 操作人用户 ID（公开接口无操作者时为空） */
  userId?: string | null
  /** @description 操作人邮箱 */
  userEmail?: string | null
  /** @description 所属模块 */
  module: string
  /** @description 操作动作 */
  action: string
  /** @description HTTP 请求方法 */
  httpMethod?: string | null
  /** @description 请求 URI */
  uri?: string | null
  /** @description 客户端 IP */
  ip?: string | null
  /** @description 客户端 User-Agent */
  userAgent?: string | null
  /** @description 请求入参 JSON 摘要（敏感字段已脱敏） */
  params?: string | null
  /** @description 是否成功 */
  success: boolean
  /** @description 失败时的错误消息 */
  errorMessage?: string | null
  /** @description 耗时（毫秒） */
  costMs: number
  /** @description 创建时间 */
  createdAt: string
}
