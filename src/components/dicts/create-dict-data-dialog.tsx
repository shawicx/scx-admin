'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { postApiDictsDataCreateFunc } from '@/service/rbac'
import { toast } from '@/components/ui/use-toast'

const createDictDataSchema = z.object({
  label: z
    .string()
    .min(1, '显示文本不能为空')
    .max(100, '显示文本不能超过100个字符'),
  value: z
    .string()
    .min(1, '存储值不能为空')
    .max(100, '存储值不能超过100个字符'),
  sort: z.coerce
    .number({ invalid_type_error: '排序号必须为数字' })
    .int('排序号必须为整数'),
  status: z.boolean(),
})

type CreateDictDataFormValues = z.infer<typeof createDictDataSchema>

interface CreateDictDataDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  typeId: string | null
  onSuccess?: () => void
}

export function CreateDictDataDialog({
  open,
  onOpenChange,
  typeId,
  onSuccess,
}: CreateDictDataDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<CreateDictDataFormValues>({
    resolver: zodResolver(createDictDataSchema),
    defaultValues: {
      label: '',
      value: '',
      sort: 0,
      status: true,
    },
  })

  const handleSubmit = async (data: CreateDictDataFormValues) => {
    if (!typeId) return

    setIsSubmitting(true)
    try {
      await postApiDictsDataCreateFunc({
        typeId,
        label: data.label,
        value: data.value,
        sort: data.sort,
        status: data.status ? 1 : 0,
      })
      toast({
        title: '成功',
        description: '字典数据创建成功',
      })
      form.reset()
      onOpenChange(false)
      onSuccess?.()
    } catch (error) {
      console.error('Failed to create dict data:', error)
      toast({
        variant: 'destructive',
        title: '错误',
        description: '字典数据创建失败',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>新增字典数据</DialogTitle>
          <DialogDescription>填写以下信息添加字典数据项</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dict-data-label">
              显示文本 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="dict-data-label"
              {...form.register('label')}
              placeholder="请输入显示文本（如：男）"
            />
            {form.formState.errors.label && (
              <p className="text-sm text-red-500">
                {form.formState.errors.label.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="dict-data-value">
              存储值 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="dict-data-value"
              {...form.register('value')}
              placeholder="请输入存储值（如：male）"
            />
            <p className="text-xs text-muted-foreground">
              同一字典类型下存储值唯一
            </p>
            {form.formState.errors.value && (
              <p className="text-sm text-red-500">
                {form.formState.errors.value.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="dict-data-sort">排序号</Label>
            <Input
              id="dict-data-sort"
              type="number"
              {...form.register('sort')}
              placeholder="请输入排序号（升序）"
            />
            {form.formState.errors.sort && (
              <p className="text-sm text-red-500">
                {form.formState.errors.sort.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between rounded-md border p-3">
            <div className="space-y-0.5">
              <Label htmlFor="dict-data-status">状态</Label>
              <p className="text-xs text-muted-foreground">
                停用后该数据项不再可用
              </p>
            </div>
            <Switch
              id="dict-data-status"
              checked={form.watch('status')}
              onCheckedChange={checked => form.setValue('status', checked)}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              取消
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? '创建中...' : '创建'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
