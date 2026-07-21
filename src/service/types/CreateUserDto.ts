/**
 * @description 管理员创建用户请求
 */
export interface CreateUserDto {
  /** @description 邮箱地址 */
  email: string
  /** @description 用户名称（2-50 字符） */
  name: string
  /** @description 密码（8-50 字符，需含大小写字母、数字和特殊字符） */
  password: string
  /** @description 是否启用 */
  isActive?: boolean
  /** @description 初始分配的角色 ID 列表（最多 10 个） */
  roleIds?: any
}
