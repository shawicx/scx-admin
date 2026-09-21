/**
 * @description 创建渠道请求
 */
export interface CreateChannelDto {
  /** @description 渠道编码（大写字母开头，大写字母/数字/下划线，2-50 字符，唯一） */
  code: string
  /** @description 渠道名称（2-50 字符） */
  name: string
  /** @description 投递类型：EMAIL（邮件）/ INBOX（站内信）/ ANNOUNCEMENT（公告） */
  type: string
  /** @description 渠道描述（最长 255 字符） */
  description?: string | null
}
