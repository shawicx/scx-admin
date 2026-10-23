import { request } from '@/service/request'
import type { RequestConfig } from '@/service/request'
import type {
  OverviewPostDto,
  OverviewCommentDto,
  TrendPointDto,
} from '@/service/blog/types'

/**
 * @description 概览统计
 * @returns Promise<GetApiBlogAdminStatsOverviewResultType>
 */
export interface GetApiBlogAdminStatsOverviewRequestType {}

/**
 * @description 概览统计 的返回数据类型
 */
export interface GetApiBlogAdminStatsOverviewResultType {
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

/**
 * @description 概览统计
 * @param params GetApiBlogAdminStatsOverviewRequestType
 * @returns Promise<GetApiBlogAdminStatsOverviewResultType>
 */
export async function getApiBlogAdminStatsOverviewFunc(
  params: GetApiBlogAdminStatsOverviewRequestType,
  options: Omit<RequestConfig, 'url' | 'method' | 'data' | 'params'> = {}
): Promise<GetApiBlogAdminStatsOverviewResultType> {
  const config: RequestConfig = {
    ...options,
    url: '/api/blog/admin/stats/overview',
    method: 'GET',
  }
  return request<GetApiBlogAdminStatsOverviewResultType>(config)
}
