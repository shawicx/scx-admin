/**
 * @description 管理端文章详情
 */
export interface PostDetailResponseDto {
  /** @description 文章 ID */
  id: string
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
  /** @description 分类 ID（未分类为 null） */
  categoryId?: string | null
  /** @description 标签 ID 列表 */
  tagIds: string[]
  /** @description 状态（0 草稿 / 1 已发布 / 2 已归档） */
  status: number
  /** @description 可见性（0 公开 / 1 私密） */
  visibility: number
  /** @description 是否置顶 */
  isTop: boolean
  /** @description 是否允许评论 */
  allowComment: boolean
  /** @description 发布时间 */
  publishedAt?: string | null
  /** @description SEO 标题 */
  seoTitle?: string | null
  /** @description SEO 描述 */
  seoDescription?: string | null
  /** @description 创建时间 */
  createdAt: string
  /** @description 更新时间 */
  updatedAt: string
}
