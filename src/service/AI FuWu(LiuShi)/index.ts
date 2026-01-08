import { RequestConfig, request } from '../request'
import type { AiMessageDto } from '../types'

/**
 * @description 流式生成 AI 回复
 * @param params ApiAiCompletionStreamGETRequest
 * @returns Promise<ApiAiCompletionStreamGETResponse>
 */
export interface ApiAiCompletionStreamGETRequest {
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
export interface ApiAiCompletionStreamGETResponse {
  /** @description 响应数据 */
  data: any
}

/**
 * @description 流式生成 AI 回复
 * @param params ApiAiCompletionStreamGETRequest
 * @returns Promise<ApiAiCompletionStreamGETResponse>
 */
export async function apiAiCompletionStreamGET(
  params: ApiAiCompletionStreamGETRequest
): Promise<ApiAiCompletionStreamGETResponse> {
  const config: RequestConfig = {
    url: '/api/ai/completion/stream',
    method: 'GET',
    data: params,
  }
  return request<ApiAiCompletionStreamGETResponse>(config)
}
