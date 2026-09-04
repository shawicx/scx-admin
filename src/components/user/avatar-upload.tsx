'use client'

import { useEffect, useRef, useState } from 'react'
import { Camera, X } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'

const MAX_AVATAR_SIZE = 5 * 1024 * 1024
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
]

interface AvatarUploadProps {
  currentUrl?: string | null
  value: File | null
  onChange: (file: File | null) => void
  fallbackText?: string
  disabled?: boolean
}

export function AvatarUpload({
  currentUrl,
  value,
  onChange,
  fallbackText,
  disabled = false,
}: AvatarUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const dragCounter = useRef(0)

  useEffect(() => {
    if (!value) {
      setPreviewUrl(null)
      return
    }
    const url = URL.createObjectURL(value)
    setPreviewUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [value])

  const validateFile = (file: File): boolean => {
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      toast({
        variant: 'destructive',
        title: '错误',
        description: '仅支持 JPG、PNG、WebP、GIF 格式的图片',
      })
      return false
    }
    if (file.size > MAX_AVATAR_SIZE) {
      toast({
        variant: 'destructive',
        title: '错误',
        description: '图片大小不能超过 5MB',
      })
      return false
    }
    return true
  }

  const selectFile = (file: File | undefined) => {
    if (!file || disabled) return
    if (validateFile(file)) {
      onChange(file)
    }
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative">
        <button
          type="button"
          className="group relative block h-24 w-24 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          onClick={() => inputRef.current?.click()}
          onDragEnter={e => {
            e.preventDefault()
            e.stopPropagation()
            dragCounter.current += 1
            setIsDragging(true)
          }}
          onDragOver={e => {
            e.preventDefault()
            e.stopPropagation()
          }}
          onDragLeave={e => {
            e.preventDefault()
            e.stopPropagation()
            dragCounter.current -= 1
            if (dragCounter.current === 0) {
              setIsDragging(false)
            }
          }}
          onDrop={e => {
            e.preventDefault()
            e.stopPropagation()
            dragCounter.current = 0
            setIsDragging(false)
            selectFile(e.dataTransfer.files?.[0])
          }}
          disabled={disabled}
          aria-label="选择头像图片"
        >
          <Avatar className="h-24 w-24 border">
            <AvatarImage
              src={previewUrl || currentUrl || undefined}
              alt="头像预览"
            />
            <AvatarFallback className="text-2xl">
              {fallbackText?.slice(0, 1).toUpperCase() || (
                <Camera className="h-6 w-6" />
              )}
            </AvatarFallback>
          </Avatar>
          <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/45 opacity-0 transition-opacity group-hover:opacity-100">
            <Camera className="h-5 w-5 text-white" />
          </span>
          {isDragging && (
            <span className="absolute inset-0 rounded-full border-2 border-dashed border-primary bg-primary/10" />
          )}
        </button>
        {value && !disabled && (
          <button
            type="button"
            className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-background text-muted-foreground shadow-sm border transition-colors hover:text-foreground"
            onClick={() => onChange(null)}
            aria-label="取消选择的图片"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_IMAGE_TYPES.join(',')}
          className="hidden"
          onChange={e => {
            selectFile(e.target.files?.[0])
            e.target.value = ''
          }}
        />
      </div>
      <p
        className={cn(
          'text-xs text-muted-foreground',
          disabled && 'opacity-60'
        )}
      >
        点击或拖拽更换头像，JPG/PNG/WebP/GIF，不超过 5MB
      </p>
    </div>
  )
}
