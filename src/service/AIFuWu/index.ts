import { RequestConfig, request } from '@/service/request'
import type { AiMessageDto } from '@/service/types'

/**
 * @description 生成 AI 回复
 * @param params PostAiCompletionRequestType
 * @returns Promise<PostAiCompletionResult>
 */
export interface PostAiCompletionRequestType {
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
export interface PostAiCompletionResult {
  /** @description  */
  success: boolean
  /** @description  */
  data: Record<string, any>
}

/**
 * @description 生成 AI 回复
 * @param params PostAiCompletionRequestType
 * @returns Promise<PostAiCompletionResult>
 */
export async function postAiCompletionFunc(
  params: PostAiCompletionRequestType
): Promise<PostAiCompletionResult> {
  const config: RequestConfig = {
    url: '/api/ai/completion',
    method: 'POST',
    data: params,
  }
  return request<PostAiCompletionResult>(config)
}

/**
 * @description 更新用户 AI 配置
 * @param params PutAiConfigRequestType
 * @returns Promise<PutAiConfigResult>
 */
export interface PutAiConfigRequestType {
  /** @description  */
  Authorization?: string
}

/**
 * @description 更新用户 AI 配置 的返回数据类型
 */
export interface PutAiConfigResult {
  /** @description  */
  success: boolean
  /** @description  */
  message: string
}

/**
 * @description 更新用户 AI 配置
 * @param params PutAiConfigRequestType
 * @returns Promise<PutAiConfigResult>
 */
export async function putAiConfigFunc(
  params: PutAiConfigRequestType
): Promise<PutAiConfigResult> {
  const config: RequestConfig = {
    url: '/api/ai/config',
    method: 'PUT',
    data: params,
  }
  return request<PutAiConfigResult>(config)
}

/**
 * @description 测试平台连接
 * @param params PostAiTestConnectionRequestType
 * @returns Promise<PostAiTestConnectionResult>
 */
export interface PostAiTestConnectionRequestType {
  /** @description 要测试的平台 */
  provider: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 测试平台连接 的返回数据类型
 */
export interface PostAiTestConnectionResult {
  /** @description  */
  success: boolean
  /** @description  */
  data: Record<string, any>
}

/**
 * @description 测试平台连接
 * @param params PostAiTestConnectionRequestType
 * @returns Promise<PostAiTestConnectionResult>
 */
export async function postAiTestConnectionFunc(
  params: PostAiTestConnectionRequestType
): Promise<PostAiTestConnectionResult> {
  const config: RequestConfig = {
    url: '/api/ai/test-connection',
    method: 'POST',
    data: params,
  }
  return request<PostAiTestConnectionResult>(config)
}

/**
 * @description 获取可用平台列表
 * @param params GetAiProvidersRequestType
 * @returns Promise<GetAiProvidersResult>
 */
export interface GetAiProvidersRequestType {
  /** @description  */
  Authorization?: string
}

/**
 * @description 获取可用平台列表 的返回数据类型
 */
export interface GetAiProvidersResult {
  /** @description  */
  success: boolean
  /** @description  */
  data: Record<string, any>[]
}

/**
 * @description 获取可用平台列表
 * @param params GetAiProvidersRequestType
 * @returns Promise<GetAiProvidersResult>
 */
export async function getAiProvidersFunc(
  params: GetAiProvidersRequestType
): Promise<GetAiProvidersResult> {
  const config: RequestConfig = {
    url: '/api/ai/providers',
    method: 'GET',
    params,
  }
  return request<GetAiProvidersResult>(config)
}

/**
 * @description 获取请求历史
 * @param params GetAiRequestsRequestType
 * @returns Promise<GetAiRequestsResult>
 */
export interface GetAiRequestsRequestType {
  /** @description  */
  Authorization?: string
}

/**
 * @description 获取请求历史 的返回数据类型
 */
export interface GetAiRequestsResult {
  /** @description  */
  success: boolean
  /** @description  */
  data: Record<string, any>
}

/**
 * @description 获取请求历史
 * @param params GetAiRequestsRequestType
 * @returns Promise<GetAiRequestsResult>
 */
export async function getAiRequestsFunc(
  params: GetAiRequestsRequestType
): Promise<GetAiRequestsResult> {
  const config: RequestConfig = {
    url: '/api/ai/requests',
    method: 'GET',
    params,
  }
  return request<GetAiRequestsResult>(config)
}
