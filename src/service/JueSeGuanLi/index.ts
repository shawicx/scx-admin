import { RequestConfig, request } from '@/service/request'

/**
 * @description 更新角色
 * @param params PutApiRolesUpdateRequestType
 * @returns Promise<PutApiRolesUpdateResultType>
 */
export interface PutApiRolesUpdateRequestType {
  /** @description 角色 ID */
  id: string
  /** @description 角色名称（2-50 字符） */
  name?: string | null
  /** @description 角色编码（2-50 字符） */
  code?: string | null
  /** @description 角色描述（最长 255 字符） */
  description?: string | null
  /** @description 是否系统内置角色 */
  isSystem?: boolean | null
  /** @description  */
  Authorization?: string
}

/**
 * @description 更新角色 的返回数据类型
 */
export interface PutApiRolesUpdateResultType {
  /** @description 角色 ID */
  id: string
  /** @description 角色名称 */
  name: string
  /** @description 角色编码 */
  code: string
  /** @description 角色描述 */
  description: string | null
  /** @description 是否系统内置角色 */
  isSystem: boolean
  /** @description 创建时间 */
  createdAt: string
  /** @description 更新时间 */
  updatedAt: string
}

/**
 * @description 更新角色
 * @param params PutApiRolesUpdateRequestType
 * @returns Promise<PutApiRolesUpdateResultType>
 */
export async function putApiRolesUpdateFunc(
  params: PutApiRolesUpdateRequestType
): Promise<PutApiRolesUpdateResultType> {
  const config: RequestConfig = {
    url: '/api/roles/update',
    method: 'PUT',
    data: params,
  }
  return request<PutApiRolesUpdateResultType>(config)
}

/**
 * @description 创建角色
 * @param params PostApiRolesCreateRequestType
 * @returns Promise<PostApiRolesCreateResultType>
 */
export interface PostApiRolesCreateRequestType {
  /** @description 角色名称（2-50 字符） */
  name: string
  /** @description 角色编码（2-50 字符，唯一） */
  code: string
  /** @description 角色描述（最长 255 字符） */
  description?: string | null
  /** @description 是否系统内置角色（系统角色不可删除） */
  isSystem?: boolean | null
  /** @description  */
  Authorization?: string
}

/**
 * @description 创建角色 的返回数据类型
 */
export interface PostApiRolesCreateResultType {
  /** @description 角色 ID */
  id: string
  /** @description 角色名称 */
  name: string
  /** @description 角色编码 */
  code: string
  /** @description 角色描述 */
  description: string | null
  /** @description 是否系统内置角色 */
  isSystem: boolean
  /** @description 创建时间 */
  createdAt: string
  /** @description 更新时间 */
  updatedAt: string
}

/**
 * @description 创建角色
 * @param params PostApiRolesCreateRequestType
 * @returns Promise<PostApiRolesCreateResultType>
 */
export async function postApiRolesCreateFunc(
  params: PostApiRolesCreateRequestType
): Promise<PostApiRolesCreateResultType> {
  const config: RequestConfig = {
    url: '/api/roles/create',
    method: 'POST',
    data: params,
  }
  return request<PostApiRolesCreateResultType>(config)
}

/**
 * @description 为角色分配权限
 * @param params PostApiRolesAssignPermissionsRequestType
 * @returns Promise<PostApiRolesAssignPermissionsResultType>
 */
export interface PostApiRolesAssignPermissionsRequestType {
  /** @description 角色 ID */
  id: string
  /** @description 权限 ID 列表 */
  permissionIds: string[]
  /** @description  */
  Authorization?: string
}

/**
 * @description 为角色分配权限 的返回数据类型
 */
export interface PostApiRolesAssignPermissionsResultType {
  /** @description 提示消息 */
  message: string
}

/**
 * @description 为角色分配权限
 * @param params PostApiRolesAssignPermissionsRequestType
 * @returns Promise<PostApiRolesAssignPermissionsResultType>
 */
export async function postApiRolesAssignPermissionsFunc(
  params: PostApiRolesAssignPermissionsRequestType
): Promise<PostApiRolesAssignPermissionsResultType> {
  const config: RequestConfig = {
    url: '/api/roles/assign-permissions',
    method: 'POST',
    data: params,
  }
  return request<PostApiRolesAssignPermissionsResultType>(config)
}

/**
 * @description 查询角色权限
 * @param params GetApiRolesPermissionsRequestType
 * @returns Promise<GetApiRolesPermissionsResultType>
 */
