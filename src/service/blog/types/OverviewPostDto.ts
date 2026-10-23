/**
 * @description 概览最近文章行
 */
export interface OverviewPostDto {
  /** @description 文章 ID */
  id: string
  /** @description 文章标题 */
  title: string
  /** @description 状态（0 草稿 / 1 已发布 / 2 已归档） */
  status: number
  /** @description 发布时间 */
  publishedAt?: string | null
  /** @description 累计阅读数 */
  viewCount: number
}
