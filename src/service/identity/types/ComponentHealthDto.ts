/**
 * @description 组件健康状态
 */
export interface ComponentHealthDto {
  /** @description 组件状态（ok / error） */
  status: string
  /** @description 异常信息（正常时不输出） */
  message?: string | null
}
