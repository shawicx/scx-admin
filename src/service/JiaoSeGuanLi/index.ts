import request from '@/service/request'

/**
 * @description 接口 创建角色 的 **请求类型**
 * @category 角色管理
 * @method POST
 * @path /api/roles
 */
export interface PostRolesRequestType {
  /**
   * 角色名称
   */
  name: string
  /**
   * 角色代码，用于程序中识别角色
   */
  code: string
  /**
   * 角色描述
   */
  description?: string
  /**
   * 是否为系统内置角色
   */
  isSystem?: boolean
}

/**
 * @description 接口 创建角色 的 **返回类型**
 * @category 角色管理
 * @method POST
 * @path /api/roles
 */
export interface PostRolesResponseType {
  /**
   * 角色ID
   */
  id: string
  /**
   * 角色名称
   */
  name: string
  /**
   * 角色代码
   */
  code: string
  /**
   * 角色描述
   */
  description: string | null
  /**
   * 是否为系统内置角色
   */
  isSystem: boolean
  /**
   * 创建时间
   */
  createdAt: string
  /**
   * 更新时间
   */
  updatedAt: string
}

/**
 * @description 接口 创建角色 的 **请求函数**
 * @category 角色管理
 * @method POST
 * @path /api/roles
 */
export const postRolesApi = (params: PostRolesRequestType) => {
  return request('/api/roles', {
    method: 'POST',
    data: params,
  })
}

/**
 * @description 接口 获取角色列表 的 **请求类型**
 * @category 角色管理
 * @method GET
 * @path /api/roles
 */
export interface GetRolesRequestType {
  /**
   * 每页数量
   */
  limit?: string
  /**
   * 页码
   */
  page?: string
}

/**
 * @description 接口 获取角色列表 的 **返回类型**
 * @category 角色管理
 * @method GET
 * @path /api/roles
 */
export interface GetRolesResponseType {
  roles?: {}[]
  /**
   * 总数量
   */
  total?: number
}

/**
 * @description 接口 获取角色列表 的 **请求函数**
 * @category 角色管理
 * @method GET
 * @path /api/roles
 */
export const getRolesApi = (params: GetRolesRequestType) => {
  return request('/api/roles', {
    method: 'GET',
    params: params,
  })
}

/**
 * @description 接口 更新角色 的 **请求类型**
 * @category 角色管理
 * @method PUT
 * @path /api/roles
 */
export interface PutRolesRequestType {
  /**
   * 角色ID
   */
  id: string
}

/**
 * @description 接口 更新角色 的 **返回类型**
 * @category 角色管理
 * @method PUT
 * @path /api/roles
 */
export interface PutRolesResponseType {
  /**
   * 角色ID
   */
  id: string
  /**
   * 角色名称
   */
  name: string
  /**
   * 角色代码
   */
  code: string
  /**
   * 角色描述
   */
  description: string | null
  /**
   * 是否为系统内置角色
   */
  isSystem: boolean
  /**
   * 创建时间
   */
  createdAt: string
  /**
   * 更新时间
   */
  updatedAt: string
}

/**
 * @description 接口 更新角色 的 **请求函数**
 * @category 角色管理
 * @method PUT
 * @path /api/roles
 */
export const putRolesApi = (params: PutRolesRequestType) => {
  return request('/api/roles', {
    method: 'PUT',
    data: params,
  })
}

/**
 * @description 接口 删除角色 的 **请求类型**
 * @category 角色管理
 * @method DELETE
 * @path /api/roles
 */
export interface DeleteRolesRequestType {
  /**
   * 角色ID
   */
  id: string
}

/**
 * @description 接口 删除角色 的 **返回类型**
 * @category 角色管理
 * @method DELETE
 * @path /api/roles
 */
export type DeleteRolesResponseType = string

/**
 * @description 接口 删除角色 的 **请求函数**
 * @category 角色管理
 * @method DELETE
 * @path /api/roles
 */
export const deleteRolesApi = (params: DeleteRolesRequestType) => {
  return request('/api/roles', {
    method: 'DELETE',
    data: params,
  })
}

/**
 * @description 接口 获取角色详情 的 **请求类型**
 * @category 角色管理
 * @method GET
 * @path /api/roles/detail
 */
export interface GetRolesDetailRequestType {
  /**
   * 角色ID
   */
  id: string
}

/**
 * @description 接口 获取角色详情 的 **返回类型**
 * @category 角色管理
 * @method GET
 * @path /api/roles/detail
 */
