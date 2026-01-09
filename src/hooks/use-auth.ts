/**
 * @author: shawicx d35f3153@proton.me
 * @description: 登录相关
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
      const { key, keyId } = keyResponse || {}
      // 加密密码
      const encryptedPassword = FrontendCrypto.encrypt(params.password, key)

      // 调用登录接口，直接返回用户数据
      const user = await postUsersLoginPasswordApi({
        ...params,
        password: encryptedPassword,
        keyId,
      })
      console.log(user, 'user')
      // 将用户信息和访问令牌分别存储到 IndexDB
      try {
        await indexedDB.setItem('user', user)
        await indexedDB.setItem('accessToken', user.accessToken)
      } catch (error) {
        console.error('Failed to save user data to IndexedDB:', error)
        throw Error('登录失败')
      }
      return user
    } catch (error) {
      throw Error('密码登录失败')
    }
  }

  // 验证码登录
  const loginWithCode = async (params: PostUsersLoginRequestType) => {
    try {
      // 调用登录接口，直接返回用户数据
      const user = await postUsersLoginApi(params)

      // 将用户信息和访问令牌分别存储到 IndexDB
      try {
        await indexedDB.setItem('user', user)
        await indexedDB.setItem('accessToken', user.accessToken)
      } catch (error) {
        console.error('Failed to save user data to IndexedDB:', error)
      }
      return user
    } catch (error) {
      throw Error('验证码登录失败')
    }
  }

  // 注册
  const register = async (
    params: Omit<PostUsersRegisterRequestType, 'name'>
  ) => {
    try {
      // 调用注册接口，直接返回用户数据
      const user = await postUsersRegisterApi({
        ...params,
        name: params.email, // 使用邮箱作为用户名
      })

      // 将用户信息和访问令牌分别存储到 IndexDB
      try {
        await indexedDB.setItem('user', user)
        await indexedDB.setItem('accessToken', user.accessToken)
      } catch (error) {
        console.error('Failed to save user data to IndexedDB:', error)
      }
      return user
    } catch (error) {
      console.error('Registration failed:', error)
      throw Error('注册失败')
    }
  }

  // 发送验证码
  const sendVerificationCode = async (email: string) => {
    try {
      // 调用发送验证码接口
      return await postUsersSendEmailCodeApi({ email })
    } catch (error) {
      console.error('Failed to send verification code:', error)
      throw Error('发送验证码失败')
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
