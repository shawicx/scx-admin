'use client'

import { useMemo } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import type { OperationLogResponseDto } from '@/service/identity'
import { cn, formatDate } from '@/lib/utils'

interface OperationLogDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  log: OperationLogResponseDto | null
}

function DetailRow({
  label,
  value,
  children,
}: {
  label: string
  value?: string | null
  children?: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-4 py-2 text-sm">
      <div className="w-24 flex-shrink-0 text-muted-foreground">{label}</div>
      <div className="min-w-0 flex-1 break-all">
        {children ?? (value || '-')}
      </div>
    </div>
  )
}

export function OperationLogDetailDialog({
  open,
  onOpenChange,
  log,
}: OperationLogDetailDialogProps) {
  const prettyParams = useMemo(() => {
    if (!log?.params) return ''
    try {
      return JSON.stringify(JSON.parse(log.params), null, 2)
    } catch {
      return log.params
    }
  }, [log?.params])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle className="pr-8">操作日志详情</DialogTitle>
          <DialogDescription>查看单条操作日志的完整信息</DialogDescription>
        </DialogHeader>

        {log && (
          <div className="max-h-[65vh] overflow-y-auto py-1">
            <DetailRow label="操作人">
              {log.userEmail || '-'}
              {log.userId && (
                <span className="ml-2 text-xs text-muted-foreground">
                  ({log.userId})
                </span>
              )}
            </DetailRow>
            <DetailRow label="模块">
              <Badge variant="outline" className="font-normal">
                {log.module}
              </Badge>
            </DetailRow>
            <DetailRow label="动作" value={log.action} />
            <DetailRow label="请求">
              {log.httpMethod || log.uri ? (
                <span className="font-mono text-xs">
                  {log.httpMethod} {log.uri}
                </span>
              ) : (
                '-'
              )}
            </DetailRow>
            <DetailRow label="结果">
              <div className="flex flex-col gap-1">
                <Badge
                  variant={log.success ? 'default' : 'destructive'}
                  className={cn(
                    'w-fit font-normal',
                    log.success && 'bg-emerald-600'
                  )}
                >
                  {log.success ? '成功' : '失败'}
                </Badge>
                {!log.success && log.errorMessage && (
                  <span className="text-xs text-destructive">
                    {log.errorMessage}
                  </span>
                )}
              </div>
            </DetailRow>
            <DetailRow label="耗时" value={`${log.costMs} ms`} />
            <DetailRow label="客户端 IP" value={log.ip} />
            <DetailRow label="创建时间" value={formatDate(log.createdAt)} />
            {log.userAgent && (
              <DetailRow label="User-Agent" value={log.userAgent} />
            )}
            {prettyParams && (
              <DetailRow label="请求参数">
                <pre className="max-h-52 overflow-auto rounded-md bg-muted p-3 font-mono text-xs whitespace-pre-wrap">
                  {prettyParams}
                </pre>
              </DetailRow>
            )}
          </div>
        )}

        <Separator />
      </DialogContent>
    </Dialog>
  )
}
