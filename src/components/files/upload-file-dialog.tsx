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

interface UploadFileItem {
  id: string
  file: File
  status: 'pending' | 'uploading' | 'success' | 'error'
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

  const updateStatus = (id: string, status: UploadFileItem['status']) => {
    setItems(prev =>
      prev.map(item => (item.id === id ? { ...item, status } : item))
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
      updateStatus(item.id, 'uploading')
      try {
        await postApiFilesUploadFunc({ file: item.file })
        updateStatus(item.id, 'success')
        successCount += 1
      } catch (error) {
        console.error('上传文件失败:', item.file.name, error)
        updateStatus(item.id, 'error')
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
            单个文件将依次上传
          </div>
          <input
            ref={inputRef}
            type="file"
            multiple
            className="hidden"
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
                {item.status === 'uploading' && (
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                )}
                {item.status === 'success' && (
                  <Badge variant="secondary">已上传</Badge>
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
