/**
 * @description 菜单树节点响应
 */
export interface PermissionMenuTreeDto {
  /** @description 菜单 ID */
  id: string
  /** @description 菜单名称 */
  name: string
  /** @description 路由路径 */
  path?: string | null
  /** @description 图标 */
  icon?: string | null
  /** @description 子菜单列表 */
  children?: PermissionMenuTreeDto[] | null
}
