/**
 * @description 更新标签请求
 */
export interface UpdateTagDto {
  /** @description 标签名称 */
  name: string
  /** @description URL 标识 */
  slug?: string | null
  /** @description 标签描述 */
  description?: string | null
  /** @description 排序号（缺省 0） */
  sort?: number | null
  /** @description 状态（0 停用 / 1 启用） */
  status?: number | null
}
