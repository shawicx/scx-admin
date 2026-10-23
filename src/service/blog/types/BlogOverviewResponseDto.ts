import type { OverviewCommentDto } from '@/service/blog/types/OverviewCommentDto'
import type { OverviewPostDto } from '@/service/blog/types/OverviewPostDto'
import type { TrendPointDto } from '@/service/blog/types/TrendPointDto'

/**
 * @description 博客概览统计响应
 */
export interface BlogOverviewResponseDto {
  /** @description 未删除文章总数 */
  totalPosts: number
  /** @description 已发布文章数 */
  publishedPosts: number
  /** @description 草稿文章数 */
  draftPosts: number
  /** @description 累计阅读量 */
  totalViews: number
  /** @description 今日阅读量 */
  todayViews: number
  /** @description 累计有效点赞数 */
  totalLikes: number
  /** @description 待审核评论数 */
  pendingComments: number
  /** @description 最近发布文章（最多 5 条） */
  recentPosts: OverviewPostDto[]
  /** @description 最新评论（最多 5 条） */
  recentComments: OverviewCommentDto[]
  /** @description 近 7 天阅读趋势（含零阅读日） */
  trend7d: TrendPointDto[]
}
