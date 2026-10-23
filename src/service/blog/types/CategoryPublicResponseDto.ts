/**
 * @description 公开分类响应
 */
export interface CategoryPublicResponseDto {
  /** @description 分类名称 */
  name: string
  /** @description URL 标识 */
  slug: string
  /** @description 分类描述 */
  description?: string | null
  /** @description 公开可见文章数 */
  postCount: number
}
