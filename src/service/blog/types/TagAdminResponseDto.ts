/**
 * @description 管理端标签响应
 */
export interface TagAdminResponseDto {
  /** @description 标签 ID */
  id: string
  /** @description 标签名称 */
  name: string
  /** @description URL 标识 */
  slug: string
  /** @description 标签描述 */
  description?: string | null
  /** @description 排序号 */
  sort: number
  /** @description 状态（0 停用 / 1 启用） */
  status: number
  /** @description 公开可见文章数 */
  publicPostCount: number
}
