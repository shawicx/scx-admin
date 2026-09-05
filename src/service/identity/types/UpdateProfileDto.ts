/**
 * @description 更新个人资料请求
 */
export interface UpdateProfileDto {
  /** @description 用户名称（2-50 字符） */
  name: string
  /** @description 头像文件 ID（来自文件服务上传接口；空字符串表示清除头像，不传表示不修改） */
  avatar?: string | null
}
