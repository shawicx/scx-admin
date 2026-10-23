import type { CommentAdminListItemDto } from '@/service/blog/types/CommentAdminListItemDto'

/**
 * @description 管理端评论列表响应
 */
export interface CommentAdminListResponseDto {
  /** @description 评论列表（提交时间倒序） */
  list: CommentAdminListItemDto[]
  /** @description 总数 */
  total: number
  /** @description 页码 */
  page: number
  /** @description 每页条数 */
  limit: number
}
