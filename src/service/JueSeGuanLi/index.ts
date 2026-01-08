import { RequestConfig, request } from '../request'
import type { RoleResponseDto, Permission } from '../types'

/**
 * @description 创建角色
 * @param params ApiRolesPOSTRequest
 * @returns Promise<ApiRolesPOSTResponse>
 */
export interface ApiRolesPOSTRequest {
  /** @description 角色名称 */
  name: string
  /** @description 角色代码，用于程序中识别角色 */
  code: string
  /** @description 角色描述 */
  description?: string
  /** @description 是否为系统内置角色 */
  isSystem?: boolean
  /** @description  */
  Authorization?: string
}

/**
 * @description 创建角色 的返回数据类型
 */
export interface ApiRolesPOSTResponse {
  /** @description 角色ID */
  id: string
  /** @description 角色名称 */
  name: string
  /** @description 角色代码 */
  code: string
  /** @description 角色描述 */
  description: any
  /** @description 是否为系统内置角色 */
  isSystem: boolean
  /** @description 创建时间 */
  createdAt: string
  /** @description 更新时间 */
  updatedAt: string
}

/**
 * @description 创建角色
 * @param params ApiRolesPOSTRequest
 * @returns Promise<ApiRolesPOSTResponse>
 */
export async function apiRolesPOST(
  params: ApiRolesPOSTRequest
): Promise<ApiRolesPOSTResponse> {
  const config: RequestConfig = {
    url: '/api/roles',
    method: 'POST',
    data: params,
  }
  return request<ApiRolesPOSTResponse>(config)
}

/**
 * @description 获取角色列表
 * @param params ApiRolesGETRequest
 * @returns Promise<ApiRolesGETResponse>
 */
