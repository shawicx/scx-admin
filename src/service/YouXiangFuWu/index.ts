import request from '@/service/request'

/**
 * @description 接口 发送验证码邮件 的 **请求类型**
 * @category 邮箱服务
 * @method POST
 * @path /api/mail/send-verification-code
 */
export interface PostMailSendVerificationCodeRequestType {
  /**
   * 收件人邮箱
   */
  email: string
}

/**
 * @description 接口 发送验证码邮件 的 **返回类型**
 * @category 邮箱服务
 * @method POST
 * @path /api/mail/send-verification-code
 */
export interface PostMailSendVerificationCodeResponseType {
  /**
   * 发送是否成功
   */
  success: boolean
  /**
   * 发送结果消息
   */
  message: string
  /**
   * 错误信息（发送失败时）
   */
  error?: string
  /**
   * 验证码（仅用于开发环境调试，生产环境不返回）
   */
  code?: string
}

/**
 * @description 接口 发送验证码邮件 的 **请求函数**
 * @category 邮箱服务
 * @method POST
 * @path /api/mail/send-verification-code
 */
export const postMailSendVerificationCodeApi = (
  params: PostMailSendVerificationCodeRequestType
) => {
  return request('/api/mail/send-verification-code', {
    method: 'POST',
    data: params,
  })
}

/**
 * @description 接口 发送欢迎邮件 的 **请求类型**
 * @category 邮箱服务
 * @method POST
 * @path /api/mail/send-welcome-email
 */
export interface PostMailSendWelcomeEmailRequestType {
  /**
   * 收件人邮箱
   */
  email: string
  /**
   * 用户名
   */
  username: string
}

/**
 * @description 接口 发送欢迎邮件 的 **返回类型**
 * @category 邮箱服务
 * @method POST
 * @path /api/mail/send-welcome-email
 */
export interface PostMailSendWelcomeEmailResponseType {
  /**
   * 发送是否成功
   */
  success: boolean
  /**
   * 发送结果消息
   */
  message: string
  /**
   * 错误信息（发送失败时）
   */
  error?: string
}

/**
 * @description 接口 发送欢迎邮件 的 **请求函数**
 * @category 邮箱服务
 * @method POST
 * @path /api/mail/send-welcome-email
 */
export const postMailSendWelcomeEmailApi = (
  params: PostMailSendWelcomeEmailRequestType
) => {
  return request('/api/mail/send-welcome-email', {
    method: 'POST',
    data: params,
  })
}

/**
 * @description 接口 发送密码重置邮件 的 **请求类型**
 * @category 邮箱服务
 * @method POST
 * @path /api/mail/send-password-reset
 */
export interface PostMailSendPasswordResetRequestType {
  /**
   * 收件人邮箱
   */
  email: string
  /**
   * 重置令牌
   */
  resetToken: string
  /**
   * 重置链接
   */
  resetUrl: string
}

/**
 * @description 接口 发送密码重置邮件 的 **返回类型**
 * @category 邮箱服务
 * @method POST
 * @path /api/mail/send-password-reset
 */
export interface PostMailSendPasswordResetResponseType {
  /**
   * 发送是否成功
   */
  success: boolean
  /**
   * 发送结果消息
   */
  message: string
  /**
   * 错误信息（发送失败时）
   */
  error?: string
}

/**
 * @description 接口 发送密码重置邮件 的 **请求函数**
 * @category 邮箱服务
 * @method POST
 * @path /api/mail/send-password-reset
 */
export const postMailSendPasswordResetApi = (
  params: PostMailSendPasswordResetRequestType
) => {
  return request('/api/mail/send-password-reset', {
    method: 'POST',
    data: params,
  })
}

/**
 * @description 接口 发送HTML邮件 的 **请求类型**
 * @category 邮箱服务
 * @method POST
 * @path /api/mail/send-html-email
 */
export interface PostMailSendHtmlEmailRequestType {
  /**
   * 收件人邮箱
   */
  email: string
  /**
   * 邮件主题
   */
  subject: string
  /**
   * HTML内容
   */
  html: string
}

/**
 * @description 接口 发送HTML邮件 的 **返回类型**
 * @category 邮箱服务
 * @method POST
 * @path /api/mail/send-html-email
 */
export interface PostMailSendHtmlEmailResponseType {
  /**
   * 发送是否成功
   */
  success: boolean
  /**
   * 发送结果消息
   */
  message: string
  /**
   * 错误信息（发送失败时）
   */
  error?: string
}

/**
 * @description 接口 发送HTML邮件 的 **请求函数**
 * @category 邮箱服务
 * @method POST
 * @path /api/mail/send-html-email
 */
export const postMailSendHtmlEmailApi = (
  params: PostMailSendHtmlEmailRequestType
) => {
  return request('/api/mail/send-html-email', {
    method: 'POST',
    data: params,
  })
}
