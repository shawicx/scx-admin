/**
 * @description PermissionTreeResponseDto
 */
export interface PermissionTreeResponseDto {
  /** @description 权限ID */
  id: string
  /** @description 权限名称 */
  name: string
  /** @description 权限类型 */
  type: string
  /** @description 操作动作 */
  action: any
  /** @description 资源名称 */
  resource: any
  /** @description 父权限ID */
  parentId: any
  /** @description 层级 */
  level: number
  /** @description 路由路径（菜单用） */
  path: any
  /** @description 图标（菜单用） */
  icon: any
  /** @description 排序号 */
  sort: number
  /** @description 是否可见 */
  visible: number
  /** @description 状态 */
  status: number
  /** @description 权限描述 */
  description: any
  /** @description 创建时间 */
  createdAt: string
  /** @description 更新时间 */
  updatedAt: string
  /** @description 子权限列表 */
  children: any
}
