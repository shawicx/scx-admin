import type { DictTypeResponseDto } from '@/service/rbac/types/DictTypeResponseDto'

/**
 * @description 字典类型列表响应
 */
export interface DictTypeListResponseDto {
  /** @description 字典类型列表 */
  list: DictTypeResponseDto[]
  /** @description 总数 */
  total: number
  /** @description 当前页码 */
  page: number
  /** @description 每页条数 */
  limit: number
}
