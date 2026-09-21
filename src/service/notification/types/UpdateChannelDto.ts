/**
 * @description 更新渠道请求
 */
export interface UpdateChannelDto {
  /** @description 渠道 ID */
  id: string
  /** @description 渠道名称（2-50 字符） */
  name?: string | null
  /** @description 渠道描述（最长 255 字符） */
  description?: string | null
  /** @description 是否启用（停用后不可用于发消息） */
  isActive?: boolean | null
}
