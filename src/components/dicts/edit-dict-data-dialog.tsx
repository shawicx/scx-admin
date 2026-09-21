'use client'

import { useState, useEffect } from 'react'
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
import {
  putApiDictsDataUpdateFunc,
  getApiDictsDataDetailFunc,
} from '@/service/rbac'
import { toast } from '@/components/ui/use-toast'

const editDictDataSchema = z.object({
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

type EditDictDataFormValues = z.infer<typeof editDictDataSchema>

interface EditDictDataDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  dictDataId: string | null
  onSuccess?: () => void
}

export function EditDictDataDialog({
  open,
  onOpenChange,
  dictDataId,
  onSuccess,
}: EditDictDataDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<EditDictDataFormValues>({
    resolver: zodResolver(editDictDataSchema),
    defaultValues: {
      label: '',
      value: '',
      sort: 0,
      status: true,
    },
  })

  useEffect(() => {
    const loadData = async () => {
      if (open && dictDataId) {
        setIsLoading(true)
        try {
          const dictData = await getApiDictsDataDetailFunc({
            id: dictDataId,
          })
          form.reset({
            label: dictData.label,
            value: dictData.value,
            sort: dictData.sort,
            status: dictData.status === 1,
          })
        } catch (error) {
          console.error('Failed to load dict data:', error)
          toast({
            variant: 'destructive',
            title: '错误',
            description: '加载字典数据详情失败',
          })
        } finally {
          setIsLoading(false)
        }
      }
    }

    loadData()
  }, [open, dictDataId, form])

  const handleSubmit = async (data: EditDictDataFormValues) => {
    if (!dictDataId) return

    setIsSubmitting(true)
    try {
      await putApiDictsDataUpdateFunc({
        id: dictDataId,
        label: data.label,
        value: data.value,
        sort: data.sort,
        status: data.status ? 1 : 0,
      })
      toast({
        title: '成功',
        description: '字典数据更新成功',
      })
      onOpenChange(false)
      onSuccess?.()
    } catch (error) {
      console.error('Failed to update dict data:', error)
      toast({
        variant: 'destructive',
        title: '错误',
        description: '字典数据更新失败',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>编辑字典数据</DialogTitle>
          <DialogDescription>修改字典数据项信息</DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-sm text-muted-foreground">加载中...</div>
          </div>
        ) : (
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="edit-dict-data-label">
                显示文本 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="edit-dict-data-label"
                {...form.register('label')}
                placeholder="请输入显示文本"
              />
              {form.formState.errors.label && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.label.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-dict-data-value">
                存储值 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="edit-dict-data-value"
                {...form.register('value')}
                placeholder="请输入存储值"
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
              <Label htmlFor="edit-dict-data-sort">排序号</Label>
              <Input
                id="edit-dict-data-sort"
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
                <Label htmlFor="edit-dict-data-status">状态</Label>
                <p className="text-xs text-muted-foreground">
                  停用后该数据项不再可用
                </p>
              </div>
              <Switch
                id="edit-dict-data-status"
                checked={form.watch('status')}
                onCheckedChange={checked => form.setValue('status', checked)}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting || isLoading}
              >
                取消
              </Button>
              <Button type="submit" disabled={isSubmitting || isLoading}>
                {isSubmitting ? '更新中...' : '更新'}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
