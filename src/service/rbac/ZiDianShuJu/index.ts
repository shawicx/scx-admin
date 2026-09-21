import { RequestConfig, request } from '@/service/request'
import type {
  DictDataResponseDto,
  DictDataOptionDto,
} from '@/service/rbac/types'

/**
 * @description 更新字典数据
 * @param params PutApiDictsDataUpdateRequestType
 * @returns Promise<PutApiDictsDataUpdateResultType>
 */
export interface PutApiDictsDataUpdateRequestType {
  /** @description 字典数据 ID */
  id: string
  /** @description 显示文本（1-100 字符） */
  label?: string | null
  /** @description 存储值（1-100 字符，同类型下唯一） */
  value?: string | null
  /** @description 排序号（升序） */
  sort?: number | null
  /** @description 状态（1 启用 / 0 停用） */
  status?: number | null
}

/**
 * @description 更新字典数据 的返回数据类型
 */
export interface PutApiDictsDataUpdateResultType {
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

/**
 * @description 更新字典数据
 * @param params PutApiDictsDataUpdateRequestType
 * @returns Promise<PutApiDictsDataUpdateResultType>
 */
export async function putApiDictsDataUpdateFunc(
  params: PutApiDictsDataUpdateRequestType
): Promise<PutApiDictsDataUpdateResultType> {
  const config: RequestConfig = {
    url: '/api/dicts/data/update',
    method: 'PUT',
    data: params,
  }
  return request<PutApiDictsDataUpdateResultType>(config)
}

/**
 * @description 创建字典数据
 * @param params PostApiDictsDataCreateRequestType
 * @returns Promise<PostApiDictsDataCreateResultType>
 */
export interface PostApiDictsDataCreateRequestType {
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

/**
 * @description 创建字典数据 的返回数据类型
 */
export interface PostApiDictsDataCreateResultType {
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

/**
 * @description 创建字典数据
 * @param params PostApiDictsDataCreateRequestType
 * @returns Promise<PostApiDictsDataCreateResultType>
 */
export async function postApiDictsDataCreateFunc(
  params: PostApiDictsDataCreateRequestType
): Promise<PostApiDictsDataCreateResultType> {
  const config: RequestConfig = {
    url: '/api/dicts/data/create',
    method: 'POST',
    data: params,
  }
  return request<PostApiDictsDataCreateResultType>(config)
}

/**
 * @description 类型下数据项列表
 * @param params GetApiDictsDataListRequestType
 * @returns Promise<GetApiDictsDataListResultType>
 */
export interface GetApiDictsDataListRequestType {
  /** @description 字典类型 ID */
  typeId: string
}

/**
 * @description 类型下数据项列表 的返回数据类型
 */
export interface GetApiDictsDataListResultType {
  /** @description 响应数据数组 */
  data: DictDataResponseDto[]
}

/**
 * @description 类型下数据项列表
 * @param params GetApiDictsDataListRequestType
 * @returns Promise<GetApiDictsDataListResultType>
 */
export async function getApiDictsDataListFunc(
  params: GetApiDictsDataListRequestType
): Promise<GetApiDictsDataListResultType> {
  const config: RequestConfig = {
    url: '/api/dicts/data/list',
    method: 'GET',
    params,
  }
  return request<GetApiDictsDataListResultType>(config)
}

/**
 * @description 字典数据详情
 * @param params GetApiDictsDataDetailRequestType
 * @returns Promise<GetApiDictsDataDetailResultType>
 */
export interface GetApiDictsDataDetailRequestType {
  /** @description 字典数据 ID */
  id: string
}

/**
 * @description 字典数据详情 的返回数据类型
 */
export interface GetApiDictsDataDetailResultType {
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

/**
 * @description 字典数据详情
 * @param params GetApiDictsDataDetailRequestType
 * @returns Promise<GetApiDictsDataDetailResultType>
 */
export async function getApiDictsDataDetailFunc(
  params: GetApiDictsDataDetailRequestType
): Promise<GetApiDictsDataDetailResultType> {
  const config: RequestConfig = {
    url: '/api/dicts/data/detail',
    method: 'GET',
    params,
  }
  return request<GetApiDictsDataDetailResultType>(config)
}

/**
 * @description 按类型编码取值
 * @param params GetApiDictsDataByCodeRequestType
 * @returns Promise<GetApiDictsDataByCodeResultType>
 */
export interface GetApiDictsDataByCodeRequestType {
  /** @description 字典编码 */
  code: string
}

/**
 * @description 按类型编码取值 的返回数据类型
 */
export interface GetApiDictsDataByCodeResultType {
  /** @description 响应数据数组 */
  data: DictDataOptionDto[]
}

/**
 * @description 按类型编码取值
 * @param params GetApiDictsDataByCodeRequestType
 * @returns Promise<GetApiDictsDataByCodeResultType>
 */
export async function getApiDictsDataByCodeFunc(
  params: GetApiDictsDataByCodeRequestType
): Promise<GetApiDictsDataByCodeResultType> {
  const config: RequestConfig = {
    url: '/api/dicts/data/by-code',
    method: 'GET',
    params,
  }
  return request<GetApiDictsDataByCodeResultType>(config)
}

/**
 * @description 删除字典数据
 * @param params DeleteApiDictsDataDeleteRequestType
 * @returns Promise<DeleteApiDictsDataDeleteResultType>
 */
export interface DeleteApiDictsDataDeleteRequestType {
  /** @description 字典数据 ID */
  id: string
}

/**
 * @description 删除字典数据 的返回数据类型
 */
export interface DeleteApiDictsDataDeleteResultType {
  /** @description  */
  message: string
}

/**
 * @description 删除字典数据
 * @param params DeleteApiDictsDataDeleteRequestType
 * @returns Promise<DeleteApiDictsDataDeleteResultType>
 */
export async function deleteApiDictsDataDeleteFunc(
  params: DeleteApiDictsDataDeleteRequestType
): Promise<DeleteApiDictsDataDeleteResultType> {
  const config: RequestConfig = {
    url: '/api/dicts/data/delete',
    method: 'DELETE',
    params,
  }
  return request<DeleteApiDictsDataDeleteResultType>(config)
}
