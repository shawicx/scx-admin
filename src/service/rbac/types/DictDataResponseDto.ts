/**
 * @description 字典数据响应
 */
export interface DictDataResponseDto {
  /** @description 字典数据 ID */
  id: string
  /** @description 所属字典类型 ID */
  typeId: string
  /** @description 显示文本 */
  label: string
  /** @description 存储值 */
  value: string
  /** @description 排序号 */
  sort: number
  /** @description 状态（1 启用 / 0 停用） */
  status: number
  /** @description 创建时间 */
  createdAt: string
  /** @description 更新时间 */
  updatedAt: string
}
