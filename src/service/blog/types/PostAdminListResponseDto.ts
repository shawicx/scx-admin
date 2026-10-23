import type { PostAdminListItemDto } from '@/service/blog/types/PostAdminListItemDto'

/**
 * @description 管理端文章列表响应
 */
export interface PostAdminListResponseDto {
  /** @description 文章列表 */
  list: PostAdminListItemDto[]
  /** @description 总数 */
  total: number
  /** @description 页码 */
  page: number
  /** @description 每页条数 */
  limit: number
}
