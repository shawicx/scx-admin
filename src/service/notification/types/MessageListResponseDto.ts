import type { NotificationAdminDto } from '@/service/notification/types/NotificationAdminDto'

/**
 * @description 管理端消息分页响应
 */
export interface MessageListResponseDto {
  /** @description 消息列表 */
  list: NotificationAdminDto[]
  /** @description 总数 */
  total: number
  /** @description 当前页码 */
  page: number
  /** @description 每页条数 */
  limit: number
}
