import { RequestConfig, request } from '@/service/request'
import type {
  PermissionResponseDto,
  PermissionTreeResponseDto,
  PermissionMenuTreeDto,
} from '@/service/rbac/types'

/**
 * @description 更新权限
 * @param params PutApiPermissionsUpdateRequestType
 * @returns Promise<PutApiPermissionsUpdateResultType>
 */
export interface PutApiPermissionsUpdateRequestType {
  /** @description 权限 ID */
  id: string
  /** @description 权限名称（2-100 字符） */
  name?: string | null
  /** @description 权限类型（MENU / BUTTON） */
  type?: string | null
  /** @description 操作动作（2-50 字符） */
  action?: string | null
  /** @description 资源名称（2-100 字符） */
  resource?: string | null
  /** @description 父权限 ID */
  parentId?: string | null
  /** @description 路由路径（最长 200 字符） */
  path?: string | null
  /** @description 图标（最长 100 字符） */
  icon?: string | null
  /** @description 排序号（≥0） */
  sort?: number | null
  /** @description 是否可见（0 / 1） */
  visible?: number | null
  /** @description 状态（0 / 1） */
  status?: number | null
  /** @description 权限描述（最长 255 字符） */
  description?: string | null
}

/**
 * @description 更新权限 的返回数据类型
 */
export interface PutApiPermissionsUpdateResultType {
  /** @description 权限 ID */
  id: string
  /** @description 权限名称 */
  name: string
  /** @description 权限类型（MENU / BUTTON） */
  type: string
  /** @description 操作动作 */
  action: string | null
  /** @description 资源名称 */
  resource: string | null
  /** @description 父权限 ID */
  parentId: string | null
  /** @description 层级 */
  level: number
  /** @description 路由路径 */
  path: string | null
  /** @description 图标 */
  icon: string | null
  /** @description 排序号 */
  sort: number
  /** @description 是否可见（0 / 1） */
  visible: number
  /** @description 状态（0 / 1） */
  status: number
  /** @description 权限描述 */
  description: string | null
  /** @description 创建时间 */
  createdAt: string
  /** @description 更新时间 */
  updatedAt: string
}

/**
 * @description 更新权限
 * @param params PutApiPermissionsUpdateRequestType
 * @returns Promise<PutApiPermissionsUpdateResultType>
 */
export async function putApiPermissionsUpdateFunc(
  params: PutApiPermissionsUpdateRequestType
): Promise<PutApiPermissionsUpdateResultType> {
  const config: RequestConfig = {
    url: '/api/permissions/update',
    method: 'PUT',
    data: params,
  }
  return request<PutApiPermissionsUpdateResultType>(config)
}

/**
 * @description 创建权限
 * @param params PostApiPermissionsCreateRequestType
 * @returns Promise<PostApiPermissionsCreateResultType>
 */
export interface PostApiPermissionsCreateRequestType {
  /** @description 权限名称（2-100 字符） */
  name: string
  /** @description 权限类型（MENU 菜单 / BUTTON 按钮） */
  type: string
  /** @description 操作动作（按钮类型，2-50 字符） */
  action?: string | null
  /** @description 资源名称（按钮类型，2-100 字符） */
  resource?: string | null
  /** @description 父权限 ID（自引用树） */
  parentId?: string | null
  /** @description 路由路径（菜单类型，最长 200 字符） */
  path?: string | null
  /** @description 图标（菜单类型，最长 100 字符） */
  icon?: string | null
  /** @description 排序号（升序，≥0） */
  sort?: number | null
  /** @description 是否可见（0 隐藏 / 1 显示） */
  visible?: number | null
  /** @description 状态（0 停用 / 1 启用） */
  status?: number | null
  /** @description 权限描述（最长 255 字符） */
  description?: string | null
}

/**
 * @description 创建权限 的返回数据类型
 */
export interface PostApiPermissionsCreateResultType {
  /** @description 权限 ID */
  id: string
  /** @description 权限名称 */
  name: string
  /** @description 权限类型（MENU / BUTTON） */
  type: string
  /** @description 操作动作 */
  action: string | null
  /** @description 资源名称 */
  resource: string | null
  /** @description 父权限 ID */
  parentId: string | null
  /** @description 层级 */
  level: number
  /** @description 路由路径 */
  path: string | null
  /** @description 图标 */
  icon: string | null
  /** @description 排序号 */
  sort: number
  /** @description 是否可见（0 / 1） */
  visible: number
  /** @description 状态（0 / 1） */
  status: number
  /** @description 权限描述 */
  description: string | null
  /** @description 创建时间 */
  createdAt: string
  /** @description 更新时间 */
  updatedAt: string
}

