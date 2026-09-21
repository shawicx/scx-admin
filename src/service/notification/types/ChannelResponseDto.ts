/**
 * @description 渠道信息响应
 */
export interface ChannelResponseDto {
  /** @description 渠道 ID */
  id: string
  /** @description 渠道编码 */
  code: string
  /** @description 渠道名称 */
  name: string
  /** @description 投递类型 EMAIL/INBOX/ANNOUNCEMENT */
  type: string
  /** @description 渠道描述 */
  description?: string | null
  /** @description 是否系统渠道（不可删除） */
  isSystem: boolean
  /** @description 是否启用 */
  isActive: boolean
  /** @description 创建时间 */
  createdAt: string
  /** @description 更新时间 */
  updatedAt: string
}
