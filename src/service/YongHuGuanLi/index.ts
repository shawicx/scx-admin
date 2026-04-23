import { RequestConfig, request } from '@/service/request'
import type {
  UserRoleResponseDto,
  Role,
  UserListItemDto,
} from '@/service/types'

/**
 * @description 用户注册
 * @param params PostUsersRegisterRequestType
 * @returns Promise<PostUsersRegisterResult>
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
export interface PostUsersRegisterResult {
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
 * @returns Promise<PostUsersRegisterResult>
 */
export async function postUsersRegisterFunc(
  params: PostUsersRegisterRequestType
): Promise<PostUsersRegisterResult> {
  const config: RequestConfig = {
    url: '/api/users/register',
    method: 'POST',
    data: params,
  }
  return request<PostUsersRegisterResult>(config)
}

/**
 * @description 邮箱验证码登录
 * @param params PostUsersLoginRequestType
 * @returns Promise<PostUsersLoginResult>
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
export interface PostUsersLoginResult {
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
 * @returns Promise<PostUsersLoginResult>
 */
export async function postUsersLoginFunc(
  params: PostUsersLoginRequestType
): Promise<PostUsersLoginResult> {
  const config: RequestConfig = {
    url: '/api/users/login',
    method: 'POST',
    data: params,
  }
  return request<PostUsersLoginResult>(config)
}

/**
 * @description 密码登录
 * @param params PostUsersLoginPasswordRequestType
 * @returns Promise<PostUsersLoginPasswordResult>
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
export interface PostUsersLoginPasswordResult {
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
 * @returns Promise<PostUsersLoginPasswordResult>
 */
export async function postUsersLoginPasswordFunc(
  params: PostUsersLoginPasswordRequestType
): Promise<PostUsersLoginPasswordResult> {
  const config: RequestConfig = {
    url: '/api/users/login-password',
    method: 'POST',
    data: params,
  }
  return request<PostUsersLoginPasswordResult>(config)
}

/**
 * @description 用户登出
 * @param params PostUsersLogoutRequestType
 * @returns Promise<PostUsersLogoutResult>
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
export interface PostUsersLogoutResult {
  /** @description  */
  message: string
}

/**
 * @description 用户登出
 * @param params PostUsersLogoutRequestType
 * @returns Promise<PostUsersLogoutResult>
 */
export async function postUsersLogoutFunc(
  params: PostUsersLogoutRequestType
): Promise<PostUsersLogoutResult> {
  const config: RequestConfig = {
    url: '/api/users/logout',
    method: 'POST',
    params,
  }
  return request<PostUsersLogoutResult>(config)
}

/**
 * @description 刷新访问令牌
 * @param params PostUsersRefreshTokenRequestType
 * @returns Promise<PostUsersRefreshTokenResult>
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
export interface PostUsersRefreshTokenResult {
  /** @description 新的访问令牌 */
  accessToken: string
  /** @description 新的刷新令牌 */
  refreshToken: string
}

/**
 * @description 刷新访问令牌
 * @param params PostUsersRefreshTokenRequestType
 * @returns Promise<PostUsersRefreshTokenResult>
 */
export async function postUsersRefreshTokenFunc(
  params: PostUsersRefreshTokenRequestType
): Promise<PostUsersRefreshTokenResult> {
  const config: RequestConfig = {
    url: '/api/users/refresh-token',
    method: 'POST',
    data: params,
  }
  return request<PostUsersRefreshTokenResult>(config)
}

/**
 * @description 获取加密密钥
 * @param params GetUsersEncryptionKeyRequestType
 * @returns Promise<GetUsersEncryptionKeyResult>
 */
export interface GetUsersEncryptionKeyRequestType {
  /** @description  */
  Authorization?: string
}

/**
 * @description 获取加密密钥 的返回数据类型
 */
export interface GetUsersEncryptionKeyResult {
  /** @description 加密密钥 */
  key: string
  /** @description 密钥ID */
  keyId: string
}

/**
 * @description 获取加密密钥
 * @param params GetUsersEncryptionKeyRequestType
 * @returns Promise<GetUsersEncryptionKeyResult>
 */
export async function getUsersEncryptionKeyFunc(
  params: GetUsersEncryptionKeyRequestType
): Promise<GetUsersEncryptionKeyResult> {
  const config: RequestConfig = {
    url: '/api/users/encryption-key',
    method: 'GET',
    params,
  }
  return request<GetUsersEncryptionKeyResult>(config)
}

