'use client'

import {
  forwardRef,
  useRef,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {
  Bold,
  Italic,
  Strikethrough,
  Heading2,
  Heading3,
  Quote,
  Code,
  SquareCode,
  Link2,
  List,
  ListOrdered,
  Table,
  ImagePlus,
  Paperclip,
  Loader2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { postApiFilesUploadFunc } from '@/service/file'
import type { FileResponseDto } from '@/service/file'
import { uploadFileChunked } from '@/lib/chunked-uploader'
import { formatFileSize } from '@/lib/utils'
import { toast } from '@/components/ui/use-toast'

const CHUNKED_UPLOAD_THRESHOLD = 10 * 1024 * 1024
const API_BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

interface MarkdownEditorProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  minHeight?: number
}

/**
 * @description 上传单个文件（≥10MB 自动走分片上传，与文件管理弹窗一致）
 */
async function uploadFile(
  file: File,
  onProgress?: (percent: number) => void
): Promise<FileResponseDto> {
  if (file.size >= CHUNKED_UPLOAD_THRESHOLD) {
    const { file: uploaded } = await uploadFileChunked(file, {
      onProgress: ({ uploadedBytes, totalBytes }) =>
        onProgress?.(
          Math.min(100, Math.floor((uploadedBytes / totalBytes) * 100))
        ),
    })
    return uploaded
  }
  return await postApiFilesUploadFunc({ file })
}

/** Markdown 链接文本中的方括号转义 */
function escapeLabel(name: string): string {
  return name.replace(/\[/g, '\\[').replace(/\]/g, '\\]')
}

/** 预览用资源地址：/api 开头的站内引用补上网关基地址 */
function resolveSrc(src?: string): string {
  if (src && src.startsWith('/api/')) return `${API_BASE}${src}`
  return src ?? ''
}

interface ToolbarAction {
  icon: ReactNode
  title: string
  onClick: () => void
}

/**
 * @description Markdown 富文本编辑器（工具栏 + 图片/附件上传 + 粘贴/拖放上传 + 预览）
 *
 * 内容仍以 Markdown 纯文本存储：图片/附件上传后插入稳定 URL
 * `/api/files/{id}/content`（file-service 公开端点 302 到预签名直链）。
 */
export const MarkdownEditor = forwardRef<
  HTMLTextAreaElement,
  MarkdownEditorProps
>(({ minHeight = 420, ...props }, ref) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const imageInputRef = useRef<HTMLInputElement | null>(null)
  const attachInputRef = useRef<HTMLInputElement | null>(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [previewValue, setPreviewValue] = useState('')

  const setNativeValue = (
    value: string,
    selectStart: number,
    selectEnd: number
  ) => {
    const el = textareaRef.current
    if (!el) return
    const setter = Object.getOwnPropertyDescriptor(
      HTMLTextAreaElement.prototype,
      'value'
    )?.set
    setter?.call(el, value)
    el.dispatchEvent(new Event('input', { bubbles: true }))
    requestAnimationFrame(() => {
      el.focus()
      el.setSelectionRange(selectStart, selectEnd)
    })
  }

  /** 用前后缀包裹选中文本（无选中时插入占位符） */
  const wrapSelection = (
    before: string,
    after: string,
    placeholder: string
  ) => {
    const el = textareaRef.current
    if (!el) return
    const { selectionStart: start, selectionEnd: end, value } = el
    const selected = value.slice(start, end) || placeholder
    const next = `${value.slice(0, start)}${before}${selected}${after}${value.slice(end)}`
    setNativeValue(
      next,
      start + before.length,
      start + before.length + selected.length
    )
  }

  /** 给选中（或光标所在）的每一行加前缀，已有前缀则移除（切换语义） */
  const toggleLinePrefix = (prefix: string) => {
    const el = textareaRef.current
    if (!el) return
    const { selectionStart: start, selectionEnd: end, value } = el
    const lineStart = value.lastIndexOf('\n', start - 1) + 1
    const lineEnd =
      value.indexOf('\n', end) === -1 ? value.length : value.indexOf('\n', end)
    const lines = value.slice(lineStart, lineEnd).split('\n')
    const allPrefixed = lines.every(line => line.startsWith(prefix))
    const nextBlock = lines
      .map(line =>
        allPrefixed ? line.slice(prefix.length) : `${prefix}${line}`
      )
      .join('\n')
    const next = value.slice(0, lineStart) + nextBlock + value.slice(lineEnd)
    setNativeValue(next, lineStart, lineStart + nextBlock.length)
  }

  /** 在光标处插入文本 */
  const insertText = (text: string) => {
    const el = textareaRef.current
    if (!el) return
    const { selectionStart: start, value } = el
    const next = `${value.slice(0, start)}${text}${value.slice(start)}`
    setNativeValue(next, start + text.length, start + text.length)
  }

  const handleUploadAndInsert = async (file: File, isImage: boolean) => {
    setUploading(true)
    setProgress(0)
    try {
      const uploaded = await uploadFile(file, setProgress)
      const url = `/api/files/${uploaded.id}/content`
      if (isImage) {
        insertText(`\n![${escapeLabel(uploaded.originalName)}](${url})\n`)
      } else {
        insertText(
          `\n[${escapeLabel(uploaded.originalName)} (${formatFileSize(uploaded.size)})](${url})\n`
        )
      }
    } catch (error) {
      console.error('上传失败:', file.name, error)
      toast({
        variant: 'destructive',
        title: '上传失败',
        description: `「${file.name}」上传失败，请重试`,
      })
    } finally {
      setUploading(false)
      setProgress(0)
    }
  }

  const handleFiles = (files: FileList | null, imageOnly: boolean) => {
    if (!files || files.length === 0) return
    void (async () => {
      for (const file of Array.from(files)) {
        const isImage = file.type.startsWith('image/')
        if (imageOnly && !isImage) continue
        await handleUploadAndInsert(file, isImage)
      }
    })()
  }

  const toolbarActions: ToolbarAction[] = [
    {
      icon: <Bold className="h-4 w-4" />,
      title: '粗体',
      onClick: () => wrapSelection('**', '**', '粗体文本'),
    },
    {
      icon: <Italic className="h-4 w-4" />,
      title: '斜体',
      onClick: () => wrapSelection('*', '*', '斜体文本'),
    },
    {
      icon: <Strikethrough className="h-4 w-4" />,
      title: '删除线',
      onClick: () => wrapSelection('~~', '~~', '删除文本'),
    },
    {
      icon: <Heading2 className="h-4 w-4" />,
      title: '二级标题',
      onClick: () => toggleLinePrefix('## '),
    },
    {
      icon: <Heading3 className="h-4 w-4" />,
      title: '三级标题',
      onClick: () => toggleLinePrefix('### '),
    },
    {
      icon: <Quote className="h-4 w-4" />,
      title: '引用',
      onClick: () => toggleLinePrefix('> '),
    },
    {
      icon: <Code className="h-4 w-4" />,
      title: '行内代码',
      onClick: () => wrapSelection('`', '`', 'code'),
    },
    {
      icon: <SquareCode className="h-4 w-4" />,
      title: '代码块',
      onClick: () => wrapSelection('\n```\n', '\n```\n', '代码内容'),
    },
    {
      icon: <Link2 className="h-4 w-4" />,
      title: '链接',
      onClick: () => {
        const url = window.prompt('请输入链接地址', 'https://')
        if (url) wrapSelection('[', `](${url})`, '链接文本')
      },
    },
    {
      icon: <List className="h-4 w-4" />,
      title: '无序列表',
      onClick: () => toggleLinePrefix('- '),
    },
    {
      icon: <ListOrdered className="h-4 w-4" />,
      title: '有序列表',
      onClick: () => toggleLinePrefix('1. '),
    },
    {
      icon: <Table className="h-4 w-4" />,
      title: '表格',
      onClick: () =>
        insertText(
          '\n| 列1 | 列2 | 列3 |\n| --- | --- | --- |\n| 内容 | 内容 | 内容 |\n'
        ),
    },
    {
      icon: <ImagePlus className="h-4 w-4" />,
      title: '上传图片',
      onClick: () => imageInputRef.current?.click(),
    },
    {
      icon: <Paperclip className="h-4 w-4" />,
      title: '上传附件',
      onClick: () => attachInputRef.current?.click(),
    },
  ]

  return (
    <div className="space-y-2">
      <Tabs
        defaultValue="edit"
        onValueChange={tab => {
          // 切到预览前先捕获当前内容（编辑区随 tab 切换卸载）
          if (tab === 'preview')
            setPreviewValue(textareaRef.current?.value ?? '')
        }}
      >
        <div className="flex flex-wrap items-center gap-1 rounded-md border bg-muted/40 p-1">
          {toolbarActions.map(action => (
            <Button
              key={action.title}
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              title={action.title}
              disabled={uploading}
              onClick={action.onClick}
            >
              {action.icon}
            </Button>
          ))}
          <div className="ml-2 flex items-center gap-1.5 text-xs text-muted-foreground">
            {uploading ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                上传中 {progress > 0 ? `${progress}%` : ''}
              </>
            ) : (
              '支持粘贴/拖入图片自动上传'
            )}
          </div>
          <div className="ml-auto">
            <TabsList>
              <TabsTrigger value="edit">编辑</TabsTrigger>
              <TabsTrigger value="preview">预览</TabsTrigger>
            </TabsList>
          </div>
        </div>
        <TabsContent value="edit">
          <Textarea
            {...props}
            ref={el => {
              textareaRef.current = el
              if (typeof ref === 'function') ref(el)
              else if (ref)
                (
                  ref as React.MutableRefObject<HTMLTextAreaElement | null>
                ).current = el
            }}
            rows={Math.max(14, Math.floor(minHeight / 24))}
            className="font-mono text-sm"
            placeholder={
              props.placeholder ??
              '支持 Markdown 语法，可直接粘贴或拖入图片/附件上传'
            }
            onPaste={e => {
              const files = e.clipboardData?.files
              if (
                files &&
                files.length > 0 &&
                Array.from(files).some(f => f.type.startsWith('image/'))
              ) {
                e.preventDefault()
                handleFiles(files, true)
              }
            }}
            onDrop={e => {
              if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
                e.preventDefault()
                handleFiles(e.dataTransfer.files, false)
              }
            }}
          />
        </TabsContent>
        <TabsContent value="preview">
          <div
            className="overflow-auto rounded-md border p-4 text-sm"
            style={{ minHeight }}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                img: ({ src, alt }) => (
                  <img
                    src={resolveSrc(typeof src === 'string' ? src : undefined)}
                    alt={alt ?? ''}
                    className="max-w-full rounded-md"
                  />
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline"
                  >
                    {children}
                  </a>
                ),
                pre: ({ children }) => (
                  <pre className="overflow-x-auto rounded-md bg-muted p-3 text-xs">
                    {children}
                  </pre>
                ),
              }}
            >
              {previewValue}
            </ReactMarkdown>
          </div>
        </TabsContent>
      </Tabs>

      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={e => {
          handleFiles(e.target.files, true)
          e.target.value = ''
        }}
      />
      <input
        ref={attachInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={e => {
          handleFiles(e.target.files, false)
          e.target.value = ''
        }}
      />
    </div>
  )
})

MarkdownEditor.displayName = 'MarkdownEditor'
