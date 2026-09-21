/**
 * @description 创建字典数据请求
 */
export interface CreateDictDataDto {
  /** @description 所属字典类型 ID */
  typeId: string
  /** @description 显示文本（1-100 字符） */
  label: string
  /** @description 存储值（1-100 字符，同类型下唯一） */
  value: string
  /** @description 排序号（升序，可空，缺省由服务端取 0） */
  sort?: number | null
  /** @description 状态（1 启用 / 0 停用，可空，缺省由服务端取 1） */
  status?: number | null
}
