import type { OperationLogResponseDto } from '@/service/identity/types/OperationLogResponseDto'

/**
 * @description 操作日志列表响应
 */
export interface OperationLogListResponseDto {
  /** @description 操作日志列表 */
  list: OperationLogResponseDto[]
  /** @description 总数 */
  total: number
  /** @description 当前页码 */
  page: number
  /** @description 每页条数 */
  limit: number
}
