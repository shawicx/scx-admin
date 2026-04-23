import { RequestConfig, request } from '@/service/request'

/**
 * @description 健康检查
 * @param params GetHealthRequestType
 * @returns Promise<GetHealthResult>
 */
export interface GetHealthRequestType {
  /** @description  */
  Authorization?: string
}

/**
 * @description 健康检查 的返回数据类型
 */
export interface GetHealthResult {
  /** @description 服务名称 */
  service: string
  /** @description 服务状态 */
  status: string
  /** @description 时间戳 */
  timestamp: string
  /** @description 数据库连接状态 */
  database: Record<string, any>
  /** @description Redis 连接状态 */
  redis: Record<string, any>
  /** @description 系统信息 */
  system: Record<string, any>
}

/**
 * @description 健康检查
 * @param params GetHealthRequestType
 * @returns Promise<GetHealthResult>
 */
export async function getHealthFunc(
  params: GetHealthRequestType
): Promise<GetHealthResult> {
  const config: RequestConfig = {
    url: '/api/health',
    method: 'GET',
    params,
  }
  return request<GetHealthResult>(config)
}
