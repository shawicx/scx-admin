import { RequestConfig, request } from '@/service/request'
import type { RoleResponseDto, Permission } from '@/service/types'

/**
 * @description 创建角色
 * @param params PostRolesRequestType
 * @returns Promise<PostRolesResult>
 */
export interface PostRolesRequestType {
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
export interface PostRolesResult {
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
 * @param params PostRolesRequestType
 * @returns Promise<PostRolesResult>
 */
export async function postRolesFunc(
  params: PostRolesRequestType
): Promise<PostRolesResult> {
  const config: RequestConfig = {
    url: '/api/roles',
    method: 'POST',
    data: params,
  }
  return request<PostRolesResult>(config)
}

/**
 * @description 获取角色列表
 * @param params GetRolesRequestType
 * @returns Promise<GetRolesResult>
 */
export interface GetRolesRequestType {
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
export interface GetRolesResult {
  /** @description  */
  list: RoleResponseDto[]
  /** @description 总数量 */
  total: number
}

/**
 * @description 获取角色列表
 * @param params GetRolesRequestType
 * @returns Promise<GetRolesResult>
 */
export async function getRolesFunc(
  params: GetRolesRequestType
): Promise<GetRolesResult> {
  const config: RequestConfig = {
    url: '/api/roles',
    method: 'GET',
    params,
  }
  return request<GetRolesResult>(config)
}

/**
 * @description 更新角色
 * @param params PutRolesRequestType
 * @returns Promise<PutRolesResult>
 */
export interface PutRolesRequestType {
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
export interface PutRolesResult {
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
 * @param params PutRolesRequestType
 * @returns Promise<PutRolesResult>
 */
export async function putRolesFunc(
  params: PutRolesRequestType
): Promise<PutRolesResult> {
  const config: RequestConfig = {
    url: '/api/roles',
    method: 'PUT',
    data: params,
  }
  return request<PutRolesResult>(config)
}

/**
 * @description 删除角色
 * @param params DeleteRolesRequestType
 * @returns Promise<DeleteRolesResult>
 */
export interface DeleteRolesRequestType {
  /** @description 角色ID */
  id: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 删除角色 的返回数据类型
 */
export interface DeleteRolesResult {
  /** @description 响应数据 */
  data: any
}

/**
 * @description 删除角色
 * @param params DeleteRolesRequestType
 * @returns Promise<DeleteRolesResult>
 */
export async function deleteRolesFunc(
  params: DeleteRolesRequestType
): Promise<DeleteRolesResult> {
  const config: RequestConfig = {
    url: '/api/roles',
    method: 'DELETE',
    params,
  }
  return request<DeleteRolesResult>(config)
}

/**
 * @description 获取角色详情
 * @param params GetRolesDetailRequestType
 * @returns Promise<GetRolesDetailResult>
 */
export interface GetRolesDetailRequestType {
  /** @description 角色ID */
  id: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 获取角色详情 的返回数据类型
 */
export interface GetRolesDetailResult {
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
 * @param params GetRolesDetailRequestType
 * @returns Promise<GetRolesDetailResult>
 */
export async function getRolesDetailFunc(
  params: GetRolesDetailRequestType
): Promise<GetRolesDetailResult> {
  const config: RequestConfig = {
    url: '/api/roles/detail',
    method: 'GET',
    params,
  }
  return request<GetRolesDetailResult>(config)
}

/**
 * @description 根据代码获取角色
 * @param params GetRolesByCodeRequestType
 * @returns Promise<GetRolesByCodeResult>
 */
export interface GetRolesByCodeRequestType {
  /** @description 角色代码 */
  code: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 根据代码获取角色 的返回数据类型
 */
export interface GetRolesByCodeResult {
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
 * @param params GetRolesByCodeRequestType
 * @returns Promise<GetRolesByCodeResult>
 */
export async function getRolesByCodeFunc(
  params: GetRolesByCodeRequestType
): Promise<GetRolesByCodeResult> {
  const config: RequestConfig = {
    url: '/api/roles/by-code',
    method: 'GET',
    params,
  }
  return request<GetRolesByCodeResult>(config)
}

/**
 * @description 为角色分配权限
 * @param params PostRolesAssignPermissionsRequestType
 * @returns Promise<PostRolesAssignPermissionsResult>
 */
export interface PostRolesAssignPermissionsRequestType {
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
export interface PostRolesAssignPermissionsResult {
  /** @description 响应数据 */
  data: any
}

/**
 * @description 为角色分配权限
 * @param params PostRolesAssignPermissionsRequestType
 * @returns Promise<PostRolesAssignPermissionsResult>
 */
export async function postRolesAssignPermissionsFunc(
  params: PostRolesAssignPermissionsRequestType
): Promise<PostRolesAssignPermissionsResult> {
  const config: RequestConfig = {
    url: '/api/roles/assign-permissions',
    method: 'POST',
    data: params,
  }
  return request<PostRolesAssignPermissionsResult>(config)
}

/**
 * @description 获取角色权限
 * @param params GetRolesPermissionsRequestType
 * @returns Promise<GetRolesPermissionsResult>
 */
export interface GetRolesPermissionsRequestType {
  /** @description 角色ID */
  id: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 获取角色权限 的返回数据类型
 */
export interface GetRolesPermissionsResult {
  /** @description 响应数据数组 */
  data: Permission[]
}

/**
 * @description 获取角色权限
 * @param params GetRolesPermissionsRequestType
 * @returns Promise<GetRolesPermissionsResult>
 */
export async function getRolesPermissionsFunc(
  params: GetRolesPermissionsRequestType
): Promise<GetRolesPermissionsResult> {
  const config: RequestConfig = {
    url: '/api/roles/permissions',
    method: 'GET',
    params,
  }
  return request<GetRolesPermissionsResult>(config)
}

/**
 * @description 移除角色权限
 * @param params DeleteRolesRemovePermissionRequestType
 * @returns Promise<DeleteRolesRemovePermissionResult>
 */
export interface DeleteRolesRemovePermissionRequestType {
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
export interface DeleteRolesRemovePermissionResult {
  /** @description 响应数据 */
  data: any
}

/**
 * @description 移除角色权限
 * @param params DeleteRolesRemovePermissionRequestType
 * @returns Promise<DeleteRolesRemovePermissionResult>
 */
export async function deleteRolesRemovePermissionFunc(
  params: DeleteRolesRemovePermissionRequestType
): Promise<DeleteRolesRemovePermissionResult> {
  const config: RequestConfig = {
    url: '/api/roles/remove-permission',
    method: 'DELETE',
    params,
  }
  return request<DeleteRolesRemovePermissionResult>(config)
}
