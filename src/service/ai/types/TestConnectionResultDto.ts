/**
 * @description 连通性测试结果
 */
export interface TestConnectionResultDto {
  /** @description 是否连通 */
  ok: boolean
  /** @description 耗时（毫秒） */
  latencyMs: number
  /** @description 结果说明 */
  message: string
}
