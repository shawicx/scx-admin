/**
 * @description 创建权限请求
 */
export interface CreatePermissionDto {
  /** @description 权限名称（2-100 字符） */
  name: string
  /** @description 权限类型（MENU 菜单 / BUTTON 按钮） */
  type: string
  /** @description 操作动作（按钮类型，2-50 字符） */
  action?: string | null
  /** @description 资源名称（按钮类型，2-100 字符） */
  resource?: string | null
  /** @description 父权限 ID（自引用树） */
  parentId?: string | null
  /** @description 路由路径（菜单类型，最长 200 字符） */
  path?: string | null
  /** @description 图标（菜单类型，最长 100 字符） */
  icon?: string | null
  /** @description 排序号（升序，≥0） */
  sort?: number | null
  /** @description 是否可见（0 隐藏 / 1 显示） */
  visible?: number | null
  /** @description 状态（0 停用 / 1 启用） */
  status?: number | null
  /** @description 权限描述（最长 255 字符） */
  description?: string | null
}
