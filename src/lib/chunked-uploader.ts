import axios from 'axios'
import CryptoJS from 'crypto-js'
import { IndexedDBManager } from '@/lib/indexeddb-manager'
import {
  postApiFilesUploadInitFunc,
  postApiFilesUploadSessionsCompleteByUploadIdFunc,
} from '@/service/file'
import type { FileResponseDto } from '@/service/file'

const MB = 1024 * 1024
const CHUNK_CONCURRENCY = 5
const CHUNK_TIMEOUT = 90 * 1000
const CHUNK_RETRY_TIMES = 3
const RETRY_BASE_DELAY = 1000

export interface ChunkedUploadProgress {
  uploadedBytes: number
  totalBytes: number
}

export interface ChunkedUploadOptions {
  signal?: AbortSignal
  concurrency?: number
  onProgress?: (progress: ChunkedUploadProgress) => void
}

export interface ChunkedUploadResult {
  file: FileResponseDto
  instant: boolean
}

async function computeFileSha256(file: File): Promise<string> {
  if (crypto?.subtle) {
    const buffer = await file.arrayBuffer()
    const digest = await crypto.subtle.digest('SHA-256', buffer)
    return Array.from(new Uint8Array(digest))
      .map(byte => byte.toString(16).padStart(2, '0'))
      .join('')
  }
  // HTTP 非 localhost 的部署环境是非安全上下文，crypto.subtle 不可用，回退纯 JS 增量哈希
  const hasher = CryptoJS.algo.SHA256.create()
  const step = 4 * 1024 * 1024
  for (let offset = 0; offset < file.size; offset += step) {
    const buffer = await file.slice(offset, offset + step).arrayBuffer()
    hasher.update(CryptoJS.lib.WordArray.create(buffer))
  }
  return hasher.finalize().toString(CryptoJS.enc.Hex)
}

function decideChunkSize(size: number): number {
  if (size > 1024 * MB) return 32 * MB
  if (size > 200 * MB) return 16 * MB
  return 5 * MB
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

interface ChunkApiResponse {
  statusCode?: number
  message?: string
}

// 分片 PUT 不走生成的 service 函数：生成层无法携带二进制 body，
// 且 request.ts 硬编码 5s 超时会在大分片传输中被中断
async function uploadChunk(
  uploadId: string,
  partNumber: number,
  chunk: Blob,
  signal?: AbortSignal
): Promise<void> {
  const accessToken = await getAccessToken()
  const headers: Record<string, string> = {
    'Content-Type': 'application/octet-stream',
  }
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`
  }
  const response = await axios(
    `/api/files/upload/sessions/${uploadId}/chunks/${partNumber}`,
    {
      method: 'PUT',
      data: chunk,
      baseURL: process.env.NEXT_PUBLIC_BASE_PATH,
      timeout: CHUNK_TIMEOUT,
      signal,
      headers,
    }
  )
  const payload = response.data as ChunkApiResponse | undefined
  if (
    payload &&
    payload.statusCode !== undefined &&
    payload.statusCode >= 300
  ) {
    throw new Error(payload.message || '分片上传失败')
  }
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function isAbortError(error: unknown): boolean {
  return axios.isCancel(error) || (error as Error)?.name === 'AbortError'
}

async function uploadChunkWithRetry(
  uploadId: string,
  partNumber: number,
  chunk: Blob,
  signal?: AbortSignal
): Promise<void> {
  for (let attempt = 0; attempt <= CHUNK_RETRY_TIMES; attempt += 1) {
    if (signal?.aborted) {
      throw new DOMException('上传已取消', 'AbortError')
    }
    try {
      await uploadChunk(uploadId, partNumber, chunk, signal)
      return
    } catch (error) {
      if (isAbortError(error)) throw error
      if (attempt === CHUNK_RETRY_TIMES) throw error
      await delay(RETRY_BASE_DELAY * 2 ** attempt)
    }
  }
}

export async function uploadFileChunked(
  file: File,
  options: ChunkedUploadOptions = {}
): Promise<ChunkedUploadResult> {
  const { signal, onProgress } = options
  const concurrency = options.concurrency ?? CHUNK_CONCURRENCY

  const fileHash = await computeFileSha256(file)
  if (signal?.aborted) {
    throw new DOMException('上传已取消', 'AbortError')
  }

  const initResult = await postApiFilesUploadInitFunc({
    fileName: file.name,
    mimeType: file.type || 'application/octet-stream',
    size: file.size,
    chunkSize: decideChunkSize(file.size),
    fileHash,
  })

  if (initResult.instant && initResult.file) {
    onProgress?.({ uploadedBytes: file.size, totalBytes: file.size })
    return { file: initResult.file, instant: true }
  }

  const uploadId = initResult.uploadId
  if (!uploadId) {
    throw new Error('初始化分片上传失败：未返回上传会话')
  }

  const chunkSize = initResult.chunkSize
  const partSize = (part: number): number =>
    Math.min(chunkSize, file.size - (part - 1) * chunkSize)

  const uploadedSet = new Set(initResult.uploadedChunks)
  let uploadedBytes = 0
  uploadedSet.forEach(part => {
    uploadedBytes += partSize(part)
  })
  onProgress?.({ uploadedBytes, totalBytes: file.size })

  const pendingParts: number[] = []
  for (let part = 1; part <= initResult.totalChunks; part += 1) {
    if (!uploadedSet.has(part)) pendingParts.push(part)
  }

  if (pendingParts.length > 0) {
    let cursor = 0
    let firstError: unknown = null

    const worker = async (): Promise<void> => {
      while (cursor < pendingParts.length && !firstError && !signal?.aborted) {
        const part = pendingParts[cursor]
        cursor += 1
        try {
          const start = (part - 1) * chunkSize
          const chunk = file.slice(
            start,
            Math.min(start + chunkSize, file.size)
          )
          await uploadChunkWithRetry(uploadId, part, chunk, signal)
          uploadedBytes += partSize(part)
          onProgress?.({ uploadedBytes, totalBytes: file.size })
        } catch (error) {
          if (!isAbortError(error)) firstError = error
          return
        }
      }
    }

    const workerCount = Math.min(concurrency, pendingParts.length)
    await Promise.all(Array.from({ length: workerCount }, () => worker()))

    if (signal?.aborted) {
      throw new DOMException('上传已取消', 'AbortError')
    }
    if (firstError) throw firstError
  }

  const completedFile = await postApiFilesUploadSessionsCompleteByUploadIdFunc({
    uploadId,
  })
  return { file: completedFile, instant: false }
}
