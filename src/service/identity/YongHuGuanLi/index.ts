import { RequestConfig, request } from '@/service/request'
import type {
  UserPreferences,
  UserRoleResponseDto,
  UserRoleSummaryDto,
  UserListItemDto,
  UserPermissionSummaryDto,
  NotificationPrefs,
  PrivacyPrefs,
} from '@/service/identity/types'

/**
 * @description 发送登录验证码
 * @param params PostApiUsersSendLoginCodeRequestType
 * @returns Promise<PostApiUsersSendLoginCodeResultType>
 */
export interface PostApiUsersSendLoginCodeRequestType {
  /** @description 邮箱地址 */
  email: string
}

/**
 * @description 发送登录验证码 的返回数据类型
 */
export interface PostApiUsersSendLoginCodeResultType {
  /** @description  */
  message: string
}

/**
 * @description 发送登录验证码
 * @param params PostApiUsersSendLoginCodeRequestType
 * @returns Promise<PostApiUsersSendLoginCodeResultType>
 */
export async function postApiUsersSendLoginCodeFunc(
  params: PostApiUsersSendLoginCodeRequestType
): Promise<PostApiUsersSendLoginCodeResultType> {
  const config: RequestConfig = {
    url: '/api/users/send-login-code',
    method: 'POST',
    data: params,
  }
  return request<PostApiUsersSendLoginCodeResultType>(config)
}

/**
 * @description 发送邮箱验证码
 * @param params PostApiUsersSendEmailCodeRequestType
 * @returns Promise<PostApiUsersSendEmailCodeResultType>
 */
export interface PostApiUsersSendEmailCodeRequestType {
  /** @description 邮箱地址 */
  email: string
}

/**
 * @description 发送邮箱验证码 的返回数据类型
 */
export interface PostApiUsersSendEmailCodeResultType {
  /** @description  */
  message: string
}

/**
 * @description 发送邮箱验证码
 * @param params PostApiUsersSendEmailCodeRequestType
 * @returns Promise<PostApiUsersSendEmailCodeResultType>
 */
export async function postApiUsersSendEmailCodeFunc(
  params: PostApiUsersSendEmailCodeRequestType
): Promise<PostApiUsersSendEmailCodeResultType> {
  const config: RequestConfig = {
    url: '/api/users/send-email-code',
    method: 'POST',
    data: params,
  }
  return request<PostApiUsersSendEmailCodeResultType>(config)
}

/**
 * @description 用户注册
 * @param params PostApiUsersRegisterRequestType
 * @returns Promise<PostApiUsersRegisterResultType>
 */
export interface PostApiUsersRegisterRequestType {
  /** @description 邮箱地址 */
  email: string
  /** @description 用户名称（2-50 字符） */
  name: string
  /** @description 密码（8-50 字符，需含大小写字母、数字和特殊字符） */
  password: string
  /** @description 邮箱验证码（6 位数字） */
  emailVerificationCode: string
}

/**
 * @description 用户注册 的返回数据类型
 */
export interface PostApiUsersRegisterResultType {
  /** @description 用户 ID */
  id: string
  /** @description 邮箱 */
  email: string
  /** @description 用户名称 */
  name: string
  /** @description 头像文件 ID（展示直链经 /files/info 换取预签名 URL） */
  avatar: string | null
  /** @description 邮箱是否已验证 */
  emailVerified: boolean
  /** @description  */
  preferences: UserPreferences | null
  /** @description 最后登录 IP */
  lastLoginIp: string | null
  /** @description 最后登录时间 */
  lastLoginAt: string | null
  /** @description 登录次数 */
  loginCount: number
  /** @description 是否启用 */
  isActive: boolean
  /** @description 创建时间 */
  createdAt: string
  /** @description 更新时间 */
  updatedAt: string
}

/**
 * @description 用户注册
 * @param params PostApiUsersRegisterRequestType
 * @returns Promise<PostApiUsersRegisterResultType>
 */
