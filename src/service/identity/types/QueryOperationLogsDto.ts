/**
 * @description 操作日志查询参数
 */
export interface QueryOperationLogsDto {
  /** @description 页码，从 1 开始 */
  page?: number
  /** @description 每页条数（1-100） */
  limit?: number
  /** @description 搜索关键字（按模块/动作/操作人邮箱/URI 模糊匹配） */
  search?: string | null
  /** @description 按模块精确过滤（如：用户管理） */
  module?: string | null
  /** @description 按动作精确过滤（如：创建用户） */
  action?: string | null
  /** @description 按操作人用户 ID 精确过滤 */
  userId?: string | null
  /** @description 按成功与否过滤 */
  success?: boolean | null
  /** @description 创建时间起（yyyy-MM-dd HH:mm:ss） */
  startTime?: string | null
  /** @description 创建时间止（yyyy-MM-dd HH:mm:ss） */
  endTime?: string | null
  /** @description 排序字段 */
  sortBy?: string
  /** @description 排序方向：ASC / DESC */
  sortOrder?: string
}
