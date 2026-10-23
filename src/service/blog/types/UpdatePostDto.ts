/**
 * @description 更新文章请求
 */
export interface UpdatePostDto {
  /** @description 文章标题 */
  title: string
  /** @description URL 标识（修改已发布文章的 slug 需自行处理旧链接重定向） */
  slug?: string | null
  /** @description 文章摘要 */
  summary?: string | null
  /** @description Markdown 正文 */
  content: string
  /** @description 封面文件 ID */
  coverFileId?: string | null
  /** @description 分类 ID（传空表示改为未分类） */
  categoryId?: string | null
  /** @description 标签 ID 列表（整体替换，缺省为空） */
  tagIds?: string[] | null
  /** @description 可见性（0 公开 / 1 私密，缺省公开） */
  visibility?: number | null
  /** @description 是否置顶（缺省不置顶） */
  isTop?: boolean | null
  /** @description 是否允许评论（缺省允许） */
  allowComment?: boolean | null
  /** @description SEO 标题 */
  seoTitle?: string | null
  /** @description SEO 描述 */
  seoDescription?: string | null
}
