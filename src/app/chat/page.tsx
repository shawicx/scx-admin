'use client'

/**
 * @description AI 对话页（初版单会话）：历史加载、流式输出、停止生成、清空会话与未配置引导
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Eraser, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ChatInput } from '@/components/chat/chat-input'
import {
  ChatMessage,
  type ChatMessageItem,
} from '@/components/chat/chat-message'
import { toast } from '@/components/ui/use-toast'
import {
  AiApiError,
  clearAiMessages,
  getAiConfig,
  getAiMessages,
  streamChat,
  type AiModelConfig,
} from '@/lib/ai-client'

export default function ChatPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [config, setConfig] = useState<AiModelConfig | null>(null)
  const [messages, setMessages] = useState<ChatMessageItem[]>([])
  const [isStreaming, setIsStreaming] = useState(false)
  const abortRef = useRef<AbortController | null>(null)
  const seqRef = useRef(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const stickToBottomRef = useRef(true)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        const [cfg, history] = await Promise.all([
          getAiConfig(),
          getAiMessages(),
        ])
        if (cancelled) return
        setConfig(cfg)
        setMessages(
          history.map(message => ({
            id: message.id,
            role: message.role,
            content: message.content,
          }))
        )
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

  const handleSend = useCallback(
    async (content: string) => {
      if (isStreaming) return
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
          signal: controller.signal,
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
      }
    },
    [isStreaming]
  )

  const handleStop = () => {
    abortRef.current?.abort()
  }

  const handleClear = async () => {
    if (isStreaming) abortRef.current?.abort()
    try {
      await clearAiMessages()
      setMessages([])
      toast({ title: '成功', description: '会话已清空' })
    } catch (error) {
      console.error('清空会话失败:', error)
      toast({
        variant: 'destructive',
        title: '错误',
        description: error instanceof Error ? error.message : '清空会话失败',
      })
    }
  }

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

  return (
    <div className="flex h-[calc(100vh-7rem)] flex-col">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">AI 对话</h1>
          <p className="text-xs text-muted-foreground">
            {config.model} · 单会话
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleClear}
          disabled={messages.length === 0 || isStreaming}
        >
          <Eraser className="mr-2 h-4 w-4" />
          清空对话
        </Button>
      </div>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 space-y-6 overflow-y-auto pr-1"
      >
        {messages.length === 0 ? (
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
  )
}
