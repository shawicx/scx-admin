import type { RoleResponseDto } from '@/service/rbac/types/RoleResponseDto'

/**
 * @description 角色列表响应
 */
export interface RoleListResponseDto {
  /** @description 角色列表 */
  list: RoleResponseDto[]
  /** @description 总数 */
  total: number
  /** @description 当前页码 */
  page: number
  /** @description 每页条数 */
  limit: number
}