/**
 * @description 发送登录验证码
 * @param params PostUsersSendLoginCodeRequestType
 * @returns Promise<PostUsersSendLoginCodeResult>
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
export interface PostUsersSendLoginCodeResult {
  /** @description  */
  message: string
}

/**
 * @description 发送登录验证码
 * @param params PostUsersSendLoginCodeRequestType
 * @returns Promise<PostUsersSendLoginCodeResult>
 */
export async function postUsersSendLoginCodeFunc(
  params: PostUsersSendLoginCodeRequestType
): Promise<PostUsersSendLoginCodeResult> {
  const config: RequestConfig = {
    url: '/api/users/send-login-code',
    method: 'POST',
    data: params,
  }
  return request<PostUsersSendLoginCodeResult>(config)
}

/**
 * @description 发送邮箱验证码
 * @param params PostUsersSendEmailCodeRequestType
 * @returns Promise<PostUsersSendEmailCodeResult>
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
export interface PostUsersSendEmailCodeResult {
  /** @description  */
  message: string
}

/**
 * @description 发送邮箱验证码
 * @param params PostUsersSendEmailCodeRequestType
 * @returns Promise<PostUsersSendEmailCodeResult>
 */
export async function postUsersSendEmailCodeFunc(
  params: PostUsersSendEmailCodeRequestType
): Promise<PostUsersSendEmailCodeResult> {
  const config: RequestConfig = {
    url: '/api/users/send-email-code',
    method: 'POST',
    data: params,
  }
  return request<PostUsersSendEmailCodeResult>(config)
}

/**
 * @description 为用户分配角色
 * @param params PostUsersAssignRoleRequestType
 * @returns Promise<PostUsersAssignRoleResult>
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
export interface PostUsersAssignRoleResult {
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
 * @returns Promise<PostUsersAssignRoleResult>
 */
export async function postUsersAssignRoleFunc(
  params: PostUsersAssignRoleRequestType
): Promise<PostUsersAssignRoleResult> {
  const config: RequestConfig = {
    url: '/api/users/assign-role',
    method: 'POST',
    data: params,
  }
  return request<PostUsersAssignRoleResult>(config)
}

/**
 * @description 为用户批量分配角色
 * @param params PostUsersAssignRolesBatchRequestType
 * @returns Promise<PostUsersAssignRolesBatchResult>
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
export interface PostUsersAssignRolesBatchResult {
  /** @description 响应数据数组 */
  data: UserRoleResponseDto[]
}

/**
 * @description 为用户批量分配角色
 * @param params PostUsersAssignRolesBatchRequestType
 * @returns Promise<PostUsersAssignRolesBatchResult>
 */
export async function postUsersAssignRolesBatchFunc(
  params: PostUsersAssignRolesBatchRequestType
): Promise<PostUsersAssignRolesBatchResult> {
  const config: RequestConfig = {
    url: '/api/users/assign-roles-batch',
    method: 'POST',
    data: params,
  }
  return request<PostUsersAssignRolesBatchResult>(config)
}

/**
 * @description 移除用户角色
 * @param params DeleteUsersRemoveRoleRequestType
 * @returns Promise<DeleteUsersRemoveRoleResult>
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
export interface DeleteUsersRemoveRoleResult {
  /** @description 响应数据 */
  data: any
}

/**
 * @description 移除用户角色
 * @param params DeleteUsersRemoveRoleRequestType
 * @returns Promise<DeleteUsersRemoveRoleResult>
 */
export async function deleteUsersRemoveRoleFunc(
  params: DeleteUsersRemoveRoleRequestType
): Promise<DeleteUsersRemoveRoleResult> {
  const config: RequestConfig = {
    url: '/api/users/remove-role',
    method: 'DELETE',
    params,
  }
  return request<DeleteUsersRemoveRoleResult>(config)
}

/**
 * @description 获取用户角色
 * @param params GetUsersRolesRequestType
 * @returns Promise<GetUsersRolesResult>
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
export interface GetUsersRolesResult {
  /** @description 响应数据数组 */
  data: Role[]
}

/**
 * @description 获取用户角色
 * @param params GetUsersRolesRequestType
 * @returns Promise<GetUsersRolesResult>
 */
export async function getUsersRolesFunc(
  params: GetUsersRolesRequestType
): Promise<GetUsersRolesResult> {
  const config: RequestConfig = {
    url: '/api/users/roles',
    method: 'GET',
    params,
  }
  return request<GetUsersRolesResult>(config)
}

/**
 * @description 获取用户权限
 * @param params GetUsersPermissionsRequestType
 * @returns Promise<GetUsersPermissionsResult>
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
export interface GetUsersPermissionsResult {
  /** @description 响应数据数组 */
  data: Record<string, any>[]
}

