/**
 * @description 更新分类请求
 */
export interface UpdateCategoryDto {
  /** @description 分类名称 */
  name: string
  /** @description URL 标识 */
  slug?: string | null
  /** @description 分类描述 */
  description?: string | null
  /** @description 排序号（缺省 0） */
  sort?: number | null
  /** @description 状态（0 停用 / 1 启用） */
  status?: number | null
}
