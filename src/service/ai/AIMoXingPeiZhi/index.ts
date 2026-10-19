import { request } from '@/service/request'
import type { RequestConfig } from '@/service/request'

/**
 * @description 连通性测试
 * @param params PostApiAiConfigTestRequestType
 * @returns Promise<PostApiAiConfigTestResultType>
 */
export interface PostApiAiConfigTestRequestType {
  /** @description OpenAI 兼容 API 地址 */
  baseUrl: string
  /** @description API Key（传空时使用已保存的 Key） */
  apiKey?: string | null
}

/**
 * @description 连通性测试 的返回数据类型
 */
export interface PostApiAiConfigTestResultType {
  /** @description 是否连通 */
  ok: boolean
  /** @description 耗时（毫秒） */
  latencyMs: number
  /** @description 结果说明 */
  message: string
}

/**
 * @description 连通性测试
 * @param params PostApiAiConfigTestRequestType
 * @returns Promise<PostApiAiConfigTestResultType>
 */
export async function postApiAiConfigTestFunc(
  params: PostApiAiConfigTestRequestType,
  options: Omit<RequestConfig, 'url' | 'method' | 'data' | 'params'> = {}
): Promise<PostApiAiConfigTestResultType> {
  const config: RequestConfig = {
    ...options,
    url: '/api/ai/config/test',
    method: 'POST',
    data: params,
  }
  return request<PostApiAiConfigTestResultType>(config)
}

/**
 * @description 保存配置
 * @param params PostApiAiConfigSaveRequestType
 * @returns Promise<PostApiAiConfigSaveResultType>
 */
export interface PostApiAiConfigSaveRequestType {
  /** @description OpenAI 兼容 API 地址（如 https://dashscope.aliyuncs.com/compatible-mode/v1） */
  baseUrl: string
  /** @description API Key（首次配置必填；已保存过且传空表示保留原值） */
  apiKey?: string | null
  /** @description 模型名（如 qwen-plus / deepseek-chat / glm-4） */
  model: string
  /** @description 系统提示词（可选） */
  systemPrompt?: string | null
  /** @description 采样温度 0-2（可选） */
  temperature?: number | null
}

/**
 * @description 保存配置 的返回数据类型
 */
export interface PostApiAiConfigSaveResultType {
  /** @description 配置 ID */
  id: string
  /** @description OpenAI 兼容 API 地址 */
  baseUrl: string
  /** @description 模型名 */
  model: string
  /** @description 系统提示词 */
  systemPrompt: string | null
  /** @description 采样温度 */
  temperature: number | null
  /** @description 是否已配置 API Key */
  hasApiKey: boolean
  /** @description API Key 掩码（如 sk-…ab12） */
  apiKeyMasked: string | null
  /** @description 创建时间 */
  createdAt: string
  /** @description 更新时间 */
  updatedAt: string
}

/**
 * @description 保存配置
 * @param params PostApiAiConfigSaveRequestType
 * @returns Promise<PostApiAiConfigSaveResultType>
 */
export async function postApiAiConfigSaveFunc(
  params: PostApiAiConfigSaveRequestType,
  options: Omit<RequestConfig, 'url' | 'method' | 'data' | 'params'> = {}
): Promise<PostApiAiConfigSaveResultType> {
  const config: RequestConfig = {
    ...options,
    url: '/api/ai/config/save',
    method: 'POST',
    data: params,
  }
  return request<PostApiAiConfigSaveResultType>(config)
}

/**
 * @description 查询我的配置
 * @returns Promise<GetApiAiConfigResultType>
 */
export interface GetApiAiConfigRequestType {}

/**
 * @description 查询我的配置 的返回数据类型
 */
export interface GetApiAiConfigResultType {
  /** @description 配置 ID */
  id: string
  /** @description OpenAI 兼容 API 地址 */
  baseUrl: string
  /** @description 模型名 */
  model: string
  /** @description 系统提示词 */
  systemPrompt: string | null
  /** @description 采样温度 */
  temperature: number | null
  /** @description 是否已配置 API Key */
  hasApiKey: boolean
  /** @description API Key 掩码（如 sk-…ab12） */
  apiKeyMasked: string | null
  /** @description 创建时间 */
  createdAt: string
  /** @description 更新时间 */
  updatedAt: string
}

/**
 * @description 查询我的配置
 * @param params GetApiAiConfigRequestType
 * @returns Promise<GetApiAiConfigResultType>
 */
export async function getApiAiConfigFunc(
  params: GetApiAiConfigRequestType,
  options: Omit<RequestConfig, 'url' | 'method' | 'data' | 'params'> = {}
): Promise<GetApiAiConfigResultType> {
  const config: RequestConfig = {
    ...options,
    url: '/api/ai/config',
    method: 'GET',
  }
  return request<GetApiAiConfigResultType>(config)
}
