/**
 * @description 创建文章请求
 */
export interface CreatePostDto {
  /** @description 文章标题 */
  title: string
  /** @description URL 标识（缺省时由标题生成） */
  slug?: string | null
  /** @description 文章摘要 */
  summary?: string | null
  /** @description Markdown 正文 */
  content: string
  /** @description 封面文件 ID（file-service 文件标识） */
  coverFileId?: string | null
  /** @description 分类 ID */
  categoryId?: string | null
  /** @description 标签 ID 列表（缺省为空） */
  tagIds?: string[] | null
  /** @description 可见性（0 公开 / 1 私密，缺省公开） */
  visibility?: number | null
  /** @description 是否置顶 */
  isTop?: boolean | null
  /** @description 是否允许评论 */
  allowComment?: boolean | null
  /** @description SEO 标题（空则回退文章标题） */
  seoTitle?: string | null
  /** @description SEO 描述（空则回退摘要） */
  seoDescription?: string | null
}
