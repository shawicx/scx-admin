/**
 * @description ToggleUserStatusDto
 */
export interface ToggleUserStatusDto {
  /** @description 要切换状态的用户ID列表（支持批量） */
  userIds: string[]
  /** @description 目标状态 */
  isActive: boolean
}