/**
 * @description 创建权限
 * @param params PostApiPermissionsCreateRequestType
 * @returns Promise<PostApiPermissionsCreateResultType>
 */
export async function postApiPermissionsCreateFunc(
  params: PostApiPermissionsCreateRequestType
): Promise<PostApiPermissionsCreateResultType> {
  const config: RequestConfig = {
    url: '/api/permissions/create',
    method: 'POST',
    data: params,
  }
  return request<PostApiPermissionsCreateResultType>(config)
}

/**
 * @description 菜单下的按钮
 * @param params GetApiPermissionsButtonsByMenuIdRequestType
 * @returns Promise<GetApiPermissionsButtonsByMenuIdResultType>
 */
export interface GetApiPermissionsButtonsByMenuIdRequestType {
  /** @description 菜单 ID */
  menuId: string
}

/**
 * @description 菜单下的按钮 的返回数据类型
 */
export interface GetApiPermissionsButtonsByMenuIdResultType {
  /** @description 响应数据数组 */
  data: PermissionResponseDto[]
}

/**
 * @description 菜单下的按钮
 * @param params GetApiPermissionsButtonsByMenuIdRequestType
 * @returns Promise<GetApiPermissionsButtonsByMenuIdResultType>
 */
export async function getApiPermissionsButtonsByMenuIdFunc(
  params: GetApiPermissionsButtonsByMenuIdRequestType
): Promise<GetApiPermissionsButtonsByMenuIdResultType> {
  const config: RequestConfig = {
    url: `/api/permissions/${params.menuId}/buttons`,
    method: 'GET',
    params,
  }
  return request<GetApiPermissionsButtonsByMenuIdResultType>(config)
}

/**
 * @description 权限树
 * @param params GetApiPermissionsTreeRequestType
 * @returns Promise<GetApiPermissionsTreeResultType>
 */
export interface GetApiPermissionsTreeRequestType {}

/**
 * @description 权限树 的返回数据类型
 */
export interface GetApiPermissionsTreeResultType {
  /** @description 响应数据数组 */
  data: PermissionTreeResponseDto[]
}

/**
 * @description 权限树
 * @param params GetApiPermissionsTreeRequestType
 * @returns Promise<GetApiPermissionsTreeResultType>
 */
export async function getApiPermissionsTreeFunc(
  params: GetApiPermissionsTreeRequestType
): Promise<GetApiPermissionsTreeResultType> {
  const config: RequestConfig = {
    url: '/api/permissions/tree',
    method: 'GET',
    params,
  }
  return request<GetApiPermissionsTreeResultType>(config)
}

/**
 * @description 权限搜索
 * @param params GetApiPermissionsSearchRequestType
 * @returns Promise<GetApiPermissionsSearchResultType>
 */
export interface GetApiPermissionsSearchRequestType {
  /** @description 搜索关键字 */
  keyword: string
  /** @description 最大返回条数 */
  limit?: string
}

/**
 * @description 权限搜索 的返回数据类型
 */
export interface GetApiPermissionsSearchResultType {
  /** @description 响应数据数组 */
  data: PermissionResponseDto[]
}

/**
 * @description 权限搜索
 * @param params GetApiPermissionsSearchRequestType
 * @returns Promise<GetApiPermissionsSearchResultType>
 */
export async function getApiPermissionsSearchFunc(
  params: GetApiPermissionsSearchRequestType
): Promise<GetApiPermissionsSearchResultType> {
  const config: RequestConfig = {
    url: '/api/permissions/search',
    method: 'GET',
    params,
  }
  return request<GetApiPermissionsSearchResultType>(config)
}

/**
 * @description 查询所有资源
 * @param params GetApiPermissionsResourcesRequestType
 * @returns Promise<GetApiPermissionsResourcesResultType>
 */
export interface GetApiPermissionsResourcesRequestType {}

/**
 * @description 查询所有资源 的返回数据类型
 */
export interface GetApiPermissionsResourcesResultType {
  /** @description 响应数据数组 */
  data: string[]
}

/**
 * @description 查询所有资源
 * @param params GetApiPermissionsResourcesRequestType
 * @returns Promise<GetApiPermissionsResourcesResultType>
 */
export async function getApiPermissionsResourcesFunc(
  params: GetApiPermissionsResourcesRequestType
): Promise<GetApiPermissionsResourcesResultType> {
  const config: RequestConfig = {
    url: '/api/permissions/resources',
    method: 'GET',
    params,
  }
  return request<GetApiPermissionsResourcesResultType>(config)
}

/**
 * @description 菜单树
 * @param params GetApiPermissionsMenuTreeRequestType
 * @returns Promise<GetApiPermissionsMenuTreeResultType>
 */
export interface GetApiPermissionsMenuTreeRequestType {}