export async function postApiUsersRegisterFunc(
  params: PostApiUsersRegisterRequestType
): Promise<PostApiUsersRegisterResultType> {
  const config: RequestConfig = {
    url: '/api/users/register',
    method: 'POST',
    data: params,
  }
  return request<PostApiUsersRegisterResultType>(config)
}

/**
 * @description 登出
 * @param params PostApiUsersLogoutRequestType
 * @returns Promise<PostApiUsersLogoutResultType>
 */
export interface PostApiUsersLogoutRequestType {
  /** @description 用户 ID */
  userId: string
}

/**
 * @description 登出 的返回数据类型
 */
export interface PostApiUsersLogoutResultType {
  /** @description  */
  message: string
}

/**
 * @description 登出
 * @param params PostApiUsersLogoutRequestType
 * @returns Promise<PostApiUsersLogoutResultType>
 */
export async function postApiUsersLogoutFunc(
  params: PostApiUsersLogoutRequestType
): Promise<PostApiUsersLogoutResultType> {
  const config: RequestConfig = {
    url: '/api/users/logout',
    method: 'POST',
    params,
  }
  return request<PostApiUsersLogoutResultType>(config)
}

/**
 * @description 刷新令牌
 * @param params PostApiUsersRefreshTokenRequestType
 * @returns Promise<PostApiUsersRefreshTokenResultType>
 */
export interface PostApiUsersRefreshTokenRequestType {
  /** @description 刷新令牌 */
  refreshToken: string
}

/**
 * @description 刷新令牌 的返回数据类型
 */
export interface PostApiUsersRefreshTokenResultType {
  /** @description  */
  accessToken: string
  /** @description  */
  refreshToken: string
}

/**
 * @description 刷新令牌
 * @param params PostApiUsersRefreshTokenRequestType
 * @returns Promise<PostApiUsersRefreshTokenResultType>
 */
export async function postApiUsersRefreshTokenFunc(
  params: PostApiUsersRefreshTokenRequestType
): Promise<PostApiUsersRefreshTokenResultType> {
  const config: RequestConfig = {
    url: '/api/users/refresh-token',
    method: 'POST',
    data: params,
  }
  return request<PostApiUsersRefreshTokenResultType>(config)
}

/**
 * @description 邮箱验证码登录
 * @param params PostApiUsersLoginRequestType
 * @returns Promise<PostApiUsersLoginResultType>
 */
export interface PostApiUsersLoginRequestType {
  /** @description 邮箱地址 */
  email: string
  /** @description 邮箱验证码（6 位） */
  emailVerificationCode: string
}

/**
 * @description 邮箱验证码登录 的返回数据类型
 */
export interface PostApiUsersLoginResultType {
  /** @description 用户 ID */
  id: string
  /** @description 邮箱 */
  email: string
  /** @description 用户名称 */
  name: string
  /** @description 头像文件 ID（展示直链经 /files/info 换取预签名 URL） */
  avatar: string | null
  /** @description 邮箱是否已验证 */
  emailVerified: boolean
  /** @description  */
  preferences: UserPreferences | null
  /** @description 访问令牌（2 小时有效） */
  accessToken: string
  /** @description 刷新令牌（7 天有效） */
  refreshToken: string
}

/**
 * @description 邮箱验证码登录
 * @param params PostApiUsersLoginRequestType
 * @returns Promise<PostApiUsersLoginResultType>
 */
export async function postApiUsersLoginFunc(
  params: PostApiUsersLoginRequestType
): Promise<PostApiUsersLoginResultType> {
  const config: RequestConfig = {
    url: '/api/users/login',
    method: 'POST',
    data: params,
  }
  return request<PostApiUsersLoginResultType>(config)
}

/**
 * @description 密码登录
 * @param params PostApiUsersLoginPasswordRequestType
 * @returns Promise<PostApiUsersLoginPasswordResultType>
 */
export interface PostApiUsersLoginPasswordRequestType {
  /** @description 邮箱地址 */
  email: string
  /** @description 前端加密后的密码（AES） */
  password: string
  /** @description 加密密钥 ID（来自 /users/encryption-key） */
  keyId: string
}

