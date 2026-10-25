/**
 * @description 管理端随笔列表查询参数
 */
export interface AdminNoteQueryDto {
  /** @description 页码，从 1 开始 */
  page?: number
  /** @description 每页条数 */
  limit?: number
  /** @description 按状态过滤（0 草稿 / 1 已发布 / 2 已归档） */
  status?: number | null
}
