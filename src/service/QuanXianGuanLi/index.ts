import { RequestConfig, request } from '../request'
import type { PermissionResponseDto } from '../types'

/**
 * @description 创建权限
 * @param params ApiPermissionsPOSTRequest
 * @returns Promise<ApiPermissionsPOSTResponse>
 */
export interface ApiPermissionsPOSTRequest {
  /** @description 权限名称 */
  name: string
  /** @description 操作动作 */
  action: string
  /** @description 资源名称 */
  resource: string
  /** @description 权限描述 */
  description?: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 创建权限 的返回数据类型
 */
export interface ApiPermissionsPOSTResponse {
  /** @description 权限ID */
  id: string
  /** @description 权限名称 */
  name: string
  /** @description 操作动作 */
  action: string
  /** @description 资源名称 */
  resource: string
  /** @description 权限描述 */
  description: any
  /** @description 创建时间 */
  createdAt: string
  /** @description 更新时间 */
  updatedAt: string
}

/**
 * @description 创建权限
 * @param params ApiPermissionsPOSTRequest
 * @returns Promise<ApiPermissionsPOSTResponse>
 */
export async function apiPermissionsPOST(
  params: ApiPermissionsPOSTRequest
): Promise<ApiPermissionsPOSTResponse> {
  const config: RequestConfig = {
    url: '/api/permissions',
    method: 'POST',
    data: params,
  }
  return request<ApiPermissionsPOSTResponse>(config)
}

/**
 * @description 获取权限列表
 * @param params ApiPermissionsGETRequest
 * @returns Promise<ApiPermissionsGETResponse>
 */
export interface ApiPermissionsGETRequest {
  /** @description 搜索关键词（权限名称、动作或资源） */
  search?: string
  /** @description 按动作筛选 */
  action?: string
  /** @description 按资源筛选 */
  resource?: string
  /** @description 每页数量 */
  limit?: string
  /** @description 页码 */
  page?: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 获取权限列表 的返回数据类型
 */
export interface ApiPermissionsGETResponse {
  /** @description  */
  permissions: PermissionResponseDto[]
  /** @description 总数量 */
  total: number
}

/**
 * @description 获取权限列表
 * @param params ApiPermissionsGETRequest
 * @returns Promise<ApiPermissionsGETResponse>
 */
export async function apiPermissionsGET(
  params: ApiPermissionsGETRequest
): Promise<ApiPermissionsGETResponse> {
  const config: RequestConfig = {
    url: '/api/permissions',
    method: 'GET',
    params,
  }
  return request<ApiPermissionsGETResponse>(config)
}

/**
 * @description 更新权限
 * @param params ApiPermissionsPUTRequest
 * @returns Promise<ApiPermissionsPUTResponse>
 */
export interface ApiPermissionsPUTRequest {
  /** @description 权限ID */
  id: string
  /** @description 权限名称 */
  name?: string
  /** @description 操作动作 */
  action?: string
  /** @description 资源名称 */
  resource?: string
  /** @description 权限描述 */
  description?: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 更新权限 的返回数据类型
 */
export interface ApiPermissionsPUTResponse {
  /** @description 权限ID */
  id: string
  /** @description 权限名称 */
  name: string
  /** @description 操作动作 */
  action: string
  /** @description 资源名称 */
  resource: string
  /** @description 权限描述 */
  description: any
  /** @description 创建时间 */
  createdAt: string
  /** @description 更新时间 */
  updatedAt: string
}

/**
 * @description 更新权限
 * @param params ApiPermissionsPUTRequest
 * @returns Promise<ApiPermissionsPUTResponse>
 */
export async function apiPermissionsPUT(
  params: ApiPermissionsPUTRequest
): Promise<ApiPermissionsPUTResponse> {
  const config: RequestConfig = {
    url: '/api/permissions',
    method: 'PUT',
    data: params,
  }
  return request<ApiPermissionsPUTResponse>(config)
}

/**
 * @description 删除权限
 * @param params ApiPermissionsDELETERequest
 * @returns Promise<ApiPermissionsDELETEResponse>
 */
export interface ApiPermissionsDELETERequest {
  /** @description 权限ID */
  id: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 删除权限 的返回数据类型
 */
export interface ApiPermissionsDELETEResponse {
  /** @description 响应数据 */
  data: any
}

/**
 * @description 删除权限
 * @param params ApiPermissionsDELETERequest
 * @returns Promise<ApiPermissionsDELETEResponse>
 */
export async function apiPermissionsDELETE(
  params: ApiPermissionsDELETERequest
): Promise<ApiPermissionsDELETEResponse> {
  const config: RequestConfig = {
    url: '/api/permissions',
    method: 'DELETE',
    params,
  }
  return request<ApiPermissionsDELETEResponse>(config)
}

/**
 * @description 搜索权限
 * @param params ApiPermissionsSearchGETRequest
 * @returns Promise<ApiPermissionsSearchGETResponse>
 */
export interface ApiPermissionsSearchGETRequest {
  /** @description 搜索关键词 */
  keyword: string
  /** @description 返回数量限制 */
  limit?: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 搜索权限 的返回数据类型
 */
export interface ApiPermissionsSearchGETResponse {
  /** @description 响应数据数组 */
  data: PermissionResponseDto[]
}

/**
 * @description 搜索权限
 * @param params ApiPermissionsSearchGETRequest
 * @returns Promise<ApiPermissionsSearchGETResponse>
 */
export async function apiPermissionsSearchGET(
  params: ApiPermissionsSearchGETRequest
): Promise<ApiPermissionsSearchGETResponse> {
  const config: RequestConfig = {
    url: '/api/permissions/search',
    method: 'GET',
    params,
  }
  return request<ApiPermissionsSearchGETResponse>(config)
}

/**
 * @description 获取所有动作
 * @param params ApiPermissionsActionsGETRequest
 * @returns Promise<ApiPermissionsActionsGETResponse>
 */
export interface ApiPermissionsActionsGETRequest {
  /** @description  */
  Authorization?: string
}

/**
 * @description 获取所有动作 的返回数据类型
 */
export interface ApiPermissionsActionsGETResponse {
  /** @description 响应数据数组 */
  data: string[]
}

/**
 * @description 获取所有动作
 * @param params ApiPermissionsActionsGETRequest
 * @returns Promise<ApiPermissionsActionsGETResponse>
 */
export async function apiPermissionsActionsGET(
  params: ApiPermissionsActionsGETRequest
): Promise<ApiPermissionsActionsGETResponse> {
  const config: RequestConfig = {
    url: '/api/permissions/actions',
    method: 'GET',
    params,
  }
  return request<ApiPermissionsActionsGETResponse>(config)
}

/**
 * @description 获取所有资源
 * @param params ApiPermissionsResourcesGETRequest
 * @returns Promise<ApiPermissionsResourcesGETResponse>
 */
export interface ApiPermissionsResourcesGETRequest {
  /** @description  */
  Authorization?: string
}

/**
 * @description 获取所有资源 的返回数据类型
 */
export interface ApiPermissionsResourcesGETResponse {
  /** @description 响应数据数组 */
  data: string[]
}

/**
 * @description 获取所有资源
 * @param params ApiPermissionsResourcesGETRequest
 * @returns Promise<ApiPermissionsResourcesGETResponse>
 */
export async function apiPermissionsResourcesGET(
  params: ApiPermissionsResourcesGETRequest
): Promise<ApiPermissionsResourcesGETResponse> {
  const config: RequestConfig = {
    url: '/api/permissions/resources',
    method: 'GET',
    params,
  }
  return request<ApiPermissionsResourcesGETResponse>(config)
}

/**
 * @description 根据动作获取权限
 * @param params ApiPermissionsByActionGETRequest
 * @returns Promise<ApiPermissionsByActionGETResponse>
 */
export interface ApiPermissionsByActionGETRequest {
  /** @description 动作名称 */
  action: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 根据动作获取权限 的返回数据类型
 */
export interface ApiPermissionsByActionGETResponse {
  /** @description 响应数据数组 */
  data: PermissionResponseDto[]
}

/**
 * @description 根据动作获取权限
 * @param params ApiPermissionsByActionGETRequest
 * @returns Promise<ApiPermissionsByActionGETResponse>
 */
export async function apiPermissionsByActionGET(
  params: ApiPermissionsByActionGETRequest
): Promise<ApiPermissionsByActionGETResponse> {
  const config: RequestConfig = {
    url: '/api/permissions/by-action',
    method: 'GET',
    params,
  }
  return request<ApiPermissionsByActionGETResponse>(config)
}

/**
 * @description 根据资源获取权限
 * @param params ApiPermissionsByResourceGETRequest
 * @returns Promise<ApiPermissionsByResourceGETResponse>
 */
export interface ApiPermissionsByResourceGETRequest {
  /** @description 资源名称 */
  resource: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 根据资源获取权限 的返回数据类型
 */
export interface ApiPermissionsByResourceGETResponse {
  /** @description 响应数据数组 */
  data: PermissionResponseDto[]
}

/**
 * @description 根据资源获取权限
 * @param params ApiPermissionsByResourceGETRequest
 * @returns Promise<ApiPermissionsByResourceGETResponse>
 */
export async function apiPermissionsByResourceGET(
  params: ApiPermissionsByResourceGETRequest
): Promise<ApiPermissionsByResourceGETResponse> {
  const config: RequestConfig = {
    url: '/api/permissions/by-resource',
    method: 'GET',
    params,
  }
  return request<ApiPermissionsByResourceGETResponse>(config)
}

/**
 * @description 获取权限详情
 * @param params ApiPermissionsDetailGETRequest
 * @returns Promise<ApiPermissionsDetailGETResponse>
 */
export interface ApiPermissionsDetailGETRequest {
  /** @description 权限ID */
  id: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 获取权限详情 的返回数据类型
 */
export interface ApiPermissionsDetailGETResponse {
  /** @description 权限ID */
  id: string
  /** @description 权限名称 */
  name: string
  /** @description 操作动作 */
  action: string
  /** @description 资源名称 */
  resource: string
  /** @description 权限描述 */
  description: any
  /** @description 创建时间 */
  createdAt: string
  /** @description 更新时间 */
  updatedAt: string
}

/**
 * @description 获取权限详情
 * @param params ApiPermissionsDetailGETRequest
 * @returns Promise<ApiPermissionsDetailGETResponse>
 */
export async function apiPermissionsDetailGET(
  params: ApiPermissionsDetailGETRequest
): Promise<ApiPermissionsDetailGETResponse> {
  const config: RequestConfig = {
    url: '/api/permissions/detail',
    method: 'GET',
    params,
  }
  return request<ApiPermissionsDetailGETResponse>(config)
}
