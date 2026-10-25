import type { NoteAdminDto } from '@/service/blog/types/NoteAdminDto'

/**
 * @description 管理端随笔列表响应
 */
export interface NoteAdminListResponseDto {
  /** @description 随笔列表（创建时间倒序） */
  list: NoteAdminDto[]
  /** @description 总数 */
  total: number
  /** @description 页码 */
  page: number
  /** @description 每页条数 */
  limit: number
}
