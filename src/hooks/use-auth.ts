/*
 * @Author: shawicx d35f3153@proton.me
 * @Description: 登录相关
 */
import {
  postUsersLoginPasswordApi,
  getUsersEncryptionKeyApi,
  postUsersLogoutApi,
} from '@/service'
import { useState, useEffect } from 'react'
import type {
  PostUsersLoginPasswordRequestType,
  PostUsersLoginPasswordResponseType,
} from '@/service'
import { FrontendCrypto } from '@/lib/frontend-crypto'
import { IndexedDBManager } from '@/lib/indexeddb-manager'

export function useAuth() {
  const indexedDB = IndexedDBManager.getInstance()

  const login = async (
    params: Omit<PostUsersLoginPasswordRequestType, 'keyId'>
  ) => {
    try {
      // 获取加密密钥
      const keyResponse = await getUsersEncryptionKeyApi({})
      const { key, keyId } = keyResponse.data

      // 加密密码
      const encryptedPassword = FrontendCrypto.encrypt(params.password, key)

      // 调用登录接口
      const result = await postUsersLoginPasswordApi({
        ...params,
        password: encryptedPassword,
        keyId,
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
      console.error('Login failed:', error)
      return { success: false, error }
    }
  }

  const logout = async () => {
    // 从 IndexDB 中删除用户信息和访问令牌
    try {
      const userData = (await indexedDB.getItem(
        'user'
      )) as PostUsersLoginPasswordResponseType
      await postUsersLogoutApi({ userId: userData.id })
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

  return { login, logout, getAccessToken }
}
