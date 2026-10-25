/**
 * @description 公开随笔列表查询参数
 */
export interface PublicNoteQueryDto {
  /** @description 页码，从 1 开始 */
  page?: number
  /** @description 每页条数（上限 50） */
  limit?: number
}
