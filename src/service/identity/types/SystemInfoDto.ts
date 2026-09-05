/**
 * @description 系统运行信息
 */
export interface SystemInfoDto {
  /** @description Java 版本 */
  javaVersion: string
  /** @description 操作系统与架构 */
  platform: string
  /** @description JVM 运行时长（毫秒） */
  uptime: number
  /** @description 可用处理器数 */
  availableProcessors: number
  /** @description 最大可用内存（字节） */
  maxMemory: number
  /** @description 已分配内存（字节） */
  totalMemory: number
  /** @description 空闲内存（字节） */
  freeMemory: number
  /** @description 已使用内存（字节） */
  usedMemory: number
}