/**
 * @description 菜单树 的返回数据类型
 */
export interface GetApiPermissionsMenuTreeResultType {
  /** @description 响应数据数组 */
  data: PermissionMenuTreeDto[]
}

/**
 * @description 菜单树
 * @param params GetApiPermissionsMenuTreeRequestType
 * @returns Promise<GetApiPermissionsMenuTreeResultType>
 */
export async function getApiPermissionsMenuTreeFunc(
  params: GetApiPermissionsMenuTreeRequestType
): Promise<GetApiPermissionsMenuTreeResultType> {
  const config: RequestConfig = {
    url: '/api/permissions/menu-tree',
    method: 'GET',
    params,
  }
  return request<GetApiPermissionsMenuTreeResultType>(config)
}

/**
 * @description 权限分页列表
 * @param params GetApiPermissionsListRequestType
 * @returns Promise<GetApiPermissionsListResultType>
 */
export interface GetApiPermissionsListRequestType {
  /** @description 页码，从 1 开始 */
  page?: string
  /** @description 每页条数 */
  limit?: string
  /** @description 搜索关键字 */
  search?: string
  /** @description 按动作过滤 */
  action?: string
  /** @description 按资源过滤 */
  resource?: string
  /** @description 按类型过滤（MENU / BUTTON） */
  type?: string
  /** @description 按父节点过滤 */
  parentId?: string
  /** @description 按层级过滤 */
  level?: string
}

/**
 * @description 权限分页列表 的返回数据类型
 */
export interface GetApiPermissionsListResultType {}

/**
 * @description 权限分页列表
 * @param params GetApiPermissionsListRequestType
 * @returns Promise<GetApiPermissionsListResultType>
 */
export async function getApiPermissionsListFunc(
  params: GetApiPermissionsListRequestType
): Promise<GetApiPermissionsListResultType> {
  const config: RequestConfig = {
    url: '/api/permissions/list',
    method: 'GET',
    params,
  }
  return request<GetApiPermissionsListResultType>(config)
}

/**
 * @description 一级菜单
 * @param params GetApiPermissionsLevel1RequestType
 * @returns Promise<GetApiPermissionsLevel1ResultType>
 */
export interface GetApiPermissionsLevel1RequestType {}

/**
 * @description 一级菜单 的返回数据类型
 */
export interface GetApiPermissionsLevel1ResultType {
  /** @description 响应数据数组 */
  data: PermissionResponseDto[]
}

/**
 * @description 一级菜单
 * @param params GetApiPermissionsLevel1RequestType
 * @returns Promise<GetApiPermissionsLevel1ResultType>
 */
export async function getApiPermissionsLevel1Func(
  params: GetApiPermissionsLevel1RequestType
): Promise<GetApiPermissionsLevel1ResultType> {
  const config: RequestConfig = {
    url: '/api/permissions/level-1',
    method: 'GET',
    params,
  }
  return request<GetApiPermissionsLevel1ResultType>(config)
}

/**
 * @description 权限详情
 * @param params GetApiPermissionsDetailRequestType
 * @returns Promise<GetApiPermissionsDetailResultType>
 */
export interface GetApiPermissionsDetailRequestType {
  /** @description 权限 ID */
  id: string
}

/**
 * @description 权限详情 的返回数据类型
 */
export interface GetApiPermissionsDetailResultType {
  /** @description 权限 ID */
  id: string
  /** @description 权限名称 */
  name: string
  /** @description 权限类型（MENU / BUTTON） */
  type: string
  /** @description 操作动作 */
  action: string | null
  /** @description 资源名称 */
  resource: string | null
  /** @description 父权限 ID */
  parentId: string | null
  /** @description 层级 */
  level: number
  /** @description 路由路径 */
  path: string | null
  /** @description 图标 */
  icon: string | null
  /** @description 排序号 */
  sort: number
  /** @description 是否可见（0 / 1） */
  visible: number
  /** @description 状态（0 / 1） */
  status: number
  /** @description 权限描述 */
  description: string | null
  /** @description 创建时间 */
  createdAt: string
  /** @description 更新时间 */
  updatedAt: string
}

/**
 * @description 权限详情
 * @param params GetApiPermissionsDetailRequestType
 * @returns Promise<GetApiPermissionsDetailResultType>
 */
export async function getApiPermissionsDetailFunc(
  params: GetApiPermissionsDetailRequestType
): Promise<GetApiPermissionsDetailResultType> {
  const config: RequestConfig = {
    url: '/api/permissions/detail',
    method: 'GET',
    params,
  }
  return request<GetApiPermissionsDetailResultType>(config)
}

/**
 * @description 按资源查询权限
 * @param params GetApiPermissionsByResourceRequestType
 * @returns Promise<GetApiPermissionsByResourceResultType>
 */
