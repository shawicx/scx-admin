/**
 * @description 批量删除用户请求
 */
export interface DeleteUsersDto {
  /** @description 用户 ID 列表（ULID，最多 50 个） */
  userIds: string[]
}
