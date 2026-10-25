import type { NotePublicListItemDto } from '@/service/blog/types/NotePublicListItemDto'

/**
 * @description 公开随笔列表响应
 */
export interface NotePublicListResponseDto {
  /** @description 随笔列表（发布时间倒序） */
  list: NotePublicListItemDto[]
  /** @description 总数 */
  total: number
  /** @description 页码 */
  page: number
  /** @description 每页条数 */
  limit: number
}
