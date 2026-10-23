'use client'

import { useState, useEffect, useCallback } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { CreateTagDialog } from '@/components/blog/create-tag-dialog'
import { EditTagDialog } from '@/components/blog/edit-tag-dialog'
import { ConfirmDialog } from '@/components/blog/confirm-dialog'
import { HasPermission } from '@/components/has-permission'
import {
  getApiBlogAdminTagsFunc,
  deleteApiBlogAdminTagsByIdFunc,
} from '@/service/blog'
import type { TagAdminResponseDto } from '@/service/blog'
import { toast } from '@/components/ui/use-toast'

export default function BlogTagsPage() {
  const [tags, setTags] = useState<TagAdminResponseDto[]>([])
  const [loading, setLoading] = useState(true)
  const [createOpen, setCreateOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<TagAdminResponseDto | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<TagAdminResponseDto | null>(
    null
  )

  const loadTags = useCallback(async () => {
    setLoading(true)
    try {
      const result = await getApiBlogAdminTagsFunc({})
      setTags(result.list ?? [])
    } catch (error) {
      console.error('Failed to load tags:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadTags()
  }, [loadTags])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>标签管理</CardTitle>
            <CardDescription>
              停用标签不允许新文章选择；删除标签将清理文章关联
            </CardDescription>
          </div>
          <HasPermission resource="blog-tag" action="create">
            <Button onClick={() => setCreateOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              新建标签
            </Button>
          </HasPermission>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>名称</TableHead>
                <TableHead>slug</TableHead>
                <TableHead>描述</TableHead>
                <TableHead className="text-center">排序</TableHead>
                <TableHead className="text-center">状态</TableHead>
                <TableHead className="text-center">公开文章</TableHead>
                <TableHead className="text-center">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center text-muted-foreground"
                  >
                    加载中...
                  </TableCell>
                </TableRow>
              )}
              {!loading && tags.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center text-muted-foreground"
                  >
                    暂无标签
                  </TableCell>
                </TableRow>
              )}
              {tags.map(tag => (
                <TableRow key={tag.id}>
                  <TableCell className="font-medium">{tag.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {tag.slug}
                  </TableCell>
                  <TableCell className="max-w-[240px] truncate text-muted-foreground">
                    {tag.description ?? '-'}
                  </TableCell>
                  <TableCell className="text-center">{tag.sort}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={tag.status === 1 ? 'default' : 'secondary'}>
                      {tag.status === 1 ? '启用' : '停用'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    {tag.publicPostCount}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center gap-1">
                      <HasPermission resource="blog-tag" action="update">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditTarget(tag)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </HasPermission>
                      <HasPermission resource="blog-tag" action="delete">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteTarget(tag)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </HasPermission>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <CreateTagDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSuccess={loadTags}
      />

      <EditTagDialog
        open={editTarget !== null}
        onOpenChange={open => {
          if (!open) setEditTarget(null)
        }}
        tag={editTarget}
        onSuccess={loadTags}
      />

      <ConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={open => {
          if (!open) setDeleteTarget(null)
        }}
        title="删除标签"
        description={`确定删除标签「${deleteTarget?.name ?? ''}」吗？将同时清理该标签的文章关联。`}
        confirmText="删除"
        destructive
        onConfirm={async () => {
          if (!deleteTarget) return
          await deleteApiBlogAdminTagsByIdFunc({ id: deleteTarget.id })
          toast({ title: '成功', description: '标签已删除' })
        }}
        onSuccess={loadTags}
      />
    </div>
  )
}
