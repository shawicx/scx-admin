import { RequestConfig, request } from '@/service/request'

/**
 * @description 发送欢迎邮件
 * @param params PostApiMailSendWelcomeEmailRequestType
 * @returns Promise<PostApiMailSendWelcomeEmailResultType>
 */
export interface PostApiMailSendWelcomeEmailRequestType {
  /** @description 收件邮箱地址 */
  email: string
  /** @description 用户名称（用于模板渲染） */
  username: string
}

/**
 * @description 发送欢迎邮件 的返回数据类型
 */
export interface PostApiMailSendWelcomeEmailResultType {
  /** @description  */
  success: boolean
  /** @description  */
  message: string
  /** @description  */
  code: string | null
  /** @description  */
  error: string | null
}

/**
 * @description 发送欢迎邮件
 * @param params PostApiMailSendWelcomeEmailRequestType
 * @returns Promise<PostApiMailSendWelcomeEmailResultType>
 */
export async function postApiMailSendWelcomeEmailFunc(
  params: PostApiMailSendWelcomeEmailRequestType
): Promise<PostApiMailSendWelcomeEmailResultType> {
  const config: RequestConfig = {
    url: '/api/mail/send-welcome-email',
    method: 'POST',
    data: params,
  }
  return request<PostApiMailSendWelcomeEmailResultType>(config)
}

/**
 * @description 发送验证码邮件
 * @param params PostApiMailSendVerificationCodeRequestType
 * @returns Promise<PostApiMailSendVerificationCodeResultType>
 */
export interface PostApiMailSendVerificationCodeRequestType {
  /** @description 收件邮箱地址 */
  email: string
}

/**
 * @description 发送验证码邮件 的返回数据类型
 */
export interface PostApiMailSendVerificationCodeResultType {
  /** @description  */
  success: boolean
  /** @description  */
  message: string
  /** @description  */
  code: string | null
  /** @description  */
  error: string | null
}

/**
 * @description 发送验证码邮件
 * @param params PostApiMailSendVerificationCodeRequestType
 * @returns Promise<PostApiMailSendVerificationCodeResultType>
 */
export async function postApiMailSendVerificationCodeFunc(
  params: PostApiMailSendVerificationCodeRequestType
): Promise<PostApiMailSendVerificationCodeResultType> {
  const config: RequestConfig = {
    url: '/api/mail/send-verification-code',
    method: 'POST',
    data: params,
  }
  return request<PostApiMailSendVerificationCodeResultType>(config)
}

/**
 * @description 发送密码重置邮件
 * @param params PostApiMailSendPasswordResetRequestType
 * @returns Promise<PostApiMailSendPasswordResetResultType>
 */
export interface PostApiMailSendPasswordResetRequestType {
  /** @description 收件邮箱地址 */
  email: string
  /** @description 密码重置令牌 */
  resetToken: string
  /** @description 密码重置链接 */
  resetUrl: string
}

/**
 * @description 发送密码重置邮件 的返回数据类型
 */
export interface PostApiMailSendPasswordResetResultType {
  /** @description 响应数据 */
  data: any
}

/**
 * @description 发送密码重置邮件
 * @param params PostApiMailSendPasswordResetRequestType
 * @returns Promise<PostApiMailSendPasswordResetResultType>
 */
export async function postApiMailSendPasswordResetFunc(
  params: PostApiMailSendPasswordResetRequestType
): Promise<PostApiMailSendPasswordResetResultType> {
  const config: RequestConfig = {
    url: '/api/mail/send-password-reset',
    method: 'POST',
    data: params,
  }
  return request<PostApiMailSendPasswordResetResultType>(config)
}

/**
 * @description 发送自定义 HTML 邮件
 * @param params PostApiMailSendHtmlEmailRequestType
 * @returns Promise<PostApiMailSendHtmlEmailResultType>
 */
export interface PostApiMailSendHtmlEmailRequestType {
  /** @description 收件邮箱地址 */
  email: string
  /** @description 邮件主题 */
  subject: string
  /** @description HTML 邮件内容 */
  html: string
}

/**
 * @description 发送自定义 HTML 邮件 的返回数据类型
 */
export interface PostApiMailSendHtmlEmailResultType {
  /** @description 响应数据 */
  data: any
}

/**
 * @description 发送自定义 HTML 邮件
 * @param params PostApiMailSendHtmlEmailRequestType
 * @returns Promise<PostApiMailSendHtmlEmailResultType>
 */
export async function postApiMailSendHtmlEmailFunc(
  params: PostApiMailSendHtmlEmailRequestType
): Promise<PostApiMailSendHtmlEmailResultType> {
  const config: RequestConfig = {
    url: '/api/mail/send-html-email',
    method: 'POST',
    data: params,
  }
  return request<PostApiMailSendHtmlEmailResultType>(config)
}
