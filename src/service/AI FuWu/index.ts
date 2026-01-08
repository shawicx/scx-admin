import { RequestConfig, request } from '../request'
import type { AiMessageDto } from '../types'

/**
 * @description 生成 AI 回复
 * @param params ApiAiCompletionPOSTRequest
 * @returns Promise<ApiAiCompletionPOSTResponse>
 */
export interface ApiAiCompletionPOSTRequest {
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
 * @description 生成 AI 回复 的返回数据类型
 */
export interface ApiAiCompletionPOSTResponse {
  /** @description  */
  success: boolean
  /** @description  */
  data: Record<string, any>
}

/**
 * @description 生成 AI 回复
 * @param params ApiAiCompletionPOSTRequest
 * @returns Promise<ApiAiCompletionPOSTResponse>
 */
export async function apiAiCompletionPOST(
  params: ApiAiCompletionPOSTRequest
): Promise<ApiAiCompletionPOSTResponse> {
  const config: RequestConfig = {
    url: '/api/ai/completion',
    method: 'POST',
    data: params,
  }
  return request<ApiAiCompletionPOSTResponse>(config)
}

/**
 * @description 更新用户 AI 配置
 * @param params ApiAiConfigPUTRequest
 * @returns Promise<ApiAiConfigPUTResponse>
 */
export interface ApiAiConfigPUTRequest {
  /** @description 默认平台 */
  defaultProvider?: string
  /** @description  */
  providers?: Record<string, any>
  /** @description  */
  Authorization?: string
}

/**
 * @description 更新用户 AI 配置 的返回数据类型
 */
export interface ApiAiConfigPUTResponse {
  /** @description  */
  success: boolean
  /** @description  */
  message: string
}

/**
 * @description 更新用户 AI 配置
 * @param params ApiAiConfigPUTRequest
 * @returns Promise<ApiAiConfigPUTResponse>
 */
export async function apiAiConfigPUT(
  params: ApiAiConfigPUTRequest
): Promise<ApiAiConfigPUTResponse> {
  const config: RequestConfig = {
    url: '/api/ai/config',
    method: 'PUT',
    data: params,
  }
  return request<ApiAiConfigPUTResponse>(config)
}

/**
 * @description 测试平台连接
 * @param params ApiAiTestConnectionPOSTRequest
 * @returns Promise<ApiAiTestConnectionPOSTResponse>
 */
export interface ApiAiTestConnectionPOSTRequest {
  /** @description 要测试的平台 */
  provider: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 测试平台连接 的返回数据类型
 */
export interface ApiAiTestConnectionPOSTResponse {
  /** @description  */
  success: boolean
  /** @description  */
  data: Record<string, any>
}

/**
 * @description 测试平台连接
 * @param params ApiAiTestConnectionPOSTRequest
 * @returns Promise<ApiAiTestConnectionPOSTResponse>
 */
export async function apiAiTestConnectionPOST(
  params: ApiAiTestConnectionPOSTRequest
): Promise<ApiAiTestConnectionPOSTResponse> {
  const config: RequestConfig = {
    url: '/api/ai/test-connection',
    method: 'POST',
    data: params,
  }
  return request<ApiAiTestConnectionPOSTResponse>(config)
}

/**
 * @description 获取可用平台列表
 * @param params ApiAiProvidersGETRequest
 * @returns Promise<ApiAiProvidersGETResponse>
 */
export interface ApiAiProvidersGETRequest {
  /** @description  */
  Authorization?: string
}

/**
 * @description 获取可用平台列表 的返回数据类型
 */
export interface ApiAiProvidersGETResponse {
  /** @description  */
  success: boolean
  /** @description  */
  data: Record<string, any>[]
}

/**
 * @description 获取可用平台列表
 * @param params ApiAiProvidersGETRequest
 * @returns Promise<ApiAiProvidersGETResponse>
 */
export async function apiAiProvidersGET(
  params: ApiAiProvidersGETRequest
): Promise<ApiAiProvidersGETResponse> {
  const config: RequestConfig = {
    url: '/api/ai/providers',
    method: 'GET',
    params,
  }
  return request<ApiAiProvidersGETResponse>(config)
}

/**
 * @description 获取请求历史
 * @param params ApiAiRequestsGETRequest
 * @returns Promise<ApiAiRequestsGETResponse>
 */
export interface ApiAiRequestsGETRequest {
  /** @description  */
  Authorization?: string
}

/**
 * @description 获取请求历史 的返回数据类型
 */
export interface ApiAiRequestsGETResponse {
  /** @description  */
  success: boolean
  /** @description  */
  data: Record<string, any>
}

/**
 * @description 获取请求历史
 * @param params ApiAiRequestsGETRequest
 * @returns Promise<ApiAiRequestsGETResponse>
 */
export async function apiAiRequestsGET(
  params: ApiAiRequestsGETRequest
): Promise<ApiAiRequestsGETResponse> {
  const config: RequestConfig = {
    url: '/api/ai/requests',
    method: 'GET',
    params,
  }
  return request<ApiAiRequestsGETResponse>(config)
}