/**
 * @description 密码登录 的返回数据类型
 */
export interface PostApiUsersLoginPasswordResultType {
  /** @description 用户 ID */
  id: string
  /** @description 邮箱 */
  email: string
  /** @description 用户名称 */
  name: string
  /** @description 头像文件 ID（展示直链经 /files/info 换取预签名 URL） */
  avatar: string | null
  /** @description 邮箱是否已验证 */
  emailVerified: boolean
  /** @description  */
  preferences: UserPreferences | null
  /** @description 访问令牌（2 小时有效） */
  accessToken: string
  /** @description 刷新令牌（7 天有效） */
  refreshToken: string
}

/**
 * @description 密码登录
 * @param params PostApiUsersLoginPasswordRequestType
 * @returns Promise<PostApiUsersLoginPasswordResultType>
 */
export async function postApiUsersLoginPasswordFunc(
  params: PostApiUsersLoginPasswordRequestType
): Promise<PostApiUsersLoginPasswordResultType> {
  const config: RequestConfig = {
    url: '/api/users/login-password',
    method: 'POST',
    data: params,
  }
  return request<PostApiUsersLoginPasswordResultType>(config)
}

/**
 * @description 创建用户
 * @param params PostApiUsersCreateRequestType
 * @returns Promise<PostApiUsersCreateResultType>
 */
export interface PostApiUsersCreateRequestType {
  /** @description 邮箱地址 */
  email: string
  /** @description 用户名称（2-50 字符） */
  name: string
  /** @description 密码（8-50 字符，需含大小写字母、数字和特殊字符） */
  password: string
  /** @description 是否启用 */
  isActive?: boolean
  /** @description 初始分配的角色 ID 列表（最多 10 个） */
  roleIds?: string[] | null
}

/**
 * @description 创建用户 的返回数据类型
 */
export interface PostApiUsersCreateResultType {
  /** @description 用户 ID */
  id: string
  /** @description 邮箱 */
  email: string
  /** @description 用户名称 */
  name: string
  /** @description 头像文件 ID（展示直链经 /files/info 换取预签名 URL） */
  avatar: string | null
  /** @description 邮箱是否已验证 */
  emailVerified: boolean
  /** @description  */
  preferences: UserPreferences | null
  /** @description 最后登录 IP */
  lastLoginIp: string | null
  /** @description 最后登录时间 */
  lastLoginAt: string | null
  /** @description 登录次数 */
  loginCount: number
  /** @description 是否启用 */
  isActive: boolean
  /** @description 创建时间 */
  createdAt: string
  /** @description 更新时间 */
  updatedAt: string
}

/**
 * @description 创建用户
 * @param params PostApiUsersCreateRequestType
 * @returns Promise<PostApiUsersCreateResultType>
 */
export async function postApiUsersCreateFunc(
  params: PostApiUsersCreateRequestType
): Promise<PostApiUsersCreateResultType> {
  const config: RequestConfig = {
    url: '/api/users/create',
    method: 'POST',
    data: params,
  }
  return request<PostApiUsersCreateResultType>(config)
}

/**
 * @description 批量分配角色
 * @param params PostApiUsersAssignRolesBatchRequestType
 * @returns Promise<PostApiUsersAssignRolesBatchResultType>
 */
export interface PostApiUsersAssignRolesBatchRequestType {
  /** @description 角色 ID 列表 */
  roleIds: string[]
  /** @description 用户 ID */
  userId: string
}

/**
 * @description 批量分配角色 的返回数据类型
 */
export interface PostApiUsersAssignRolesBatchResultType {
  /** @description 响应数据数组 */
  data: UserRoleResponseDto[]
}

/**
 * @description 批量分配角色
 * @param params PostApiUsersAssignRolesBatchRequestType
 * @returns Promise<PostApiUsersAssignRolesBatchResultType>
 */
export async function postApiUsersAssignRolesBatchFunc(
  params: PostApiUsersAssignRolesBatchRequestType
): Promise<PostApiUsersAssignRolesBatchResultType> {
  const config: RequestConfig = {
    url: '/api/users/assign-roles-batch',
    method: 'POST',
    data: params,
  }
  return request<PostApiUsersAssignRolesBatchResultType>(config)
}

