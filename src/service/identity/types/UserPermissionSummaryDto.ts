/**
 * @description 用户权限摘要响应
 */
export interface UserPermissionSummaryDto {
  /** @description 权限 ID */
  id: string
  /** @description 权限名称 */
  name: string
  /** @description 操作动作 */
  action?: string | null
  /** @description 资源名称 */
  resource?: string | null
  /** @description 权限类型（MENU / BUTTON） */
  type: string
  /** @description 路由路径 */
  path?: string | null
}
