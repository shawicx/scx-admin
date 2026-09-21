/**
 * @description 创建字典类型请求
 */
export interface CreateDictTypeDto {
  /** @description 字典名称（1-100 字符，唯一） */
  name: string
  /** @description 字典编码（小写字母开头，仅含小写字母/数字/下划线/中划线，唯一，创建后不可修改） */
  code: string
  /** @description 描述（最长 255 字符） */
  description?: string | null
}
