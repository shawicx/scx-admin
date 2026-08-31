import type { UserListItemDto } from '@/service/identity/types/index'

/**
 * @description 用户列表响应
 */
export interface UserListResponseDto {
  /** @description 用户列表 */
  list: UserListItemDto[]
  /** @description 总数 */
  total: number
  /** @description 当前页码 */
  page: number
  /** @description 每页条数 */
  limit: number
}
