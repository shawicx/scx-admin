import type { UserPreferences } from '@/service/identity/types'

/**
 * @description 用户信息响应
 */
export interface UserResponseDto {
  /** @description 用户 ID */
  id: string
  /** @description 邮箱 */
  email: string
  /** @description 用户名称 */
  name: string
  /** @description 邮箱是否已验证 */
  emailVerified: boolean
  /** @description  */
  preferences?: UserPreferences | null
  /** @description 最后登录 IP */
  lastLoginIp?: string | null
  /** @description 最后登录时间 */
  lastLoginAt?: string | null
  /** @description 登录次数 */
  loginCount: number
  /** @description 是否启用 */
  isActive: boolean
  /** @description 创建时间 */
  createdAt: string
  /** @description 更新时间 */
  updatedAt: string
}
