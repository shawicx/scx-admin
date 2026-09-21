/**
 * @description 更新字典类型请求
 */
export interface UpdateDictTypeDto {
  /** @description 字典类型 ID */
  id: string
  /** @description 字典名称（1-100 字符） */
  name?: string | null
  /** @description 描述（最长 255 字符） */
  description?: string | null
  /** @description 状态（1 启用 / 0 停用） */
  status?: number | null
}
