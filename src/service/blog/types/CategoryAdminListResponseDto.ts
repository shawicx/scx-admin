import type { CategoryAdminResponseDto } from '@/service/blog/types/CategoryAdminResponseDto'

/**
 * @description 管理端分类列表响应
 */
export interface CategoryAdminListResponseDto {
  /** @description 分类列表（排序号升序） */
  list: CategoryAdminResponseDto[]
}
