/**
 * @description 邮箱验证码登录请求
 */
export interface LoginUserDto {
  /** @description 邮箱地址 */
  email: string
  /** @description 邮箱验证码（6 位） */
  emailVerificationCode: string
}
