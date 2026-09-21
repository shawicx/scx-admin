'use client'

import { useCallback, useRef, useState } from 'react'
import { File as FileIcon, Loader2, UploadCloud, X } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { postApiFilesUploadFunc } from '@/service/file'
import { toast } from '@/components/ui/use-toast'
import { cn, formatFileSize } from '@/lib/utils'
import { uploadFileChunked } from '@/lib/chunked-uploader'

const CHUNKED_UPLOAD_THRESHOLD = 10 * 1024 * 1024

interface UploadFileItem {
  id: string
  file: File
  status: 'pending' | 'hashing' | 'uploading' | 'success' | 'error'
  progress: number
  instant: boolean
}

interface UploadFileDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function UploadFileDialog({
  open,
  onOpenChange,
  onSuccess,
}: UploadFileDialogProps) {
  const [items, setItems] = useState<UploadFileItem[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const dragCounter = useRef(0)

  const addFiles = useCallback((fileList: FileList | File[]) => {
    const newItems: UploadFileItem[] = Array.from(fileList).map(file => ({
      id: `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2, 8)}`,
      file,
      status: 'pending' as const,
      progress: 0,
      instant: false,
    }))
    setItems(prev => [...prev, ...newItems])
  }, [])

  const handleRemove = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounter.current += 1
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounter.current -= 1
    if (dragCounter.current === 0) {
      setIsDragging(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounter.current = 0
    setIsDragging(false)
    if (e.dataTransfer.files?.length) {
      addFiles(e.dataTransfer.files)
    }
  }

  const updateItem = (id: string, patch: Partial<UploadFileItem>) => {
    setItems(prev =>
      prev.map(item => (item.id === id ? { ...item, ...patch } : item))
    )
  }

  const handleUpload = async () => {
    const pendingItems = items.filter(item => item.status !== 'success')
    if (pendingItems.length === 0) {
      onOpenChange(false)
      return
    }

    setIsUploading(true)
    let successCount = 0
    let failCount = 0

    for (const item of pendingItems) {
      const useChunked = item.file.size >= CHUNKED_UPLOAD_THRESHOLD
      updateItem(item.id, {
        status: useChunked ? 'hashing' : 'uploading',
        progress: 0,
        instant: false,
      })
      try {
        if (useChunked) {
          const { instant } = await uploadFileChunked(item.file, {
            onProgress: ({ uploadedBytes, totalBytes }) => {
              updateItem(item.id, {
                status: 'uploading',
                progress: Math.min(
                  100,
                  Math.floor((uploadedBytes / totalBytes) * 100)
                ),
              })
            },
          })
          updateItem(item.id, { status: 'success', progress: 100, instant })
          if (instant) {
            toast({
              title: '秒传',
              description: `「${item.file.name}」内容已存在，已秒传`,
            })
          }
        } else {
          await postApiFilesUploadFunc({ file: item.file })
          updateItem(item.id, { status: 'success', progress: 100 })
        }
        successCount += 1
      } catch (error) {
        console.error('上传文件失败:', item.file.name, error)
        updateItem(item.id, { status: 'error' })
        failCount += 1
      }
    }

    setIsUploading(false)

    if (failCount === 0) {
      toast({
        title: '成功',
        description: `已成功上传 ${successCount} 个文件`,
      })
      setItems([])
      onOpenChange(false)
      onSuccess?.()
    } else {
      toast({
        variant: 'destructive',
        title: '部分文件上传失败',
        description: `${successCount} 个成功，${failCount} 个失败，请重试失败项`,
      })
    }
  }

  const handleOpenChange = (nextOpen: boolean) => {
    if (isUploading) return
    if (nextOpen) {
      setItems([])
    }
    onOpenChange(nextOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>上传文件</DialogTitle>
          <DialogDescription>
            拖拽文件到下方区域或点击选择文件，支持多文件上传
          </DialogDescription>
        </DialogHeader>

        <div
          className={cn(
            'flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-8 text-center transition-colors',
            isDragging
              ? 'border-primary bg-primary/5'
              : 'border-muted-foreground/25 hover:border-primary/50'
          )}
          onDragEnter={handleDragEnter}
          onDragOver={e => {
            e.preventDefault()
            e.stopPropagation()
          }}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <UploadCloud className="h-10 w-10 text-muted-foreground" />
          <div className="text-sm font-medium">点击选择或拖拽文件到此处</div>
          <div className="text-xs text-muted-foreground">
            大文件（10MB 以上）自动分片上传、支持断点续传
          </div>
          <input
            ref={inputRef}
            type="file"
            multiple
            className="sr-only"
            onChange={e => {
              if (e.target.files?.length) {
                addFiles(e.target.files)
              }
              e.target.value = ''
            }}
          />
        </div>

        {items.length > 0 && (
          <div className="max-h-64 space-y-2 overflow-y-auto">
            {items.map(item => (
              <div
                key={item.id}
                className="flex items-center gap-3 rounded-md border px-3 py-2"
              >
                <FileIcon className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm">{item.file.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {formatFileSize(item.file.size)}
                  </div>
                  {(item.status === 'hashing' ||
                    item.status === 'uploading') && (
                    <div className="mt-1.5 flex items-center gap-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                        <div
                          className={cn(
                            'h-full rounded-full bg-primary transition-all',
                            item.status === 'hashing' &&
                              'w-full animate-pulse opacity-50'
                          )}
                          style={
                            item.status === 'uploading'
                              ? { width: `${item.progress}%` }
                              : undefined
                          }
                        />
                      </div>
                      <span className="w-10 text-right text-xs tabular-nums text-muted-foreground">
                        {item.status === 'hashing'
                          ? '校验中'
                          : `${item.progress}%`}
                      </span>
                    </div>
                  )}
                </div>
                {item.status === 'pending' && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0"
                    onClick={() => handleRemove(item.id)}
                    disabled={isUploading}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
                {(item.status === 'hashing' || item.status === 'uploading') && (
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                )}
                {item.status === 'success' && (
                  <Badge variant={item.instant ? 'outline' : 'secondary'}>
                    {item.instant ? '秒传' : '已上传'}
                  </Badge>
                )}
                {item.status === 'error' && (
                  <Badge variant="destructive">失败</Badge>
                )}
              </div>
            ))}
          </div>
        )}

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isUploading || items.length === 0}
          >
            取消
          </Button>
          <Button
            type="button"
            onClick={handleUpload}
            disabled={isUploading || items.length === 0}
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                上传中...
              </>
            ) : (
              '开始上传'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
