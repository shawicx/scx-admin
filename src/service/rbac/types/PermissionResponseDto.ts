/**
 * @description 权限信息响应
 */
export interface PermissionResponseDto {
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
  /** @description 父权限 ID */
  parentId?: string | null
  /** @description 层级 */
  level: number
  /** @description 路由路径 */
  path?: string | null
  /** @description 图标 */
  icon?: string | null
  /** @description 排序号 */
  sort: number
  /** @description 是否可见（0 / 1） */
  visible: number
  /** @description 状态（0 / 1） */
  status: number
  /** @description 权限描述 */
  description?: string | null
  /** @description 创建时间 */
  createdAt: string
  /** @description 更新时间 */
  updatedAt: string
}
