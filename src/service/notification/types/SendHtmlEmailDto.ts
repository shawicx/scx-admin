/**
 * @description 发送自定义 HTML 邮件请求
 */
export interface SendHtmlEmailDto {
  /** @description 收件邮箱地址 */
  email: string
  /** @description 邮件主题 */
  subject: string
  /** @description HTML 邮件内容 */
  html: string
}
