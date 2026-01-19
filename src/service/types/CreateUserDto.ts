/**
 * @description CreateUserDto
 */
export interface CreateUserDto {
  /** @description 用户邮箱 */
  email: string
  /** @description 用户名称 */
  name: string
  /** @description 密码 */
  password: string
  /** @description 是否启用 */
  isActive?: boolean
  /** @description 初始角色ID列表 */
  roleIds?: string[]
}
