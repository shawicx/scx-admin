import type { PostPublicListItemDto } from '@/service/blog/types/PostPublicListItemDto'

/**
 * @description 公开文章列表响应
 */
export interface PostPublicListResponseDto {
  /** @description 文章列表（置顶优先、发布时间倒序） */
  list: PostPublicListItemDto[]
  /** @description 总数 */
  total: number
  /** @description 页码 */
  page: number
  /** @description 每页条数 */
  limit: number
}
