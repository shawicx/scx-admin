import type { AdjacentPostDto } from '@/service/blog/types/AdjacentPostDto'
import type { CategoryBriefDto } from '@/service/blog/types/CategoryBriefDto'
import type { TagBriefDto } from '@/service/blog/types/TagBriefDto'

/**
 * @description 公开文章详情
 */
export interface PostPublicDetailDto {
  /** @description 文章标题 */
  title: string
  /** @description URL 标识 */
  slug: string
  /** @description 文章摘要 */
  summary?: string | null
  /** @description Markdown 正文 */
  content: string
  /** @description 封面文件 ID */
  coverFileId?: string | null
  /** @description  */
  category?: CategoryBriefDto | null
  /** @description 标签列表 */
  tags: TagBriefDto[]
  /** @description 发布时间 */
  publishedAt?: string | null
  /** @description 更新时间 */
  updatedAt: string
  /** @description 累计阅读数 */
  viewCount: number
  /** @description 当前有效点赞数 */
  likeCount: number
  /** @description 已审核评论数 */
  commentCount: number
  /** @description 是否允许评论 */
  allowComment: boolean
  /** @description SEO 标题（空则前端回退文章标题） */
  seoTitle?: string | null
  /** @description SEO 描述（空则前端回退摘要） */
  seoDescription?: string | null
  /** @description  */
  prev?: AdjacentPostDto | null
  /** @description  */
  next?: AdjacentPostDto | null
}
