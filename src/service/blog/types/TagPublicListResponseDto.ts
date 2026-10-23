import type { TagPublicResponseDto } from '@/service/blog/types/TagPublicResponseDto'

/**
 * @description 公开标签列表响应
 */
export interface TagPublicListResponseDto {
  /** @description 标签列表（仅启用，排序号升序） */
  list: TagPublicResponseDto[]
}
