/**
 * @description 匿名发表评论请求
 */
export interface CreateCommentDto {
  /** @description 访客昵称 */
  nickname: string
  /** @description 邮箱（选填，不公开） */
  email?: string | null
  /** @description 个人网站（选填） */
  website?: string | null
  /** @description 评论正文（纯文本） */
  content: string
  /** @description 回复的评论 ID（仅支持回复一级评论，选填） */
  parentId?: string | null
}
