import { request } from '@/service/request'
import type { RequestConfig } from '@/service/request'
import type { MessageResponseDto } from '@/service/ai/types'

/**
 * @description 清空全部会话
 * @returns Promise<PostApiAiMessagesClearResultType>
 */
export interface PostApiAiMessagesClearRequestType {}

/**
 * @description 清空全部会话 的返回数据类型
 */
export interface PostApiAiMessagesClearResultType {
  /** @description  */
  message: string
}

/**
 * @description 清空全部会话
 * @param params PostApiAiMessagesClearRequestType
 * @returns Promise<PostApiAiMessagesClearResultType>
 */
export async function postApiAiMessagesClearFunc(
  params: PostApiAiMessagesClearRequestType,
  options: Omit<RequestConfig, 'url' | 'method' | 'data' | 'params'> = {}
): Promise<PostApiAiMessagesClearResultType> {
  const config: RequestConfig = {
    ...options,
    url: '/api/ai/messages/clear',
    method: 'POST',
  }
  return request<PostApiAiMessagesClearResultType>(config)
}

/**
 * @description 发送消息（SSE 流式）
 * @param params PostApiAiChatRequestType
 * @returns Promise<PostApiAiChatResultType>
 */
export interface PostApiAiChatRequestType {
  /** @description 会话 ID（缺省时新建会话） */
  sessionId?: string | null
  /** @description 用户消息内容 */
  content: string
}

/**
 * @description 发送消息（SSE 流式） 的返回数据类型
 */
export interface PostApiAiChatResultType {
  /** @description 响应数据 */
  data: string
}

/**
 * @description 发送消息（SSE 流式）
 * @param params PostApiAiChatRequestType
 * @returns Promise<PostApiAiChatResultType>
 */
export async function postApiAiChatFunc(
  params: PostApiAiChatRequestType,
  options: Omit<RequestConfig, 'url' | 'method' | 'data' | 'params'> = {}
): Promise<PostApiAiChatResultType> {
  const config: RequestConfig = {
    ...options,
    url: '/api/ai/chat',
    method: 'POST',
    data: params,
  }
  return request<PostApiAiChatResultType>(config)
}

/**
 * @description 会话历史消息
 * @param params GetApiAiMessagesRequestType
 * @returns Promise<GetApiAiMessagesResultType>
 */
export interface GetApiAiMessagesRequestType {
  /** @description 会话 ID */
  sessionId: string
}

/**
 * @description 会话历史消息 的返回数据类型
 */
export interface GetApiAiMessagesResultType {
  /** @description 消息列表（时间正序） */
  list: MessageResponseDto[]
}

/**
 * @description 会话历史消息
 * @param params GetApiAiMessagesRequestType
 * @returns Promise<GetApiAiMessagesResultType>
 */
export async function getApiAiMessagesFunc(
  params: GetApiAiMessagesRequestType,
  options: Omit<RequestConfig, 'url' | 'method' | 'data' | 'params'> = {}
): Promise<GetApiAiMessagesResultType> {
  const config: RequestConfig = {
    ...options,
    url: '/api/ai/messages',
    method: 'GET',
    params: params,
  }
  return request<GetApiAiMessagesResultType>(config)
}
