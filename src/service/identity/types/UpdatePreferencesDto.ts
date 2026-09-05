import type { NotificationPrefs } from '@/service/identity/types/NotificationPrefs'
import type { PrivacyPrefs } from '@/service/identity/types/PrivacyPrefs'

/**
 * @description 更新偏好设置请求
 */
export interface UpdatePreferencesDto {
  /** @description 主题，如 light / dark */
  theme?: string | null
  /** @description 语言，如 zh-CN / en-US */
  language?: string | null
  /** @description 时区，如 Asia/Shanghai */
  timezone?: string | null
  /** @description  */
  notifications?: NotificationPrefs | null
  /** @description  */
  privacy?: PrivacyPrefs | null
}
