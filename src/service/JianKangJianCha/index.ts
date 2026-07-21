import { RequestConfig, request } from '@/service/request'

/**
 * @description 健康检查
 * @param params GetApiHealthRequestType
 * @returns Promise<GetApiHealthResultType>
 */
export interface GetApiHealthRequestType {
  /** @description  */
  Authorization?: string
}

/**
 * @description 健康检查 的返回数据类型
 */
export interface GetApiHealthResultType {}

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
