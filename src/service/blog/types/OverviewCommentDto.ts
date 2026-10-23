/**
 * @description 概览最新评论行
 */
export interface OverviewCommentDto {
  /** @description 评论 ID */
  id: string
  /** @description 所属文章标题 */
  postTitle: string
  /** @description 访客昵称 */
  nickname: string
  /** @description 评论内容摘要 */
  contentPreview: string
  /** @description 状态（0 待审核 / 1 已通过 / 2 已拒绝） */
  status: number
  /** @description 提交时间 */
  createdAt: string
}
