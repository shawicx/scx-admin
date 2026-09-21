import type { FileResponseDto } from '@/service/file/types/FileResponseDto'

/**
 * @description 分片上传初始化响应
 */
export interface ChunkedUploadInitResponseDto {
  /** @description 上传会话 ID；秒传命中时为空 */
  uploadId?: string | null
  /** @description 分片大小（字节） */
  chunkSize: number
  /** @description 总分片数 */
  totalChunks: number
  /** @description 已上传分片号列表（断点续传时跳过这些分片） */
  uploadedChunks: number[]
  /** @description 是否秒传命中（同用户已存在相同哈希的文件） */
  instant: boolean
  /** @description  */
  file?: FileResponseDto | null
}
