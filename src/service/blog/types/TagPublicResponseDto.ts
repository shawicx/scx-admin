/**
 * @description 公开标签响应
 */
export interface TagPublicResponseDto {
  /** @description 标签名称 */
  name: string
  /** @description URL 标识 */
  slug: string
  /** @description 标签描述 */
  description?: string | null
  /** @description 公开可见文章数 */
  postCount: number
}