/**
 * @description 获取用户权限
 * @param params GetUsersPermissionsRequestType
 * @returns Promise<GetUsersPermissionsResult>
 */
export async function getUsersPermissionsFunc(
  params: GetUsersPermissionsRequestType
): Promise<GetUsersPermissionsResult> {
  const config: RequestConfig = {
    url: '/api/users/permissions',
    method: 'GET',
    params,
  }
  return request<GetUsersPermissionsResult>(config)
}

/**
 * @description 检查用户角色
 * @param params GetUsersCheckRoleRequestType
 * @returns Promise<GetUsersCheckRoleResult>
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
export interface GetUsersCheckRoleResult {
  /** @description  */
  hasRole: boolean
}

/**
 * @description 检查用户角色
 * @param params GetUsersCheckRoleRequestType
 * @returns Promise<GetUsersCheckRoleResult>
 */
export async function getUsersCheckRoleFunc(
  params: GetUsersCheckRoleRequestType
): Promise<GetUsersCheckRoleResult> {
  const config: RequestConfig = {
    url: '/api/users/check-role',
    method: 'GET',
    params,
  }
  return request<GetUsersCheckRoleResult>(config)
}

/**
 * @description 检查用户权限
 * @param params GetUsersCheckPermissionRequestType
 * @returns Promise<GetUsersCheckPermissionResult>
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
export interface GetUsersCheckPermissionResult {
  /** @description  */
  hasPermission: boolean
}

/**
 * @description 检查用户权限
 * @param params GetUsersCheckPermissionRequestType
 * @returns Promise<GetUsersCheckPermissionResult>
 */
export async function getUsersCheckPermissionFunc(
  params: GetUsersCheckPermissionRequestType
): Promise<GetUsersCheckPermissionResult> {
  const config: RequestConfig = {
    url: '/api/users/check-permission',
    method: 'GET',
    params,
  }
  return request<GetUsersCheckPermissionResult>(config)
}

/**
 * @description 查询用户列表
 * @param params GetUsersRequestType
 * @returns Promise<GetUsersResult>
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
export interface GetUsersResult {
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
 * @returns Promise<GetUsersResult>
 */
export async function getUsersFunc(
  params: GetUsersRequestType
): Promise<GetUsersResult> {
  const config: RequestConfig = {
    url: '/api/users',
    method: 'GET',
    params,
  }
  return request<GetUsersResult>(config)
}

/**
 * @description 删除用户（支持批量）
 * @param params DeleteUsersRequestType
 * @returns Promise<DeleteUsersResult>
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
export interface DeleteUsersResult {
  /** @description 删除的用户数量 */
  count: number
  /** @description  */
  message: string
}

/**
 * @description 删除用户（支持批量）
 * @param params DeleteUsersRequestType
 * @returns Promise<DeleteUsersResult>
 */
export async function deleteUsersFunc(
  params: DeleteUsersRequestType
): Promise<DeleteUsersResult> {
  const config: RequestConfig = {
    url: '/api/users',
    method: 'DELETE',
    data: params,
  }
  return request<DeleteUsersResult>(config)
}

/**
 * @description 管理员创建用户
 * @param params PostUsersCreateRequestType
 * @returns Promise<PostUsersCreateResult>
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
export interface PostUsersCreateResult {
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
 * @returns Promise<PostUsersCreateResult>
 */
export async function postUsersCreateFunc(
  params: PostUsersCreateRequestType
): Promise<PostUsersCreateResult> {
  const config: RequestConfig = {
    url: '/api/users/create',
    method: 'POST',
    data: params,
  }
  return request<PostUsersCreateResult>(config)
}

/**
 * @description 切换用户状态（支持批量）
 * @param params PatchUsersToggleStatusRequestType
 * @returns Promise<PatchUsersToggleStatusResult>
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
export interface PatchUsersToggleStatusResult {
  /** @description 更新的用户数量 */
  count: number
  /** @description  */
  message: string
}

/**
 * @description 切换用户状态（支持批量）
 * @param params PatchUsersToggleStatusRequestType
 * @returns Promise<PatchUsersToggleStatusResult>
 */
export async function patchUsersToggleStatusFunc(
  params: PatchUsersToggleStatusRequestType
): Promise<PatchUsersToggleStatusResult> {
  const config: RequestConfig = {
    url: '/api/users/toggle-status',
    method: 'PATCH',
    data: params,
  }
  return request<PatchUsersToggleStatusResult>(config)
}
