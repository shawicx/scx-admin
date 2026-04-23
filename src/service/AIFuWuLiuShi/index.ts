import { RequestConfig, request } from '@/service/request'
import type { AiMessageDto } from '@/service/types'

/**
 * @description 流式生成 AI 回复
 * @param params GetAiCompletionStreamRequestType
 * @returns Promise<GetAiCompletionStreamResult>
 */
export interface GetAiCompletionStreamRequestType {
  /** @description 消息列表 */
  messages: AiMessageDto[]
  /** @description 生成选项 */
  options?: any
  /** @description 显式指定平台 */
  provider?: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 流式生成 AI 回复 的返回数据类型
 */
export interface GetAiCompletionStreamResult {
  /** @description 响应数据 */
  data: any
}

/**
 * @description 流式生成 AI 回复
 * @param params GetAiCompletionStreamRequestType
 * @returns Promise<GetAiCompletionStreamResult>
 */
export async function getAiCompletionStreamFunc(
  params: GetAiCompletionStreamRequestType
): Promise<GetAiCompletionStreamResult> {
  const config: RequestConfig = {
    url: '/api/ai/completion/stream',
    method: 'GET',
    data: params,
  }
  return request<GetAiCompletionStreamResult>(config)
}
