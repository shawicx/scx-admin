/**
 * @description 管理端评论列表项
 */
export interface CommentAdminListItemDto {
  /** @description 评论 ID */
  id: string
  /** @description 所属文章 ID */
  postId: string
  /** @description 所属文章标题 */
  postTitle: string
  /** @description 访客昵称 */
  nickname: string
  /** @description 邮箱（仅管理端可见） */
  email?: string | null
  /** @description 个人网站 */
  website?: string | null
  /** @description 评论正文 */
  content: string
  /** @description 直接回复的评论 ID */
  parentId?: string | null
  /** @description 状态（0 待审核 / 1 已通过 / 2 已拒绝） */
  status: number
  /** @description 提交时间 */
  createdAt: string
}
