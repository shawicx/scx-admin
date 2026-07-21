/**
 * @description 用户-角色关系响应
 */
export interface UserRoleResponseDto {
  /** @description 关联记录 ID */
  id: string
  /** @description 用户 ID */
  userId: string
  /** @description 角色 ID */
  roleId: string
  /** @description 创建时间 */
  createdAt: string
}
