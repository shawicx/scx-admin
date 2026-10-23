import type { CommentPublicResponseDto } from '@/service/blog/types/CommentPublicResponseDto'

/**
 * @description 公开评论列表响应
 */
export interface CommentPublicListResponseDto {
  /** @description 已审核评论列表（时间正序） */
  list: CommentPublicResponseDto[]
  /** @description 总数 */
  total: number
  /** @description 页码 */
  page: number
  /** @description 每页条数 */
  limit: number
}
