import type { LoginLogResponseDto } from '@/service/identity/types/index'

/**
 * @description 登录日志列表响应
 */
export interface LoginLogListResponseDto {
  /** @description 登录日志列表 */
  list: LoginLogResponseDto[]
  /** @description 总数 */
  total: number
  /** @description 当前页码 */
  page: number
  /** @description 每页条数 */
  limit: number
}
