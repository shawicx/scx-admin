/**
 * @description 通知偏好
 */
export interface NotificationPrefs {
  /** @description 邮件通知 */
  email?: boolean | null
  /** @description 推送通知 */
  push?: boolean | null
  /** @description 短信通知 */
  sms?: boolean | null
}