export interface GetApiPermissionsByResourceRequestType {
  /** @description 资源名称 */
  resource: string
}

/**
 * @description 按资源查询权限 的返回数据类型
 */
export interface GetApiPermissionsByResourceResultType {
  /** @description 响应数据数组 */
  data: PermissionResponseDto[]
}

/**
 * @description 按资源查询权限
 * @param params GetApiPermissionsByResourceRequestType
 * @returns Promise<GetApiPermissionsByResourceResultType>
 */
export async function getApiPermissionsByResourceFunc(
  params: GetApiPermissionsByResourceRequestType
): Promise<GetApiPermissionsByResourceResultType> {
  const config: RequestConfig = {
    url: '/api/permissions/by-resource',
    method: 'GET',
    params,
  }
  return request<GetApiPermissionsByResourceResultType>(config)
}

/**
 * @description 按层级查询
 * @param params GetApiPermissionsByLevelRequestType
 * @returns Promise<GetApiPermissionsByLevelResultType>
 */
export interface GetApiPermissionsByLevelRequestType {
  /** @description 层级 */
  level: string
}

/**
 * @description 按层级查询 的返回数据类型
 */
export interface GetApiPermissionsByLevelResultType {
  /** @description 响应数据数组 */
  data: PermissionResponseDto[]
}

/**
 * @description 按层级查询
 * @param params GetApiPermissionsByLevelRequestType
 * @returns Promise<GetApiPermissionsByLevelResultType>
 */
export async function getApiPermissionsByLevelFunc(
  params: GetApiPermissionsByLevelRequestType
): Promise<GetApiPermissionsByLevelResultType> {
  const config: RequestConfig = {
    url: '/api/permissions/by-level',
    method: 'GET',
    params,
  }
  return request<GetApiPermissionsByLevelResultType>(config)
}

/**
 * @description 按动作查询权限
 * @param params GetApiPermissionsByActionRequestType
 * @returns Promise<GetApiPermissionsByActionResultType>
 */
export interface GetApiPermissionsByActionRequestType {
  /** @description 动作名称 */
  action: string
}

/**
 * @description 按动作查询权限 的返回数据类型
 */
export interface GetApiPermissionsByActionResultType {
  /** @description 响应数据数组 */
  data: PermissionResponseDto[]
}

/**
 * @description 按动作查询权限
 * @param params GetApiPermissionsByActionRequestType
 * @returns Promise<GetApiPermissionsByActionResultType>
 */
export async function getApiPermissionsByActionFunc(
  params: GetApiPermissionsByActionRequestType
): Promise<GetApiPermissionsByActionResultType> {
  const config: RequestConfig = {
    url: '/api/permissions/by-action',
    method: 'GET',
    params,
  }
  return request<GetApiPermissionsByActionResultType>(config)
}

/**
 * @description 查询所有动作
 * @param params GetApiPermissionsActionsRequestType
 * @returns Promise<GetApiPermissionsActionsResultType>
 */
export interface GetApiPermissionsActionsRequestType {}

/**
 * @description 查询所有动作 的返回数据类型
 */
export interface GetApiPermissionsActionsResultType {
  /** @description 响应数据数组 */
  data: string[]
}

/**
 * @description 查询所有动作
 * @param params GetApiPermissionsActionsRequestType
 * @returns Promise<GetApiPermissionsActionsResultType>
 */
export async function getApiPermissionsActionsFunc(
  params: GetApiPermissionsActionsRequestType
): Promise<GetApiPermissionsActionsResultType> {
  const config: RequestConfig = {
    url: '/api/permissions/actions',
    method: 'GET',
    params,
  }
  return request<GetApiPermissionsActionsResultType>(config)
}

/**
 * @description 删除权限
 * @param params DeleteApiPermissionsDeleteRequestType
 * @returns Promise<DeleteApiPermissionsDeleteResultType>
 */
export interface DeleteApiPermissionsDeleteRequestType {
  /** @description 权限 ID */
  id: string
}

/**
 * @description 删除权限 的返回数据类型
 */
export interface DeleteApiPermissionsDeleteResultType {
  /** @description  */
  message: string
}

/**
 * @description 删除权限
 * @param params DeleteApiPermissionsDeleteRequestType
 * @returns Promise<DeleteApiPermissionsDeleteResultType>
 */
export async function deleteApiPermissionsDeleteFunc(
  params: DeleteApiPermissionsDeleteRequestType
): Promise<DeleteApiPermissionsDeleteResultType> {
  const config: RequestConfig = {
    url: '/api/permissions/delete',
    method: 'DELETE',
    params,
  }
  return request<DeleteApiPermissionsDeleteResultType>(config)
}
