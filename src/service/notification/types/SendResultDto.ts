/**
 * @description 发送消息结果
 */
export interface SendResultDto {
  /** @description 消息 ID */
  notificationId: string
  /** @description 实际投递人数 */
  recipientCount: number
}
