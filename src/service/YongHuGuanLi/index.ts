import request from '@/service/request'

/**
 * @description 接口 用户注册 的 **请求类型**
 * @category 用户管理
 * @method POST
 * @path /api/users/register
 */
export interface PostUsersRegisterRequestType {
  /**
   * 用户邮箱
   */
  email: string
  /**
   * 用户名称
   */
  name: string
  /**
   * 密码
   */
  password: string
  /**
   * 邮箱验证码
   */
  emailVerificationCode: string
}

/**
 * @description 接口 用户注册 的 **返回类型**
 * @category 用户管理
 * @method POST
 * @path /api/users/register
 */
export interface PostUsersRegisterResponseType {
  /**
   * 用户ID
   */
  id: string
  /**
   * 用户邮箱
   */
  email: string
  /**
   * 用户名称
   */
  name: string
  /**
   * 邮箱是否已验证
   */
  emailVerified: boolean
  /**
   * 用户偏好设置
   */
  preferences: {}
  /**
   * 最后登录IP
   */
  lastLoginIp: string
  /**
   * 最后登录时间
   */
  lastLoginAt: string
  /**
   * 登录次数
   */
  loginCount: number
  /**
   * 账户是否激活
   */
  isActive: boolean
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
 * @description 接口 用户注册 的 **请求函数**
 * @category 用户管理
 * @method POST
 * @path /api/users/register
 */
export const postUsersRegisterApi = (params: PostUsersRegisterRequestType) => {
  return request('/api/users/register', {
    method: 'POST',
    data: params,
  })
}

/**
 * @description 接口 邮箱验证码登录 的 **请求类型**
 * @category 用户管理
 * @method POST
 * @path /api/users/login
 */
export interface PostUsersLoginRequestType {
  /**
   * 邮箱地址
   */
  email: string
  /**
   * 邮箱验证码
   */
  emailVerificationCode: string
}

/**
 * @description 接口 邮箱验证码登录 的 **返回类型**
 * @category 用户管理
 * @method POST
 * @path /api/users/login
 */
export interface PostUsersLoginResponseType {
  /**
   * 用户ID
   */
  id: string
  /**
   * 邮箱地址
   */
  email: string
  /**
   * 用户名
   */
  name: string
  /**
   * 邮箱是否已验证
   */
  emailVerified: boolean
  /**
   * 用户偏好设置
   */
  preferences: {}
  /**
   * 上次登录时间
   */
  lastLoginAt: string
  /**
   * 登录次数
   */
  loginCount: number
  /**
   * 访问令牌
   */
  accessToken: string
  /**
   * 刷新令牌
   */
  refreshToken: string
}

/**
 * @description 接口 邮箱验证码登录 的 **请求函数**
 * @category 用户管理
 * @method POST
 * @path /api/users/login
 */
export const postUsersLoginApi = (params: PostUsersLoginRequestType) => {
  return request('/api/users/login', {
    method: 'POST',
    data: params,
  })
}

/**
 * @description 接口 密码登录 的 **请求类型**
 * @category 用户管理
 * @method POST
 * @path /api/users/login-password
 */
export interface PostUsersLoginPasswordRequestType {
  /**
   * 邮箱地址
   */
  email: string
  /**
   * 密码
   */
  password: string
  /**
   * 加密密钥ID（必需，用于解密密码）
   */
  keyId: string
}

/**
 * @description 接口 密码登录 的 **返回类型**
 * @category 用户管理
 * @method POST
 * @path /api/users/login-password
 */
export interface PostUsersLoginPasswordResponseType {
  /**
   * 用户ID
   */
  id: string
  /**
   * 邮箱地址
   */
  email: string
  /**
   * 用户名
   */
  name: string
  /**
   * 邮箱是否已验证
   */
  emailVerified: boolean
  /**
   * 用户偏好设置
   */
  preferences: {}
  /**
   * 上次登录时间
   */
  lastLoginAt: string
  /**
   * 登录次数
   */
  loginCount: number
  /**
   * 访问令牌
   */
  accessToken: string
  /**
   * 刷新令牌
   */
  refreshToken: string
}

/**
 * @description 接口 密码登录 的 **请求函数**
 * @category 用户管理
 * @method POST
 * @path /api/users/login-password
 */
export const postUsersLoginPasswordApi = (
  params: PostUsersLoginPasswordRequestType
) => {
  return request('/api/users/login-password', {
    method: 'POST',
    data: params,
  })
}

/**
 * @description 接口 用户登出 的 **请求类型**
 * @category 用户管理
 * @method POST
 * @path /api/users/logout
 */
export interface PostUsersLogoutRequestType {
  userId: string
}

/**
 * @description 接口 用户登出 的 **返回类型**
 * @category 用户管理
 * @method POST
 * @path /api/users/logout
 */
export type PostUsersLogoutResponseType = string

/**
 * @description 接口 用户登出 的 **请求函数**
 * @category 用户管理
 * @method POST
 * @path /api/users/logout
 */
export const postUsersLogoutApi = (params: PostUsersLogoutRequestType) => {
  return request('/api/users/logout', {
    method: 'POST',
    data: params,
  })
}

/**
 * @description 接口 刷新访问令牌 的 **请求类型**
 * @category 用户管理
 * @method POST
 * @path /api/users/refresh-token
 */
export interface PostUsersRefreshTokenRequestType {
  /**
   * 刷新令牌
   */
  refreshToken: string
}

/**
 * @description 接口 刷新访问令牌 的 **返回类型**
 * @category 用户管理
 * @method POST
 * @path /api/users/refresh-token
 */
export type PostUsersRefreshTokenResponseType = string

/**
 * @description 接口 刷新访问令牌 的 **请求函数**
 * @category 用户管理
 * @method POST
 * @path /api/users/refresh-token
 */
export const postUsersRefreshTokenApi = (
  params: PostUsersRefreshTokenRequestType
) => {
  return request('/api/users/refresh-token', {
    method: 'POST',
    data: params,
  })
}

/**
 * @description 接口 获取加密密钥 的 **请求类型**
 * @category 用户管理
 * @method GET
 * @path /api/users/encryption-key
 */
export interface GetUsersEncryptionKeyRequestType {}

/**
 * @description 接口 获取加密密钥 的 **返回类型**
 * @category 用户管理
 * @method GET
 * @path /api/users/encryption-key
 */
export type GetUsersEncryptionKeyResponseType = string

/**
 * @description 接口 获取加密密钥 的 **请求函数**
 * @category 用户管理
 * @method GET
 * @path /api/users/encryption-key
 */
export const getUsersEncryptionKeyApi = (
  params: GetUsersEncryptionKeyRequestType
) => {
  return request('/api/users/encryption-key', {
    method: 'GET',
    params: params,
  })
}

/**
 * @description 接口 发送登录验证码 的 **请求类型**
 * @category 用户管理
 * @method POST
 * @path /api/users/send-login-code
 */
export interface PostUsersSendLoginCodeRequestType {
  /**
   * 邮箱地址
   */
  email: string
}

/**
 * @description 接口 发送登录验证码 的 **返回类型**
 * @category 用户管理
 * @method POST
 * @path /api/users/send-login-code
 */
export type PostUsersSendLoginCodeResponseType = string

/**
 * @description 接口 发送登录验证码 的 **请求函数**
 * @category 用户管理
 * @method POST
 * @path /api/users/send-login-code
 */
export const postUsersSendLoginCodeApi = (
  params: PostUsersSendLoginCodeRequestType
) => {
  return request('/api/users/send-login-code', {
    method: 'POST',
    data: params,
  })
}

/**
 * @description 接口 发送邮箱验证码 的 **请求类型**
 * @category 用户管理
 * @method POST
 * @path /api/users/send-email-code
 */
export interface PostUsersSendEmailCodeRequestType {
  /**
   * 邮箱地址
   */
  email: string
}

/**
 * @description 接口 发送邮箱验证码 的 **返回类型**
 * @category 用户管理
 * @method POST
 * @path /api/users/send-email-code
 */
export type PostUsersSendEmailCodeResponseType = string

/**
 * @description 接口 发送邮箱验证码 的 **请求函数**
 * @category 用户管理
 * @method POST
 * @path /api/users/send-email-code
 */
export const postUsersSendEmailCodeApi = (
  params: PostUsersSendEmailCodeRequestType
) => {
  return request('/api/users/send-email-code', {
    method: 'POST',
    data: params,
  })
}

/**
 * @description 接口 为用户分配角色 的 **请求类型**
 * @category 用户管理
 * @method POST
 * @path /api/users/assign-role
 */
export interface PostUsersAssignRoleRequestType {
  /**
   * 角色ID
   */
  roleId: string
  /**
   * 用户ID
   */
  id: string
}

/**
 * @description 接口 为用户分配角色 的 **返回类型**
 * @category 用户管理
 * @method POST
 * @path /api/users/assign-role
 */
export interface PostUsersAssignRoleResponseType {
  /**
   * 用户角色关系ID
   */
  id: string
  /**
   * 用户ID
   */
  userId: string
  /**
   * 角色ID
   */
  roleId: string
  /**
   * 创建时间
   */
  createdAt: string
}

/**
 * @description 接口 为用户分配角色 的 **请求函数**
 * @category 用户管理
 * @method POST
 * @path /api/users/assign-role
 */
export const postUsersAssignRoleApi = (
  params: PostUsersAssignRoleRequestType
) => {
  return request('/api/users/assign-role', {
    method: 'POST',
    data: params,
  })
}

/**
 * @description 接口 为用户批量分配角色 的 **请求类型**
 * @category 用户管理
 * @method POST
 * @path /api/users/assign-roles-batch
 */
export interface PostUsersAssignRolesBatchRequestType {
  /**
   * 角色ID列表
   */
  roleIds: string[]
  /**
   * 用户ID
   */
  id: string
}

/**
 * @description 接口 为用户批量分配角色 的 **返回类型**
 * @category 用户管理
 * @method POST
 * @path /api/users/assign-roles-batch
 */
export type PostUsersAssignRolesBatchResponseType = unknown[]

/**
 * @description 接口 为用户批量分配角色 的 **请求函数**
 * @category 用户管理
 * @method POST
 * @path /api/users/assign-roles-batch
 */
export const postUsersAssignRolesBatchApi = (
  params: PostUsersAssignRolesBatchRequestType
) => {
  return request('/api/users/assign-roles-batch', {
    method: 'POST',
    data: params,
  })
}

/**
 * @description 接口 移除用户角色 的 **请求类型**
 * @category 用户管理
 * @method DELETE
 * @path /api/users/remove-role
 */
export interface DeleteUsersRemoveRoleRequestType {
  /**
   * 用户ID
   */
  id: string
  /**
   * 角色ID
   */
  roleId: string
}

/**
 * @description 接口 移除用户角色 的 **返回类型**
 * @category 用户管理
 * @method DELETE
 * @path /api/users/remove-role
 */
export type DeleteUsersRemoveRoleResponseType = string

/**
 * @description 接口 移除用户角色 的 **请求函数**
 * @category 用户管理
 * @method DELETE
 * @path /api/users/remove-role
 */
export const deleteUsersRemoveRoleApi = (
  params: DeleteUsersRemoveRoleRequestType
) => {
  return request('/api/users/remove-role', {
    method: 'DELETE',
    data: params,
  })
}

/**
 * @description 接口 获取用户角色 的 **请求类型**
 * @category 用户管理
 * @method GET
 * @path /api/users/roles
 */
export interface GetUsersRolesRequestType {
  /**
   * 用户ID
   */
  id: string
}

/**
 * @description 接口 获取用户角色 的 **返回类型**
 * @category 用户管理
 * @method GET
 * @path /api/users/roles
 */
export type GetUsersRolesResponseType = unknown[]

/**
 * @description 接口 获取用户角色 的 **请求函数**
 * @category 用户管理
 * @method GET
 * @path /api/users/roles
 */
export const getUsersRolesApi = (params: GetUsersRolesRequestType) => {
  return request('/api/users/roles', {
    method: 'GET',
    params: params,
  })
}

/**
 * @description 接口 获取用户权限 的 **请求类型**
 * @category 用户管理
 * @method GET
 * @path /api/users/permissions
 */
export interface GetUsersPermissionsRequestType {
  /**
   * 用户ID
   */
  id: string
}

/**
 * @description 接口 获取用户权限 的 **返回类型**
 * @category 用户管理
 * @method GET
 * @path /api/users/permissions
 */
export type GetUsersPermissionsResponseType = {
  [k: string]: unknown
}[]

/**
 * @description 接口 获取用户权限 的 **请求函数**
 * @category 用户管理
 * @method GET
 * @path /api/users/permissions
 */
export const getUsersPermissionsApi = (
  params: GetUsersPermissionsRequestType
) => {
  return request('/api/users/permissions', {
    method: 'GET',
    params: params,
  })
}

/**
 * @description 接口 检查用户角色 的 **请求类型**
 * @category 用户管理
 * @method GET
 * @path /api/users/check-role
 */
export interface GetUsersCheckRoleRequestType {
  /**
   * 用户ID
   */
  id: string
  /**
   * 角色代码
   */
  roleCode: string
}

/**
 * @description 接口 检查用户角色 的 **返回类型**
 * @category 用户管理
 * @method GET
 * @path /api/users/check-role
 */
export interface GetUsersCheckRoleResponseType {
  hasRole?: boolean
}

/**
 * @description 接口 检查用户角色 的 **请求函数**
 * @category 用户管理
 * @method GET
 * @path /api/users/check-role
 */
export const getUsersCheckRoleApi = (params: GetUsersCheckRoleRequestType) => {
  return request('/api/users/check-role', {
    method: 'GET',
    params: params,
  })
}

/**
 * @description 接口 检查用户权限 的 **请求类型**
 * @category 用户管理
 * @method GET
 * @path /api/users/check-permission
 */
export interface GetUsersCheckPermissionRequestType {
  /**
   * 用户ID
   */
  id: string
  /**
   * 动作
   */
  action: string
  /**
   * 资源
   */
  resource: string
}

/**
 * @description 接口 检查用户权限 的 **返回类型**
 * @category 用户管理
 * @method GET
 * @path /api/users/check-permission
 */
export interface GetUsersCheckPermissionResponseType {
  hasPermission?: boolean
}

/**
 * @description 接口 检查用户权限 的 **请求函数**
 * @category 用户管理
 * @method GET
 * @path /api/users/check-permission
 */
export const getUsersCheckPermissionApi = (
  params: GetUsersCheckPermissionRequestType
) => {
  return request('/api/users/check-permission', {
    method: 'GET',
    params: params,
  })
}
