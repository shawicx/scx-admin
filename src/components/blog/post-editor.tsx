'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Save, Send, Undo2, Archive, Upload, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { HasPermission } from '@/components/has-permission'
import {
  getApiBlogAdminCategoriesFunc,
  getApiBlogAdminTagsFunc,
  getApiBlogAdminPostsByIdFunc,
  postApiBlogAdminPostsFunc,
  putApiBlogAdminPostsByIdFunc,
  postApiBlogAdminPostsPublishByIdFunc,
  postApiBlogAdminPostsWithdrawByIdFunc,
  postApiBlogAdminPostsArchiveByIdFunc,
} from '@/service/blog'
import type {
  CategoryAdminResponseDto,
  TagAdminResponseDto,
  PostDetailResponseDto,
} from '@/service/blog'
import { postApiFilesUploadFunc } from '@/service/file'
import { toast } from '@/components/ui/use-toast'

const postFormSchema = z.object({
  title: z.string().min(1, '标题不能为空').max(200, '标题不能超过200个字符'),
  slug: z
    .string()
    .max(220, 'slug不能超过220个字符')
    .regex(/^[a-z0-9-]*$/, 'slug只能包含小写字母、数字和连字符'),
  summary: z.string().max(500, '摘要不能超过500个字符'),
  content: z.string().min(1, '正文不能为空'),
  categoryId: z.string(),
  tagIds: z.array(z.string()),
  visibility: z.number().int().min(0).max(1),
  isTop: z.boolean(),
  allowComment: z.boolean(),
  seoTitle: z.string().max(200, 'SEO标题不能超过200个字符'),
  seoDescription: z.string().max(500, 'SEO描述不能超过500个字符'),
})

type PostFormValues = z.infer<typeof postFormSchema>

interface PostEditorProps {
  postId?: string
}

