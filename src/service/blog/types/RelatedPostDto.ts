/**
 * @description 相关文章简要信息
 */
export interface RelatedPostDto {
  /** @description URL 标识 */
  slug: string
  /** @description 文章标题 */
  title: string
  /** @description 文章摘要 */
  summary?: string | null
  /** @description 发布时间 */
  publishedAt?: string | null
}
