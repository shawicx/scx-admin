import type { UserPreferences } from '@/service/identity/types'

/**
 * @description 登录响应
 */
export interface LoginResponseDto {
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
  /** @description 访问令牌（2 小时有效） */
  accessToken: string
  /** @description 刷新令牌（7 天有效） */
  refreshToken: string
}
