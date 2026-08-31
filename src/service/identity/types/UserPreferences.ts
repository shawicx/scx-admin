import type { NotificationPrefs, PrivacyPrefs } from '@/service/identity/types'

/**
 * @description 用户偏好设置
 */
export interface UserPreferences {
  /** @description 主题 */
  theme?: string | null
  /** @description 语言 */
  language?: string | null
  /** @description 时区 */
  timezone?: string | null
  /** @description  */
  notifications?: NotificationPrefs | null
  /** @description  */
  privacy?: PrivacyPrefs | null
}