export interface GetRolesDetailResponseType {
  /**
   * 角色ID
   */
  id: string
  /**
   * 角色名称
   */
  name: string
  /**
   * 角色代码
   */
  code: string
  /**
   * 角色描述
   */
  description: string | null
  /**
   * 是否为系统内置角色
   */
  isSystem: boolean
  /**
   * 创建时间
   */
  createdAt: string
  /**
   * 更新时间
   */
  updatedAt: string
}

/**
 * @description 接口 获取角色详情 的 **请求函数**
 * @category 角色管理
 * @method GET
 * @path /api/roles/detail
 */
export const getRolesDetailApi = (params: GetRolesDetailRequestType) => {
  return request('/api/roles/detail', {
    method: 'GET',
    params: params,
  })
}

/**
 * @description 接口 根据代码获取角色 的 **请求类型**
 * @category 角色管理
 * @method GET
 * @path /api/roles/by-code
 */
export interface GetRolesByCodeRequestType {
  /**
   * 角色代码
   */
  code: string
}

/**
 * @description 接口 根据代码获取角色 的 **返回类型**
 * @category 角色管理
 * @method GET
 * @path /api/roles/by-code
 */
export interface GetRolesByCodeResponseType {
  /**
   * 角色ID
   */
  id: string
  /**
   * 角色名称
   */
  name: string
  /**
   * 角色代码
   */
  code: string
  /**
   * 角色描述
   */
  description: string | null
  /**
   * 是否为系统内置角色
   */
  isSystem: boolean
  /**
   * 创建时间
   */
  createdAt: string
  /**
   * 更新时间
   */
  updatedAt: string
}

/**
 * @description 接口 根据代码获取角色 的 **请求函数**
 * @category 角色管理
 * @method GET
 * @path /api/roles/by-code
 */
export const getRolesByCodeApi = (params: GetRolesByCodeRequestType) => {
  return request('/api/roles/by-code', {
    method: 'GET',
    params: params,
  })
}

/**
 * @description 接口 为角色分配权限 的 **请求类型**
 * @category 角色管理
 * @method POST
 * @path /api/roles/assign-permissions
 */
export interface PostRolesAssignPermissionsRequestType {
  /**
   * 权限ID列表
   */
  permissionIds: string[]
  /**
   * 角色ID
   */
  id: string
}

/**
 * @description 接口 为角色分配权限 的 **返回类型**
 * @category 角色管理
 * @method POST
 * @path /api/roles/assign-permissions
 */
export type PostRolesAssignPermissionsResponseType = string

/**
 * @description 接口 为角色分配权限 的 **请求函数**
 * @category 角色管理
 * @method POST
 * @path /api/roles/assign-permissions
 */
export const postRolesAssignPermissionsApi = (
  params: PostRolesAssignPermissionsRequestType
) => {
  return request('/api/roles/assign-permissions', {
    method: 'POST',
    data: params,
  })
}

/**
 * @description 接口 获取角色权限 的 **请求类型**
 * @category 角色管理
 * @method GET
 * @path /api/roles/permissions
 */
export interface GetRolesPermissionsRequestType {
  /**
   * 角色ID
   */
  id: string
}

/**
 * @description 接口 获取角色权限 的 **返回类型**
 * @category 角色管理
 * @method GET
 * @path /api/roles/permissions
 */
export type GetRolesPermissionsResponseType = unknown[]

/**
 * @description 接口 获取角色权限 的 **请求函数**
 * @category 角色管理
 * @method GET
 * @path /api/roles/permissions
 */
export const getRolesPermissionsApi = (
  params: GetRolesPermissionsRequestType
) => {
  return request('/api/roles/permissions', {
    method: 'GET',
    params: params,
  })
}

/**
 * @description 接口 移除角色权限 的 **请求类型**
 * @category 角色管理
 * @method DELETE
 * @path /api/roles/remove-permission
 */
export interface DeleteRolesRemovePermissionRequestType {
  /**
   * 角色ID
   */
  id: string
  /**
   * 权限ID
   */
  permissionId: string
}

/**
 * @description 接口 移除角色权限 的 **返回类型**
 * @category 角色管理
 * @method DELETE
 * @path /api/roles/remove-permission
 */
export type DeleteRolesRemovePermissionResponseType = string

/**
 * @description 接口 移除角色权限 的 **请求函数**
 * @category 角色管理
 * @method DELETE
 * @path /api/roles/remove-permission
 */
export const deleteRolesRemovePermissionApi = (
  params: DeleteRolesRemovePermissionRequestType
) => {
  return request('/api/roles/remove-permission', {
    method: 'DELETE',
    data: params,
  })
}
