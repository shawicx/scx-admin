import type { InboxItemDto } from '@/service/notification/types/InboxItemDto'

/**
 * @description 收件箱分页响应
 */
export interface InboxListResponseDto {
  /** @description 条目列表 */
  list: InboxItemDto[]
  /** @description 总数 */
  total: number
  /** @description 当前页码 */
  page: number
  /** @description 每页条数 */
  limit: number
}
