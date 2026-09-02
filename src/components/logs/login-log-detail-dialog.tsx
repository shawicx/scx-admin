'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import type { LoginLogResponseDto } from '@/service/identity'
import { LOGIN_TYPE_LABELS } from '@/components/logs/login-type-labels'
import { cn, formatDate } from '@/lib/utils'

interface LoginLogDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  log: LoginLogResponseDto | null
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

export function LoginLogDetailDialog({
  open,
  onOpenChange,
  log,
}: LoginLogDetailDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle className="pr-8">登录日志详情</DialogTitle>
          <DialogDescription>查看单条登录日志的完整信息</DialogDescription>
        </DialogHeader>

        {log && (
          <div className="py-1">
            <DetailRow label="登录邮箱" value={log.email} />
            <DetailRow label="用户 ID" value={log.userId} />
            <DetailRow label="登录类型">
              <Badge variant="outline" className="font-normal">
                {LOGIN_TYPE_LABELS[log.loginType] || log.loginType}
              </Badge>
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
                {!log.success && log.failReason && (
                  <span className="text-xs text-destructive">
                    {log.failReason}
                  </span>
                )}
              </div>
            </DetailRow>
            <DetailRow label="客户端 IP" value={log.ip} />
            <DetailRow label="创建时间" value={formatDate(log.createdAt)} />
            {log.userAgent && (
              <DetailRow label="User-Agent" value={log.userAgent} />
            )}
          </div>
        )}

        <Separator />
      </DialogContent>
    </Dialog>
  )
}
