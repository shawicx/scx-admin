import type { FileResponseDto } from '@/service/file/types/index'

/**
 * @description 文件列表响应
 */
export interface FileListResponseDto {
  /** @description 文件列表 */
  list: FileResponseDto[]
  /** @description 总数 */
  total: number
  /** @description 当前页码 */
  page: number
  /** @description 每页条数 */
  limit: number
}
