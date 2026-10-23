/**
 * @description 公开评论响应
 */
export interface CommentPublicResponseDto {
  /** @description 评论 ID */
  id: string
  /** @description 访客昵称 */
  nickname: string
  /** @description 个人网站 */
  website?: string | null
  /** @description 评论正文（纯文本，前端负责转义） */
  content: string
  /** @description 直接回复的评论 ID（一级评论为 null） */
  parentId?: string | null
  /** @description 所属根评论 ID（一级评论为 null） */
  rootId?: string | null
  /** @description 发布时间 */
  createdAt: string
}
