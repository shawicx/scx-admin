import type { CategoryPublicResponseDto } from '@/service/blog/types/CategoryPublicResponseDto'

/**
 * @description 公开分类列表响应
 */
export interface CategoryPublicListResponseDto {
  /** @description 分类列表（仅启用，排序号升序） */
  list: CategoryPublicResponseDto[]
}