export interface ApiRolesGETRequest {
  /** @description 每页数量 */
  limit?: string
  /** @description 页码 */
  page?: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 获取角色列表 的返回数据类型
 */
export interface ApiRolesGETResponse {
  /** @description  */
  roles: RoleResponseDto[]
  /** @description 总数量 */
  total: number
}

/**
 * @description 获取角色列表
 * @param params ApiRolesGETRequest
 * @returns Promise<ApiRolesGETResponse>
 */
export async function apiRolesGET(
  params: ApiRolesGETRequest
): Promise<ApiRolesGETResponse> {
  const config: RequestConfig = {
    url: '/api/roles',
    method: 'GET',
    params,
  }
  return request<ApiRolesGETResponse>(config)
}

/**
 * @description 更新角色
 * @param params ApiRolesPUTRequest
 * @returns Promise<ApiRolesPUTResponse>
 */
export interface ApiRolesPUTRequest {
  /** @description 角色ID */
  id: string
  /** @description 角色名称 */
  name?: string
  /** @description 角色代码，用于程序中识别角色 */
  code?: string
  /** @description 角色描述 */
  description?: string
  /** @description 是否为系统内置角色 */
  isSystem?: boolean
  /** @description  */
  Authorization?: string
}

/**
 * @description 更新角色 的返回数据类型
 */
export interface ApiRolesPUTResponse {
  /** @description 角色ID */
  id: string
  /** @description 角色名称 */
  name: string
  /** @description 角色代码 */
  code: string
  /** @description 角色描述 */
  description: any
  /** @description 是否为系统内置角色 */
  isSystem: boolean
  /** @description 创建时间 */
  createdAt: string
  /** @description 更新时间 */
  updatedAt: string
}

/**
 * @description 更新角色
 * @param params ApiRolesPUTRequest
 * @returns Promise<ApiRolesPUTResponse>
 */
export async function apiRolesPUT(
  params: ApiRolesPUTRequest
): Promise<ApiRolesPUTResponse> {
  const config: RequestConfig = {
    url: '/api/roles',
    method: 'PUT',
    data: params,
  }
  return request<ApiRolesPUTResponse>(config)
}

/**
 * @description 删除角色
 * @param params ApiRolesDELETERequest
 * @returns Promise<ApiRolesDELETEResponse>
 */
export interface ApiRolesDELETERequest {
  /** @description 角色ID */
  id: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 删除角色 的返回数据类型
 */
export interface ApiRolesDELETEResponse {
  /** @description 响应数据 */
  data: any
}

/**
 * @description 删除角色
 * @param params ApiRolesDELETERequest
 * @returns Promise<ApiRolesDELETEResponse>
 */
export async function apiRolesDELETE(
  params: ApiRolesDELETERequest
): Promise<ApiRolesDELETEResponse> {
  const config: RequestConfig = {
    url: '/api/roles',
    method: 'DELETE',
    params,
  }
  return request<ApiRolesDELETEResponse>(config)
}

/**
 * @description 获取角色详情
 * @param params ApiRolesDetailGETRequest
 * @returns Promise<ApiRolesDetailGETResponse>
 */
export interface ApiRolesDetailGETRequest {
  /** @description 角色ID */
  id: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 获取角色详情 的返回数据类型
 */
export interface ApiRolesDetailGETResponse {
  /** @description 角色ID */
  id: string
  /** @description 角色名称 */
  name: string
  /** @description 角色代码 */
  code: string
  /** @description 角色描述 */
  description: any
  /** @description 是否为系统内置角色 */
  isSystem: boolean
  /** @description 创建时间 */
  createdAt: string
  /** @description 更新时间 */
  updatedAt: string
}

/**
 * @description 获取角色详情
 * @param params ApiRolesDetailGETRequest
 * @returns Promise<ApiRolesDetailGETResponse>
 */
export async function apiRolesDetailGET(
  params: ApiRolesDetailGETRequest
): Promise<ApiRolesDetailGETResponse> {
  const config: RequestConfig = {
    url: '/api/roles/detail',
    method: 'GET',
    params,
  }
  return request<ApiRolesDetailGETResponse>(config)
}

/**
 * @description 根据代码获取角色
 * @param params ApiRolesByCodeGETRequest
 * @returns Promise<ApiRolesByCodeGETResponse>
 */
export interface ApiRolesByCodeGETRequest {
  /** @description 角色代码 */
  code: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 根据代码获取角色 的返回数据类型
 */
export interface ApiRolesByCodeGETResponse {
  /** @description 角色ID */
  id: string
  /** @description 角色名称 */
  name: string
  /** @description 角色代码 */
  code: string
  /** @description 角色描述 */
  description: any
  /** @description 是否为系统内置角色 */
  isSystem: boolean
  /** @description 创建时间 */
  createdAt: string
  /** @description 更新时间 */
  updatedAt: string
}

/**
 * @description 根据代码获取角色
 * @param params ApiRolesByCodeGETRequest
 * @returns Promise<ApiRolesByCodeGETResponse>
 */
export async function apiRolesByCodeGET(
  params: ApiRolesByCodeGETRequest
): Promise<ApiRolesByCodeGETResponse> {
  const config: RequestConfig = {
    url: '/api/roles/by-code',
    method: 'GET',
    params,
  }
  return request<ApiRolesByCodeGETResponse>(config)
}

/**
 * @description 为角色分配权限
 * @param params ApiRolesAssignPermissionsPOSTRequest
 * @returns Promise<ApiRolesAssignPermissionsPOSTResponse>
 */
export interface ApiRolesAssignPermissionsPOSTRequest {
  /** @description 角色ID */
  id: string
  /** @description 权限ID列表 */
  permissionIds: string[]
  /** @description  */
  Authorization?: string
}

/**
 * @description 为角色分配权限 的返回数据类型
 */
export interface ApiRolesAssignPermissionsPOSTResponse {
  /** @description 响应数据 */
  data: any
}

/**
 * @description 为角色分配权限
 * @param params ApiRolesAssignPermissionsPOSTRequest
 * @returns Promise<ApiRolesAssignPermissionsPOSTResponse>
 */
export async function apiRolesAssignPermissionsPOST(
  params: ApiRolesAssignPermissionsPOSTRequest
): Promise<ApiRolesAssignPermissionsPOSTResponse> {
  const config: RequestConfig = {
    url: '/api/roles/assign-permissions',
    method: 'POST',
    data: params,
  }
  return request<ApiRolesAssignPermissionsPOSTResponse>(config)
}

/**
 * @description 获取角色权限
 * @param params ApiRolesPermissionsGETRequest
 * @returns Promise<ApiRolesPermissionsGETResponse>
 */
export interface ApiRolesPermissionsGETRequest {
  /** @description 角色ID */
  id: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 获取角色权限 的返回数据类型
 */
export interface ApiRolesPermissionsGETResponse {
  /** @description 响应数据数组 */
  data: Permission[]
}

/**
 * @description 获取角色权限
 * @param params ApiRolesPermissionsGETRequest
 * @returns Promise<ApiRolesPermissionsGETResponse>
 */
export async function apiRolesPermissionsGET(
  params: ApiRolesPermissionsGETRequest
): Promise<ApiRolesPermissionsGETResponse> {
  const config: RequestConfig = {
    url: '/api/roles/permissions',
    method: 'GET',
    params,
  }
  return request<ApiRolesPermissionsGETResponse>(config)
}

/**
 * @description 移除角色权限
 * @param params ApiRolesRemovePermissionDELETERequest
 * @returns Promise<ApiRolesRemovePermissionDELETEResponse>
 */
export interface ApiRolesRemovePermissionDELETERequest {
  /** @description 角色ID */
  id: string
  /** @description 权限ID */
  permissionId: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 移除角色权限 的返回数据类型
 */
export interface ApiRolesRemovePermissionDELETEResponse {
  /** @description 响应数据 */
  data: any
}

/**
 * @description 移除角色权限
 * @param params ApiRolesRemovePermissionDELETERequest
 * @returns Promise<ApiRolesRemovePermissionDELETEResponse>
 */
export async function apiRolesRemovePermissionDELETE(
  params: ApiRolesRemovePermissionDELETERequest
): Promise<ApiRolesRemovePermissionDELETEResponse> {
  const config: RequestConfig = {
    url: '/api/roles/remove-permission',
    method: 'DELETE',
    params,
  }
  return request<ApiRolesRemovePermissionDELETEResponse>(config)
}
