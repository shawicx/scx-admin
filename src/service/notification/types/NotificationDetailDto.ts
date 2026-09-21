import type { NotificationAdminDto } from '@/service/notification/types/NotificationAdminDto'

/**
 * @description 管理端消息详情
 */
export interface NotificationDetailDto {
  /** @description 基础信息 */
  notification: NotificationAdminDto
  /** @description 目标 ID 列表 */
  targetIdList?: string[] | null
}
