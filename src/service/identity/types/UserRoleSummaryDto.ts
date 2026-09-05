/**
 * @description 用户角色摘要响应
 */
export interface UserRoleSummaryDto {
  /** @description 角色 ID */
  id: string
  /** @description 角色名称 */
  name: string
  /** @description 角色编码 */
  code: string
  /** @description 角色描述 */
  description?: string | null
}
