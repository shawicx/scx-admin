/**
 * @description 更新字典数据请求
 */
export interface UpdateDictDataDto {
  /** @description 字典数据 ID */
  id: string
  /** @description 显示文本（1-100 字符） */
  label?: string | null
  /** @description 存储值（1-100 字符，同类型下唯一） */
  value?: string | null
  /** @description 排序号（升序） */
  sort?: number | null
  /** @description 状态（1 启用 / 0 停用） */
  status?: number | null
}
