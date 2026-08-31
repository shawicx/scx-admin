/**
 * @description 隐私偏好
 */
export interface PrivacyPrefs {
  /** @description 资料是否可见 */
  profileVisible?: boolean | null
  /** @description 是否展示邮箱 */
  showEmail?: boolean | null
  /** @description 是否展示最后在线时间 */
  showLastSeen?: boolean | null
}
