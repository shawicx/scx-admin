/**
 * @description 更新角色请求
 */
export interface UpdateRoleDto {
  /** @description 角色 ID */
  id: string
  /** @description 角色名称（2-50 字符） */
  name?: string | null
  /** @description 角色编码（2-50 字符） */
  code?: string | null
  /** @description 角色描述（最长 255 字符） */
  description?: string | null
}
