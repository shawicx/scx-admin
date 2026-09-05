import { RequestConfig, request } from '@/service/request'
import type {
  ComponentHealthDto,
  SystemInfoDto,
} from '@/service/identity/types'

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
  /** @description 服务名 */
  service: string
  /** @description 总体状态（ok / degraded / error） */
  status: string
  /** @description 检查时间（ISO-8601） */
  timestamp: string
  /** @description 数据库组件状态 */
  database: ComponentHealthDto
  /** @description Redis 组件状态 */
  redis: ComponentHealthDto
  /** @description 系统运行信息 */
  system: SystemInfoDto
  /** @description 检查耗时（如 12ms） */
  responseTime: string
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
