'use client'

import { use } from 'react'
import { PostEditor } from '@/components/blog/post-editor'

export default function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">编辑文章</h1>
        <p className="text-sm text-muted-foreground">
          修改已发布文章后，公开页面将在前台缓存失效后更新
        </p>
      </div>
      <PostEditor postId={id} />
    </div>
  )
}
