/**
 * @description 创建角色请求
 */
export interface CreateRoleDto {
  /** @description 角色名称（2-50 字符） */
  name: string
  /** @description 角色编码（2-50 字符，唯一） */
  code: string
  /** @description 角色描述（最长 255 字符） */
  description?: string | null
}
