/**
 * @description 公开文章列表查询参数
 */
export interface PublicPostQueryDto {
  /** @description 页码，从 1 开始 */
  page?: number
  /** @description 每页条数 */
  limit?: number
  /** @description 按分类 slug 过滤 */
  categorySlug?: string | null
  /** @description 按标签 slug 过滤 */
  tagSlug?: string | null
  /** @description 排序方式（new 最新优先 / old 最早优先） */
  sort?: string
  /** @description 按标题/摘要关键字搜索 */
  search?: string | null
}
