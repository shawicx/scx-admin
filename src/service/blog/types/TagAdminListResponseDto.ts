import type { TagAdminResponseDto } from '@/service/blog/types/TagAdminResponseDto'

/**
 * @description 管理端标签列表响应
 */
export interface TagAdminListResponseDto {
  /** @description 标签列表（排序号升序） */
  list: TagAdminResponseDto[]
}
