/**
 * @description 文件查询参数
 */
export interface QueryFilesDto {
  /** @description 页码，从 1 开始 */
  page?: number
  /** @description 每页条数 */
  limit?: number
  /** @description 搜索关键字（按原始文件名） */
  search?: string | null
  /** @description 按 MIME 类型过滤 */
  mimeType?: string | null
  /** @description 排序字段 */
  sortBy?: string
  /** @description 排序方向：ASC / DESC */
  sortOrder?: string
}
