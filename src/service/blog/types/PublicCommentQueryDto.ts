/**
 * @description 公开评论查询参数
 */
export interface PublicCommentQueryDto {
  /** @description 页码，从 1 开始 */
  page?: number
  /** @description 每页条数 */
  limit?: number
}
