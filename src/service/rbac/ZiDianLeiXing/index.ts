import { RequestConfig, request } from '@/service/request'
import type { DictTypeResponseDto } from '@/service/rbac/types'

/**
 * @description 更新字典类型
 * @param params PutApiDictsTypeUpdateRequestType
 * @returns Promise<PutApiDictsTypeUpdateResultType>
 */
export interface PutApiDictsTypeUpdateRequestType {
  /** @description 字典类型 ID */
  id: string
  /** @description 字典名称（1-100 字符） */
  name?: string | null
  /** @description 描述（最长 255 字符） */
  description?: string | null
  /** @description 状态（1 启用 / 0 停用） */
  status?: number | null
}

/**
 * @description 更新字典类型 的返回数据类型
 */
export interface PutApiDictsTypeUpdateResultType {
  /** @description 字典类型 ID */
  id: string
  /** @description 字典名称 */
  name: string
  /** @description 字典编码 */
  code: string
  /** @description 描述 */
  description: string | null
  /** @description 是否系统内置 */
  isSystem: boolean
  /** @description 状态（1 启用 / 0 停用） */
  status: number
  /** @description 创建时间 */
  createdAt: string
  /** @description 更新时间 */
  updatedAt: string
}

/**
 * @description 更新字典类型
 * @param params PutApiDictsTypeUpdateRequestType
 * @returns Promise<PutApiDictsTypeUpdateResultType>
 */
export async function putApiDictsTypeUpdateFunc(
  params: PutApiDictsTypeUpdateRequestType
): Promise<PutApiDictsTypeUpdateResultType> {
  const config: RequestConfig = {
    url: '/api/dicts/type/update',
    method: 'PUT',
    data: params,
  }
  return request<PutApiDictsTypeUpdateResultType>(config)
}

/**
 * @description 创建字典类型
 * @param params PostApiDictsTypeCreateRequestType
 * @returns Promise<PostApiDictsTypeCreateResultType>
 */
export interface PostApiDictsTypeCreateRequestType {
  /** @description 字典名称（1-100 字符，唯一） */
  name: string
  /** @description 字典编码（小写字母开头，仅含小写字母/数字/下划线/中划线，唯一，创建后不可修改） */
  code: string
  /** @description 描述（最长 255 字符） */
  description?: string | null
}

/**
 * @description 创建字典类型 的返回数据类型
 */
export interface PostApiDictsTypeCreateResultType {
  /** @description 字典类型 ID */
  id: string
  /** @description 字典名称 */
  name: string
  /** @description 字典编码 */
  code: string
  /** @description 描述 */
  description: string | null
  /** @description 是否系统内置 */
  isSystem: boolean
  /** @description 状态（1 启用 / 0 停用） */
  status: number
  /** @description 创建时间 */
  createdAt: string
  /** @description 更新时间 */
  updatedAt: string
}

/**
 * @description 创建字典类型
 * @param params PostApiDictsTypeCreateRequestType
 * @returns Promise<PostApiDictsTypeCreateResultType>
 */
export async function postApiDictsTypeCreateFunc(
  params: PostApiDictsTypeCreateRequestType
): Promise<PostApiDictsTypeCreateResultType> {
  const config: RequestConfig = {
    url: '/api/dicts/type/create',
    method: 'POST',
    data: params,
  }
  return request<PostApiDictsTypeCreateResultType>(config)
}

/**
 * @description 字典类型分页列表
 * @param params GetApiDictsTypeListRequestType
 * @returns Promise<GetApiDictsTypeListResultType>
 */
export interface GetApiDictsTypeListRequestType {
  /** @description 页码，从 1 开始 */
  page?: string
  /** @description 每页条数 */
  limit?: string
  /** @description 关键字（name/code 模糊） */
  keyword?: string
  /** @description 状态（1 启用 / 0 停用） */
  status?: string
}

/**
 * @description 字典类型分页列表 的返回数据类型
 */
export interface GetApiDictsTypeListResultType {
  /** @description 字典类型列表 */
  list: DictTypeResponseDto[]
  /** @description 总数 */
  total: number
  /** @description 当前页码 */
  page: number
  /** @description 每页条数 */
  limit: number
}

/**
 * @description 字典类型分页列表
 * @param params GetApiDictsTypeListRequestType
 * @returns Promise<GetApiDictsTypeListResultType>
 */
export async function getApiDictsTypeListFunc(
  params: GetApiDictsTypeListRequestType
): Promise<GetApiDictsTypeListResultType> {
  const config: RequestConfig = {
    url: '/api/dicts/type/list',
    method: 'GET',
    params,
  }
  return request<GetApiDictsTypeListResultType>(config)
}

/**
 * @description 字典类型详情
 * @param params GetApiDictsTypeDetailRequestType
 * @returns Promise<GetApiDictsTypeDetailResultType>
 */
export interface GetApiDictsTypeDetailRequestType {
  /** @description 字典类型 ID */
  id: string
}

/**
 * @description 字典类型详情 的返回数据类型
 */
export interface GetApiDictsTypeDetailResultType {
  /** @description 字典类型 ID */
  id: string
  /** @description 字典名称 */
  name: string
  /** @description 字典编码 */
  code: string
  /** @description 描述 */
  description: string | null
  /** @description 是否系统内置 */
  isSystem: boolean
  /** @description 状态（1 启用 / 0 停用） */
  status: number
  /** @description 创建时间 */
  createdAt: string
  /** @description 更新时间 */
  updatedAt: string
}

/**
 * @description 字典类型详情
 * @param params GetApiDictsTypeDetailRequestType
 * @returns Promise<GetApiDictsTypeDetailResultType>
 */
export async function getApiDictsTypeDetailFunc(
  params: GetApiDictsTypeDetailRequestType
): Promise<GetApiDictsTypeDetailResultType> {
  const config: RequestConfig = {
    url: '/api/dicts/type/detail',
    method: 'GET',
    params,
  }
  return request<GetApiDictsTypeDetailResultType>(config)
}

/**
 * @description 删除字典类型
 * @param params DeleteApiDictsTypeDeleteRequestType
 * @returns Promise<DeleteApiDictsTypeDeleteResultType>
 */
export interface DeleteApiDictsTypeDeleteRequestType {
  /** @description 字典类型 ID */
  id: string
}

/**
 * @description 删除字典类型 的返回数据类型
 */
export interface DeleteApiDictsTypeDeleteResultType {
  /** @description  */
  message: string
}

/**
 * @description 删除字典类型
 * @param params DeleteApiDictsTypeDeleteRequestType
 * @returns Promise<DeleteApiDictsTypeDeleteResultType>
 */
export async function deleteApiDictsTypeDeleteFunc(
  params: DeleteApiDictsTypeDeleteRequestType
): Promise<DeleteApiDictsTypeDeleteResultType> {
  const config: RequestConfig = {
    url: '/api/dicts/type/delete',
    method: 'DELETE',
    params,
  }
  return request<DeleteApiDictsTypeDeleteResultType>(config)
}
