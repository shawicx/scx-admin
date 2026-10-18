'use client'

/**
 * @description 对话消息气泡：用户右侧主色纯文本，助手左侧 muted 气泡 + Markdown 渲染（代码块带复制按钮）
 */
import { useRef, useState, type ComponentProps } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Bot, Check, Copy, User } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ChatMessageItem {
  id: string
  role: 'user' | 'assistant'
  content: string
  /** 流式生成中（显示光标） */
  streaming?: boolean
  /** 生成失败/中止的提示 */
  error?: string | null
}

/**
 * @description 代码块渲染：hover 显示复制按钮，点击复制块内文本
 * @param props pre 原生属性
 */
function CodeBlock({ children, ...props }: ComponentProps<'pre'>) {
  const preRef = useRef<HTMLPreElement>(null)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const text = preRef.current?.innerText ?? ''
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (error) {
      console.error('复制代码失败:', error)
    }
  }

  return (
    <div className="group relative my-3">
      <button
        type="button"
        onClick={handleCopy}
        className="absolute right-2 top-2 flex items-center gap-1 rounded-md border border-zinc-700 bg-zinc-800 px-2 py-1 text-xs text-zinc-300 opacity-0 transition-opacity group-hover:opacity-100"
      >
        {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
        {copied ? '已复制' : '复制'}
      </button>
      <pre
        ref={preRef}
        className="overflow-x-auto rounded-md bg-zinc-950 p-3 text-xs leading-relaxed text-zinc-50"
        {...props}
      >
        {children}
      </pre>
    </div>
  )
}

/**
 * @description 单条消息渲染
 * @param message 消息（含流式/错误状态）
 */
export function ChatMessage({ message }: { message: ChatMessageItem }) {
  const isUser = message.role === 'user'

  return (
    <div className={cn('flex w-full gap-3', isUser && 'flex-row-reverse')}>
      <div
        className={cn(
          'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-muted-foreground'
        )}
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>
      <div
        className={cn(
          'max-w-[85%] rounded-lg px-4 py-2.5 text-sm leading-relaxed md:max-w-[75%]',
          isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'
        )}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap break-words">{message.content}</p>
        ) : (
          <div className="chat-markdown break-words">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{ pre: CodeBlock }}
            >
              {message.content}
            </ReactMarkdown>
            {message.streaming && (
              <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-current align-text-bottom" />
            )}
            {message.error && (
              <p className="mt-1 text-xs text-red-500">{message.error}</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
