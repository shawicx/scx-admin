/**
 * @description 用户列表查询参数
 */
export interface QueryUsersDto {
  /** @description 页码，从 1 开始 */
  page?: number
  /** @description 每页条数 */
  limit?: number
  /** @description 搜索关键字（邮箱或用户名） */
  search?: string | null
  /** @description 按状态过滤：true 启用，false 停用 */
  isActive?: boolean | null
  /** @description 排序字段 */
  sortBy?: string
  /** @description 排序方向：ASC / DESC */
  sortOrder?: string
}
