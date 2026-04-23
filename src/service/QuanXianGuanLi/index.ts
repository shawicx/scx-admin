import { RequestConfig, request } from '@/service/request'
import type {
  PermissionResponseDto,
  PermissionTreeResponseDto,
  PermissionMenuTreeDto,
} from '@/service/types'

/**
 * @description 创建权限
 * @param params PostPermissionsRequestType
 * @returns Promise<PostPermissionsResult>
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
export interface PostPermissionsResult {
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
 * @returns Promise<PostPermissionsResult>
 */
export async function postPermissionsFunc(
  params: PostPermissionsRequestType
): Promise<PostPermissionsResult> {
  const config: RequestConfig = {
    url: '/api/permissions',
    method: 'POST',
    data: params,
  }
  return request<PostPermissionsResult>(config)
}

/**
 * @description 获取权限列表
 * @param params GetPermissionsRequestType
 * @returns Promise<GetPermissionsResult>
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
export interface GetPermissionsResult {
  /** @description  */
  list: PermissionResponseDto[]
  /** @description 总数量 */
  total: number
}

/**
 * @description 获取权限列表
 * @param params GetPermissionsRequestType
 * @returns Promise<GetPermissionsResult>
 */
export async function getPermissionsFunc(
  params: GetPermissionsRequestType
): Promise<GetPermissionsResult> {
  const config: RequestConfig = {
    url: '/api/permissions',
    method: 'GET',
    params,
  }
  return request<GetPermissionsResult>(config)
}

/**
 * @description 更新权限
 * @param params PutPermissionsRequestType
 * @returns Promise<PutPermissionsResult>
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
export interface PutPermissionsResult {
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
 * @returns Promise<PutPermissionsResult>
 */
export async function putPermissionsFunc(
  params: PutPermissionsRequestType
): Promise<PutPermissionsResult> {
  const config: RequestConfig = {
    url: '/api/permissions',
    method: 'PUT',
    data: params,
  }
  return request<PutPermissionsResult>(config)
}

/**
 * @description 删除权限
 * @param params DeletePermissionsRequestType
 * @returns Promise<DeletePermissionsResult>
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
export interface DeletePermissionsResult {
  /** @description 响应数据 */
  data: any
}

/**
 * @description 删除权限
 * @param params DeletePermissionsRequestType
 * @returns Promise<DeletePermissionsResult>
 */
export async function deletePermissionsFunc(
  params: DeletePermissionsRequestType
): Promise<DeletePermissionsResult> {
  const config: RequestConfig = {
    url: '/api/permissions',
    method: 'DELETE',
    params,
  }
  return request<DeletePermissionsResult>(config)
}

/**
 * @description 搜索权限
 * @param params GetPermissionsSearchRequestType
 * @returns Promise<GetPermissionsSearchResult>
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
export interface GetPermissionsSearchResult {
  /** @description 响应数据数组 */
  data: PermissionResponseDto[]
}

/**
 * @description 搜索权限
 * @param params GetPermissionsSearchRequestType
 * @returns Promise<GetPermissionsSearchResult>
 */
export async function getPermissionsSearchFunc(
  params: GetPermissionsSearchRequestType
): Promise<GetPermissionsSearchResult> {
  const config: RequestConfig = {
    url: '/api/permissions/search',
    method: 'GET',
    params,
  }
  return request<GetPermissionsSearchResult>(config)
}

/**
 * @description 获取所有动作
 * @param params GetPermissionsActionsRequestType
 * @returns Promise<GetPermissionsActionsResult>
 */
export interface GetPermissionsActionsRequestType {
  /** @description  */
  Authorization?: string
}

/**
 * @description 获取所有动作 的返回数据类型
 */
export interface GetPermissionsActionsResult {
  /** @description 响应数据数组 */
  data: string[]
}

/**
 * @description 获取所有动作
 * @param params GetPermissionsActionsRequestType
 * @returns Promise<GetPermissionsActionsResult>
 */
