/**
 * @description 管理端评论列表查询参数
 */
export interface AdminCommentQueryDto {
  /** @description 页码，从 1 开始 */
  page?: number
  /** @description 每页条数 */
  limit?: number
  /** @description 按状态过滤（0 待审核 / 1 已通过 / 2 已拒绝） */
  status?: number | null
  /** @description 按文章 ID 过滤 */
  postId?: string | null
  /** @description 搜索关键字（昵称 / 评论内容） */
  search?: string | null
}
