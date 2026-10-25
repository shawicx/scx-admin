/**
 * @description 公开随笔列表项
 */
export interface NotePublicListItemDto {
  /** @description 随笔 ID */
  id: string
  /** @description 随笔内容 */
  content: string
  /** @description 发布时间 */
  publishedAt?: string | null
  /** @description 创建时间 */
  createdAt: string
}
