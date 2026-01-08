import { RequestConfig, request } from '../request'
import type { UserRoleResponseDto, Role } from '../types'

/**
 * @description 用户注册
 * @param params ApiUsersRegisterPOSTRequest
 * @returns Promise<ApiUsersRegisterPOSTResponse>
 */
export interface ApiUsersRegisterPOSTRequest {
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
export interface ApiUsersRegisterPOSTResponse {
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
 * @param params ApiUsersRegisterPOSTRequest
 * @returns Promise<ApiUsersRegisterPOSTResponse>
 */
export async function apiUsersRegisterPOST(
  params: ApiUsersRegisterPOSTRequest
): Promise<ApiUsersRegisterPOSTResponse> {
  const config: RequestConfig = {
    url: '/api/users/register',
    method: 'POST',
    data: params,
  }
  return request<ApiUsersRegisterPOSTResponse>(config)
}

/**
 * @description 邮箱验证码登录
 * @param params ApiUsersLoginPOSTRequest
 * @returns Promise<ApiUsersLoginPOSTResponse>
 */
export interface ApiUsersLoginPOSTRequest {
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
export interface ApiUsersLoginPOSTResponse {
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
 * @param params ApiUsersLoginPOSTRequest
 * @returns Promise<ApiUsersLoginPOSTResponse>
 */
export async function apiUsersLoginPOST(
  params: ApiUsersLoginPOSTRequest
): Promise<ApiUsersLoginPOSTResponse> {
  const config: RequestConfig = {
    url: '/api/users/login',
    method: 'POST',
    data: params,
  }
  return request<ApiUsersLoginPOSTResponse>(config)
}

/**
 * @description 密码登录
 * @param params ApiUsersLoginPasswordPOSTRequest
 * @returns Promise<ApiUsersLoginPasswordPOSTResponse>
 */
export interface ApiUsersLoginPasswordPOSTRequest {
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
export interface ApiUsersLoginPasswordPOSTResponse {
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
 * @param params ApiUsersLoginPasswordPOSTRequest
 * @returns Promise<ApiUsersLoginPasswordPOSTResponse>
 */
export async function apiUsersLoginPasswordPOST(
  params: ApiUsersLoginPasswordPOSTRequest
): Promise<ApiUsersLoginPasswordPOSTResponse> {
  const config: RequestConfig = {
    url: '/api/users/login-password',
    method: 'POST',
    data: params,
  }
  return request<ApiUsersLoginPasswordPOSTResponse>(config)
}

/**
 * @description 用户登出
 * @param params ApiUsersLogoutPOSTRequest
 * @returns Promise<ApiUsersLogoutPOSTResponse>
 */
export interface ApiUsersLogoutPOSTRequest {
  /** @description  */
  userId: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 用户登出 的返回数据类型
 */
export interface ApiUsersLogoutPOSTResponse {
  /** @description 响应数据 */
  data: any
}

/**
 * @description 用户登出
 * @param params ApiUsersLogoutPOSTRequest
 * @returns Promise<ApiUsersLogoutPOSTResponse>
 */
export async function apiUsersLogoutPOST(
  params: ApiUsersLogoutPOSTRequest
): Promise<ApiUsersLogoutPOSTResponse> {
  const config: RequestConfig = {
    url: '/api/users/logout',
    method: 'POST',
    params,
  }
  return request<ApiUsersLogoutPOSTResponse>(config)
}

/**
 * @description 刷新访问令牌
 * @param params ApiUsersRefreshTokenPOSTRequest
 * @returns Promise<ApiUsersRefreshTokenPOSTResponse>
 */
export interface ApiUsersRefreshTokenPOSTRequest {
  /** @description 刷新令牌 */
  refreshToken: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 刷新访问令牌 的返回数据类型
 */
export interface ApiUsersRefreshTokenPOSTResponse {
  /** @description 响应数据 */
  data: any
}

/**
 * @description 刷新访问令牌
 * @param params ApiUsersRefreshTokenPOSTRequest
 * @returns Promise<ApiUsersRefreshTokenPOSTResponse>
 */
export async function apiUsersRefreshTokenPOST(
  params: ApiUsersRefreshTokenPOSTRequest
): Promise<ApiUsersRefreshTokenPOSTResponse> {
  const config: RequestConfig = {
    url: '/api/users/refresh-token',
    method: 'POST',
    data: params,
  }
  return request<ApiUsersRefreshTokenPOSTResponse>(config)
}

/**
 * @description 获取加密密钥
 * @param params ApiUsersEncryptionKeyGETRequest
 * @returns Promise<ApiUsersEncryptionKeyGETResponse>
 */
export interface ApiUsersEncryptionKeyGETRequest {
  /** @description  */
  Authorization?: string
}

/**
 * @description 获取加密密钥 的返回数据类型
 */
export interface ApiUsersEncryptionKeyGETResponse {
  /** @description 响应数据 */
  data: any
}

/**
 * @description 获取加密密钥
 * @param params ApiUsersEncryptionKeyGETRequest
 * @returns Promise<ApiUsersEncryptionKeyGETResponse>
 */
export async function apiUsersEncryptionKeyGET(
  params: ApiUsersEncryptionKeyGETRequest
): Promise<ApiUsersEncryptionKeyGETResponse> {
  const config: RequestConfig = {
    url: '/api/users/encryption-key',
    method: 'GET',
    params,
  }
  return request<ApiUsersEncryptionKeyGETResponse>(config)
}

/**
 * @description 发送登录验证码
 * @param params ApiUsersSendLoginCodePOSTRequest
 * @returns Promise<ApiUsersSendLoginCodePOSTResponse>
 */
export interface ApiUsersSendLoginCodePOSTRequest {
  /** @description 邮箱地址 */
  email: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 发送登录验证码 的返回数据类型
 */
export interface ApiUsersSendLoginCodePOSTResponse {
  /** @description 响应数据 */
  data: any
}

/**
 * @description 发送登录验证码
 * @param params ApiUsersSendLoginCodePOSTRequest
 * @returns Promise<ApiUsersSendLoginCodePOSTResponse>
 */
export async function apiUsersSendLoginCodePOST(
  params: ApiUsersSendLoginCodePOSTRequest
): Promise<ApiUsersSendLoginCodePOSTResponse> {
  const config: RequestConfig = {
    url: '/api/users/send-login-code',
    method: 'POST',
    data: params,
  }
  return request<ApiUsersSendLoginCodePOSTResponse>(config)
}

/**
 * @description 发送邮箱验证码
 * @param params ApiUsersSendEmailCodePOSTRequest
 * @returns Promise<ApiUsersSendEmailCodePOSTResponse>
 */
export interface ApiUsersSendEmailCodePOSTRequest {
  /** @description 邮箱地址 */
  email: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 发送邮箱验证码 的返回数据类型
 */
export interface ApiUsersSendEmailCodePOSTResponse {
  /** @description 响应数据 */
  data: any
}

/**
 * @description 发送邮箱验证码
 * @param params ApiUsersSendEmailCodePOSTRequest
 * @returns Promise<ApiUsersSendEmailCodePOSTResponse>
 */
export async function apiUsersSendEmailCodePOST(
  params: ApiUsersSendEmailCodePOSTRequest
): Promise<ApiUsersSendEmailCodePOSTResponse> {
  const config: RequestConfig = {
    url: '/api/users/send-email-code',
    method: 'POST',
    data: params,
  }
  return request<ApiUsersSendEmailCodePOSTResponse>(config)
}

/**
 * @description 为用户分配角色
 * @param params ApiUsersAssignRolePOSTRequest
 * @returns Promise<ApiUsersAssignRolePOSTResponse>
 */
export interface ApiUsersAssignRolePOSTRequest {
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
export interface ApiUsersAssignRolePOSTResponse {
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
 * @param params ApiUsersAssignRolePOSTRequest
 * @returns Promise<ApiUsersAssignRolePOSTResponse>
 */
export async function apiUsersAssignRolePOST(
  params: ApiUsersAssignRolePOSTRequest
): Promise<ApiUsersAssignRolePOSTResponse> {
  const config: RequestConfig = {
    url: '/api/users/assign-role',
    method: 'POST',
    data: params,
  }
  return request<ApiUsersAssignRolePOSTResponse>(config)
}

/**
 * @description 为用户批量分配角色
 * @param params ApiUsersAssignRolesBatchPOSTRequest
 * @returns Promise<ApiUsersAssignRolesBatchPOSTResponse>
 */
export interface ApiUsersAssignRolesBatchPOSTRequest {
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
export interface ApiUsersAssignRolesBatchPOSTResponse {
  /** @description 响应数据数组 */
  data: UserRoleResponseDto[]
}

/**
 * @description 为用户批量分配角色
 * @param params ApiUsersAssignRolesBatchPOSTRequest
 * @returns Promise<ApiUsersAssignRolesBatchPOSTResponse>
 */
export async function apiUsersAssignRolesBatchPOST(
  params: ApiUsersAssignRolesBatchPOSTRequest
): Promise<ApiUsersAssignRolesBatchPOSTResponse> {
  const config: RequestConfig = {
    url: '/api/users/assign-roles-batch',
    method: 'POST',
    data: params,
  }
  return request<ApiUsersAssignRolesBatchPOSTResponse>(config)
}

/**
 * @description 移除用户角色
 * @param params ApiUsersRemoveRoleDELETERequest
 * @returns Promise<ApiUsersRemoveRoleDELETEResponse>
 */
export interface ApiUsersRemoveRoleDELETERequest {
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
export interface ApiUsersRemoveRoleDELETEResponse {
  /** @description 响应数据 */
  data: any
}

/**
 * @description 移除用户角色
 * @param params ApiUsersRemoveRoleDELETERequest
 * @returns Promise<ApiUsersRemoveRoleDELETEResponse>
 */
export async function apiUsersRemoveRoleDELETE(
  params: ApiUsersRemoveRoleDELETERequest
): Promise<ApiUsersRemoveRoleDELETEResponse> {
  const config: RequestConfig = {
    url: '/api/users/remove-role',
    method: 'DELETE',
    params,
  }
  return request<ApiUsersRemoveRoleDELETEResponse>(config)
}

/**
 * @description 获取用户角色
 * @param params ApiUsersRolesGETRequest
 * @returns Promise<ApiUsersRolesGETResponse>
 */
export interface ApiUsersRolesGETRequest {
  /** @description 用户ID */
  id: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 获取用户角色 的返回数据类型
 */
export interface ApiUsersRolesGETResponse {
  /** @description 响应数据数组 */
  data: Role[]
}

/**
 * @description 获取用户角色
 * @param params ApiUsersRolesGETRequest
 * @returns Promise<ApiUsersRolesGETResponse>
 */
export async function apiUsersRolesGET(
  params: ApiUsersRolesGETRequest
): Promise<ApiUsersRolesGETResponse> {
  const config: RequestConfig = {
    url: '/api/users/roles',
    method: 'GET',
    params,
  }
  return request<ApiUsersRolesGETResponse>(config)
}

/**
 * @description 获取用户权限
 * @param params ApiUsersPermissionsGETRequest
 * @returns Promise<ApiUsersPermissionsGETResponse>
 */
export interface ApiUsersPermissionsGETRequest {
  /** @description 用户ID */
  id: string
  /** @description  */
  Authorization?: string
}

/**
 * @description 获取用户权限 的返回数据类型
 */
export interface ApiUsersPermissionsGETResponse {
  /** @description 响应数据数组 */
  data: Record<string, any>[]
}

/**
 * @description 获取用户权限
 * @param params ApiUsersPermissionsGETRequest
 * @returns Promise<ApiUsersPermissionsGETResponse>
 */
export async function apiUsersPermissionsGET(
  params: ApiUsersPermissionsGETRequest
): Promise<ApiUsersPermissionsGETResponse> {
  const config: RequestConfig = {
    url: '/api/users/permissions',
    method: 'GET',
    params,
  }
  return request<ApiUsersPermissionsGETResponse>(config)
}

/**
 * @description 检查用户角色
 * @param params ApiUsersCheckRoleGETRequest
 * @returns Promise<ApiUsersCheckRoleGETResponse>
 */
export interface ApiUsersCheckRoleGETRequest {
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
export interface ApiUsersCheckRoleGETResponse {
  /** @description  */
  hasRole: boolean
}

/**
 * @description 检查用户角色
 * @param params ApiUsersCheckRoleGETRequest
 * @returns Promise<ApiUsersCheckRoleGETResponse>
 */
export async function apiUsersCheckRoleGET(
  params: ApiUsersCheckRoleGETRequest
): Promise<ApiUsersCheckRoleGETResponse> {
  const config: RequestConfig = {
    url: '/api/users/check-role',
    method: 'GET',
    params,
  }
  return request<ApiUsersCheckRoleGETResponse>(config)
}

/**
 * @description 检查用户权限
 * @param params ApiUsersCheckPermissionGETRequest
 * @returns Promise<ApiUsersCheckPermissionGETResponse>
 */
export interface ApiUsersCheckPermissionGETRequest {
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
export interface ApiUsersCheckPermissionGETResponse {
  /** @description  */
  hasPermission: boolean
}

/**
 * @description 检查用户权限
 * @param params ApiUsersCheckPermissionGETRequest
 * @returns Promise<ApiUsersCheckPermissionGETResponse>
 */
export async function apiUsersCheckPermissionGET(
  params: ApiUsersCheckPermissionGETRequest
): Promise<ApiUsersCheckPermissionGETResponse> {
  const config: RequestConfig = {
    url: '/api/users/check-permission',
    method: 'GET',
    params,
  }
  return request<ApiUsersCheckPermissionGETResponse>(config)
}
