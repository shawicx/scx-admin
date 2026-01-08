import { RequestConfig, request } from '../request'

/**
 * @description 发送验证码邮件
 * @param params ApiMailSendVerificationCodePOSTRequest
 * @returns Promise<ApiMailSendVerificationCodePOSTResponse>
 */
export interface ApiMailSendVerificationCodePOSTRequest {
  /** @description 收件人邮箱 */
  email: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 发送验证码邮件 的返回数据类型
 */
export interface ApiMailSendVerificationCodePOSTResponse {
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
 * @param params ApiMailSendVerificationCodePOSTRequest
 * @returns Promise<ApiMailSendVerificationCodePOSTResponse>
 */
export async function apiMailSendVerificationCodePOST(
  params: ApiMailSendVerificationCodePOSTRequest
): Promise<ApiMailSendVerificationCodePOSTResponse> {
  const config: RequestConfig = {
    url: '/api/mail/send-verification-code',
    method: 'POST',
    data: params,
  }
  return request<ApiMailSendVerificationCodePOSTResponse>(config)
}

/**
 * @description 发送欢迎邮件
 * @param params ApiMailSendWelcomeEmailPOSTRequest
 * @returns Promise<ApiMailSendWelcomeEmailPOSTResponse>
 */
export interface ApiMailSendWelcomeEmailPOSTRequest {
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
export interface ApiMailSendWelcomeEmailPOSTResponse {
  /** @description 发送是否成功 */
  success: boolean
  /** @description 发送结果消息 */
  message: string
  /** @description 错误信息（发送失败时） */
  error: string
}

/**
 * @description 发送欢迎邮件
 * @param params ApiMailSendWelcomeEmailPOSTRequest
 * @returns Promise<ApiMailSendWelcomeEmailPOSTResponse>
 */
export async function apiMailSendWelcomeEmailPOST(
  params: ApiMailSendWelcomeEmailPOSTRequest
): Promise<ApiMailSendWelcomeEmailPOSTResponse> {
  const config: RequestConfig = {
    url: '/api/mail/send-welcome-email',
    method: 'POST',
    data: params,
  }
  return request<ApiMailSendWelcomeEmailPOSTResponse>(config)
}

/**
 * @description 发送密码重置邮件
 * @param params ApiMailSendPasswordResetPOSTRequest
 * @returns Promise<ApiMailSendPasswordResetPOSTResponse>
 */
export interface ApiMailSendPasswordResetPOSTRequest {
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
export interface ApiMailSendPasswordResetPOSTResponse {
  /** @description 发送是否成功 */
  success: boolean
  /** @description 发送结果消息 */
  message: string
  /** @description 错误信息（发送失败时） */
  error: string
}

/**
 * @description 发送密码重置邮件
 * @param params ApiMailSendPasswordResetPOSTRequest
 * @returns Promise<ApiMailSendPasswordResetPOSTResponse>
 */
export async function apiMailSendPasswordResetPOST(
  params: ApiMailSendPasswordResetPOSTRequest
): Promise<ApiMailSendPasswordResetPOSTResponse> {
  const config: RequestConfig = {
    url: '/api/mail/send-password-reset',
    method: 'POST',
    data: params,
  }
  return request<ApiMailSendPasswordResetPOSTResponse>(config)
}

/**
 * @description 发送HTML邮件
 * @param params ApiMailSendHtmlEmailPOSTRequest
 * @returns Promise<ApiMailSendHtmlEmailPOSTResponse>
 */
export interface ApiMailSendHtmlEmailPOSTRequest {
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
export interface ApiMailSendHtmlEmailPOSTResponse {
  /** @description 发送是否成功 */
  success: boolean
  /** @description 发送结果消息 */
  message: string
  /** @description 错误信息（发送失败时） */
  error: string
}

/**
 * @description 发送HTML邮件
 * @param params ApiMailSendHtmlEmailPOSTRequest
 * @returns Promise<ApiMailSendHtmlEmailPOSTResponse>
 */
export async function apiMailSendHtmlEmailPOST(
  params: ApiMailSendHtmlEmailPOSTRequest
): Promise<ApiMailSendHtmlEmailPOSTResponse> {
  const config: RequestConfig = {
    url: '/api/mail/send-html-email',
    method: 'POST',
    data: params,
  }
  return request<ApiMailSendHtmlEmailPOSTResponse>(config)
}
