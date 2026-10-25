/**
 * @description 管理端随笔项
 */
export interface NoteAdminDto {
  /** @description 随笔 ID */
  id: string
  /** @description 随笔内容 */
  content: string
  /** @description 状态（0 草稿 / 1 已发布 / 2 已归档） */
  status: number
  /** @description 发布时间（未发布为 null） */
  publishedAt?: string | null
  /** @description 创建时间 */
  createdAt: string
  /** @description 更新时间 */
  updatedAt: string
}
