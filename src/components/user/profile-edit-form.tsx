'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { AvatarUpload } from '@/components/user/avatar-upload'
import { resolveAvatarUrl } from '@/lib/avatar'
import { postApiFilesUploadFunc } from '@/service/file'
import { putApiUsersMeFunc } from '@/service/identity'

const profileSchema = z.object({
  name: z
    .string()
    .min(2, '用户名称至少2个字符')
    .max(50, '用户名称不能超过50个字符'),
})

type ProfileFormValues = z.infer<typeof profileSchema>

export interface SavedProfile {
  name: string
  avatarFileId: string | null
  avatarUrl: string | null
}

interface ProfileEditFormProps {
  defaultName: string
  email: string
  currentAvatarUrl?: string | null
  onCancel: () => void
  onSaved: (profile: SavedProfile) => void
}

export function ProfileEditForm({
  defaultName,
  email,
  currentAvatarUrl,
  onCancel,
  onSaved,
}: ProfileEditFormProps) {
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: defaultName },
  })

  const handleSubmit = async (data: ProfileFormValues) => {
    if (isSubmitting) return
    setIsSubmitting(true)
    try {
      let avatarFileId: string | undefined
      if (avatarFile) {
        const uploaded = await postApiFilesUploadFunc({ file: avatarFile })
        avatarFileId = uploaded.id
      }
      const result = await putApiUsersMeFunc({
        name: data.name,
        ...(avatarFileId ? { avatar: avatarFileId } : {}),
      })
      const avatarUrl = await resolveAvatarUrl(result.avatar)
      toast({
        title: '成功',
        description: '个人资料已更新',
      })
      onSaved({
        name: result.name,
        avatarFileId: result.avatar,
        avatarUrl,
      })
    } catch (error) {
      console.error('更新个人资料失败:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      <div className="flex flex-col gap-6 sm:flex-row">
        <AvatarUpload
          currentUrl={currentAvatarUrl}
          value={avatarFile}
          onChange={setAvatarFile}
          fallbackText={defaultName}
          disabled={isSubmitting}
        />
        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="profile-name">
              用户名称 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="profile-name"
              {...form.register('name')}
              placeholder="请输入用户名称"
              disabled={isSubmitting}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="profile-email">邮箱</Label>
            <Input
              id="profile-email"
              value={email}
              disabled
              title="邮箱为登录账号，暂不支持修改"
            />
            <p className="text-xs text-muted-foreground">
              邮箱为登录账号，暂不支持修改
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          取消
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSubmitting ? '保存中...' : '保存'}
        </Button>
      </div>
    </form>
  )
}
