/**
 * @description CreatePermissionDto
 */
export interface CreatePermissionDto {
  /** @description 权限名称 */
  name: string
  /** @description 权限类型 */
  type: string
  /** @description 操作动作 */
  action?: string
  /** @description 资源名称 */
  resource?: string
  /** @description 父权限ID */
  parentId?: string
  /** @description 路由路径（菜单用） */
  path?: string
  /** @description 图标（菜单用） */
  icon?: string
  /** @description 排序号 */
  sort?: number
  /** @description 是否可见 */
  visible?: number
  /** @description 状态 */
  status?: number
  /** @description 权限描述 */
  description?: string
}
