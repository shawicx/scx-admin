/**
 * @description 上传会话进度响应
 */
export interface ChunkedUploadStatusDto {
  /** @description 上传会话 ID */
  uploadId: string
  /** @description 会话状态：UPLOADING / COMPLETED / ABORTED / EXPIRED */
  status: string
  /** @description 原始文件名 */
  originalName: string
  /** @description 文件总大小（字节） */
  size: number
  /** @description 分片大小（字节） */
  chunkSize: number
  /** @description 总分片数 */
  totalChunks: number
  /** @description 已上传分片号列表 */
  uploadedChunks: number[]
  /** @description 已上传字节数（进度统计） */
  uploadedBytes: number
  /** @description 会话过期时间 */
  expiresAt: string
}
