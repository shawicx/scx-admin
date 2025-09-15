import request from '@/service/request'

/**
 * @description 接口 创建权限 的 **请求类型**
 * @category 权限管理
 * @method POST
 * @path /api/permissions
 */
export interface PostPermissionsRequestType {
  /**
   * 权限名称
   */
  name: string
  /**
   * 操作动作
   */
  action: string
  /**
   * 资源名称
   */
  resource: string
  /**
   * 权限描述
   */
  description?: string
}

/**
 * @description 接口 创建权限 的 **返回类型**
 * @category 权限管理
 * @method POST
 * @path /api/permissions
 */
export interface PostPermissionsResponseType {
  /**
   * 权限ID
   */
  id: string
  /**
   * 权限名称
   */
  name: string
  /**
   * 操作动作
   */
  action: string
  /**
   * 资源名称
   */
  resource: string
  /**
   * 权限描述
   */
  description: string | null
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
 * @description 接口 创建权限 的 **请求函数**
 * @category 权限管理
 * @method POST
 * @path /api/permissions
 */
export const postPermissionsApi = (params: PostPermissionsRequestType) => {
  return request('/api/permissions', {
    method: 'POST',
    data: params,
  })
}

/**
 * @description 接口 获取权限列表 的 **请求类型**
 * @category 权限管理
 * @method GET
 * @path /api/permissions
 */
export interface GetPermissionsRequestType {
  /**
   * 搜索关键词（权限名称、动作或资源）
   */
  search?: string
  /**
   * 按动作筛选
   */
  action?: string
  /**
   * 按资源筛选
   */
  resource?: string
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
 * @description 接口 获取权限列表 的 **返回类型**
 * @category 权限管理
 * @method GET
 * @path /api/permissions
 */
export interface GetPermissionsResponseType {
  permissions?: {}[]
  /**
   * 总数量
   */
  total?: number
}

/**
 * @description 接口 获取权限列表 的 **请求函数**
 * @category 权限管理
 * @method GET
 * @path /api/permissions
 */
export const getPermissionsApi = (params: GetPermissionsRequestType) => {
  return request('/api/permissions', {
    method: 'GET',
    params: params,
  })
}

/**
 * @description 接口 更新权限 的 **请求类型**
 * @category 权限管理
 * @method PUT
 * @path /api/permissions
 */
export interface PutPermissionsRequestType {}

/**
 * @description 接口 更新权限 的 **返回类型**
 * @category 权限管理
 * @method PUT
 * @path /api/permissions
 */
export interface PutPermissionsResponseType {
  /**
   * 权限ID
   */
  id: string
  /**
   * 权限名称
   */
  name: string
  /**
   * 操作动作
   */
  action: string
  /**
   * 资源名称
   */
  resource: string
  /**
   * 权限描述
   */
  description: string | null
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
 * @description 接口 更新权限 的 **请求函数**
 * @category 权限管理
 * @method PUT
 * @path /api/permissions
 */
export const putPermissionsApi = (params: PutPermissionsRequestType) => {
  return request('/api/permissions', {
    method: 'PUT',
    data: params,
  })
}

/**
 * @description 接口 删除权限 的 **请求类型**
 * @category 权限管理
 * @method DELETE
 * @path /api/permissions
 */
export interface DeletePermissionsRequestType {
  /**
   * 权限ID
   */
  id: string
}

/**
 * @description 接口 删除权限 的 **返回类型**
 * @category 权限管理
 * @method DELETE
 * @path /api/permissions
 */
export type DeletePermissionsResponseType = string

/**
 * @description 接口 删除权限 的 **请求函数**
 * @category 权限管理
 * @method DELETE
 * @path /api/permissions
 */
export const deletePermissionsApi = (params: DeletePermissionsRequestType) => {
  return request('/api/permissions', {
    method: 'DELETE',
    data: params,
  })
}

/**
 * @description 接口 搜索权限 的 **请求类型**
 * @category 权限管理
 * @method GET
 * @path /api/permissions/search
 */
export interface GetPermissionsSearchRequestType {
  /**
   * 搜索关键词
   */
  keyword: string
  /**
   * 返回数量限制
   */
  limit?: string
}

/**
 * @description 接口 搜索权限 的 **返回类型**
 * @category 权限管理
 * @method GET
 * @path /api/permissions/search
 */
export type GetPermissionsSearchResponseType = unknown[]

/**
 * @description 接口 搜索权限 的 **请求函数**
 * @category 权限管理
 * @method GET
 * @path /api/permissions/search
 */
export const getPermissionsSearchApi = (
  params: GetPermissionsSearchRequestType
) => {
  return request('/api/permissions/search', {
    method: 'GET',
    params: params,
  })
}

/**
 * @description 接口 获取所有动作 的 **请求类型**
 * @category 权限管理
 * @method GET
 * @path /api/permissions/actions
 */
export interface GetPermissionsActionsRequestType {}

/**
 * @description 接口 获取所有动作 的 **返回类型**
 * @category 权限管理
 * @method GET
 * @path /api/permissions/actions
 */
export type GetPermissionsActionsResponseType = string[]

/**
 * @description 接口 获取所有动作 的 **请求函数**
 * @category 权限管理
 * @method GET
 * @path /api/permissions/actions
 */
export const getPermissionsActionsApi = (
  params: GetPermissionsActionsRequestType
) => {
  return request('/api/permissions/actions', {
    method: 'GET',
    params: params,
  })
}

/**
 * @description 接口 获取所有资源 的 **请求类型**
 * @category 权限管理
 * @method GET
 * @path /api/permissions/resources
 */
export interface GetPermissionsResourcesRequestType {}

/**
 * @description 接口 获取所有资源 的 **返回类型**
 * @category 权限管理
 * @method GET
 * @path /api/permissions/resources
 */
export type GetPermissionsResourcesResponseType = string[]

/**
 * @description 接口 获取所有资源 的 **请求函数**
 * @category 权限管理
 * @method GET
 * @path /api/permissions/resources
 */
export const getPermissionsResourcesApi = (
  params: GetPermissionsResourcesRequestType
) => {
  return request('/api/permissions/resources', {
    method: 'GET',
    params: params,
  })
}

/**
 * @description 接口 根据动作获取权限 的 **请求类型**
 * @category 权限管理
 * @method GET
 * @path /api/permissions/by-action
 */
export interface GetPermissionsByActionRequestType {
  /**
   * 动作名称
   */
  action: string
}

/**
 * @description 接口 根据动作获取权限 的 **返回类型**
 * @category 权限管理
 * @method GET
 * @path /api/permissions/by-action
 */
export type GetPermissionsByActionResponseType = unknown[]

/**
 * @description 接口 根据动作获取权限 的 **请求函数**
 * @category 权限管理
 * @method GET
 * @path /api/permissions/by-action
 */
export const getPermissionsByActionApi = (
  params: GetPermissionsByActionRequestType
) => {
  return request('/api/permissions/by-action', {
    method: 'GET',
    params: params,
  })
}

/**
 * @description 接口 根据资源获取权限 的 **请求类型**
 * @category 权限管理
 * @method GET
 * @path /api/permissions/by-resource
 */
export interface GetPermissionsByResourceRequestType {
  /**
   * 资源名称
   */
  resource: string
}

/**
 * @description 接口 根据资源获取权限 的 **返回类型**
 * @category 权限管理
 * @method GET
 * @path /api/permissions/by-resource
 */
export type GetPermissionsByResourceResponseType = unknown[]

/**
 * @description 接口 根据资源获取权限 的 **请求函数**
 * @category 权限管理
 * @method GET
 * @path /api/permissions/by-resource
 */
export const getPermissionsByResourceApi = (
  params: GetPermissionsByResourceRequestType
) => {
  return request('/api/permissions/by-resource', {
    method: 'GET',
    params: params,
  })
}

/**
 * @description 接口 获取权限详情 的 **请求类型**
 * @category 权限管理
 * @method GET
 * @path /api/permissions/detail
 */
export interface GetPermissionsDetailRequestType {
  /**
   * 权限ID
   */
  id: string
}

/**
 * @description 接口 获取权限详情 的 **返回类型**
 * @category 权限管理
 * @method GET
 * @path /api/permissions/detail
 */
export interface GetPermissionsDetailResponseType {
  /**
   * 权限ID
   */
  id: string
  /**
   * 权限名称
   */
  name: string
  /**
   * 操作动作
   */
  action: string
  /**
   * 资源名称
   */
  resource: string
  /**
   * 权限描述
   */
  description: string | null
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
 * @description 接口 获取权限详情 的 **请求函数**
 * @category 权限管理
 * @method GET
 * @path /api/permissions/detail
 */
export const getPermissionsDetailApi = (
  params: GetPermissionsDetailRequestType
) => {
  return request('/api/permissions/detail', {
    method: 'GET',
    params: params,
  })
}
