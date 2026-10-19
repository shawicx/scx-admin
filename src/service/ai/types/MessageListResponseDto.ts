import type { MessageResponseDto } from '@/service/ai/types/MessageResponseDto'

/**
 * @description 历史消息响应
 */
export interface MessageListResponseDto {
  /** @description 消息列表（时间正序） */
  list: MessageResponseDto[]
}
