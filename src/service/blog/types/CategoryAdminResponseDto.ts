/**
 * @description 管理端分类响应
 */
export interface CategoryAdminResponseDto {
  /** @description 分类 ID */
  id: string
  /** @description 分类名称 */
  name: string
  /** @description URL 标识 */
  slug: string
  /** @description 分类描述 */
  description?: string | null
  /** @description 排序号 */
  sort: number
  /** @description 状态（0 停用 / 1 启用） */
  status: number
  /** @description 未删除文章数 */
  postCount: number
  /** @description 公开可见文章数 */
  publicPostCount: number
}
