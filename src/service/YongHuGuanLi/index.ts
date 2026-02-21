import { RequestConfig, request } from '@/service/request'
import type {
  UserRoleResponseDto,
  Role,
  UserListItemDto,
} from '@/service/types'

/**
 * @description 用户注册
 * @param params PostUsersRegisterRequestType
 * @returns Promise<PostUsersRegisterResponseType>
 */
export interface PostUsersRegisterRequestType {
  /** @description 用户邮箱 */
  email: string
  /** @description 用户名称 */
  name: string
  /** @description 密码 */
  password: string
  /** @description 邮箱验证码 */
  emailVerificationCode: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 用户注册 的返回数据类型
 */
export interface PostUsersRegisterResponseType {
  /** @description 用户ID */
  id: string
  /** @description 用户邮箱 */
  email: string
  /** @description 用户名称 */
  name: string
  /** @description 邮箱是否已验证 */
  emailVerified: boolean
  /** @description 用户偏好设置 */
  preferences: Record<string, any>
  /** @description 最后登录IP */
  lastLoginIp: string
  /** @description 最后登录时间 */
  lastLoginAt: string
  /** @description 登录次数 */
  loginCount: number
  /** @description 账户是否激活 */
  isActive: boolean
  /** @description 创建时间 */
  createdAt: string
  /** @description 更新时间 */
  updatedAt: string
}

/**
 * @description 用户注册
 * @param params PostUsersRegisterRequestType
 * @returns Promise<PostUsersRegisterResponseType>
 */
export async function postUsersRegisterApi(
  params: PostUsersRegisterRequestType
): Promise<PostUsersRegisterResponseType> {
  const config: RequestConfig = {
    url: '/api/users/register',
    method: 'POST',
    data: params,
  }
  return request<PostUsersRegisterResponseType>(config)
}

/**
 * @description 邮箱验证码登录
 * @param params PostUsersLoginRequestType
 * @returns Promise<PostUsersLoginResponseType>
 */
export interface PostUsersLoginRequestType {
  /** @description 邮箱地址 */
  email: string
  /** @description 邮箱验证码 */
  emailVerificationCode: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 邮箱验证码登录 的返回数据类型
 */
export interface PostUsersLoginResponseType {
  /** @description 用户ID */
  id: string
  /** @description 邮箱地址 */
  email: string
  /** @description 用户名 */
  name: string
  /** @description 邮箱是否已验证 */
  emailVerified: boolean
  /** @description 用户偏好设置 */
  preferences: Record<string, any>
  /** @description 上次登录时间 */
  lastLoginAt: string
  /** @description 登录次数 */
  loginCount: number
  /** @description 访问令牌 */
  accessToken: string
  /** @description 刷新令牌 */
  refreshToken: string
}

/**
 * @description 邮箱验证码登录
 * @param params PostUsersLoginRequestType
 * @returns Promise<PostUsersLoginResponseType>
 */
export async function postUsersLoginApi(
  params: PostUsersLoginRequestType
): Promise<PostUsersLoginResponseType> {
  const config: RequestConfig = {
    url: '/api/users/login',
    method: 'POST',
    data: params,
  }
  return request<PostUsersLoginResponseType>(config)
}

/**
 * @description 密码登录
 * @param params PostUsersLoginPasswordRequestType
 * @returns Promise<PostUsersLoginPasswordResponseType>
 */
export interface PostUsersLoginPasswordRequestType {
  /** @description 邮箱地址 */
  email: string
  /** @description 密码 */
  password: string
  /** @description 加密密钥ID（必需，用于解密密码） */
  keyId: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 密码登录 的返回数据类型
 */
export interface PostUsersLoginPasswordResponseType {
  /** @description 用户ID */
  id: string
  /** @description 邮箱地址 */
  email: string
  /** @description 用户名 */
  name: string
  /** @description 邮箱是否已验证 */
  emailVerified: boolean
  /** @description 用户偏好设置 */
  preferences: Record<string, any>
  /** @description 上次登录时间 */
  lastLoginAt: string
  /** @description 登录次数 */
  loginCount: number
  /** @description 访问令牌 */
  accessToken: string
  /** @description 刷新令牌 */
  refreshToken: string
}

/**
 * @description 密码登录
 * @param params PostUsersLoginPasswordRequestType
 * @returns Promise<PostUsersLoginPasswordResponseType>
 */
export async function postUsersLoginPasswordApi(
  params: PostUsersLoginPasswordRequestType
): Promise<PostUsersLoginPasswordResponseType> {
  const config: RequestConfig = {
    url: '/api/users/login-password',
    method: 'POST',
    data: params,
  }
  return request<PostUsersLoginPasswordResponseType>(config)
}

/**
 * @description 用户登出
 * @param params PostUsersLogoutRequestType
 * @returns Promise<PostUsersLogoutResponseType>
 */
export interface PostUsersLogoutRequestType {
  /** @description  */
  userId: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 用户登出 的返回数据类型
 */
export interface PostUsersLogoutResponseType {
  /** @description  */
  message: string
}

/**
 * @description 用户登出
 * @param params PostUsersLogoutRequestType
 * @returns Promise<PostUsersLogoutResponseType>
 */
export async function postUsersLogoutApi(
  params: PostUsersLogoutRequestType
): Promise<PostUsersLogoutResponseType> {
  const config: RequestConfig = {
    url: '/api/users/logout',
    method: 'POST',
    params,
  }
  return request<PostUsersLogoutResponseType>(config)
}

/**
 * @description 刷新访问令牌
 * @param params PostUsersRefreshTokenRequestType
 * @returns Promise<PostUsersRefreshTokenResponseType>
 */
export interface PostUsersRefreshTokenRequestType {
  /** @description 刷新令牌 */
  refreshToken: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 刷新访问令牌 的返回数据类型
 */
export interface PostUsersRefreshTokenResponseType {
  /** @description 新的访问令牌 */
  accessToken: string
  /** @description 新的刷新令牌 */
  refreshToken: string
}

/**
 * @description 刷新访问令牌
 * @param params PostUsersRefreshTokenRequestType
 * @returns Promise<PostUsersRefreshTokenResponseType>
 */
export async function postUsersRefreshTokenApi(
  params: PostUsersRefreshTokenRequestType
): Promise<PostUsersRefreshTokenResponseType> {
  const config: RequestConfig = {
    url: '/api/users/refresh-token',
    method: 'POST',
    data: params,
  }
  return request<PostUsersRefreshTokenResponseType>(config)
}

/**
 * @description 获取加密密钥
 * @param params GetUsersEncryptionKeyRequestType
 * @returns Promise<GetUsersEncryptionKeyResponseType>
 */
export interface GetUsersEncryptionKeyRequestType {
  /** @description  */
  Authorization?: string
}

/**
 * @description 获取加密密钥 的返回数据类型
 */
export interface GetUsersEncryptionKeyResponseType {
  /** @description 加密密钥 */
  key: string
  /** @description 密钥ID */
  keyId: string
}

/**
 * @description 获取加密密钥
 * @param params GetUsersEncryptionKeyRequestType
 * @returns Promise<GetUsersEncryptionKeyResponseType>
 */
export async function getUsersEncryptionKeyApi(
  params: GetUsersEncryptionKeyRequestType
): Promise<GetUsersEncryptionKeyResponseType> {
  const config: RequestConfig = {
    url: '/api/users/encryption-key',
    method: 'GET',
    params,
  }
  return request<GetUsersEncryptionKeyResponseType>(config)
}

/**
 * @description 发送登录验证码
 * @param params PostUsersSendLoginCodeRequestType
 * @returns Promise<PostUsersSendLoginCodeResponseType>
 */
export interface PostUsersSendLoginCodeRequestType {
  /** @description 邮箱地址 */
  email: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 发送登录验证码 的返回数据类型
 */
export interface PostUsersSendLoginCodeResponseType {
  /** @description  */
  message: string
}

/**
 * @description 发送登录验证码
 * @param params PostUsersSendLoginCodeRequestType
 * @returns Promise<PostUsersSendLoginCodeResponseType>
 */
export async function postUsersSendLoginCodeApi(
  params: PostUsersSendLoginCodeRequestType
): Promise<PostUsersSendLoginCodeResponseType> {
  const config: RequestConfig = {
    url: '/api/users/send-login-code',
    method: 'POST',
    data: params,
  }
  return request<PostUsersSendLoginCodeResponseType>(config)
}

/**
 * @description 发送邮箱验证码
 * @param params PostUsersSendEmailCodeRequestType
 * @returns Promise<PostUsersSendEmailCodeResponseType>
 */
export interface PostUsersSendEmailCodeRequestType {
  /** @description 邮箱地址 */
  email: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 发送邮箱验证码 的返回数据类型
 */
export interface PostUsersSendEmailCodeResponseType {
  /** @description  */
  message: string
}

/**
 * @description 发送邮箱验证码
 * @param params PostUsersSendEmailCodeRequestType
 * @returns Promise<PostUsersSendEmailCodeResponseType>
 */
export async function postUsersSendEmailCodeApi(
  params: PostUsersSendEmailCodeRequestType
): Promise<PostUsersSendEmailCodeResponseType> {
  const config: RequestConfig = {
    url: '/api/users/send-email-code',
    method: 'POST',
    data: params,
  }
  return request<PostUsersSendEmailCodeResponseType>(config)
}

/**
 * @description 为用户分配角色
 * @param params PostUsersAssignRoleRequestType
 * @returns Promise<PostUsersAssignRoleResponseType>
 */
export interface PostUsersAssignRoleRequestType {
  /** @description 角色ID */
  roleId: string
  /** @description 用户ID */
  userId: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 为用户分配角色 的返回数据类型
 */
export interface PostUsersAssignRoleResponseType {
  /** @description 用户角色关系ID */
  id: string
  /** @description 用户ID */
  userId: string
  /** @description 角色ID */
  roleId: string
  /** @description 创建时间 */
  createdAt: string
}

/**
 * @description 为用户分配角色
 * @param params PostUsersAssignRoleRequestType
 * @returns Promise<PostUsersAssignRoleResponseType>
 */
export async function postUsersAssignRoleApi(
  params: PostUsersAssignRoleRequestType
): Promise<PostUsersAssignRoleResponseType> {
  const config: RequestConfig = {
    url: '/api/users/assign-role',
    method: 'POST',
    data: params,
  }
  return request<PostUsersAssignRoleResponseType>(config)
}

/**
 * @description 为用户批量分配角色
 * @param params PostUsersAssignRolesBatchRequestType
 * @returns Promise<PostUsersAssignRolesBatchResponseType>
 */
export interface PostUsersAssignRolesBatchRequestType {
  /** @description 角色ID列表 */
  roleIds: string[]
  /** @description 用户ID */
  userId: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 为用户批量分配角色 的返回数据类型
 */
export interface PostUsersAssignRolesBatchResponseType {
  /** @description 响应数据数组 */
  data: UserRoleResponseDto[]
}

/**
 * @description 为用户批量分配角色
 * @param params PostUsersAssignRolesBatchRequestType
 * @returns Promise<PostUsersAssignRolesBatchResponseType>
 */
export async function postUsersAssignRolesBatchApi(
  params: PostUsersAssignRolesBatchRequestType
): Promise<PostUsersAssignRolesBatchResponseType> {
  const config: RequestConfig = {
    url: '/api/users/assign-roles-batch',
    method: 'POST',
    data: params,
  }
  return request<PostUsersAssignRolesBatchResponseType>(config)
}

/**
 * @description 移除用户角色
 * @param params DeleteUsersRemoveRoleRequestType
 * @returns Promise<DeleteUsersRemoveRoleResponseType>
 */
export interface DeleteUsersRemoveRoleRequestType {
  /** @description 用户ID */
  id: string
  /** @description 角色ID */
  roleId: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 移除用户角色 的返回数据类型
 */
export interface DeleteUsersRemoveRoleResponseType {
  /** @description 响应数据 */
  data: any
}

/**
 * @description 移除用户角色
 * @param params DeleteUsersRemoveRoleRequestType
 * @returns Promise<DeleteUsersRemoveRoleResponseType>
 */
export async function deleteUsersRemoveRoleApi(
  params: DeleteUsersRemoveRoleRequestType
): Promise<DeleteUsersRemoveRoleResponseType> {
  const config: RequestConfig = {
    url: '/api/users/remove-role',
    method: 'DELETE',
    params,
  }
  return request<DeleteUsersRemoveRoleResponseType>(config)
}

/**
 * @description 获取用户角色
 * @param params GetUsersRolesRequestType
 * @returns Promise<GetUsersRolesResponseType>
 */
export interface GetUsersRolesRequestType {
  /** @description 用户ID */
  id: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 获取用户角色 的返回数据类型
 */
export interface GetUsersRolesResponseType {
  /** @description 响应数据数组 */
  data: Role[]
}

/**
 * @description 获取用户角色
 * @param params GetUsersRolesRequestType
 * @returns Promise<GetUsersRolesResponseType>
 */
export async function getUsersRolesApi(
  params: GetUsersRolesRequestType
): Promise<GetUsersRolesResponseType> {
  const config: RequestConfig = {
    url: '/api/users/roles',
    method: 'GET',
    params,
  }
  return request<GetUsersRolesResponseType>(config)
}

/**
 * @description 获取用户权限
 * @param params GetUsersPermissionsRequestType
 * @returns Promise<GetUsersPermissionsResponseType>
 */
export interface GetUsersPermissionsRequestType {
  /** @description 用户ID */
  id: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 获取用户权限 的返回数据类型
 */
export interface GetUsersPermissionsResponseType {
  /** @description 响应数据数组 */
  data: Record<string, any>[]
}

/**
 * @description 获取用户权限
 * @param params GetUsersPermissionsRequestType
 * @returns Promise<GetUsersPermissionsResponseType>
 */
export async function getUsersPermissionsApi(
  params: GetUsersPermissionsRequestType
): Promise<GetUsersPermissionsResponseType> {
  const config: RequestConfig = {
    url: '/api/users/permissions',
    method: 'GET',
    params,
  }
  return request<GetUsersPermissionsResponseType>(config)
}

/**
 * @description 检查用户角色
 * @param params GetUsersCheckRoleRequestType
 * @returns Promise<GetUsersCheckRoleResponseType>
 */
export interface GetUsersCheckRoleRequestType {
  /** @description 用户ID */
  id: string
  /** @description 角色代码 */
  roleCode: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 检查用户角色 的返回数据类型
 */
export interface GetUsersCheckRoleResponseType {
  /** @description  */
  hasRole: boolean
}

/**
 * @description 检查用户角色
 * @param params GetUsersCheckRoleRequestType
 * @returns Promise<GetUsersCheckRoleResponseType>
 */
export async function getUsersCheckRoleApi(
  params: GetUsersCheckRoleRequestType
): Promise<GetUsersCheckRoleResponseType> {
  const config: RequestConfig = {
    url: '/api/users/check-role',
    method: 'GET',
    params,
  }
  return request<GetUsersCheckRoleResponseType>(config)
}

/**
 * @description 检查用户权限
 * @param params GetUsersCheckPermissionRequestType
 * @returns Promise<GetUsersCheckPermissionResponseType>
 */
export interface GetUsersCheckPermissionRequestType {
  /** @description 用户ID */
  id: string
  /** @description 动作 */
  action: string
  /** @description 资源 */
  resource: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 检查用户权限 的返回数据类型
 */
export interface GetUsersCheckPermissionResponseType {
  /** @description  */
  hasPermission: boolean
}

/**
 * @description 检查用户权限
 * @param params GetUsersCheckPermissionRequestType
 * @returns Promise<GetUsersCheckPermissionResponseType>
 */
export async function getUsersCheckPermissionApi(
  params: GetUsersCheckPermissionRequestType
): Promise<GetUsersCheckPermissionResponseType> {
  const config: RequestConfig = {
    url: '/api/users/check-permission',
    method: 'GET',
    params,
  }
  return request<GetUsersCheckPermissionResponseType>(config)
}

/**
 * @description 查询用户列表
 * @param params GetUsersRequestType
 * @returns Promise<GetUsersResponseType>
 */
export interface GetUsersRequestType {
  /** @description 页码 */
  page?: string
  /** @description 每页数量 */
  limit?: string
  /** @description 搜索关键词（邮箱或姓名） */
  search?: string
  /** @description 启用状态筛选 */
  isActive?: string
  /** @description 排序字段 */
  sortBy?: string
  /** @description 排序方向 */
  sortOrder?: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 查询用户列表 的返回数据类型
 */
export interface GetUsersResponseType {
  /** @description 用户列表 */
  list: UserListItemDto[]
  /** @description 总数 */
  total: number
  /** @description 当前页码 */
  page: number
  /** @description 每页数量 */
  limit: number
}

/**
 * @description 查询用户列表
 * @param params GetUsersRequestType
 * @returns Promise<GetUsersResponseType>
 */
export async function getUsersApi(
  params: GetUsersRequestType
): Promise<GetUsersResponseType> {
  const config: RequestConfig = {
    url: '/api/users',
    method: 'GET',
    params,
  }
  return request<GetUsersResponseType>(config)
}

/**
 * @description 删除用户（支持批量）
 * @param params DeleteUsersRequestType
 * @returns Promise<DeleteUsersResponseType>
 */
export interface DeleteUsersRequestType {
  /** @description 要删除的用户ID列表（支持批量） */
  userIds: string[]
  /** @description  */
  Authorization?: string
}

/**
 * @description 删除用户（支持批量） 的返回数据类型
 */
export interface DeleteUsersResponseType {
  /** @description 删除的用户数量 */
  count: number
  /** @description  */
  message: string
}

/**
 * @description 删除用户（支持批量）
 * @param params DeleteUsersRequestType
 * @returns Promise<DeleteUsersResponseType>
 */
export async function deleteUsersApi(
  params: DeleteUsersRequestType
): Promise<DeleteUsersResponseType> {
  const config: RequestConfig = {
    url: '/api/users',
    method: 'DELETE',
    data: params,
  }
  return request<DeleteUsersResponseType>(config)
}

/**
 * @description 管理员创建用户
 * @param params PostUsersCreateRequestType
 * @returns Promise<PostUsersCreateResponseType>
 */
export interface PostUsersCreateRequestType {
  /** @description 用户邮箱 */
  email: string
  /** @description 用户名称 */
  name: string
  /** @description 密码 */
  password: string
  /** @description 是否启用 */
  isActive?: boolean
  /** @description 初始角色ID列表 */
  roleIds?: string[]
  /** @description  */
  Authorization?: string
}

/**
 * @description 管理员创建用户 的返回数据类型
 */
export interface PostUsersCreateResponseType {
  /** @description 用户ID */
  id: string
  /** @description 用户邮箱 */
  email: string
  /** @description 用户名称 */
  name: string
  /** @description 邮箱是否已验证 */
  emailVerified: boolean
  /** @description 用户偏好设置 */
  preferences: Record<string, any>
  /** @description 最后登录IP */
  lastLoginIp: string
  /** @description 最后登录时间 */
  lastLoginAt: string
  /** @description 登录次数 */
  loginCount: number
  /** @description 账户是否激活 */
  isActive: boolean
  /** @description 创建时间 */
  createdAt: string
  /** @description 更新时间 */
  updatedAt: string
}

/**
 * @description 管理员创建用户
 * @param params PostUsersCreateRequestType
 * @returns Promise<PostUsersCreateResponseType>
 */
export async function postUsersCreateApi(
  params: PostUsersCreateRequestType
): Promise<PostUsersCreateResponseType> {
  const config: RequestConfig = {
    url: '/api/users/create',
    method: 'POST',
    data: params,
  }
  return request<PostUsersCreateResponseType>(config)
}

/**
 * @description 切换用户状态（支持批量）
 * @param params PatchUsersToggleStatusRequestType
 * @returns Promise<PatchUsersToggleStatusResponseType>
 */
export interface PatchUsersToggleStatusRequestType {
  /** @description 要切换状态的用户ID列表（支持批量） */
  userIds: string[]
  /** @description 目标状态 */
  isActive: boolean
  /** @description  */
  Authorization?: string
}

/**
 * @description 切换用户状态（支持批量） 的返回数据类型
 */
export interface PatchUsersToggleStatusResponseType {
  /** @description 更新的用户数量 */
  count: number
  /** @description  */
  message: string
}

/**
 * @description 切换用户状态（支持批量）
 * @param params PatchUsersToggleStatusRequestType
 * @returns Promise<PatchUsersToggleStatusResponseType>
 */
export async function patchUsersToggleStatusApi(
  params: PatchUsersToggleStatusRequestType
): Promise<PatchUsersToggleStatusResponseType> {
  const config: RequestConfig = {
    url: '/api/users/toggle-status',
    method: 'PATCH',
    data: params,
  }
  return request<PatchUsersToggleStatusResponseType>(config)
}
