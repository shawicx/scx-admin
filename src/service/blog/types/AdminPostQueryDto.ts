/**
 * @description 管理端文章列表查询参数
 */
export interface AdminPostQueryDto {
  /** @description 页码，从 1 开始 */
  page?: number
  /** @description 每页条数 */
  limit?: number
  /** @description 搜索关键字（标题 / slug） */
  search?: string | null
  /** @description 按状态过滤（0 草稿 / 1 已发布 / 2 已归档） */
  status?: number | null
  /** @description 按分类 ID 过滤 */
  categoryId?: string | null
  /** @description 按是否置顶过滤 */
  isTop?: boolean | null
  /** @description 排序字段（createdAt / updatedAt / publishedAt / title） */
  sortBy?: string
  /** @description 排序方向（asc / desc） */
  sortOrder?: string
}
