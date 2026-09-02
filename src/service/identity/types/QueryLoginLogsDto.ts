/**
 * @description 登录日志查询参数
 */
export interface QueryLoginLogsDto {
  /** @description 页码，从 1 开始 */
  page?: number
  /** @description 每页条数（1-100） */
  limit?: number
  /** @description 搜索关键字（按邮箱/IP 模糊匹配） */
  search?: string | null
  /** @description 按登录类型精确过滤：PASSWORD / EMAIL_CODE / LOGOUT / REFRESH */
  loginType?: string | null
  /** @description 按用户 ID 精确过滤 */
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
