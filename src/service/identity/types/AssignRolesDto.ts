/**
 * @description 批量分配角色请求
 */
export interface AssignRolesDto {
  /** @description 角色 ID 列表 */
  roleIds: string[]
  /** @description 用户 ID */
  userId: string
}
