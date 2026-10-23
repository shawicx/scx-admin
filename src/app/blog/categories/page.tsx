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
import { CreateCategoryDialog } from '@/components/blog/create-category-dialog'
import { EditCategoryDialog } from '@/components/blog/edit-category-dialog'
import { ConfirmDialog } from '@/components/blog/confirm-dialog'
import { HasPermission } from '@/components/has-permission'
import {
  getApiBlogAdminCategoriesFunc,
  deleteApiBlogAdminCategoriesByIdFunc,
} from '@/service/blog'
import type { CategoryAdminResponseDto } from '@/service/blog'
import { toast } from '@/components/ui/use-toast'

export default function BlogCategoriesPage() {
  const [categories, setCategories] = useState<CategoryAdminResponseDto[]>([])
  const [loading, setLoading] = useState(true)
  const [createOpen, setCreateOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<CategoryAdminResponseDto | null>(
    null
  )
  const [deleteTarget, setDeleteTarget] =
    useState<CategoryAdminResponseDto | null>(null)

  const loadCategories = useCallback(async () => {
    setLoading(true)
    try {
      const result = await getApiBlogAdminCategoriesFunc({})
      setCategories(result.list ?? [])
    } catch (error) {
      console.error('Failed to load categories:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadCategories()
  }, [loadCategories])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>分类管理</CardTitle>
            <CardDescription>
              单层分类；仍有文章的分类需先迁移文章才能删除
            </CardDescription>
          </div>
          <HasPermission resource="blog-category" action="create">
            <Button onClick={() => setCreateOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              新建分类
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
                <TableHead className="text-center">文章数</TableHead>
                <TableHead className="text-center">公开文章</TableHead>
                <TableHead className="text-center">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center text-muted-foreground"
                  >
                    加载中...
                  </TableCell>
                </TableRow>
              )}
              {!loading && categories.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center text-muted-foreground"
                  >
                    暂无分类
                  </TableCell>
                </TableRow>
              )}
              {categories.map(category => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {category.slug}
                  </TableCell>
                  <TableCell className="max-w-[240px] truncate text-muted-foreground">
                    {category.description ?? '-'}
                  </TableCell>
                  <TableCell className="text-center">{category.sort}</TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={category.status === 1 ? 'default' : 'secondary'}
                    >
                      {category.status === 1 ? '启用' : '停用'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    {category.postCount}
                  </TableCell>
                  <TableCell className="text-center">
                    {category.publicPostCount}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center gap-1">
                      <HasPermission resource="blog-category" action="update">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditTarget(category)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </HasPermission>
                      <HasPermission resource="blog-category" action="delete">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteTarget(category)}
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

      <CreateCategoryDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSuccess={loadCategories}
      />

      <EditCategoryDialog
        open={editTarget !== null}
        onOpenChange={open => {
          if (!open) setEditTarget(null)
        }}
        category={editTarget}
        onSuccess={loadCategories}
      />

      <ConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={open => {
          if (!open) setDeleteTarget(null)
        }}
        title="删除分类"
        description={`确定删除分类「${deleteTarget?.name ?? ''}」吗？仍有文章的分类将被拒绝删除。`}
        confirmText="删除"
        destructive
        onConfirm={async () => {
          if (!deleteTarget) return
          await deleteApiBlogAdminCategoriesByIdFunc({ id: deleteTarget.id })
          toast({ title: '成功', description: '分类已删除' })
        }}
        onSuccess={loadCategories}
      />
    </div>
  )
}
