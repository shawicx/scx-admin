/**
 * @description AI 对话与模型配置直连客户端（fetch 实现）
 *
 * 不走生成的 service 函数与 request.ts 封装：生成层无法从 Apifox 同步本组新接口，
 * 且 request.ts 硬编码 5s 超时会中断 LLM 流式长连接（与 chunked-uploader 同理）。
 * 流式对话用 fetch + ReadableStream 逐行解析 SSE（event: delta/done/error）。
 */
import { IndexedDBManager } from '@/lib/indexeddb-manager'

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

const HTTP_TIMEOUT_MS = 15 * 1000

/** AI 模块业务错误（statusCode 为后端 SystemErrorCode，如 9500 未配置模型） */
export class AiApiError extends Error {
  readonly statusCode: number

  constructor(statusCode: number, message: string) {
    super(message)
    this.name = 'AiApiError'
    this.statusCode = statusCode
  }
}

interface ApiResponse<T> {
  success: boolean
  statusCode: number
  message: string
  data: T
  timestamp: number
  path: string
}

export interface AiModelConfig {
  id: string
  baseUrl: string
  model: string
  systemPrompt: string | null
  temperature: number | null
  hasApiKey: boolean
  apiKeyMasked: string | null
  createdAt: string
  updatedAt: string
}

export interface SaveAiConfigParams {
  baseUrl: string
  apiKey?: string
  model: string
  systemPrompt?: string
  temperature?: number | null
}

export interface TestConnectionResult {
  ok: boolean
  latencyMs: number
  message: string
}

export interface AiMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: string
}

async function getAccessToken(): Promise<string | null> {
  try {
    const indexedDB = IndexedDBManager.getInstance()
    return await indexedDB.getItem<string>('accessToken')
  } catch (error) {
    console.error('Failed to get access token from IndexedDB:', error)
    return null
  }
}

/**
 * @description 非流式请求统一封装：附 Bearer 头、解 ApiResponse 包装、抛业务错误
 * @param path 接口路径（以 /api 开头）
 * @param init fetch 初始化参数
 * @returns Promise<T> data 字段内容
 */
async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const accessToken = await getAccessToken()
  const response = await fetch(`${BASE_PATH}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...init.headers,
    },
    signal: init.signal ?? AbortSignal.timeout(HTTP_TIMEOUT_MS),
  })

  const body = (await response
    .json()
    .catch(() => null)) as ApiResponse<T> | null
  if (!response.ok || !body?.success) {
    throw new AiApiError(
      body?.statusCode ?? response.status,
      body?.message ?? 'AI 接口请求失败'
    )
  }
  return body.data
}

/**
 * @description 查询当前用户 AI 模型配置（apiKey 仅掩码）
 * @returns Promise<AiModelConfig | null> 未配置时为 null
 */
export function getAiConfig(): Promise<AiModelConfig | null> {
  return request<AiModelConfig | null>('/api/ai/config')
}

/**
 * @description 保存 AI 模型配置（apiKey 已保存过且传空表示保留原值）
 * @param params 配置内容
 * @returns Promise<AiModelConfig> 保存后的配置（apiKey 掩码）
 */
export function saveAiConfig(
  params: SaveAiConfigParams
): Promise<AiModelConfig> {
  return request<AiModelConfig>('/api/ai/config/save', {
    method: 'POST',
    body: JSON.stringify(params),
  })
}

/**
 * @description 连通性测试（apiKey 传空时回退用已保存的 Key）
 * @param params 测试参数
 * @returns Promise<TestConnectionResult> 测试结果
 */
export function testAiConnection(params: {
  baseUrl: string
  apiKey?: string
}): Promise<TestConnectionResult> {
  return request<TestConnectionResult>('/api/ai/config/test', {
    method: 'POST',
    body: JSON.stringify(params),
  })
}

/**
 * @description 拉取历史消息（最近 200 条，时间正序）
 * @returns Promise<AiMessage[]> 消息列表
 */
export async function getAiMessages(): Promise<AiMessage[]> {
  const result = await request<{ list: AiMessage[] }>('/api/ai/messages')
  return result.list
}

/**
 * @description 清空会话（删除当前用户全部消息）
 * @returns Promise<void>
 */
export async function clearAiMessages(): Promise<void> {
  await request<unknown>('/api/ai/messages/clear', { method: 'POST' })
}

export interface StreamChatOptions {
  signal?: AbortSignal
  onDelta: (text: string) => void
}

interface SseEvent {
  name: string
  data: string
}

/**
 * @description 解析单个 SSE 事件块（event: xxx / data: yyy 两行）
 * @param raw 事件块原文（不含结尾空行）
 * @returns SseEvent | null 非法块返回 null
 */
function parseSseEvent(raw: string): SseEvent | null {
  let name = ''
  let data = ''
  for (const line of raw.split('\n')) {
    if (line.startsWith('event:')) {
      name = line.slice('event:'.length).trim()
    } else if (line.startsWith('data:')) {
      data += line.slice('data:'.length).trim()
    }
  }
  return name && data ? { name, data } : null
}

/**
 * @description 流式发送消息：逐增量回调 onDelta，done 正常结束，error 抛错
 * @param content 用户消息内容
 * @param options 回调与中止信号
 * @returns Promise<void>
 *
 * @example await streamChat('你好', { onDelta: piece => append(piece) })
 */
export async function streamChat(
  content: string,
  options: StreamChatOptions
): Promise<void> {
  const accessToken = await getAccessToken()
  const response = await fetch(`${BASE_PATH}/api/ai/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    body: JSON.stringify({ content }),
    signal: options.signal,
  })

  // 未配置模型等业务错误以 JSON 返回（非 SSE），统一转 AiApiError
  const contentType = response.headers.get('content-type') ?? ''
  if (!response.ok || !contentType.includes('text/event-stream')) {
    const body = (await response
      .json()
      .catch(() => null)) as ApiResponse<unknown> | null
    throw new AiApiError(
      body?.statusCode ?? response.status,
      body?.message ?? 'AI 对话请求失败'
    )
  }

  const reader = response.body?.getReader()
  if (!reader) throw new AiApiError(9300, '浏览器不支持流式读取')

  const decoder = new TextDecoder()
  let buffer = ''
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      buffer += decoder.decode(value, { stream: true })

      let separatorIndex: number
      while ((separatorIndex = buffer.indexOf('\n\n')) !== -1) {
        const raw = buffer.slice(0, separatorIndex)
        buffer = buffer.slice(separatorIndex + 2)
        const event = parseSseEvent(raw)
        if (!event) continue
        if (event.name === 'delta') {
          const payload = JSON.parse(event.data) as { content: string }
          if (payload.content) options.onDelta(payload.content)
        } else if (event.name === 'done') {
          return
        } else if (event.name === 'error') {
          const payload = JSON.parse(event.data) as { message: string }
          throw new AiApiError(9501, payload.message || 'AI 服务调用失败')
        }
      }
    }
  } finally {
    reader.releaseLock()
  }
}
