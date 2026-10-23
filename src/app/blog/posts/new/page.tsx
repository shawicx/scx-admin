'use client'

import { PostEditor } from '@/components/blog/post-editor'

export default function NewPostPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">新建文章</h1>
        <p className="text-sm text-muted-foreground">
          保存后为草稿状态，可在编辑页或列表页发布
        </p>
      </div>
      <PostEditor />
    </div>
  )
}
