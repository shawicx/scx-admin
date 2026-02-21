import { RequestConfig, request } from '@/service/request'
import type {
  PermissionResponseDto,
  PermissionTreeResponseDto,
  PermissionMenuTreeDto,
} from '@/service/types'

/**
 * @description 创建权限
 * @param params PostPermissionsRequestType
 * @returns Promise<PostPermissionsResponseType>
 */
export interface PostPermissionsRequestType {
  /** @description 权限名称 */
  name: string
  /** @description 权限类型 */
  type: string
  /** @description 操作动作 */
  action?: string
  /** @description 资源名称 */
  resource?: string
  /** @description 父权限ID */
  parentId?: string
  /** @description 路由路径（菜单用） */
  path?: string
  /** @description 图标（菜单用） */
  icon?: string
  /** @description 排序号 */
  sort?: number
  /** @description 是否可见 */
  visible?: number
  /** @description 状态 */
  status?: number
  /** @description 权限描述 */
  description?: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 创建权限 的返回数据类型
 */
export interface PostPermissionsResponseType {
  /** @description 权限ID */
  id: string
  /** @description 权限名称 */
  name: string
  /** @description 权限类型 */
  type: string
  /** @description 操作动作 */
  action: any
  /** @description 资源名称 */
  resource: any
  /** @description 父权限ID */
  parentId: any
  /** @description 层级 */
  level: number
  /** @description 路由路径（菜单用） */
  path: any
  /** @description 图标（菜单用） */
  icon: any
  /** @description 排序号 */
  sort: number
  /** @description 是否可见 */
  visible: number
  /** @description 状态 */
  status: number
  /** @description 权限描述 */
  description: any
  /** @description 创建时间 */
  createdAt: string
  /** @description 更新时间 */
  updatedAt: string
}

/**
 * @description 创建权限
 * @param params PostPermissionsRequestType
 * @returns Promise<PostPermissionsResponseType>
 */
export async function postPermissionsApi(
  params: PostPermissionsRequestType
): Promise<PostPermissionsResponseType> {
  const config: RequestConfig = {
    url: '/api/permissions',
    method: 'POST',
    data: params,
  }
  return request<PostPermissionsResponseType>(config)
}

/**
 * @description 获取权限列表
 * @param params GetPermissionsRequestType
 * @returns Promise<GetPermissionsResponseType>
 */
export interface GetPermissionsRequestType {
  /** @description 页码 */
  page?: string
  /** @description 每页数量 */
  limit?: string
  /** @description 搜索关键词（权限名称、动作或资源） */
  search?: string
  /** @description 按动作筛选 */
  action?: string
  /** @description 按资源筛选 */
  resource?: string
  /** @description 按类型筛选（MENU/BUTTON） */
  type?: string
  /** @description 按父权限ID筛选 */
  parentId?: string
  /** @description 按层级筛选 */
  level?: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 获取权限列表 的返回数据类型
 */
export interface GetPermissionsResponseType {
  /** @description  */
  permissions: PermissionResponseDto[]
  /** @description 总数量 */
  total: number
}

/**
 * @description 获取权限列表
 * @param params GetPermissionsRequestType
 * @returns Promise<GetPermissionsResponseType>
 */
export async function getPermissionsApi(
  params: GetPermissionsRequestType
): Promise<GetPermissionsResponseType> {
  const config: RequestConfig = {
    url: '/api/permissions',
    method: 'GET',
    params,
  }
  return request<GetPermissionsResponseType>(config)
}

/**
 * @description 更新权限
 * @param params PutPermissionsRequestType
 * @returns Promise<PutPermissionsResponseType>
 */
export interface PutPermissionsRequestType {
  /** @description 权限ID */
  id: string
  /** @description 权限名称 */
  name?: string
  /** @description 权限类型 */
  type?: string
  /** @description 操作动作 */
  action?: string
  /** @description 资源名称 */
  resource?: string
  /** @description 父权限ID */
  parentId?: string
  /** @description 路由路径（菜单用） */
  path?: string
  /** @description 图标（菜单用） */
  icon?: string
  /** @description 排序号 */
  sort?: number
  /** @description 是否可见 */
  visible?: number
  /** @description 状态 */
  status?: number
  /** @description 权限描述 */
  description?: string
  /** @description 层级（自动计算） */
  level?: number
  /** @description  */
  Authorization?: string
}

/**
 * @description 更新权限 的返回数据类型
 */
export interface PutPermissionsResponseType {
  /** @description 权限ID */
  id: string
  /** @description 权限名称 */
  name: string
  /** @description 权限类型 */
  type: string
  /** @description 操作动作 */
  action: any
  /** @description 资源名称 */
  resource: any
  /** @description 父权限ID */
  parentId: any
  /** @description 层级 */
  level: number
  /** @description 路由路径（菜单用） */
  path: any
  /** @description 图标（菜单用） */
  icon: any
  /** @description 排序号 */
  sort: number
  /** @description 是否可见 */
  visible: number
  /** @description 状态 */
  status: number
  /** @description 权限描述 */
  description: any
  /** @description 创建时间 */
  createdAt: string
  /** @description 更新时间 */
  updatedAt: string
}

/**
 * @description 更新权限
 * @param params PutPermissionsRequestType
 * @returns Promise<PutPermissionsResponseType>
 */
export async function putPermissionsApi(
  params: PutPermissionsRequestType
): Promise<PutPermissionsResponseType> {
  const config: RequestConfig = {
    url: '/api/permissions',
    method: 'PUT',
    data: params,
  }
  return request<PutPermissionsResponseType>(config)
}

/**
 * @description 删除权限
 * @param params DeletePermissionsRequestType
 * @returns Promise<DeletePermissionsResponseType>
 */
export interface DeletePermissionsRequestType {
  /** @description 权限ID */
  id: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 删除权限 的返回数据类型
 */
export interface DeletePermissionsResponseType {
  /** @description 响应数据 */
  data: any
}

/**
 * @description 删除权限
 * @param params DeletePermissionsRequestType
 * @returns Promise<DeletePermissionsResponseType>
 */
export async function deletePermissionsApi(
  params: DeletePermissionsRequestType
): Promise<DeletePermissionsResponseType> {
  const config: RequestConfig = {
    url: '/api/permissions',
    method: 'DELETE',
    params,
  }
  return request<DeletePermissionsResponseType>(config)
}

/**
 * @description 搜索权限
 * @param params GetPermissionsSearchRequestType
 * @returns Promise<GetPermissionsSearchResponseType>
 */
export interface GetPermissionsSearchRequestType {
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
export interface GetPermissionsSearchResponseType {
  /** @description 响应数据数组 */
  data: PermissionResponseDto[]
}

/**
 * @description 搜索权限
 * @param params GetPermissionsSearchRequestType
 * @returns Promise<GetPermissionsSearchResponseType>
 */
export async function getPermissionsSearchApi(
  params: GetPermissionsSearchRequestType
): Promise<GetPermissionsSearchResponseType> {
  const config: RequestConfig = {
    url: '/api/permissions/search',
    method: 'GET',
    params,
  }
  return request<GetPermissionsSearchResponseType>(config)
}

/**
 * @description 获取所有动作
 * @param params GetPermissionsActionsRequestType
 * @returns Promise<GetPermissionsActionsResponseType>
 */
export interface GetPermissionsActionsRequestType {
  /** @description  */
  Authorization?: string
}

/**
 * @description 获取所有动作 的返回数据类型
 */
export interface GetPermissionsActionsResponseType {
  /** @description 响应数据数组 */
  data: string[]
}

/**
 * @description 获取所有动作
 * @param params GetPermissionsActionsRequestType
 * @returns Promise<GetPermissionsActionsResponseType>
 */
export async function getPermissionsActionsApi(
  params: GetPermissionsActionsRequestType
): Promise<GetPermissionsActionsResponseType> {
  const config: RequestConfig = {
    url: '/api/permissions/actions',
    method: 'GET',
    params,
  }
  return request<GetPermissionsActionsResponseType>(config)
}

/**
 * @description 获取所有资源
 * @param params GetPermissionsResourcesRequestType
 * @returns Promise<GetPermissionsResourcesResponseType>
 */
export interface GetPermissionsResourcesRequestType {
  /** @description  */
  Authorization?: string
}

/**
 * @description 获取所有资源 的返回数据类型
 */
export interface GetPermissionsResourcesResponseType {
  /** @description 响应数据数组 */
  data: string[]
}

/**
 * @description 获取所有资源
 * @param params GetPermissionsResourcesRequestType
 * @returns Promise<GetPermissionsResourcesResponseType>
 */
export async function getPermissionsResourcesApi(
  params: GetPermissionsResourcesRequestType
): Promise<GetPermissionsResourcesResponseType> {
  const config: RequestConfig = {
    url: '/api/permissions/resources',
    method: 'GET',
    params,
  }
  return request<GetPermissionsResourcesResponseType>(config)
}

/**
 * @description 根据动作获取权限
 * @param params GetPermissionsByActionRequestType
 * @returns Promise<GetPermissionsByActionResponseType>
 */
export interface GetPermissionsByActionRequestType {
  /** @description 动作名称 */
  action: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 根据动作获取权限 的返回数据类型
 */
export interface GetPermissionsByActionResponseType {
  /** @description 响应数据数组 */
  data: PermissionResponseDto[]
}

/**
 * @description 根据动作获取权限
 * @param params GetPermissionsByActionRequestType
 * @returns Promise<GetPermissionsByActionResponseType>
 */
export async function getPermissionsByActionApi(
  params: GetPermissionsByActionRequestType
): Promise<GetPermissionsByActionResponseType> {
  const config: RequestConfig = {
    url: '/api/permissions/by-action',
    method: 'GET',
    params,
  }
  return request<GetPermissionsByActionResponseType>(config)
}

/**
 * @description 根据资源获取权限
 * @param params GetPermissionsByResourceRequestType
 * @returns Promise<GetPermissionsByResourceResponseType>
 */
export interface GetPermissionsByResourceRequestType {
  /** @description 资源名称 */
  resource: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 根据资源获取权限 的返回数据类型
 */
export interface GetPermissionsByResourceResponseType {
  /** @description 响应数据数组 */
  data: PermissionResponseDto[]
}

/**
 * @description 根据资源获取权限
 * @param params GetPermissionsByResourceRequestType
 * @returns Promise<GetPermissionsByResourceResponseType>
 */
export async function getPermissionsByResourceApi(
  params: GetPermissionsByResourceRequestType
): Promise<GetPermissionsByResourceResponseType> {
  const config: RequestConfig = {
    url: '/api/permissions/by-resource',
    method: 'GET',
    params,
  }
  return request<GetPermissionsByResourceResponseType>(config)
}

/**
 * @description 获取权限详情
 * @param params GetPermissionsDetailRequestType
 * @returns Promise<GetPermissionsDetailResponseType>
 */
export interface GetPermissionsDetailRequestType {
  /** @description 权限ID */
  id: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 获取权限详情 的返回数据类型
 */
export interface GetPermissionsDetailResponseType {
  /** @description 权限ID */
  id: string
  /** @description 权限名称 */
  name: string
  /** @description 权限类型 */
  type: string
  /** @description 操作动作 */
  action: any
  /** @description 资源名称 */
  resource: any
  /** @description 父权限ID */
  parentId: any
  /** @description 层级 */
  level: number
  /** @description 路由路径（菜单用） */
  path: any
  /** @description 图标（菜单用） */
  icon: any
  /** @description 排序号 */
  sort: number
  /** @description 是否可见 */
  visible: number
  /** @description 状态 */
  status: number
  /** @description 权限描述 */
  description: any
  /** @description 创建时间 */
  createdAt: string
  /** @description 更新时间 */
  updatedAt: string
}

/**
 * @description 获取权限详情
 * @param params GetPermissionsDetailRequestType
 * @returns Promise<GetPermissionsDetailResponseType>
 */
export async function getPermissionsDetailApi(
  params: GetPermissionsDetailRequestType
): Promise<GetPermissionsDetailResponseType> {
  const config: RequestConfig = {
    url: '/api/permissions/detail',
    method: 'GET',
    params,
  }
  return request<GetPermissionsDetailResponseType>(config)
}

/**
 * @description 获取权限树
 * @param params GetPermissionsTreeRequestType
 * @returns Promise<GetPermissionsTreeResponseType>
 */
export interface GetPermissionsTreeRequestType {
  /** @description  */
  Authorization?: string
}

/**
 * @description 获取权限树 的返回数据类型
 */
export interface GetPermissionsTreeResponseType {
  /** @description 响应数据数组 */
  data: PermissionTreeResponseDto[]
}

/**
 * @description 获取权限树
 * @param params GetPermissionsTreeRequestType
 * @returns Promise<GetPermissionsTreeResponseType>
 */
export async function getPermissionsTreeApi(
  params: GetPermissionsTreeRequestType
): Promise<GetPermissionsTreeResponseType> {
  const config: RequestConfig = {
    url: '/api/permissions/tree',
    method: 'GET',
    params,
  }
  return request<GetPermissionsTreeResponseType>(config)
}

/**
 * @description 获取菜单树
 * @param params GetPermissionsMenuTreeRequestType
 * @returns Promise<GetPermissionsMenuTreeResponseType>
 */
export interface GetPermissionsMenuTreeRequestType {
  /** @description  */
  Authorization?: string
}

/**
 * @description 获取菜单树 的返回数据类型
 */
export interface GetPermissionsMenuTreeResponseType {
  /** @description 响应数据数组 */
  data: PermissionMenuTreeDto[]
}

/**
 * @description 获取菜单树
 * @param params GetPermissionsMenuTreeRequestType
 * @returns Promise<GetPermissionsMenuTreeResponseType>
 */
export async function getPermissionsMenuTreeApi(
  params: GetPermissionsMenuTreeRequestType
): Promise<GetPermissionsMenuTreeResponseType> {
  const config: RequestConfig = {
    url: '/api/permissions/menu-tree',
    method: 'GET',
    params,
  }
  return request<GetPermissionsMenuTreeResponseType>(config)
}

/**
 * @description 获取一级菜单
 * @param params GetPermissionsLevel1RequestType
 * @returns Promise<GetPermissionsLevel1ResponseType>
 */
export interface GetPermissionsLevel1RequestType {
  /** @description  */
  Authorization?: string
}

/**
 * @description 获取一级菜单 的返回数据类型
 */
export interface GetPermissionsLevel1ResponseType {
  /** @description 响应数据数组 */
  data: PermissionResponseDto[]
}

/**
 * @description 获取一级菜单
 * @param params GetPermissionsLevel1RequestType
 * @returns Promise<GetPermissionsLevel1ResponseType>
 */
export async function getPermissionsLevel1Api(
  params: GetPermissionsLevel1RequestType
): Promise<GetPermissionsLevel1ResponseType> {
  const config: RequestConfig = {
    url: '/api/permissions/level-1',
    method: 'GET',
    params,
  }
  return request<GetPermissionsLevel1ResponseType>(config)
}

/**
 * @description 按层级获取权限
 * @param params GetPermissionsByLevelRequestType
 * @returns Promise<GetPermissionsByLevelResponseType>
 */
export interface GetPermissionsByLevelRequestType {
  /** @description 层级（0-3） */
  level: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 按层级获取权限 的返回数据类型
 */
export interface GetPermissionsByLevelResponseType {
  /** @description 响应数据数组 */
  data: PermissionResponseDto[]
}

/**
 * @description 按层级获取权限
 * @param params GetPermissionsByLevelRequestType
 * @returns Promise<GetPermissionsByLevelResponseType>
 */
export async function getPermissionsByLevelApi(
  params: GetPermissionsByLevelRequestType
): Promise<GetPermissionsByLevelResponseType> {
  const config: RequestConfig = {
    url: '/api/permissions/by-level',
    method: 'GET',
    params,
  }
  return request<GetPermissionsByLevelResponseType>(config)
}

/**
 * @description 获取菜单下的按钮
 * @param params GetPermissionsButtonsByMenuIdRequestType
 * @returns Promise<GetPermissionsButtonsByMenuIdResponseType>
 */
export interface GetPermissionsButtonsByMenuIdRequestType {
  /** @description  */
  menuId: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 获取菜单下的按钮 的返回数据类型
 */
export interface GetPermissionsButtonsByMenuIdResponseType {
  /** @description 响应数据数组 */
  data: PermissionResponseDto[]
}

/**
 * @description 获取菜单下的按钮
 * @param params GetPermissionsButtonsByMenuIdRequestType
 * @returns Promise<GetPermissionsButtonsByMenuIdResponseType>
 */
export async function getPermissionsButtonsBy_1Api(
  params: GetPermissionsButtonsByMenuIdRequestType
): Promise<GetPermissionsButtonsByMenuIdResponseType> {
  const config: RequestConfig = {
    url: '/api/permissions/{menuId}/buttons',
    method: 'GET',
    params,
  }
  return request<GetPermissionsButtonsByMenuIdResponseType>(config)
}
