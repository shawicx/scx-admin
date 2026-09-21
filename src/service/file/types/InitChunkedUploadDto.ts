/**
 * @description 分片上传初始化请求
 */
export interface InitChunkedUploadDto {
  /** @description 原始文件名 */
  fileName: string | null
  /** @description MIME 类型，缺省按二进制流处理 */
  mimeType?: string | null
  /** @description 文件总大小（字节） */
  size: number | null
  /** @description 分片大小（字节），范围 5MB-64MB */
  chunkSize: number | null
  /** @description 文件 SHA-256 哈希（64 位十六进制），用于断点续传与秒传 */
  fileHash: string | null
}
