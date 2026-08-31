/**
 * @description 批量切换用户状态请求
 */
export interface ToggleUserStatusDto {
  /** @description 用户 ID 列表（ULID，最多 50 个） */
  userIds: string[]
  /** @description 目标状态：true 启用，false 停用 */
  isActive: boolean
}