/**
 * @description 分配单个角色
 * @param params PostApiUsersAssignRoleRequestType
 * @returns Promise<PostApiUsersAssignRoleResultType>
 */
export interface PostApiUsersAssignRoleRequestType {
  /** @description 角色 ID */
  roleId: string
  /** @description 用户 ID */
  userId: string
}

/**
 * @description 分配单个角色 的返回数据类型
 */
export interface PostApiUsersAssignRoleResultType {
  /** @description 关联记录 ID */
  id: string
  /** @description 用户 ID */
  userId: string
  /** @description 角色 ID */
  roleId: string
  /** @description 创建时间 */
  createdAt: string
}

/**
 * @description 分配单个角色
 * @param params PostApiUsersAssignRoleRequestType
 * @returns Promise<PostApiUsersAssignRoleResultType>
 */
export async function postApiUsersAssignRoleFunc(
  params: PostApiUsersAssignRoleRequestType
): Promise<PostApiUsersAssignRoleResultType> {
  const config: RequestConfig = {
    url: '/api/users/assign-role',
    method: 'POST',
    data: params,
  }
  return request<PostApiUsersAssignRoleResultType>(config)
}

/**
 * @description 切换用户状态
 * @param params PatchApiUsersToggleStatusRequestType
 * @returns Promise<PatchApiUsersToggleStatusResultType>
 */
export interface PatchApiUsersToggleStatusRequestType {
  /** @description 用户 ID 列表（ULID，最多 50 个） */
  userIds: string[]
  /** @description 目标状态：true 启用，false 停用 */
  isActive: boolean
}

/**
 * @description 切换用户状态 的返回数据类型
 */
export interface PatchApiUsersToggleStatusResultType {
  /** @description  */
  count: number
  /** @description  */
  message: string
}

/**
 * @description 切换用户状态
 * @param params PatchApiUsersToggleStatusRequestType
 * @returns Promise<PatchApiUsersToggleStatusResultType>
 */
export async function patchApiUsersToggleStatusFunc(
  params: PatchApiUsersToggleStatusRequestType
): Promise<PatchApiUsersToggleStatusResultType> {
  const config: RequestConfig = {
    url: '/api/users/toggle-status',
    method: 'PATCH',
    data: params,
  }
  return request<PatchApiUsersToggleStatusResultType>(config)
}

/**
 * @description 查询用户角色
 * @param params GetApiUsersRolesRequestType
 * @returns Promise<GetApiUsersRolesResultType>
 */
export interface GetApiUsersRolesRequestType {
  /** @description 用户 ID */
  id: string
}

/**
 * @description 查询用户角色 的返回数据类型
 */
export interface GetApiUsersRolesResultType {
  /** @description 响应数据数组 */
  data: UserRoleSummaryDto[]
}

/**
 * @description 查询用户角色
 * @param params GetApiUsersRolesRequestType
 * @returns Promise<GetApiUsersRolesResultType>
 */
export async function getApiUsersRolesFunc(
  params: GetApiUsersRolesRequestType
): Promise<GetApiUsersRolesResultType> {
  const config: RequestConfig = {
    url: '/api/users/roles',
    method: 'GET',
    params,
  }
  return request<GetApiUsersRolesResultType>(config)
}

/**
 * @description 用户列表查询
 * @param params GetApiUsersListRequestType
 * @returns Promise<GetApiUsersListResultType>
 */
export interface GetApiUsersListRequestType {
  /** @description 页码，从 1 开始 */
  page?: string
  /** @description 每页条数 */
  limit?: string
  /** @description 搜索关键字（邮箱或用户名） */
  search?: string
  /** @description 按状态过滤：true 启用，false 停用 */
  isActive?: string
  /** @description 排序字段 */
  sortBy?: string
  /** @description 排序方向：ASC / DESC */
  sortOrder?: string
}

/**
 * @description 用户列表查询 的返回数据类型
 */
