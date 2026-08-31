/**
 * @description 用户注册请求
 */
export interface RegisterUserDto {
  /** @description 邮箱地址 */
  email: string
  /** @description 用户名称（2-50 字符） */
  name: string
  /** @description 密码（8-50 字符，需含大小写字母、数字和特殊字符） */
  password: string
  /** @description 邮箱验证码（6 位数字） */
  emailVerificationCode: string
}
