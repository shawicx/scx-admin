import type { SessionResponseDto } from '@/service/ai/types/SessionResponseDto'

/**
 * @description 会话列表响应
 */
export interface SessionListResponseDto {
  /** @description 会话列表 */
  list: SessionResponseDto[]
}
