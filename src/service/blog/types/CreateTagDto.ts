/**
 * @description 创建标签请求
 */
export interface CreateTagDto {
  /** @description 标签名称 */
  name: string
  /** @description URL 标识（缺省时由名称生成） */
  slug?: string | null
  /** @description 标签描述 */
  description?: string | null
  /** @description 排序号（越小越靠前，缺省 0） */
  sort?: number | null
  /** @description 状态（0 停用 / 1 启用，缺省启用） */
  status?: number | null
}
