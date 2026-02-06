import { RequestMethod } from '@scxfe/api-tool'
import type { AxiosError, AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { IndexedDBManager } from '@/lib/indexeddb-manager'
import { toast } from '@/components/ui/use-toast'

type ValueOf<T> = T[keyof T]

export enum SystemErrorCode {
  MISSING_TOKEN = 9000,
  INVALID_PARAMETER = 9001,
  DATA_NOT_FOUND = 9002,
  INSUFFICIENT_PERMISSION = 9003,
  EMAIL_EXISTS = 9004,
  INVALID_VERIFICATION_CODE = 9005,
  INVALID_CREDENTIALS = 9006,
  RESOURCE_EXISTS = 9007,
  OPERATION_FAILED = 9008,
  SERVICE_UNAVAILABLE = 9009,
  KEY_EXPIRED = 9010,
  DECRYPTION_FAILED = 9011,
  BUSINESS_RULE_VIOLATION = 9012,
  ACCOUNT_DISABLED = 9013,
}

export interface RequestConfig extends AxiosRequestConfig {
  url: string
  method: string
}

interface BaseRes<D> {
  data: D
  success: boolean
}

type Method = ValueOf<typeof RequestMethod>

// 取消请求白名单
const CANCEL_WHITE_LIST: Array<{ path: string; method: Method }> = []

// 超时时间
const TIMEOUT = 5 * 1000

// 请求队列
const pendingRequests = new Map()

// token 请求状态码
const HttpStatus = {
  OK: 200,
  Redirection: 300,
  OK_OTHER: 9200,
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  InternalServerError: 500,
  UnKnownError: 9300,
  ClientError: 9400,
  ServerError: 9500,
} as const

type HttpStatus = (typeof HttpStatus)[keyof typeof HttpStatus]

// 扩展 HttpStatus 类型以包含所有可能的值
type ExtendedHttpStatus = HttpStatus | 200 | 300 | 9200

// https 状态提示语
const HttpStatusMessage = new Map<HttpStatus, string>([
  [HttpStatus.BadRequest, '参数错误'],
  [HttpStatus.Unauthorized, '未授权'],
  [HttpStatus.Forbidden, '禁止访问'],
  [HttpStatus.NotFound, '请求不存在'],
  [HttpStatus.InternalServerError, '服务器错误'],
  [HttpStatus.ClientError, '客户端错误'],
  [HttpStatus.ServerError, '服务器错误'],
  [HttpStatus.UnKnownError, '未知错误'],
])

// 业务错误码提示语
const SystemErrorCodeMessage = new Map<SystemErrorCode, string>([
  [SystemErrorCode.MISSING_TOKEN, '缺少token'],
  [SystemErrorCode.INVALID_PARAMETER, '请求参数错误'],
  [SystemErrorCode.DATA_NOT_FOUND, '数据未找到'],
  [SystemErrorCode.INSUFFICIENT_PERMISSION, '权限不足'],
  [SystemErrorCode.EMAIL_EXISTS, '邮箱已存在'],
  [SystemErrorCode.INVALID_VERIFICATION_CODE, '验证码无效'],
  [SystemErrorCode.INVALID_CREDENTIALS, '登录凭据无效'],
  [SystemErrorCode.RESOURCE_EXISTS, '资源已存在'],
  [SystemErrorCode.OPERATION_FAILED, '操作失败'],
  [SystemErrorCode.SERVICE_UNAVAILABLE, '服务不可用'],
  [SystemErrorCode.KEY_EXPIRED, '密钥过期'],
  [SystemErrorCode.DECRYPTION_FAILED, '解密失败'],
  [SystemErrorCode.BUSINESS_RULE_VIOLATION, '业务规则限制'],
  [SystemErrorCode.ACCOUNT_DISABLED, '账户已禁用'],
])

const getText = (type: 'error' | 'success' | 'warning' | 'info') => {
  switch (type) {
    case 'error':
      return '错误'
    case 'success':
      return '成功'
    case 'warning':
      return '警告'
    case 'info':
      return '提示'
    default:
      return '提示'
  }
}

// 添加消息提示函数
function showMessage(
  message: string,
  type: 'error' | 'success' | 'warning' | 'info' = 'error'
) {
  const text = getText(type)
  const variant = type === 'error' ? 'destructive' : 'default'
  // 使用项目中的 toast 组件显示消息
  toast({
    variant,
    title: text,
    description: message,
  })
}

function hashObject(obj: unknown): string {
  const str = JSON.stringify(obj)
  // 使用简单的哈希算法，在实际使用时可以选择 crypto
  return str
    .split('')
    .reduce((hash, char) => {
      return ((hash << 5) - hash + char.charCodeAt(0)) | 0
    }, 0)
    .toString(36)
}

// 根据请求得到的唯一值，用于取消重复请求
function getRequestKey(
  url: string,
  { method, params, data }: AxiosRequestConfig
): string {
  // 使用 URL 对象处理 url
  const urlObj = new URL(url, window.location.origin)

  // 使用 crypto 生成更短的唯一标识
  const paramsHash = params ? hashObject(params) : ''
  const dataHash = data ? hashObject(data) : ''

  return `${method}:${urlObj.pathname}:${paramsHash}:${dataHash}`
}

function handleError(error: AxiosError) {
  if (axios.isCancel(error)) {
    // showMessage('请求已被取消: ' + error.message, 'warning')
  } else {
    const responseError =
      (error as AxiosError<any>).response?.data?.message || ''
    if (responseError) {
      showMessage('请求失败: ' + responseError, 'error')
      return
    }
    showMessage('请求失败: ' + (error as Error).message, 'error')
  }
}

function getHttpStatus(statusCode: number): HttpStatus {
  // 请求完成
  if (statusCode >= HttpStatus.OK) {
    return HttpStatus.OK
  }

  if (statusCode > HttpStatus.OK && statusCode < HttpStatus.Redirection) {
    return HttpStatus.OK_OTHER
  }

  if (
    statusCode >= HttpStatus.Redirection &&
    statusCode < HttpStatus.BadRequest
  ) {
    return HttpStatus.Redirection
  }

  if (
    statusCode >= HttpStatus.BadRequest &&
    statusCode < HttpStatus.ServerError
  ) {
    switch (statusCode) {
      case HttpStatus.BadRequest:
        return HttpStatus.BadRequest
      case HttpStatus.Unauthorized:
        return HttpStatus.Unauthorized
      case HttpStatus.Forbidden:
        return HttpStatus.Forbidden
      case HttpStatus.NotFound:
        return HttpStatus.NotFound
      default:
        return HttpStatus.ClientError
    }
  }

  if (statusCode > HttpStatus.InternalServerError) {
    return HttpStatus.ServerError
  }

  return HttpStatus.UnKnownError
}

export async function request<D>(config: AxiosRequestConfig): Promise<D> {
  const url = config.url as string
  const controller = new AbortController()
  // 生成请求键值
  const requestKey = getRequestKey(url, config)
  const { signal } = controller
  config.signal = signal
  // 如果重复请求 且不是白名单中的请求路径,取消前一个
  if (
    pendingRequests.has(requestKey) &&
    !CANCEL_WHITE_LIST.some(
      item => item.path === url && item.method === config.method
    )
  ) {
    pendingRequests.get(requestKey).abort()
  }
  pendingRequests.set(requestKey, controller)

  // 获取访问令牌
  let accessToken = null
  try {
    const indexedDB = IndexedDBManager.getInstance()
    accessToken = await indexedDB.getItem('accessToken')
  } catch (error) {
    console.error('Failed to get access token from IndexedDB:', error)
  }

  // const secret = AESToken(BASE_LINE_KEY_24);
  const { headers = {}, params: configParams, ...axiosRequestConfig } = config

  // 防止 GET 请求缓存GET
  // const t = new Date().getTime()
  const isGetRequest = config.method === 'GET'
  const params = isGetRequest ? { ...configParams } : {}
  try {
    const response = await axios(url, {
      headers: {
        ...headers,
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
      ...axiosRequestConfig,
      baseURL: process.env.PUBLIC_BASE_PATH,
      timeout: TIMEOUT,
      params: isGetRequest ? params : configParams,
    })
    const { status } = response
    const httpStatus = getHttpStatus(status)
    const httpStatusMessage = HttpStatusMessage.get(httpStatus)
    if (
      [HttpStatus.OK, HttpStatus.OK_OTHER, HttpStatus.Redirection].includes(
        httpStatus as any
      )
    ) {
      if (response.data?.statusCode >= HttpStatus.Redirection) {
        const statusCode = response.data?.statusCode
        const errorMessage = response.data.message

        if (statusCode) {
          const businessErrorMessage = SystemErrorCodeMessage.get(
            statusCode as SystemErrorCode
          )
          const displayMessage = errorMessage || businessErrorMessage
          showMessage(`${statusCode} ${displayMessage}`, 'error')
          throw new Error(displayMessage)
        } else {
          const fullErrorMessage = `${statusCode} ${errorMessage} ${response.data.status}`
          showMessage(fullErrorMessage, 'error')
          throw new Error(fullErrorMessage)
        }
      }
      // 从响应中提取 data 字段并返回
      return response.data.data as D
    } else {
      const message = httpStatusMessage ?? '未知错误'
      showMessage(message, 'error')
      return response.data.data as D
    }
  } catch (error) {
    handleError(error as AxiosError)
    throw error
  } finally {
    pendingRequests.delete(requestKey)
  }
}