export interface GetApiRolesPermissionsRequestType {
  /** @description 角色 ID */
  id: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 查询角色权限 的返回数据类型
 */
export interface GetApiRolesPermissionsResultType {
  /** @description 响应数据数组 */
  data: Record<string, any>[]
}

/**
 * @description 查询角色权限
 * @param params GetApiRolesPermissionsRequestType
 * @returns Promise<GetApiRolesPermissionsResultType>
 */
export async function getApiRolesPermissionsFunc(
  params: GetApiRolesPermissionsRequestType
): Promise<GetApiRolesPermissionsResultType> {
  const config: RequestConfig = {
    url: '/api/roles/permissions',
    method: 'GET',
    params,
  }
  return request<GetApiRolesPermissionsResultType>(config)
}

/**
 * @description 角色分页列表
 * @param params GetApiRolesListRequestType
 * @returns Promise<GetApiRolesListResultType>
 */
export interface GetApiRolesListRequestType {
  /** @description 页码，从 1 开始 */
  page?: string
  /** @description 每页条数 */
  limit?: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 角色分页列表 的返回数据类型
 */
export interface GetApiRolesListResultType {}

/**
 * @description 角色分页列表
 * @param params GetApiRolesListRequestType
 * @returns Promise<GetApiRolesListResultType>
 */
export async function getApiRolesListFunc(
  params: GetApiRolesListRequestType
): Promise<GetApiRolesListResultType> {
  const config: RequestConfig = {
    url: '/api/roles/list',
    method: 'GET',
    params,
  }
  return request<GetApiRolesListResultType>(config)
}

/**
 * @description 角色详情
 * @param params GetApiRolesDetailRequestType
 * @returns Promise<GetApiRolesDetailResultType>
 */
export interface GetApiRolesDetailRequestType {
  /** @description 角色 ID */
  id: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 角色详情 的返回数据类型
 */
export interface GetApiRolesDetailResultType {
  /** @description 角色 ID */
  id: string
  /** @description 角色名称 */
  name: string
  /** @description 角色编码 */
  code: string
  /** @description 角色描述 */
  description: string | null
  /** @description 是否系统内置角色 */
  isSystem: boolean
  /** @description 创建时间 */
  createdAt: string
  /** @description 更新时间 */
  updatedAt: string
}

/**
 * @description 角色详情
 * @param params GetApiRolesDetailRequestType
 * @returns Promise<GetApiRolesDetailResultType>
 */
export async function getApiRolesDetailFunc(
  params: GetApiRolesDetailRequestType
): Promise<GetApiRolesDetailResultType> {
  const config: RequestConfig = {
    url: '/api/roles/detail',
    method: 'GET',
    params,
  }
  return request<GetApiRolesDetailResultType>(config)
}

/**
 * @description 按编码查询角色
 * @param params GetApiRolesByCodeRequestType
 * @returns Promise<GetApiRolesByCodeResultType>
 */
export interface GetApiRolesByCodeRequestType {
  /** @description 角色编码 */
  code: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 按编码查询角色 的返回数据类型
 */
export interface GetApiRolesByCodeResultType {
  /** @description 角色 ID */
  id: string
  /** @description 角色名称 */
  name: string
  /** @description 角色编码 */
  code: string
  /** @description 角色描述 */
  description: string | null
  /** @description 是否系统内置角色 */
  isSystem: boolean
  /** @description 创建时间 */
  createdAt: string
  /** @description 更新时间 */
  updatedAt: string
}

/**
 * @description 按编码查询角色
 * @param params GetApiRolesByCodeRequestType
 * @returns Promise<GetApiRolesByCodeResultType>
 */
export async function getApiRolesByCodeFunc(
  params: GetApiRolesByCodeRequestType
): Promise<GetApiRolesByCodeResultType> {
  const config: RequestConfig = {
    url: '/api/roles/by-code',
    method: 'GET',
    params,
  }
  return request<GetApiRolesByCodeResultType>(config)
}

/**
 * @description 移除角色权限
 * @param params DeleteApiRolesRemovePermissionRequestType
 * @returns Promise<DeleteApiRolesRemovePermissionResultType>
 */
export interface DeleteApiRolesRemovePermissionRequestType {
  /** @description 角色 ID */
  id: string
  /** @description 权限 ID */
  permissionId: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 移除角色权限 的返回数据类型
 */
export interface DeleteApiRolesRemovePermissionResultType {
  /** @description 提示消息 */
  message: string
}

/**
 * @description 移除角色权限
 * @param params DeleteApiRolesRemovePermissionRequestType
 * @returns Promise<DeleteApiRolesRemovePermissionResultType>
 */
export async function deleteApiRolesRemovePermissionFunc(
  params: DeleteApiRolesRemovePermissionRequestType
): Promise<DeleteApiRolesRemovePermissionResultType> {
  const config: RequestConfig = {
    url: '/api/roles/remove-permission',
    method: 'DELETE',
    params,
  }
  return request<DeleteApiRolesRemovePermissionResultType>(config)
}

/**
 * @description 删除角色
 * @param params DeleteApiRolesDeleteRequestType
 * @returns Promise<DeleteApiRolesDeleteResultType>
 */
export interface DeleteApiRolesDeleteRequestType {
  /** @description 角色 ID */
  id: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 删除角色 的返回数据类型
 */
export interface DeleteApiRolesDeleteResultType {
  /** @description 提示消息 */
  message: string
}

/**
 * @description 删除角色
 * @param params DeleteApiRolesDeleteRequestType
 * @returns Promise<DeleteApiRolesDeleteResultType>
 */
export async function deleteApiRolesDeleteFunc(
  params: DeleteApiRolesDeleteRequestType
): Promise<DeleteApiRolesDeleteResultType> {
  const config: RequestConfig = {
    url: '/api/roles/delete',
    method: 'DELETE',
    params,
  }
  return request<DeleteApiRolesDeleteResultType>(config)
}
