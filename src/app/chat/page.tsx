'use client'

/**
 * @description AI 对话页（多会话）：会话侧边栏切换/新建/重命名/删除/清空全部，流式输出与未配置引导
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ChatInput } from '@/components/chat/chat-input'
import {
  ChatMessage,
  type ChatMessageItem,
} from '@/components/chat/chat-message'
import { RenameSessionDialog } from '@/components/chat/rename-session-dialog'
import { SessionSidebar } from '@/components/chat/session-sidebar'
import { toast } from '@/components/ui/use-toast'
import { AiApiError, streamChat } from '@/lib/ai-client'
import {
  deleteApiAiSessionsDeleteFunc,
  getApiAiConfigFunc,
  getApiAiMessagesFunc,
  getApiAiSessionsListFunc,
  postApiAiMessagesClearFunc,
  type ModelConfigResponseDto,
  type SessionResponseDto,
} from '@/service/ai'

export default function ChatPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [config, setConfig] = useState<ModelConfigResponseDto | null>(null)
  const [sessions, setSessions] = useState<SessionResponseDto[]>([])
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null)
  const [messages, setMessages] = useState<ChatMessageItem[]>([])
  const [isStreaming, setIsStreaming] = useState(false)
  const [isLoadingMessages, setIsLoadingMessages] = useState(false)
  const [renameTarget, setRenameTarget] = useState<SessionResponseDto | null>(
    null
  )
  const abortRef = useRef<AbortController | null>(null)
  const seqRef = useRef(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const stickToBottomRef = useRef(true)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        const [cfg, sessionResult] = await Promise.all([
          getApiAiConfigFunc({}),
          getApiAiSessionsListFunc({}),
        ])
        if (cancelled) return
        setConfig(cfg)
        setSessions(sessionResult.list)
      } catch (error) {
        console.error('加载 AI 对话数据失败:', error)
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }
    void load()
    return () => {
      cancelled = true
    }
  }, [])

  // 新消息时自动滚底（用户上滚后暂停跟随）
  useEffect(() => {
    if (stickToBottomRef.current && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleScroll = () => {
    const element = scrollRef.current
    if (!element) return
    stickToBottomRef.current =
      element.scrollHeight - element.scrollTop - element.clientHeight < 80
  }

  /** 静默刷新会话列表（新会话落列表、活跃时间重排） */
  const refreshSessions = useCallback(async () => {
    try {
      const result = await getApiAiSessionsListFunc({})
      setSessions(result.list)
    } catch (error) {
      console.error('刷新会话列表失败:', error)
    }
  }, [])

  const handleSelectSession = useCallback(
    async (sessionId: string) => {
      if (sessionId === currentSessionId) return
      abortRef.current?.abort()
      setCurrentSessionId(sessionId)
      setMessages([])
      setIsLoadingMessages(true)
      try {
        const history = await getApiAiMessagesFunc({ sessionId })
        setMessages(
          history.list.map(message => ({
            id: message.id,
            role: message.role as ChatMessageItem['role'],
            content: message.content,
          }))
        )
      } catch (error) {
        // 业务/网络错误已由 request.ts 统一 toast，这里只记录
        console.error('加载会话消息失败:', error)
      } finally {
        setIsLoadingMessages(false)
      }
    },
    [currentSessionId]
  )

  const handleNewChat = useCallback(() => {
    abortRef.current?.abort()
    setCurrentSessionId(null)
    setMessages([])
  }, [])

  const handleSend = useCallback(
    async (content: string) => {
      if (isStreaming) return
      // 发送瞬间固化会话归属：onSession 仅在"新对话"时更新选中态
      const sendSessionId = currentSessionId
      const assistantId = `local-assistant-${(seqRef.current += 1)}`
      setMessages(previous => [
        ...previous,
        {
          id: `local-user-${(seqRef.current += 1)}`,
          role: 'user',
          content,
        },
        { id: assistantId, role: 'assistant', content: '', streaming: true },
      ])
      setIsStreaming(true)
      stickToBottomRef.current = true
      const controller = new AbortController()
      abortRef.current = controller
      try {
        await streamChat(content, {
          sessionId: sendSessionId ?? undefined,
          onSession: session => {
            if (!sendSessionId) setCurrentSessionId(session.id)
          },
          onDelta: piece =>
            setMessages(previous =>
              previous.map(message =>
                message.id === assistantId
                  ? { ...message, content: message.content + piece }
                  : message
              )
            ),
        })
        setMessages(previous =>
          previous.map(message =>
            message.id === assistantId
              ? { ...message, streaming: false }
              : message
          )
        )
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          // 用户停止：后端已落库已生成部分，前端移除空占位并结束流式态
          setMessages(previous =>
            previous
              .filter(
                message => !(message.id === assistantId && !message.content)
              )
              .map(message =>
                message.id === assistantId && message.content
                  ? { ...message, streaming: false, error: '已停止生成' }
                  : message
              )
          )
        } else if (error instanceof AiApiError && error.statusCode === 9500) {
          setConfig(null)
          setMessages(previous =>
            previous.filter(message => message.id !== assistantId)
          )
          toast({
            variant: 'destructive',
            title: '提示',
            description: error.message,
          })
        } else {
          const message = error instanceof Error ? error.message : 'AI 对话失败'
          setMessages(previous =>
            previous.map(item =>
              item.id === assistantId
                ? { ...item, streaming: false, error: message }
                : item
            )
          )
        }
      } finally {
        setIsStreaming(false)
        abortRef.current = null
        // 新会话入列表 / 既有会话活跃置顶
        void refreshSessions()
      }
    },
    [isStreaming, currentSessionId, refreshSessions]
  )

  const handleStop = () => {
    abortRef.current?.abort()
  }

  const handleDeleteSession = useCallback(
    async (session: SessionResponseDto) => {
      if (isStreaming && session.id === currentSessionId) {
        abortRef.current?.abort()
      }
      try {
        await deleteApiAiSessionsDeleteFunc({ id: session.id })
        setSessions(previous => previous.filter(item => item.id !== session.id))
        if (session.id === currentSessionId) {
          setCurrentSessionId(null)
          setMessages([])
        }
        toast({ title: '成功', description: '会话已删除' })
      } catch (error) {
        console.error('删除会话失败:', error)
      }
    },
    [isStreaming, currentSessionId]
  )

  const handleClearAll = useCallback(async () => {
    if (isStreaming) abortRef.current?.abort()
    try {
      await postApiAiMessagesClearFunc({})
      setSessions([])
      setCurrentSessionId(null)
      setMessages([])
      toast({ title: '成功', description: '全部会话已清空' })
    } catch (error) {
      console.error('清空全部会话失败:', error)
    }
  }, [isStreaming])

  const handleRenamed = useCallback((updated: SessionResponseDto) => {
    setSessions(previous =>
      previous.map(item => (item.id === updated.id ? updated : item))
    )
  }, [])

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-2 text-sm text-gray-500">正在加载对话...</p>
        </div>
      </div>
    )
  }

  if (!config || !config.hasApiKey) {
    return (
      <div className="flex h-[calc(100vh-7rem)] flex-col items-center justify-center gap-4 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
          <Sparkles className="h-7 w-7 text-muted-foreground" />
        </div>
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">尚未配置 AI 模型</h2>
          <p className="text-sm text-muted-foreground">
            请先在个人中心填写 OpenAI 兼容的 API 地址、模型名与 API Key
          </p>
        </div>
        <Button asChild>
          <Link href="/profile">
            <Sparkles className="mr-2 h-4 w-4" />
            去个人中心配置
          </Link>
        </Button>
      </div>
    )
  }

  const currentSession = sessions.find(
    session => session.id === currentSessionId
  )
  const headerTitle = currentSession?.title ?? '新对话'

  return (
    <div className="flex h-[calc(100vh-7rem)] gap-4">
      <SessionSidebar
        sessions={sessions}
        currentSessionId={currentSessionId}
        disabled={isStreaming}
        onSelect={handleSelectSession}
        onNew={handleNewChat}
        onRename={setRenameTarget}
        onDelete={handleDeleteSession}
        onClearAll={handleClearAll}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="mb-3 flex items-center justify-between">
          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold" title={headerTitle}>
              {headerTitle}
            </h1>
            <p className="text-xs text-muted-foreground">
              {config.model} · {sessions.length} 个会话
            </p>
          </div>
        </div>
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex-1 space-y-6 overflow-y-auto pr-1"
        >
          {isLoadingMessages ? (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              正在加载会话消息...
            </div>
          ) : !currentSessionId && messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-center text-muted-foreground">
              <Sparkles className="h-8 w-8" />
              <p className="text-sm">新建对话，或从左侧选择一个历史会话</p>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-center text-muted-foreground">
              <Sparkles className="h-8 w-8" />
              <p className="text-sm">开始你的第一段对话吧</p>
            </div>
          ) : (
            messages.map(message => (
              <ChatMessage key={message.id} message={message} />
            ))
          )}
        </div>
        <div className="mt-3">
          <ChatInput
            onSend={handleSend}
            onStop={handleStop}
            isStreaming={isStreaming}
          />
        </div>
      </div>
      <RenameSessionDialog
        session={renameTarget}
        open={renameTarget !== null}
        onOpenChange={open => {
          if (!open) setRenameTarget(null)
        }}
        onRenamed={handleRenamed}
      />
    </div>
  )
}
