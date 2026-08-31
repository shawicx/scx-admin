/**
 * @description 角色信息响应
 */
export interface RoleResponseDto {
  /** @description 角色 ID */
  id: string
  /** @description 角色名称 */
  name: string
  /** @description 角色编码 */
  code: string
  /** @description 角色描述 */
  description?: string | null
  /** @description 是否系统内置角色 */
  isSystem: boolean
  /** @description 创建时间 */
  createdAt: string
  /** @description 更新时间 */
  updatedAt: string
}
