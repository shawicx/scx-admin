/**
 * @description 发送密码重置邮件请求
 */
export interface SendPasswordResetDto {
  /** @description 收件邮箱地址 */
  email: string
  /** @description 密码重置令牌 */
  resetToken: string
  /** @description 密码重置链接 */
  resetUrl: string
}