export interface GetApiUsersListResultType {
  /** @description 用户列表 */
  list: UserListItemDto[]
  /** @description 总数 */
  total: number
  /** @description 当前页码 */
  page: number
  /** @description 每页条数 */
  limit: number
}

/**
 * @description 用户列表查询
 * @param params GetApiUsersListRequestType
 * @returns Promise<GetApiUsersListResultType>
 */
export async function getApiUsersListFunc(
  params: GetApiUsersListRequestType
): Promise<GetApiUsersListResultType> {
  const config: RequestConfig = {
    url: '/api/users/list',
    method: 'GET',
    params,
  }
  return request<GetApiUsersListResultType>(config)
}

/**
 * @description 查询用户权限
 * @param params GetApiUsersPermissionsRequestType
 * @returns Promise<GetApiUsersPermissionsResultType>
 */
export interface GetApiUsersPermissionsRequestType {
  /** @description 用户 ID */
  id: string
}

/**
 * @description 查询用户权限 的返回数据类型
 */
export interface GetApiUsersPermissionsResultType {
  /** @description 响应数据数组 */
  data: UserPermissionSummaryDto[]
}

/**
 * @description 查询用户权限
 * @param params GetApiUsersPermissionsRequestType
 * @returns Promise<GetApiUsersPermissionsResultType>
 */
export async function getApiUsersPermissionsFunc(
  params: GetApiUsersPermissionsRequestType
): Promise<GetApiUsersPermissionsResultType> {
  const config: RequestConfig = {
    url: '/api/users/permissions',
    method: 'GET',
    params,
  }
  return request<GetApiUsersPermissionsResultType>(config)
}

/**
 * @description 获取密码加密密钥
 * @param params GetApiUsersEncryptionKeyRequestType
 * @returns Promise<GetApiUsersEncryptionKeyResultType>
 */
export interface GetApiUsersEncryptionKeyRequestType {}

/**
 * @description 获取密码加密密钥 的返回数据类型
 */
export interface GetApiUsersEncryptionKeyResultType {
  /** @description  */
  key: string
  /** @description  */
  keyId: string
}

/**
 * @description 获取密码加密密钥
 * @param params GetApiUsersEncryptionKeyRequestType
 * @returns Promise<GetApiUsersEncryptionKeyResultType>
 */
export async function getApiUsersEncryptionKeyFunc(
  params: GetApiUsersEncryptionKeyRequestType
): Promise<GetApiUsersEncryptionKeyResultType> {
  const config: RequestConfig = {
    url: '/api/users/encryption-key',
    method: 'GET',
    params,
  }
  return request<GetApiUsersEncryptionKeyResultType>(config)
}

/**
 * @description 检查用户角色
 * @param params GetApiUsersCheckRoleRequestType
 * @returns Promise<GetApiUsersCheckRoleResultType>
 */
export interface GetApiUsersCheckRoleRequestType {
  /** @description 用户 ID */
  id: string
  /** @description 角色编码 */
  roleCode: string
}

/**
 * @description 检查用户角色 的返回数据类型
 */
export interface GetApiUsersCheckRoleResultType {
  /** @description 响应数据 */
  data: Record<string, boolean>
}

/**
 * @description 检查用户角色
 * @param params GetApiUsersCheckRoleRequestType
 * @returns Promise<GetApiUsersCheckRoleResultType>
 */
export async function getApiUsersCheckRoleFunc(
  params: GetApiUsersCheckRoleRequestType
): Promise<GetApiUsersCheckRoleResultType> {
  const config: RequestConfig = {
    url: '/api/users/check-role',
    method: 'GET',
    params,
  }
  return request<GetApiUsersCheckRoleResultType>(config)
}

/**
 * @description 检查用户权限
 * @param params GetApiUsersCheckPermissionRequestType
 * @returns Promise<GetApiUsersCheckPermissionResultType>
 */
export interface GetApiUsersCheckPermissionRequestType {
  /** @description 用户 ID */
  id: string
  /** @description 操作动作 */
  action: string
  /** @description 资源名称 */
  resource: string
}