export async function getPermissionsActionsFunc(
  params: GetPermissionsActionsRequestType
): Promise<GetPermissionsActionsResult> {
  const config: RequestConfig = {
    url: '/api/permissions/actions',
    method: 'GET',
    params,
  }
  return request<GetPermissionsActionsResult>(config)
}

/**
 * @description 获取所有资源
 * @param params GetPermissionsResourcesRequestType
 * @returns Promise<GetPermissionsResourcesResult>
 */
export interface GetPermissionsResourcesRequestType {
  /** @description  */
  Authorization?: string
}

/**
 * @description 获取所有资源 的返回数据类型
 */
export interface GetPermissionsResourcesResult {
  /** @description 响应数据数组 */
  data: string[]
}

/**
 * @description 获取所有资源
 * @param params GetPermissionsResourcesRequestType
 * @returns Promise<GetPermissionsResourcesResult>
 */
export async function getPermissionsResourcesFunc(
  params: GetPermissionsResourcesRequestType
): Promise<GetPermissionsResourcesResult> {
  const config: RequestConfig = {
    url: '/api/permissions/resources',
    method: 'GET',
    params,
  }
  return request<GetPermissionsResourcesResult>(config)
}

/**
 * @description 根据动作获取权限
 * @param params GetPermissionsByActionRequestType
 * @returns Promise<GetPermissionsByActionResult>
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
export interface GetPermissionsByActionResult {
  /** @description 响应数据数组 */
  data: PermissionResponseDto[]
}

/**
 * @description 根据动作获取权限
 * @param params GetPermissionsByActionRequestType
 * @returns Promise<GetPermissionsByActionResult>
 */
export async function getPermissionsByActionFunc(
  params: GetPermissionsByActionRequestType
): Promise<GetPermissionsByActionResult> {
  const config: RequestConfig = {
    url: '/api/permissions/by-action',
    method: 'GET',
    params,
  }
  return request<GetPermissionsByActionResult>(config)
}

/**
 * @description 根据资源获取权限
 * @param params GetPermissionsByResourceRequestType
 * @returns Promise<GetPermissionsByResourceResult>
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
export interface GetPermissionsByResourceResult {
  /** @description 响应数据数组 */
  data: PermissionResponseDto[]
}

/**
 * @description 根据资源获取权限
 * @param params GetPermissionsByResourceRequestType
 * @returns Promise<GetPermissionsByResourceResult>
 */
export async function getPermissionsByResourceFunc(
  params: GetPermissionsByResourceRequestType
): Promise<GetPermissionsByResourceResult> {
  const config: RequestConfig = {
    url: '/api/permissions/by-resource',
    method: 'GET',
    params,
  }
  return request<GetPermissionsByResourceResult>(config)
}

/**
 * @description 获取权限详情
 * @param params GetPermissionsDetailRequestType
 * @returns Promise<GetPermissionsDetailResult>
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
export interface GetPermissionsDetailResult {
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
 * @returns Promise<GetPermissionsDetailResult>
 */
export async function getPermissionsDetailFunc(
  params: GetPermissionsDetailRequestType
): Promise<GetPermissionsDetailResult> {
  const config: RequestConfig = {
    url: '/api/permissions/detail',
    method: 'GET',
    params,
  }
  return request<GetPermissionsDetailResult>(config)
}

/**
 * @description 获取权限树
 * @param params GetPermissionsTreeRequestType
 * @returns Promise<GetPermissionsTreeResult>
 */
export interface GetPermissionsTreeRequestType {
  /** @description  */
  Authorization?: string
}

/**
 * @description 获取权限树 的返回数据类型
 */
export interface GetPermissionsTreeResult {
  /** @description 响应数据数组 */
  data: PermissionTreeResponseDto[]
}

/**
 * @description 获取权限树
 * @param params GetPermissionsTreeRequestType
 * @returns Promise<GetPermissionsTreeResult>
 */
