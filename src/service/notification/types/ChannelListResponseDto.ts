import type { ChannelResponseDto } from '@/service/notification/types/ChannelResponseDto'

/**
 * @description 渠道列表响应
 */
export interface ChannelListResponseDto {
  /** @description 渠道列表 */
  list: ChannelResponseDto[]
  /** @description 总数 */
  total: number
  /** @description 当前页码 */
  page: number
  /** @description 每页条数 */
  limit: number
}
