/**
 * @description 密码登录请求
 */
export interface LoginWithPasswordDto {
  /** @description 邮箱地址 */
  email: string
  /** @description 前端加密后的密码（AES） */
  password: string
  /** @description 加密密钥 ID（来自 /users/encryption-key） */
  keyId: string
}
