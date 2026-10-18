'use client'

/**
 * @description 对话输入区：自适应高度 textarea，Enter 发送 / Shift+Enter 换行，流式中切换为停止按钮
 */
import { useRef, type KeyboardEvent } from 'react'
import { ArrowUp, Square } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ChatInputProps {
  onSend: (content: string) => void
  onStop: () => void
  isStreaming: boolean
  disabled?: boolean
}

const MAX_INPUT_HEIGHT = 160

export function ChatInput({
  onSend,
  onStop,
  isStreaming,
  disabled,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  /** 自适应高度：重置后按内容撑开，封顶 MAX_INPUT_HEIGHT */
  const autoResize = () => {
    const textarea = textareaRef.current
    if (!textarea) return
    textarea.style.height = 'auto'
    textarea.style.height = `${Math.min(textarea.scrollHeight, MAX_INPUT_HEIGHT)}px`
  }

  const handleSend = () => {
    const textarea = textareaRef.current
    const content = textarea?.value.trim() ?? ''
    if (!content || isStreaming || disabled) return
    onSend(content)
    if (textarea) textarea.value = ''
    autoResize()
    textarea?.focus()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    // isComposing：中文输入法选词回车不触发发送
    if (
      event.key === 'Enter' &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      event.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex items-end gap-2 rounded-lg border bg-background p-2">
      <textarea
        ref={textareaRef}
        rows={1}
        placeholder="输入消息，Enter 发送，Shift + Enter 换行"
        className="max-h-40 flex-1 resize-none bg-transparent px-2 py-1.5 text-sm outline-none placeholder:text-muted-foreground"
        disabled={disabled}
        onChange={autoResize}
        onKeyDown={handleKeyDown}
      />
      {isStreaming ? (
        <Button
          type="button"
          size="icon"
          variant="outline"
          onClick={onStop}
          title="停止生成"
        >
          <Square className="h-4 w-4" />
        </Button>
      ) : (
        <Button
          type="button"
          size="icon"
          onClick={handleSend}
          disabled={disabled}
          title="发送"
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
