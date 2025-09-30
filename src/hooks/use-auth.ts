/*
 * @Author: shawicx d35f3153@proton.me
 * @Description: 登录相关
 */
import {
  postUsersLoginPasswordApi,
  getUsersEncryptionKeyApi,
  postUsersLogoutApi,
  postUsersLoginApi,
  postUsersRegisterApi,
  postUsersSendEmailCodeApi,
} from '@/service'
import type {
  PostUsersLoginPasswordRequestType,
  PostUsersLoginPasswordResponseType,
  PostUsersLoginRequestType,
  PostUsersRegisterRequestType,
} from '@/service'
import { FrontendCrypto } from '@/lib/frontend-crypto'
import { IndexedDBManager } from '@/lib/indexeddb-manager'

export function useAuth() {
  const indexedDB = IndexedDBManager.getInstance()

  // 密码登录
  const login = async (
    params: Omit<PostUsersLoginPasswordRequestType, 'keyId'>
  ) => {
    try {
      // 获取加密密钥
      const keyResponse = await getUsersEncryptionKeyApi({})
      const { key, keyId } = keyResponse.data || {}
      // 加密密码
      const encryptedPassword = FrontendCrypto.encrypt(params.password, key)

      // 调用登录接口
      const result = await postUsersLoginPasswordApi({
        ...params,
        password: encryptedPassword,
        keyId,
      })
      // 将用户信息和访问令牌分别存储到 IndexDB
      try {
        await indexedDB.setItem('user', result.data)
        await indexedDB.setItem('accessToken', result.data.accessToken)
      } catch (error) {
        console.error('Failed to save user data to IndexedDB:', error)
      }
      return result
    } catch (error) {
      return { success: false, error }
    }
  }

  // 验证码登录
  const loginWithCode = async (params: PostUsersLoginRequestType) => {
    try {
      // 调用登录接口
      const result = await postUsersLoginApi(params)

      if (result.success) {
        // 将用户信息和访问令牌分别存储到 IndexDB
        try {
          await indexedDB.setItem('user', result.data)
          await indexedDB.setItem('accessToken', result.data.accessToken)
        } catch (error) {
          console.error('Failed to save user data to IndexedDB:', error)
        }
      }
      return result
    } catch (error) {
      return { success: false, error }
    }
  }

  // 注册
  const register = async (
    params: Omit<PostUsersRegisterRequestType, 'name'>
  ) => {
    try {
      // 调用注册接口
      const result = await postUsersRegisterApi({
        ...params,
        name: params.email, // 使用邮箱作为用户名
      })

      if (result.success) {
        // 将用户信息和访问令牌分别存储到 IndexDB
        try {
          await indexedDB.setItem('user', result.data)
          await indexedDB.setItem('accessToken', result.data.accessToken)
        } catch (error) {
          console.error('Failed to save user data to IndexedDB:', error)
        }
      }
      return result
    } catch (error) {
      console.error('Registration failed:', error)
      return { success: false, error }
    }
  }

  // 发送验证码
  const sendVerificationCode = async (email: string) => {
    try {
      // 调用发送验证码接口
      const result = await postUsersSendEmailCodeApi({ email })
      return result
    } catch (error) {
      console.error('Failed to send verification code:', error)
      return { success: false, error }
    }
  }

  const logout = async () => {
    // 从 IndexDB 中删除用户信息和访问令牌
    try {
      const userData = (await indexedDB.getItem(
        'user'
      )) as PostUsersLoginPasswordResponseType
      if (userData && userData.id) {
        await postUsersLogoutApi({ userId: userData.id })
      }
      await indexedDB.removeItem('user')
      await indexedDB.removeItem('accessToken')
    } catch (error) {
      console.error('Failed to remove user data from IndexedDB:', error)
    }
  }

  // 获取访问令牌
  const getAccessToken = async (): Promise<string | null> => {
    try {
      return await indexedDB.getItem('accessToken')
    } catch (error) {
      console.error('Failed to get access token from IndexedDB:', error)
      return null
    }
  }

  // 检查用户是否已登录
  const isAuthenticated = async (): Promise<boolean> => {
    try {
      const token = await getAccessToken()
      return !!token
    } catch (error) {
      console.error('Failed to check authentication status:', error)
      return false
    }
  }

  return {
    login,
    loginWithCode,
    register,
    sendVerificationCode,
    logout,
    getAccessToken,
    isAuthenticated,
  }
}
