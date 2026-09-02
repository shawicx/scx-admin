/**
 * @description 登录日志响应
 */
export interface LoginLogResponseDto {
  /** @description 日志 ID */
  id: string
  /** @description 用户 ID（登录失败且邮箱不存在时为空） */
  userId?: string | null
  /** @description 登录邮箱 */
  email?: string | null
  /** @description 登录类型：PASSWORD / EMAIL_CODE / LOGOUT / REFRESH */
  loginType: string
  /** @description 是否成功 */
  success: boolean
  /** @description 失败原因 */
  failReason?: string | null
  /** @description 客户端 IP */
  ip?: string | null
  /** @description 客户端 User-Agent */
  userAgent?: string | null
  /** @description 创建时间 */
  createdAt: string
}
