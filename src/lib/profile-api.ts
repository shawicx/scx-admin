import { RequestConfig, request } from '@/service/request'

// 临时封装：更新资料接口后端开发中，待 npx api-power generate 生成 service 层后替换本文件
export interface UpdateProfileParams {
  /** @description 用户名称 */
  name: string
  /** @description 头像 URL（来自文件上传接口） */
  avatar?: string
}

export interface UpdateProfileResult {
  id: string
  email: string
  name: string
  avatar?: string | null
}

export async function patchUsersProfileApi(
  params: UpdateProfileParams
): Promise<UpdateProfileResult> {
  const config: RequestConfig = {
    url: '/api/users/profile',
    method: 'PATCH',
    data: params,
  }
  return request<UpdateProfileResult>(config)
}
