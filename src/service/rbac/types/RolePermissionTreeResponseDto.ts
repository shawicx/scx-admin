/**
 * @description 角色权限树节点响应（含子节点与角色勾选状态）
 */
export interface RolePermissionTreeResponseDto {
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
  /** @description 是否已分配给当前角色（默认勾选） */
  checked: boolean
  /** @description 子节点列表 */
  children?: RolePermissionTreeResponseDto[] | null
}
