/**
 * @description 权限摘要响应
 */
export interface PermissionSummaryDto {
  /** @description 权限 ID */
  id: string
  /** @description 权限名称 */
  name: string
  /** @description 权限类型（MENU / BUTTON） */
  type: string
  /** @description 操作动作 */
  action?: string | null
  /** @description 资源名称 */
  resource?: string | null
  /** @description 权限描述 */
  description?: string | null
  /** @description 层级 */
  level: number
  /** @description 路由路径 */
  path?: string | null
  /** @description 图标 */
  icon?: string | null
}
