/**
 * @description 全部已读请求
 */
export interface MarkAllReadDto {
  /** @description 渠道 ID 列表（可选，缩小标记范围） */
  channelIds?: string[] | null
}