/**
 * @description 检查用户权限 的返回数据类型
 */
export interface GetApiUsersCheckPermissionResultType {
  /** @description 响应数据 */
  data: Record<string, boolean>
}

/**
 * @description 检查用户权限
 * @param params GetApiUsersCheckPermissionRequestType
 * @returns Promise<GetApiUsersCheckPermissionResultType>
 */
export async function getApiUsersCheckPermissionFunc(
  params: GetApiUsersCheckPermissionRequestType
): Promise<GetApiUsersCheckPermissionResultType> {
  const config: RequestConfig = {
    url: '/api/users/check-permission',
    method: 'GET',
    params,
  }
  return request<GetApiUsersCheckPermissionResultType>(config)
}

/**
 * @description 移除角色
 * @param params DeleteApiUsersRemoveRoleRequestType
 * @returns Promise<DeleteApiUsersRemoveRoleResultType>
 */
export interface DeleteApiUsersRemoveRoleRequestType {
  /** @description 用户 ID */
  id: string
  /** @description 角色 ID */
  roleId: string
}

/**
 * @description 移除角色 的返回数据类型
 */
export interface DeleteApiUsersRemoveRoleResultType {
  /** @description  */
  message: string
}

/**
 * @description 移除角色
 * @param params DeleteApiUsersRemoveRoleRequestType
 * @returns Promise<DeleteApiUsersRemoveRoleResultType>
 */
export async function deleteApiUsersRemoveRoleFunc(
  params: DeleteApiUsersRemoveRoleRequestType
): Promise<DeleteApiUsersRemoveRoleResultType> {
  const config: RequestConfig = {
    url: '/api/users/remove-role',
    method: 'DELETE',
    params,
  }
  return request<DeleteApiUsersRemoveRoleResultType>(config)
}

/**
 * @description 批量删除用户
 * @param params DeleteApiUsersBatchDeleteRequestType
 * @returns Promise<DeleteApiUsersBatchDeleteResultType>
 */
export interface DeleteApiUsersBatchDeleteRequestType {
  /** @description 用户 ID 列表（ULID，最多 50 个） */
  userIds: string[]
}

/**
 * @description 批量删除用户 的返回数据类型
 */
export interface DeleteApiUsersBatchDeleteResultType {
  /** @description  */
  count: number
  /** @description  */
  message: string
}

/**
 * @description 批量删除用户
 * @param params DeleteApiUsersBatchDeleteRequestType
 * @returns Promise<DeleteApiUsersBatchDeleteResultType>
 */
export async function deleteApiUsersBatchDeleteFunc(
  params: DeleteApiUsersBatchDeleteRequestType
): Promise<DeleteApiUsersBatchDeleteResultType> {
  const config: RequestConfig = {
    url: '/api/users/batch-delete',
    method: 'DELETE',
    data: params,
  }
  return request<DeleteApiUsersBatchDeleteResultType>(config)
}

/**
 * @description 查询个人资料
 * @param params GetApiUsersMeRequestType
 * @returns Promise<GetApiUsersMeResultType>
 */
export interface GetApiUsersMeRequestType {}

/**
 * @description 查询个人资料 的返回数据类型
 */
export interface GetApiUsersMeResultType {
  /** @description 用户 ID */
  id: string
  /** @description 邮箱 */
  email: string
  /** @description 用户名称 */
  name: string
  /** @description 头像文件 ID（展示直链经 /files/info 换取预签名 URL） */
  avatar: string | null
  /** @description 邮箱是否已验证 */
  emailVerified: boolean
  /** @description  */
  preferences: UserPreferences | null
  /** @description 最后登录 IP */
  lastLoginIp: string | null
  /** @description 最后登录时间 */
  lastLoginAt: string | null
  /** @description 登录次数 */
  loginCount: number
  /** @description 是否启用 */
  isActive: boolean
  /** @description 创建时间 */
  createdAt: string
  /** @description 更新时间 */
  updatedAt: string
}

/**
 * @description 查询个人资料
 * @param params GetApiUsersMeRequestType
 * @returns Promise<GetApiUsersMeResultType>
 */
