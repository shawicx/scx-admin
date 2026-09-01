'use client'

import { useEffect, useState } from 'react'
import { Copy, Loader2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { getApiFilesInfoFunc } from '@/service/file'
import type { FileResponseDto } from '@/service/file'
import { toast } from '@/components/ui/use-toast'
import { formatDate, formatFileSize } from '@/lib/utils'

interface FileDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  fileId: string | null
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-4 py-2 text-sm">
      <div className="w-24 flex-shrink-0 text-muted-foreground">{label}</div>
      <div className="min-w-0 flex-1 break-all">{value}</div>
    </div>
  )
}

export function FileDetailDialog({
  open,
  onOpenChange,
  fileId,
}: FileDetailDialogProps) {
  const [detail, setDetail] = useState<FileResponseDto | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!open || !fileId) {
      setDetail(null)
      return
    }

    const loadDetail = async () => {
      setLoading(true)
      try {
        const result = await getApiFilesInfoFunc({ id: fileId })
        setDetail(result)
      } catch (error) {
        console.error('获取文件详情失败:', error)
        onOpenChange(false)
      } finally {
        setLoading(false)
      }
    }

    loadDetail()
  }, [open, fileId, onOpenChange])

  const handleCopyUrl = async () => {
    if (!detail?.url) return
    try {
      await navigator.clipboard.writeText(detail.url)
      toast({ title: '成功', description: '链接已复制到剪贴板' })
    } catch (error) {
      console.error('复制链接失败:', error)
      toast({
        variant: 'destructive',
        title: '错误',
        description: '复制链接失败',
      })
    }
  }

  const isImage = detail?.mimeType?.startsWith('image/')

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle className="pr-8 break-all">
            {detail?.originalName || '文件详情'}
          </DialogTitle>
          <DialogDescription>查看文件的详细信息</DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : detail ? (
          <>
            {isImage && (
              <div className="flex items-center justify-center rounded-md border bg-muted/40 p-4">
                <img
                  src={detail.url}
                  alt={detail.originalName}
                  className="max-h-56 max-w-full object-contain"
                />
              </div>
            )}
            <div className="py-1">
              <DetailRow label="文件类型" value={detail.mimeType} />
              <DetailRow label="文件大小" value={formatFileSize(detail.size)} />
              <DetailRow
                label="上传时间"
                value={formatDate(detail.createdAt)}
              />
              <DetailRow label="存储路径" value={detail.path} />
              <DetailRow label="访问链接" value={detail.url} />
              <DetailRow label="所属用户" value={detail.userId} />
            </div>
          </>
        ) : null}

        <Separator />

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            关闭
          </Button>
          <Button type="button" onClick={handleCopyUrl} disabled={!detail?.url}>
            <Copy className="mr-2 h-4 w-4" />
            复制链接
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
