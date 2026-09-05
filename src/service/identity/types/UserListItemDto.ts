/**
 * @description 用户列表项
 */
export interface UserListItemDto {
  /** @description 用户 ID */
  id: string
  /** @description 邮箱 */
  email: string
  /** @description 用户名称 */
  name: string
  /** @description 头像文件 ID（展示直链经 /files/info 换取预签名 URL） */
  avatar?: string | null
  /** @description 邮箱是否已验证 */
  emailVerified: boolean
  /** @description 是否启用 */
  isActive: boolean
  /** @description 最后登录时间 */
  lastLoginAt?: string | null
  /** @description 登录次数 */
  loginCount: number
  /** @description 创建时间 */
  createdAt: string
}
