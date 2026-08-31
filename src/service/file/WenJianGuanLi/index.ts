import { RequestConfig, request } from '@/service/request'
import type { FileResponseDto } from '@/service/file/types'

/**
 * @description 上传文件
 * @param params PostApiFilesUploadRequestType
 * @returns Promise<PostApiFilesUploadResultType>
 */
export interface PostApiFilesUploadRequestType {
  /** @description 上传的文件 */
  file: File
}

/**
 * @description 上传文件 的返回数据类型
 */
export interface PostApiFilesUploadResultType {
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
 * @description 上传文件
 * @param params PostApiFilesUploadRequestType
 * @returns Promise<PostApiFilesUploadResultType>
 */
export async function postApiFilesUploadFunc(
  params: PostApiFilesUploadRequestType
): Promise<PostApiFilesUploadResultType> {
  const config: RequestConfig = {
    url: '/api/files/upload',
    method: 'POST',
    data: (() => {
      const fd = new FormData()
      Object.entries(params).forEach(([k, v]) => {
        fd.append(k, v instanceof File || v instanceof Blob ? v : String(v))
      })
      return fd
    })(),
  }
  return request<PostApiFilesUploadResultType>(config)
}

/**
 * @description 批量上传文件
 * @param params PostApiFilesBatchUploadRequestType
 * @returns Promise<PostApiFilesBatchUploadResultType>
 */
export interface PostApiFilesBatchUploadRequestType {
  /** @description 上传的文件列表 */
  files: File[]
}

/**
 * @description 批量上传文件 的返回数据类型
 */
export interface PostApiFilesBatchUploadResultType {
  /** @description 响应数据数组 */
  data: FileResponseDto[]
}

/**
 * @description 批量上传文件
 * @param params PostApiFilesBatchUploadRequestType
 * @returns Promise<PostApiFilesBatchUploadResultType>
 */
export async function postApiFilesBatchUploadFunc(
  params: PostApiFilesBatchUploadRequestType
): Promise<PostApiFilesBatchUploadResultType> {
  const config: RequestConfig = {
    url: '/api/files/batch-upload',
    method: 'POST',
    data: (() => {
      const fd = new FormData()
      Object.entries(params).forEach(([k, v]) => {
        fd.append(k, v instanceof File || v instanceof Blob ? v : String(v))
      })
      return fd
    })(),
  }
  return request<PostApiFilesBatchUploadResultType>(config)
}

/**
 * @description 文件列表查询
 * @param params GetApiFilesListRequestType
 * @returns Promise<GetApiFilesListResultType>
 */
export interface GetApiFilesListRequestType {
  /** @description 页码，从 1 开始 */
  page?: string
  /** @description 每页条数 */
  limit?: string
  /** @description 搜索关键字（按原始文件名） */
  search?: string
  /** @description 按 MIME 类型过滤 */
  mimeType?: string
  /** @description 排序字段 */
  sortBy?: string
  /** @description 排序方向：ASC / DESC */
  sortOrder?: string
}

/**
 * @description 文件列表查询 的返回数据类型
 */
export interface GetApiFilesListResultType {
  /** @description 文件列表 */
  list: FileResponseDto[]
  /** @description 总数 */
  total: number
  /** @description 当前页码 */
  page: number
  /** @description 每页条数 */
  limit: number
}

/**
 * @description 文件列表查询
 * @param params GetApiFilesListRequestType
 * @returns Promise<GetApiFilesListResultType>
 */
export async function getApiFilesListFunc(
  params: GetApiFilesListRequestType
): Promise<GetApiFilesListResultType> {
  const config: RequestConfig = {
    url: '/api/files/list',
    method: 'GET',
    params,
  }
  return request<GetApiFilesListResultType>(config)
}

/**
 * @description 文件详情
 * @param params GetApiFilesInfoRequestType
 * @returns Promise<GetApiFilesInfoResultType>
 */
export interface GetApiFilesInfoRequestType {
  /** @description 文件 ID */
  id: string
}

/**
 * @description 文件详情 的返回数据类型
 */
export interface GetApiFilesInfoResultType {
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
 * @description 文件详情
 * @param params GetApiFilesInfoRequestType
 * @returns Promise<GetApiFilesInfoResultType>
 */
export async function getApiFilesInfoFunc(
  params: GetApiFilesInfoRequestType
): Promise<GetApiFilesInfoResultType> {
  const config: RequestConfig = {
    url: '/api/files/info',
    method: 'GET',
    params,
  }
  return request<GetApiFilesInfoResultType>(config)
}

/**
 * @description 批量删除文件
 * @param params DeleteApiFilesBatchDeleteRequestType
 * @returns Promise<DeleteApiFilesBatchDeleteResultType>
 */
export interface DeleteApiFilesBatchDeleteRequestType {
  /** @description 文件 ID 列表 */
  ids: string[]
}

/**
 * @description 批量删除文件 的返回数据类型
 */
export interface DeleteApiFilesBatchDeleteResultType {
  /** @description  */
  count: number
  /** @description  */
  message: string
}

/**
 * @description 批量删除文件
 * @param params DeleteApiFilesBatchDeleteRequestType
 * @returns Promise<DeleteApiFilesBatchDeleteResultType>
 */
export async function deleteApiFilesBatchDeleteFunc(
  params: DeleteApiFilesBatchDeleteRequestType
): Promise<DeleteApiFilesBatchDeleteResultType> {
  const config: RequestConfig = {
    url: '/api/files/batch-delete',
    method: 'DELETE',
    data: params,
  }
  return request<DeleteApiFilesBatchDeleteResultType>(config)
}
