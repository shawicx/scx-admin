/**
 * @description 权限查询参数
 */
export interface PermissionQueryDto {
  /** @description 页码，从 1 开始 */
  page?: number
  /** @description 每页条数 */
  limit?: number
  /** @description 搜索关键字 */
  search?: string | null
  /** @description 按动作过滤 */
  action?: string | null
  /** @description 按资源过滤 */
  resource?: string | null
  /** @description 按类型过滤（MENU / BUTTON） */
  type?: string | null
  /** @description 按父节点过滤 */
  parentId?: string | null
  /** @description 按层级过滤 */
  level?: number | null
}