export async function getApiUsersMeFunc(
  params: GetApiUsersMeRequestType
): Promise<GetApiUsersMeResultType> {
  const config: RequestConfig = {
    url: '/api/users/me',
    method: 'GET',
    params,
  }
  return request<GetApiUsersMeResultType>(config)
}

/**
 * @description 更新个人资料
 * @param params PutApiUsersMeRequestType
 * @returns Promise<PutApiUsersMeResultType>
 */
export interface PutApiUsersMeRequestType {
  /** @description 用户名称（2-50 字符） */
  name: string
  /** @description 头像文件 ID（来自文件服务上传接口；空字符串表示清除头像，不传表示不修改） */
  avatar?: string | null
}

/**
 * @description 更新个人资料 的返回数据类型
 */
export interface PutApiUsersMeResultType {
  /** @description 用户 ID */
  id: string
  /** @description 邮箱 */
  email: string
  /** @description 用户名称 */
  name: string
  /** @description 头像文件 ID（展示直链经 /files/info 换取预签名 URL） */
  avatar: string | null
  /** @description 邮箱是否已验证 */
  emailVerified: boolean
  /** @description  */
  preferences: UserPreferences | null
  /** @description 最后登录 IP */
  lastLoginIp: string | null
  /** @description 最后登录时间 */
  lastLoginAt: string | null
  /** @description 登录次数 */
  loginCount: number
  /** @description 是否启用 */
  isActive: boolean
  /** @description 创建时间 */
  createdAt: string
  /** @description 更新时间 */
  updatedAt: string
}

/**
 * @description 更新个人资料
 * @param params PutApiUsersMeRequestType
 * @returns Promise<PutApiUsersMeResultType>
 */
export async function putApiUsersMeFunc(
  params: PutApiUsersMeRequestType
): Promise<PutApiUsersMeResultType> {
  const config: RequestConfig = {
    url: '/api/users/me',
    method: 'PUT',
    data: params,
  }
  return request<PutApiUsersMeResultType>(config)
}

/**
 * @description 更新偏好设置
 * @param params PutApiUsersMePreferencesRequestType
 * @returns Promise<PutApiUsersMePreferencesResultType>
 */
export interface PutApiUsersMePreferencesRequestType {
  /** @description 主题，如 light / dark */
  theme?: string | null
  /** @description 语言，如 zh-CN / en-US */
  language?: string | null
  /** @description 时区，如 Asia/Shanghai */
  timezone?: string | null
  /** @description  */
  notifications?: NotificationPrefs | null
  /** @description  */
  privacy?: PrivacyPrefs | null
}

/**
 * @description 更新偏好设置 的返回数据类型
 */
export interface PutApiUsersMePreferencesResultType {
  /** @description 用户 ID */
  id: string
  /** @description 邮箱 */
  email: string
  /** @description 用户名称 */
  name: string
  /** @description 头像文件 ID（展示直链经 /files/info 换取预签名 URL） */
  avatar: string | null
  /** @description 邮箱是否已验证 */
  emailVerified: boolean
  /** @description  */
  preferences: UserPreferences | null
  /** @description 最后登录 IP */
  lastLoginIp: string | null
  /** @description 最后登录时间 */
  lastLoginAt: string | null
  /** @description 登录次数 */
  loginCount: number
  /** @description 是否启用 */
  isActive: boolean
  /** @description 创建时间 */
  createdAt: string
  /** @description 更新时间 */
  updatedAt: string
}

/**
 * @description 更新偏好设置
 * @param params PutApiUsersMePreferencesRequestType
 * @returns Promise<PutApiUsersMePreferencesResultType>
 */
export async function putApiUsersMePreferencesFunc(
  params: PutApiUsersMePreferencesRequestType
): Promise<PutApiUsersMePreferencesResultType> {
  const config: RequestConfig = {
    url: '/api/users/me/preferences',
    method: 'PUT',
    data: params,
  }
  return request<PutApiUsersMePreferencesResultType>(config)
}
