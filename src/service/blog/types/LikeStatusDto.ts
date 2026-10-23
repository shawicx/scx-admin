/**
 * @description 点赞状态响应
 */
export interface LikeStatusDto {
  /** @description 当前有效点赞数 */
  count: number
  /** @description 当前访客是否已点赞 */
  liked: boolean
}
