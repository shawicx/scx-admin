import type { UserListItemDto } from '@/service/types/index'

/**
 * @description UserListResponseDto
 */
export interface UserListResponseDto {
  /** @description 用户列表 */
  users: UserListItemDto[]
  /** @description 总数 */
  total: number
  /** @description 当前页码 */
  page: number
  /** @description 每页数量 */
  limit: number
}
