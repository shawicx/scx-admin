import { useAuth } from '@/stores/auth'
import { getApiFilesInfoFunc } from '@/service/file'

export async function resolveAvatarUrl(
  fileId: string | null | undefined
): Promise<string | null> {
  if (!fileId) return null
  try {
    const info = await getApiFilesInfoFunc({ id: fileId })
    return info.url || null
  } catch (error) {
    console.error('解析头像 URL 失败:', error)
    return null
  }
}

export function applyUserAvatar(
  fileId: string | null | undefined
): Promise<void> {
  return resolveAvatarUrl(fileId).then(url => {
    if (url) {
      useAuth.setState(state => ({
        user: state.user ? { ...state.user, avatar: url } : state.user,
      }))
    }
  })
}
