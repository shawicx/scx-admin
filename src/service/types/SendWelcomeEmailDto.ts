/**
 * @description 发送欢迎邮件请求
 */
export interface SendWelcomeEmailDto {
  /** @description 收件邮箱地址 */
  email: string
  /** @description 用户名称（用于模板渲染） */
  username: string
}
