import type { RelatedPostDto } from '@/service/blog/types/RelatedPostDto'

/**
 * @description 相关文章响应
 */
export interface RelatedPostsResponseDto {
  /** @description 相关文章列表（最多 5 条） */
  list: RelatedPostDto[]
}
