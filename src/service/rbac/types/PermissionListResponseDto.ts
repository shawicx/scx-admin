import type { PermissionResponseDto } from '@/service/rbac/types/PermissionResponseDto'

/**
 * @description 权限列表响应
 */
export interface PermissionListResponseDto {
  /** @description 权限列表 */
  list: PermissionResponseDto[]
  /** @description 总数 */
  total: number
  /** @description 当前页码 */
  page: number
  /** @description 每页条数 */
  limit: number
}
