/**
 * @description 创建角色请求
 */
export interface CreateRoleDto {
  /** @description 角色名称（2-50 字符） */
  name: string
  /** @description 角色编码（2-50 字符，唯一） */
  code: string
  /** @description 角色描述（最长 255 字符） */
  description?: string | null
  /** @description 数据权限范围：ALL（全部）/ SELF（仅本人），缺省 SELF；部门级档位待部门体系上线后开放 */
  dataScope?: string | null
}
