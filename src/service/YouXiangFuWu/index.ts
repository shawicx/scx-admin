import { RequestConfig, request } from '@/service/request'

/**
 * @description 发送验证码邮件
 * @param params PostMailSendVerificationCodeRequestType
 * @returns Promise<PostMailSendVerificationCodeResult>
 */
export interface PostMailSendVerificationCodeRequestType {
  /** @description 收件人邮箱 */
  email: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 发送验证码邮件 的返回数据类型
 */
export interface PostMailSendVerificationCodeResult {
  /** @description 发送是否成功 */
  success: boolean
  /** @description 发送结果消息 */
  message: string
  /** @description 错误信息（发送失败时） */
  error: string
  /** @description 验证码（仅用于开发环境调试，生产环境不返回） */
  code: string
}

/**
 * @description 发送验证码邮件
 * @param params PostMailSendVerificationCodeRequestType
 * @returns Promise<PostMailSendVerificationCodeResult>
 */
export async function postMailSendVerificationCodeFunc(
  params: PostMailSendVerificationCodeRequestType
): Promise<PostMailSendVerificationCodeResult> {
  const config: RequestConfig = {
    url: '/api/mail/send-verification-code',
    method: 'POST',
    data: params,
  }
  return request<PostMailSendVerificationCodeResult>(config)
}

/**
 * @description 发送欢迎邮件
 * @param params PostMailSendWelcomeEmailRequestType
 * @returns Promise<PostMailSendWelcomeEmailResult>
 */
export interface PostMailSendWelcomeEmailRequestType {
  /** @description 收件人邮箱 */
  email: string
  /** @description 用户名 */
  username: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 发送欢迎邮件 的返回数据类型
 */
export interface PostMailSendWelcomeEmailResult {
  /** @description 发送是否成功 */
  success: boolean
  /** @description 发送结果消息 */
  message: string
  /** @description 错误信息（发送失败时） */
  error: string
}

/**
 * @description 发送欢迎邮件
 * @param params PostMailSendWelcomeEmailRequestType
 * @returns Promise<PostMailSendWelcomeEmailResult>
 */
export async function postMailSendWelcomeEmailFunc(
  params: PostMailSendWelcomeEmailRequestType
): Promise<PostMailSendWelcomeEmailResult> {
  const config: RequestConfig = {
    url: '/api/mail/send-welcome-email',
    method: 'POST',
    data: params,
  }
  return request<PostMailSendWelcomeEmailResult>(config)
}

/**
 * @description 发送密码重置邮件
 * @param params PostMailSendPasswordResetRequestType
 * @returns Promise<PostMailSendPasswordResetResult>
 */
export interface PostMailSendPasswordResetRequestType {
  /** @description 收件人邮箱 */
  email: string
  /** @description 重置令牌 */
  resetToken: string
  /** @description 重置链接 */
  resetUrl: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 发送密码重置邮件 的返回数据类型
 */
export interface PostMailSendPasswordResetResult {
  /** @description 发送是否成功 */
  success: boolean
  /** @description 发送结果消息 */
  message: string
  /** @description 错误信息（发送失败时） */
  error: string
}

/**
 * @description 发送密码重置邮件
 * @param params PostMailSendPasswordResetRequestType
 * @returns Promise<PostMailSendPasswordResetResult>
 */
export async function postMailSendPasswordResetFunc(
  params: PostMailSendPasswordResetRequestType
): Promise<PostMailSendPasswordResetResult> {
  const config: RequestConfig = {
    url: '/api/mail/send-password-reset',
    method: 'POST',
    data: params,
  }
  return request<PostMailSendPasswordResetResult>(config)
}

/**
 * @description 发送HTML邮件
 * @param params PostMailSendHtmlEmailRequestType
 * @returns Promise<PostMailSendHtmlEmailResult>
 */
export interface PostMailSendHtmlEmailRequestType {
  /** @description 收件人邮箱 */
  email: string
  /** @description 邮件主题 */
  subject: string
  /** @description HTML内容 */
  html: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 发送HTML邮件 的返回数据类型
 */
export interface PostMailSendHtmlEmailResult {
  /** @description 发送是否成功 */
  success: boolean
  /** @description 发送结果消息 */
  message: string
  /** @description 错误信息（发送失败时） */
  error: string
}

/**
 * @description 发送HTML邮件
 * @param params PostMailSendHtmlEmailRequestType
 * @returns Promise<PostMailSendHtmlEmailResult>
 */
export async function postMailSendHtmlEmailFunc(
  params: PostMailSendHtmlEmailRequestType
): Promise<PostMailSendHtmlEmailResult> {
  const config: RequestConfig = {
    url: '/api/mail/send-html-email',
    method: 'POST',
    data: params,
  }
  return request<PostMailSendHtmlEmailResult>(config)
}
