/**
 * @description 更新权限请求
 */
export interface UpdatePermissionDto {
  /** @description 权限 ID */
  id: string
  /** @description 权限名称（2-100 字符） */
  name?: string | null
  /** @description 权限类型（MENU / BUTTON） */
  type?: string | null
  /** @description 操作动作（2-50 字符） */
  action?: string | null
  /** @description 资源名称（2-100 字符） */
  resource?: string | null
  /** @description 父权限 ID */
  parentId?: string | null
  /** @description 路由路径（最长 200 字符） */
  path?: string | null
  /** @description 图标（最长 100 字符） */
  icon?: string | null
  /** @description 排序号（≥0） */
  sort?: number | null
  /** @description 是否可见（0 / 1） */
  visible?: number | null
  /** @description 状态（0 / 1） */
  status?: number | null
  /** @description 权限描述（最长 255 字符） */
  description?: string | null
}
