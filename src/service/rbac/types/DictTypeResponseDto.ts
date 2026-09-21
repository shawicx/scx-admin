/**
 * @description 字典类型响应
 */
export interface DictTypeResponseDto {
  /** @description 字典类型 ID */
  id: string
  /** @description 字典名称 */
  name: string
  /** @description 字典编码 */
  code: string
  /** @description 描述 */
  description?: string | null
  /** @description 是否系统内置 */
  isSystem: boolean
  /** @description 状态（1 启用 / 0 停用） */
  status: number
  /** @description 创建时间 */
  createdAt: string
  /** @description 更新时间 */
  updatedAt: string
}
