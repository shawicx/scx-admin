/**
 * @description AI 流式对话客户端（fetch + ReadableStream 解析 SSE）
 *
 * 仅承载无法走生成层的流式传输：生成的 service 函数经 request.ts（5s 超时、
 * JSON 解析）无法处理 text/event-stream 长连接。普通 AI 接口一律使用
 * src/service/ai 的生成函数（api-power 生成），本文件不要新增非流式接口。
 */
import { IndexedDBManager } from '@/lib/indexeddb-manager'

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

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

async function getAccessToken(): Promise<string | null> {
  try {
    const indexedDB = IndexedDBManager.getInstance()
    return await indexedDB.getItem<string>('accessToken')
  } catch (error) {
    console.error('Failed to get access token from IndexedDB:', error)
    return null
  }
}

export interface StreamChatOptions {
  sessionId?: string
  signal?: AbortSignal
  /** 流式开始前回调（后端确定/新建会话后立即推送，中止场景下前端也已持有会话 ID） */
  onSession?: (session: { id: string; title: string }) => void
  onDelta: (text: string) => void
}

export interface StreamChatResult {
  sessionId: string
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
 * @description 流式发送消息：session/delta 事件回调，done 正常结束并返回会话 ID，error 抛错
 * @param content 用户消息内容
 * @param options 会话 ID、回调与中止信号
 * @returns Promise<StreamChatResult> 完成事件中的会话 ID
 *
 * @example await streamChat('你好', { onSession: s => fix(s.id), onDelta: append })
 */
export async function streamChat(
  content: string,
  options: StreamChatOptions
): Promise<StreamChatResult> {
  const accessToken = await getAccessToken()
  const response = await fetch(`${BASE_PATH}/api/ai/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    body: JSON.stringify({
      sessionId: options.sessionId ?? undefined,
      content,
    }),
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

  let sessionSeen = ''
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
        if (event.name === 'session') {
          const payload = JSON.parse(event.data) as {
            sessionId: string
            title: string
          }
          sessionSeen = payload.sessionId
          options.onSession?.({ id: payload.sessionId, title: payload.title })
        } else if (event.name === 'delta') {
          const payload = JSON.parse(event.data) as { content: string }
          if (payload.content) options.onDelta(payload.content)
        } else if (event.name === 'done') {
          const payload = JSON.parse(event.data) as {
            messageId: string
            sessionId: string
          }
          return { sessionId: payload.sessionId || sessionSeen }
        } else if (event.name === 'error') {
          const payload = JSON.parse(event.data) as { message: string }
          throw new AiApiError(9501, payload.message || 'AI 服务调用失败')
        }
      }
    }
    // 流意外截断（无 done 事件）：尽力返回已知的会话 ID
    return { sessionId: sessionSeen }
  } finally {
    reader.releaseLock()
  }
}