export function PostEditor({ postId }: PostEditorProps) {
  const router = useRouter()
  const [categories, setCategories] = useState<CategoryAdminResponseDto[]>([])
  const [tags, setTags] = useState<TagAdminResponseDto[]>([])
  const [post, setPost] = useState<PostDetailResponseDto | null>(null)
  const [coverFileId, setCoverFileId] = useState<string | null>(null)
  const [coverName, setCoverName] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: '',
      slug: '',
      summary: '',
      content: '',
      categoryId: '',
      tagIds: [],
      visibility: 0,
      isTop: false,
      allowComment: true,
      seoTitle: '',
      seoDescription: '',
    },
  })

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const [categoryResult, tagResult] = await Promise.all([
          getApiBlogAdminCategoriesFunc({}),
          getApiBlogAdminTagsFunc({}),
        ])
        setCategories(categoryResult.list ?? [])
        setTags(tagResult.list ?? [])
      } catch (error) {
        console.error('Failed to load categories/tags:', error)
        toast({
          variant: 'destructive',
          title: '错误',
          description: '加载分类/标签失败',
        })
      }
    }
    loadOptions()
  }, [])

  useEffect(() => {
    if (!postId) return
    const loadPost = async () => {
      try {
        const detail = await getApiBlogAdminPostsByIdFunc({ id: postId })
        setPost(detail)
        setCoverFileId(detail.coverFileId)
        form.reset({
          title: detail.title,
          slug: detail.slug,
          summary: detail.summary ?? '',
          content: detail.content,
          categoryId: detail.categoryId ?? '',
          tagIds: detail.tagIds ?? [],
          visibility: detail.visibility,
          isTop: detail.isTop,
          allowComment: detail.allowComment,
          seoTitle: detail.seoTitle ?? '',
          seoDescription: detail.seoDescription ?? '',
        })
      } catch (error) {
        console.error('Failed to load post:', error)
        toast({
          variant: 'destructive',
          title: '错误',
          description: '加载文章失败',
        })
      }
    }
    loadPost()
  }, [postId, form])

  const handleCoverUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (!file) return
    setIsUploading(true)
    try {
      const uploaded = await postApiFilesUploadFunc({ file })
      setCoverFileId(uploaded.id)
      setCoverName(uploaded.originalName)
      toast({ title: '成功', description: '封面已上传' })
    } catch (error) {
      console.error('Failed to upload cover:', error)
    } finally {
      setIsUploading(false)
      event.target.value = ''
    }
  }

  const handleSubmit = async (data: PostFormValues) => {
    setIsSubmitting(true)
    const payload = {
      title: data.title,
      slug: data.slug || undefined,
      summary: data.summary || undefined,
      content: data.content,
      coverFileId: coverFileId ?? undefined,
      categoryId: data.categoryId || undefined,
      tagIds: data.tagIds,
      visibility: data.visibility,
      isTop: data.isTop,
      allowComment: data.allowComment,
      seoTitle: data.seoTitle || undefined,
      seoDescription: data.seoDescription || undefined,
    }
    try {
      if (post) {
        const updated = await putApiBlogAdminPostsByIdFunc({
          id: post.id,
          ...payload,
        })
        setPost(updated)
        toast({ title: '成功', description: '文章已保存' })
      } else {
        const created = await postApiBlogAdminPostsFunc(payload)
        toast({ title: '成功', description: '文章已保存为草稿' })
        router.replace(`/blog/posts/${created.id}/edit`)
      }
    } catch (error) {
      console.error('Failed to save post:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleTransition = useCallback(
    async (
      action: 'publish' | 'withdraw' | 'archive',
      actionFn: (params: { id: string }) => Promise<PostDetailResponseDto>
    ) => {
      if (!post) return
      try {
        const updated = await actionFn({ id: post.id })
        setPost(updated)
        toast({ title: '成功', description: '操作成功' })
      } catch (error) {
        console.error(`Failed to ${action} post:`, error)
      }
    },
    [post]
  )

  const toggleTag = (tagId: string) => {
    const current = form.getValues('tagIds') || []
    form.setValue(
      'tagIds',
      current.includes(tagId)
        ? current.filter(id => id !== tagId)
        : [...current, tagId]
    )
  }

  const content = form.watch('content')

  return (
    <div className="space-y-6">
      {post && (
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant={post.status === 1 ? 'default' : 'secondary'}>
            {post.status === 0
              ? '草稿'
              : post.status === 1
                ? '已发布'
                : '已归档'}
          </Badge>
          {post.visibility === 1 && <Badge variant="outline">私密</Badge>}
          {post.isTop && <Badge variant="outline">置顶</Badge>}
          {post.publishedAt && (
            <span className="text-sm text-muted-foreground">
              发布于 {new Date(post.publishedAt).toLocaleString('zh-CN')}
            </span>
          )}
          <div className="ml-auto flex items-center gap-2">
            <HasPermission resource="blog-post" action="publish">
              {post.status !== 1 ? (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    handleTransition(
                      'publish',
                      postApiBlogAdminPostsPublishByIdFunc
                    )
                  }
                >
                  <Send className="mr-2 h-4 w-4" />
                  发布
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    handleTransition(
                      'withdraw',
                      postApiBlogAdminPostsWithdrawByIdFunc
                    )
                  }
                >
                  <Undo2 className="mr-2 h-4 w-4" />
                  撤回发布
                </Button>
              )}
              {post.status !== 2 && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    handleTransition(
                      'archive',
                      postApiBlogAdminPostsArchiveByIdFunc
                    )
                  }
                >
                  <Archive className="mr-2 h-4 w-4" />
                  归档
                </Button>
              )}
            </HasPermission>
          </div>
        </div>
      )}

      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <div className="space-y-2">
              <Label htmlFor="post-title">
                标题 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="post-title"
                placeholder="文章标题"
                {...form.register('title')}
              />
              {form.formState.errors.title && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.title.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="post-slug">slug（缺省由标题生成）</Label>
              <Input
                id="post-slug"
                placeholder="如：hello-blog"
                {...form.register('slug')}
              />
              {form.formState.errors.slug && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.slug.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="post-summary">摘要</Label>
              <Textarea
                id="post-summary"
                rows={2}
                placeholder="文章摘要（列表页展示）"
                {...form.register('summary')}
              />
            </div>

            <div className="space-y-2">
              <Label>
                正文 <span className="text-red-500">*</span>
              </Label>
              <Tabs defaultValue="edit">
                <TabsList>
                  <TabsTrigger value="edit">编辑</TabsTrigger>
                  <TabsTrigger value="preview">预览</TabsTrigger>
                </TabsList>
                <TabsContent value="edit">
                  <Textarea
                    rows={18}
                    placeholder="支持 Markdown 语法"
                    className="font-mono text-sm"
                    {...form.register('content')}
                  />
                </TabsContent>
                <TabsContent value="preview">
                  <div className="min-h-[400px] rounded-md border p-4 text-sm">
                    {content ? (
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          pre: ({ children }) => (
                            <pre className="overflow-x-auto rounded-md bg-muted p-3 text-xs">
                              {children}
                            </pre>
                          ),
                        }}
                      >
                        {content}
                      </ReactMarkdown>
                    ) : (
                      <p className="text-muted-foreground">暂无内容</p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
              {form.formState.errors.content && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.content.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>封面图</Label>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={isUploading}
                  onClick={() =>
                    document.getElementById('cover-input')?.click()
                  }
                >
                  {isUploading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Upload className="mr-2 h-4 w-4" />
                  )}
                  {coverFileId ? '重新上传' : '上传封面'}
                </Button>
                {coverFileId && (
                  <span className="truncate text-sm text-muted-foreground">
                    {coverName || coverFileId}
                  </span>
                )}
                {coverFileId && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setCoverFileId(null)
                      setCoverName('')
                    }}
                  >
                    移除
                  </Button>
                )}
                <input
                  id="cover-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleCoverUpload}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>分类</Label>
              <Select
                value={form.watch('categoryId') || 'none'}
                onValueChange={value =>
                  form.setValue('categoryId', value === 'none' ? '' : value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="未分类" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">未分类</SelectItem>
                  {categories
                    .filter(c => c.status === 1)
                    .map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>标签</Label>
              <div className="flex flex-wrap gap-2 rounded-md border p-3">
                {tags.filter(t => t.status === 1).length === 0 && (
                  <span className="text-sm text-muted-foreground">
                    暂无可用标签
                  </span>
                )}
                {tags
                  .filter(t => t.status === 1)
                  .map(tag => {
                    const checked = form.watch('tagIds')?.includes(tag.id)
                    return (
                      <label
                        key={tag.id}
                        className="flex cursor-pointer items-center gap-1.5 rounded-full border px-2.5 py-1 text-sm hover:bg-muted"
                      >
                        <Checkbox
                          checked={checked}
                          onChange={() => toggleTag(tag.id)}
                        />
                        {tag.name}
                      </label>
                    )
                  })}
              </div>
            </div>

            <div className="space-y-2">
              <Label>可见性</Label>
              <Select
                value={String(form.watch('visibility'))}
                onValueChange={value =>
                  form.setValue('visibility', Number(value))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">公开</SelectItem>
                  <SelectItem value="1">私密</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="post-top"
                checked={form.watch('isTop')}
                onChange={e => form.setValue('isTop', e.target.checked)}
              />
              <Label htmlFor="post-top">置顶</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="post-allow-comment"
                checked={form.watch('allowComment')}
                onChange={e => form.setValue('allowComment', e.target.checked)}
              />
              <Label htmlFor="post-allow-comment">允许评论</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="post-seo-title">SEO 标题</Label>
              <Input id="post-seo-title" {...form.register('seoTitle')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="post-seo-description">SEO 描述</Label>
              <Textarea
                id="post-seo-description"
                rows={3}
                {...form.register('seoDescription')}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/blog/posts')}
            disabled={isSubmitting}
          >
            返回列表
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            <Save className="mr-2 h-4 w-4" />
            {isSubmitting ? '保存中...' : post ? '保存修改' : '保存草稿'}
          </Button>
        </div>
      </form>
    </div>
  )
}
