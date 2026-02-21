/**
 * @description PermissionMenuTreeDto
 */
export interface PermissionMenuTreeDto {
  /** @description 权限ID */
  id: string
  /** @description 权限名称 */
  name: string
  /** @description 路由路径 */
  path: any
  /** @description 图标 */
  icon: any
  /** @description 子菜单列表 */
  children: any
}
