import { RequestConfig, request } from '@/service/request'
import type { JsonValue } from '@/service/identity/types'

/**
 * @description 健康检查
 * @param params GetApiHealthRequestType
 * @returns Promise<GetApiHealthResultType>
 */
export interface GetApiHealthRequestType {}

/**
 * @description 健康检查 的返回数据类型
 */
export interface GetApiHealthResultType {
  /** @description 响应数据 */
  data: JsonValue
}

/**
 * @description 健康检查
 * @param params GetApiHealthRequestType
 * @returns Promise<GetApiHealthResultType>
 */
export async function getApiHealthFunc(
  params: GetApiHealthRequestType
): Promise<GetApiHealthResultType> {
  const config: RequestConfig = {
    url: '/api/health',
    method: 'GET',
    params,
  }
  return request<GetApiHealthResultType>(config)
}
