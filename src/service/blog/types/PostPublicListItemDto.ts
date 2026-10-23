import type { CategoryBriefDto } from '@/service/blog/types/CategoryBriefDto'
import type { TagBriefDto } from '@/service/blog/types/TagBriefDto'

/**
 * @description 公开文章列表项
 */
export interface PostPublicListItemDto {
  /** @description 文章 ID */
  id: string
  /** @description 文章标题 */
  title: string
  /** @description URL 标识 */
  slug: string
  /** @description 文章摘要 */
  summary?: string | null
  /** @description 封面文件 ID */
  coverFileId?: string | null
  /** @description  */
  category?: CategoryBriefDto | null
  /** @description 标签列表 */
  tags: TagBriefDto[]
  /** @description 是否置顶 */
  isTop: boolean
  /** @description 发布时间 */
  publishedAt?: string | null
  /** @description 累计阅读数 */
  viewCount: number
  /** @description 当前有效点赞数 */
  likeCount: number
  /** @description 已审核评论数 */
  commentCount: number
}
