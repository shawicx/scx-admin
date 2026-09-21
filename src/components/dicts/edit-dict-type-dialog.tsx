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
  putApiDictsTypeUpdateFunc,
  getApiDictsTypeDetailFunc,
} from '@/service/rbac'
import { toast } from '@/components/ui/use-toast'

const editDictTypeSchema = z.object({
  name: z
    .string()
    .min(1, '字典名称不能为空')
    .max(100, '字典名称不能超过100个字符'),
  description: z.string().max(255, '描述不能超过255个字符').optional(),
  status: z.boolean(),
})

type EditDictTypeFormValues = z.infer<typeof editDictTypeSchema>

interface EditDictTypeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  typeId: string | null
  onSuccess?: () => void
}

export function EditDictTypeDialog({
  open,
  onOpenChange,
  typeId,
  onSuccess,
}: EditDictTypeDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [typeCode, setTypeCode] = useState('')

  const form = useForm<EditDictTypeFormValues>({
    resolver: zodResolver(editDictTypeSchema),
    defaultValues: {
      name: '',
      description: '',
      status: true,
    },
  })

  useEffect(() => {
    const loadType = async () => {
      if (open && typeId) {
        setIsLoading(true)
        try {
          const dictType = await getApiDictsTypeDetailFunc({ id: typeId })
          setTypeCode(dictType.code)
          form.reset({
            name: dictType.name,
            description: dictType.description || '',
            status: dictType.status === 1,
          })
        } catch (error) {
          console.error('Failed to load dict type:', error)
          toast({
            variant: 'destructive',
            title: '错误',
            description: '加载字典类型详情失败',
          })
        } finally {
          setIsLoading(false)
        }
      }
    }

    loadType()
  }, [open, typeId, form])

  const handleSubmit = async (data: EditDictTypeFormValues) => {
    if (!typeId) return

    setIsSubmitting(true)
    try {
      await putApiDictsTypeUpdateFunc({
        id: typeId,
        name: data.name,
        description: data.description,
        status: data.status ? 1 : 0,
      })
      toast({
        title: '成功',
        description: '字典类型更新成功',
      })
      onOpenChange(false)
      onSuccess?.()
    } catch (error) {
      console.error('Failed to update dict type:', error)
      toast({
        variant: 'destructive',
        title: '错误',
        description: '字典类型更新失败',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>编辑字典类型</DialogTitle>
          <DialogDescription>修改字典类型信息</DialogDescription>
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
              <Label htmlFor="edit-dict-type-name">
                字典名称 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="edit-dict-type-name"
                {...form.register('name')}
                placeholder="请输入字典名称"
              />
              {form.formState.errors.name && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-dict-type-code">字典编码</Label>
              <Input id="edit-dict-type-code" value={typeCode} disabled />
              <p className="text-xs text-muted-foreground">
                字典编码创建后不可修改
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-dict-type-description">描述</Label>
              <textarea
                id="edit-dict-type-description"
                {...form.register('description')}
                placeholder="请输入描述（可选）"
                rows={3}
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              {form.formState.errors.description && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.description.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between rounded-md border p-3">
              <div className="space-y-0.5">
                <Label htmlFor="edit-dict-type-status">状态</Label>
                <p className="text-xs text-muted-foreground">
                  停用后该字典类型不再可用
                </p>
              </div>
              <Switch
                id="edit-dict-type-status"
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
