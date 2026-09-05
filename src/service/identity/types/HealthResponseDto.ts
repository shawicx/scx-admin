import type { ComponentHealthDto } from '@/service/identity/types/ComponentHealthDto'
import type { SystemInfoDto } from '@/service/identity/types/SystemInfoDto'

/**
 * @description 健康检查响应
 */
export interface HealthResponseDto {
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