export async function getPermissionsTreeFunc(
  params: GetPermissionsTreeRequestType
): Promise<GetPermissionsTreeResult> {
  const config: RequestConfig = {
    url: '/api/permissions/tree',
    method: 'GET',
    params,
  }
  return request<GetPermissionsTreeResult>(config)
}

/**
 * @description 获取菜单树
 * @param params GetPermissionsMenuTreeRequestType
 * @returns Promise<GetPermissionsMenuTreeResult>
 */
export interface GetPermissionsMenuTreeRequestType {
  /** @description  */
  Authorization?: string
}

/**
 * @description 获取菜单树 的返回数据类型
 */
export interface GetPermissionsMenuTreeResult {
  /** @description 响应数据数组 */
  data: PermissionMenuTreeDto[]
}

/**
 * @description 获取菜单树
 * @param params GetPermissionsMenuTreeRequestType
 * @returns Promise<GetPermissionsMenuTreeResult>
 */
export async function getPermissionsMenuTreeFunc(
  params: GetPermissionsMenuTreeRequestType
): Promise<GetPermissionsMenuTreeResult> {
  const config: RequestConfig = {
    url: '/api/permissions/menu-tree',
    method: 'GET',
    params,
  }
  return request<GetPermissionsMenuTreeResult>(config)
}

/**
 * @description 获取一级菜单
 * @param params GetPermissionsLevel1RequestType
 * @returns Promise<GetPermissionsLevel1Result>
 */
export interface GetPermissionsLevel1RequestType {
  /** @description  */
  Authorization?: string
}

/**
 * @description 获取一级菜单 的返回数据类型
 */
export interface GetPermissionsLevel1Result {
  /** @description 响应数据数组 */
  data: PermissionResponseDto[]
}

/**
 * @description 获取一级菜单
 * @param params GetPermissionsLevel1RequestType
 * @returns Promise<GetPermissionsLevel1Result>
 */
export async function getPermissionsLevel1Func(
  params: GetPermissionsLevel1RequestType
): Promise<GetPermissionsLevel1Result> {
  const config: RequestConfig = {
    url: '/api/permissions/level-1',
    method: 'GET',
    params,
  }
  return request<GetPermissionsLevel1Result>(config)
}

/**
 * @description 按层级获取权限
 * @param params GetPermissionsByLevelRequestType
 * @returns Promise<GetPermissionsByLevelResult>
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
export interface GetPermissionsByLevelResult {
  /** @description 响应数据数组 */
  data: PermissionResponseDto[]
}

/**
 * @description 按层级获取权限
 * @param params GetPermissionsByLevelRequestType
 * @returns Promise<GetPermissionsByLevelResult>
 */
export async function getPermissionsByLevelFunc(
  params: GetPermissionsByLevelRequestType
): Promise<GetPermissionsByLevelResult> {
  const config: RequestConfig = {
    url: '/api/permissions/by-level',
    method: 'GET',
    params,
  }
  return request<GetPermissionsByLevelResult>(config)
}

/**
 * @description 获取菜单下的按钮
 * @param params GetPermissionsButtonsByMenuIdRequestType
 * @returns Promise<GetPermissionsButtonsByMenuIdResult>
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
export interface GetPermissionsButtonsByMenuIdResult {
  /** @description 响应数据数组 */
  data: PermissionResponseDto[]
}

/**
 * @description 获取菜单下的按钮
 * @param params GetPermissionsButtonsByMenuIdRequestType
 * @returns Promise<GetPermissionsButtonsByMenuIdResult>
 */
export async function getPermissionsButtonsBy_1Func(
  params: GetPermissionsButtonsByMenuIdRequestType
): Promise<GetPermissionsButtonsByMenuIdResult> {
  const config: RequestConfig = {
    url: '/api/permissions/{menuId}/buttons',
    method: 'GET',
    params,
  }
  return request<GetPermissionsButtonsByMenuIdResult>(config)
}
