/**
 * @description HealthStatusDto
 */
export interface HealthStatusDto {
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
