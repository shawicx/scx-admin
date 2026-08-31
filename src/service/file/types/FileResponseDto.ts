/**
 * @description 文件信息响应
 */
export interface FileResponseDto {
  /** @description 文件 ID */
  id: string
  /** @description 所属用户 ID */
  userId: string
  /** @description 原始文件名 */
  originalName: string
  /** @description MIME 类型 */
  mimeType: string
  /** @description 文件大小（字节） */
  size: number
  /** @description 存储路径 */
  path: string
  /** @description 访问 URL */
  url: string
  /** @description 创建时间 */
  createdAt: string
  /** @description 删除时间（逻辑删除） */
  deletedAt?: string | null
}
