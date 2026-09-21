import { RequestConfig, request } from '@/service/request'
import type { FileResponseDto } from '@/service/file/types'

/**
 * @description 上传分片
 * @param params PutApiFilesUploadSessionsChunksByUploadIdByPartNumberRequestType
 * @returns Promise<PutApiFilesUploadSessionsChunksByUploadIdByPartNumberResultType>
 */
export interface PutApiFilesUploadSessionsChunksByUploadIdByPartNumberRequestType {
  /** @description 上传会话 ID */
  uploadId: string
  /** @description 分片号，从 1 开始 */
  partNumber: string
  /** @description 分片内容 MD5（可选，与服务端 ETag 比对） */
  md5?: string
}

/**
 * @description 上传分片 的返回数据类型
 */
export interface PutApiFilesUploadSessionsChunksByUploadIdByPartNumberResultType {
  /** @description 分片号 */
  partNumber: number
  /** @description 分片 ETag（内容 MD5，可用于客户端校验） */
  etag: string
  /** @description 分片大小（字节） */
  size: number
}

/**
 * @description 上传分片
 * @param params PutApiFilesUploadSessionsChunksByUploadIdByPartNumberRequestType
 * @returns Promise<PutApiFilesUploadSessionsChunksByUploadIdByPartNumberResultType>
 */
export async function putApiFilesUploadSessionsChunksByUploadIdByPartNumberFunc(
  params: PutApiFilesUploadSessionsChunksByUploadIdByPartNumberRequestType
): Promise<PutApiFilesUploadSessionsChunksByUploadIdByPartNumberResultType> {
  const config: RequestConfig = {
    url: `/api/files/upload/sessions/${params.uploadId}/chunks/${params.partNumber}`,
    method: 'PUT',
    params,
  }
  return request<PutApiFilesUploadSessionsChunksByUploadIdByPartNumberResultType>(
    config
  )
}

/**
 * @description 完成分片上传
 * @param params PostApiFilesUploadSessionsCompleteByUploadIdRequestType
 * @returns Promise<PostApiFilesUploadSessionsCompleteByUploadIdResultType>
 */
export interface PostApiFilesUploadSessionsCompleteByUploadIdRequestType {
  /** @description 上传会话 ID */
  uploadId: string
}

/**
 * @description 完成分片上传 的返回数据类型
 */
export interface PostApiFilesUploadSessionsCompleteByUploadIdResultType {
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
  deletedAt: string | null
}

/**
 * @description 完成分片上传
 * @param params PostApiFilesUploadSessionsCompleteByUploadIdRequestType
 * @returns Promise<PostApiFilesUploadSessionsCompleteByUploadIdResultType>
 */
export async function postApiFilesUploadSessionsCompleteByUploadIdFunc(
  params: PostApiFilesUploadSessionsCompleteByUploadIdRequestType
): Promise<PostApiFilesUploadSessionsCompleteByUploadIdResultType> {
  const config: RequestConfig = {
    url: `/api/files/upload/sessions/${params.uploadId}/complete`,
    method: 'POST',
    params,
  }
  return request<PostApiFilesUploadSessionsCompleteByUploadIdResultType>(config)
}

/**
 * @description 初始化分片上传
 * @param params PostApiFilesUploadInitRequestType
 * @returns Promise<PostApiFilesUploadInitResultType>
 */
export interface PostApiFilesUploadInitRequestType {
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

/**
 * @description 初始化分片上传 的返回数据类型
 */
export interface PostApiFilesUploadInitResultType {
  /** @description 上传会话 ID；秒传命中时为空 */
  uploadId: string | null
  /** @description 分片大小（字节） */
  chunkSize: number
  /** @description 总分片数 */
  totalChunks: number
  /** @description 已上传分片号列表（断点续传时跳过这些分片） */
  uploadedChunks: number[]
  /** @description 是否秒传命中（同用户已存在相同哈希的文件） */
  instant: boolean
  /** @description  */
  file: FileResponseDto | null
}

/**
 * @description 初始化分片上传
 * @param params PostApiFilesUploadInitRequestType
 * @returns Promise<PostApiFilesUploadInitResultType>
 */
export async function postApiFilesUploadInitFunc(
  params: PostApiFilesUploadInitRequestType
): Promise<PostApiFilesUploadInitResultType> {
  const config: RequestConfig = {
    url: '/api/files/upload/init',
    method: 'POST',
    data: params,
  }
  return request<PostApiFilesUploadInitResultType>(config)
}

/**
 * @description 上传会话进度
 * @param params GetApiFilesUploadSessionsByUploadIdRequestType
 * @returns Promise<GetApiFilesUploadSessionsByUploadIdResultType>
 */
export interface GetApiFilesUploadSessionsByUploadIdRequestType {
  /** @description 上传会话 ID */
  uploadId: string
}

/**
 * @description 上传会话进度 的返回数据类型
 */
export interface GetApiFilesUploadSessionsByUploadIdResultType {
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

/**
 * @description 上传会话进度
 * @param params GetApiFilesUploadSessionsByUploadIdRequestType
 * @returns Promise<GetApiFilesUploadSessionsByUploadIdResultType>
 */
export async function getApiFilesUploadSessionsByUploadIdFunc(
  params: GetApiFilesUploadSessionsByUploadIdRequestType
): Promise<GetApiFilesUploadSessionsByUploadIdResultType> {
  const config: RequestConfig = {
    url: `/api/files/upload/sessions/${params.uploadId}`,
    method: 'GET',
    params,
  }
  return request<GetApiFilesUploadSessionsByUploadIdResultType>(config)
}

/**
 * @description 取消分片上传
 * @param params DeleteApiFilesUploadSessionsByUploadIdRequestType
 * @returns Promise<DeleteApiFilesUploadSessionsByUploadIdResultType>
 */
export interface DeleteApiFilesUploadSessionsByUploadIdRequestType {
  /** @description 上传会话 ID */
  uploadId: string
}

/**
 * @description 取消分片上传 的返回数据类型
 */
export interface DeleteApiFilesUploadSessionsByUploadIdResultType {
  /** @description  */
  count: number
  /** @description  */
  message: string
}

/**
 * @description 取消分片上传
 * @param params DeleteApiFilesUploadSessionsByUploadIdRequestType
 * @returns Promise<DeleteApiFilesUploadSessionsByUploadIdResultType>
 */
export async function deleteApiFilesUploadSessionsByUploadIdFunc(
  params: DeleteApiFilesUploadSessionsByUploadIdRequestType
): Promise<DeleteApiFilesUploadSessionsByUploadIdResultType> {
  const config: RequestConfig = {
    url: `/api/files/upload/sessions/${params.uploadId}`,
    method: 'DELETE',
    params,
  }
  return request<DeleteApiFilesUploadSessionsByUploadIdResultType>(config)
}
