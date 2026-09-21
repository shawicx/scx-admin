/**
 * @description 分片上传结果响应
 */
export interface ChunkUploadResultDto {
  /** @description 分片号 */
  partNumber: number
  /** @description 分片 ETag（内容 MD5，可用于客户端校验） */
  etag: string
  /** @description 分片大小（字节） */
  size: number
}
