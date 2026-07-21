/**
 * @description 为角色分配权限请求
 */
export interface AssignPermissionsDto {
  /** @description 角色 ID */
  id: string
  /** @description 权限 ID 列表 */
  permissionIds: string[]
}
