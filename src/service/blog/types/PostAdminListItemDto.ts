import type { CategoryBriefDto } from '@/service/blog/types/CategoryBriefDto'
import type { TagBriefDto } from '@/service/blog/types/TagBriefDto'

/**
 * @description 管理端文章列表项
 */
export interface PostAdminListItemDto {
  /** @description 文章 ID */
  id: string
  /** @description 文章标题 */
  title: string
  /** @description URL 标识 */
  slug: string
  /** @description  */
  category?: CategoryBriefDto | null
  /** @description 标签列表 */
  tags: TagBriefDto[]
  /** @description 状态（0 草稿 / 1 已发布 / 2 已归档） */
  status: number
  /** @description 可见性（0 公开 / 1 私密） */
  visibility: number
  /** @description 是否置顶 */
  isTop: boolean
  /** @description 是否允许评论 */
  allowComment: boolean
  /** @description 发布时间（未发布为 null） */
  publishedAt?: string | null
  /** @description 累计阅读数 */
  viewCount: number
  /** @description 当前有效点赞数 */
  likeCount: number
  /** @description 已审核评论数 */
  commentCount: number
  /** @description 创建时间 */
  createdAt: string
  /** @description 更新时间 */
  updatedAt: string
}
