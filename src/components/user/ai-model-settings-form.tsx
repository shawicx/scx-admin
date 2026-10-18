'use client'

/**
 * @description 个人中心「AI 模型设置」表单：自加载配置、保存（apiKey 留空保留原值）、连通性测试
 */
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Loader2, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PasswordInput } from '@/components/ui/password-input'
import { toast } from '@/components/ui/use-toast'
import {
  getAiConfig,
  saveAiConfig,
  testAiConnection,
  type AiModelConfig,
} from '@/lib/ai-client'

const aiModelSettingsSchema = z.object({
  baseUrl: z
    .string()
    .min(1, 'API 地址不能为空')
    .max(500, 'API 地址不能超过500个字符'),
  model: z
    .string()
    .min(1, '模型名不能为空')
    .max(100, '模型名不能超过100个字符'),
  apiKey: z.string().max(300, 'API Key 不能超过300个字符'),
  systemPrompt: z.string().max(4000, '系统提示词不能超过4000个字符'),
  temperature: z
    .string()
    .trim()
    .refine(
      value =>
        value === '' ||
        (!Number.isNaN(Number(value)) &&
          Number(value) >= 0 &&
          Number(value) <= 2),
      '温度须为 0-2 的数字'
    ),
})

type AiModelSettingsValues = z.infer<typeof aiModelSettingsSchema>

export function AiModelSettingsForm() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isTesting, setIsTesting] = useState(false)
  const [config, setConfig] = useState<AiModelConfig | null>(null)

  const { reset, register, getValues, formState, handleSubmit } =
    useForm<AiModelSettingsValues>({
      resolver: zodResolver(aiModelSettingsSchema),
      defaultValues: {
        baseUrl: '',
        model: '',
        apiKey: '',
        systemPrompt: '',
        temperature: '',
      },
    })

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        const loaded = await getAiConfig()
        if (cancelled || !loaded) return
        setConfig(loaded)
        reset({
          baseUrl: loaded.baseUrl,
          model: loaded.model,
          apiKey: '',
          systemPrompt: loaded.systemPrompt ?? '',
          temperature:
            loaded.temperature == null ? '' : String(loaded.temperature),
        })
      } catch (error) {
        console.error('加载 AI 模型配置失败:', error)
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }
    void load()
    return () => {
      cancelled = true
    }
  }, [reset])

  const onSubmit = async (data: AiModelSettingsValues) => {
    if (isSubmitting) return
    setIsSubmitting(true)
    try {
      const saved = await saveAiConfig({
        baseUrl: data.baseUrl.trim(),
        apiKey: data.apiKey.trim() || undefined,
        model: data.model.trim(),
        systemPrompt: data.systemPrompt.trim() || undefined,
        temperature: data.temperature === '' ? null : Number(data.temperature),
      })
      setConfig(saved)
      reset({
        baseUrl: saved.baseUrl,
        model: saved.model,
        apiKey: '',
        systemPrompt: saved.systemPrompt ?? '',
        temperature: saved.temperature == null ? '' : String(saved.temperature),
      })
      toast({ title: '成功', description: 'AI 模型配置已保存' })
    } catch (error) {
      console.error('保存 AI 模型配置失败:', error)
      toast({
        variant: 'destructive',
        title: '错误',
        description:
          error instanceof Error ? error.message : '保存 AI 模型配置失败',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleTest = async () => {
    if (isTesting) return
    const baseUrl = getValues('baseUrl').trim()
    if (!baseUrl) {
      toast({
        variant: 'destructive',
        title: '提示',
        description: '请先填写 API 地址',
      })
      return
    }
    setIsTesting(true)
    try {
      const result = await testAiConnection({
        baseUrl,
        apiKey: getValues('apiKey').trim() || undefined,
      })
      if (result.ok) {
        toast({
          title: '成功',
          description: `${result.message}（${result.latencyMs}ms）`,
        })
      } else {
        toast({
          variant: 'destructive',
          title: '连接失败',
          description: result.message,
        })
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: '错误',
        description: error instanceof Error ? error.message : '测试失败',
      })
    } finally {
      setIsTesting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    )
  }

  const isBusy = isSubmitting || isTesting

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="ai-base-url">
            API 地址 <span className="text-red-500">*</span>
          </Label>
          <Input
            id="ai-base-url"
            placeholder="https://dashscope.aliyuncs.com/compatible-mode/v1"
            disabled={isBusy}
            {...register('baseUrl')}
          />
          {formState.errors.baseUrl && (
            <p className="text-sm text-red-500">
              {formState.errors.baseUrl.message}
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            OpenAI 兼容协议，支持 Qwen（兼容模式）/ DeepSeek / GLM / OpenAI 等
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="ai-model">
            模型名 <span className="text-red-500">*</span>
          </Label>
          <Input
            id="ai-model"
            placeholder="qwen-plus"
            disabled={isBusy}
            {...register('model')}
          />
          {formState.errors.model && (
            <p className="text-sm text-red-500">
              {formState.errors.model.message}
            </p>
          )}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-[1fr_200px]">
        <div className="space-y-2">
          <Label htmlFor="ai-api-key">
            API Key{' '}
            {config?.hasApiKey ? '' : <span className="text-red-500">*</span>}
          </Label>
          <PasswordInput
            id="ai-api-key"
            placeholder={
              config?.hasApiKey ? '已保存，留空表示不修改' : 'sk-...'
            }
            disabled={isBusy}
            autoComplete="new-password"
            {...register('apiKey')}
          />
          {formState.errors.apiKey && (
            <p className="text-sm text-red-500">
              {formState.errors.apiKey.message}
            </p>
          )}
          {config?.hasApiKey && (
            <p className="text-xs text-muted-foreground">
              当前：{config.apiKeyMasked ?? '****'}
              ，加密存储、仅用于调用你配置的模型
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="ai-temperature">温度（可选）</Label>
          <Input
            id="ai-temperature"
            placeholder="0 - 2"
            inputMode="decimal"
            disabled={isBusy}
            {...register('temperature')}
          />
          {formState.errors.temperature && (
            <p className="text-sm text-red-500">
              {formState.errors.temperature.message}
            </p>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="ai-system-prompt">系统提示词（可选）</Label>
        <textarea
          id="ai-system-prompt"
          placeholder="你是一个乐于助人的助手..."
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isBusy}
          {...register('systemPrompt')}
        />
        {formState.errors.systemPrompt && (
          <p className="text-sm text-red-500">
            {formState.errors.systemPrompt.message}
          </p>
        )}
      </div>
      <div className="flex items-center justify-between">
        {config?.hasApiKey ? (
          <Button variant="link" asChild className="h-auto p-0">
            <Link href="/chat">
              <MessageSquare className="mr-1 h-4 w-4" />
              前往「AI 对话」
            </Link>
          </Button>
        ) : (
          <p className="text-xs text-muted-foreground">
            保存后即可在「AI 对话」页面开始聊天
          </p>
        )}
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleTest}
            disabled={isBusy}
          >
            {isTesting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isTesting ? '测试中...' : '测试连接'}
          </Button>
          <Button type="submit" disabled={isBusy}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? '保存中...' : '保存'}
          </Button>
        </div>
      </div>
    </form>
  )
}
