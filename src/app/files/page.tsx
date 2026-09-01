'use client'

import { useState, useCallback } from 'react'
import {
  Copy,
  Download,
  File as FileIcon,
  FileArchive,
  FileImage,
  FileText,
  FileVideo,
  FolderOpen,
  MoreVertical,
  Music,
  Trash2,
  Upload,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTable } from '@/components/table/data-table'
import { UploadFileDialog } from '@/components/files/upload-file-dialog'
import { DeleteFileDialog } from '@/components/files/delete-file-dialog'
import { FileDetailDialog } from '@/components/files/file-detail-dialog'
import { getApiFilesListFunc } from '@/service/file'
import type { FileResponseDto } from '@/service/file'
import type { TableColumn } from '@/components/table/types'
import { toast } from '@/components/ui/use-toast'
import { formatDate, formatFileSize } from '@/lib/utils'

const MIME_TYPE_OPTIONS = [
  { label: '全部类型', value: 'all' },
  { label: 'JPEG 图片', value: 'image/jpeg' },
  { label: 'PNG 图片', value: 'image/png' },
  { label: 'GIF 图片', value: 'image/gif' },
  { label: 'WebP 图片', value: 'image/webp' },
  { label: 'PDF 文档', value: 'application/pdf' },
  { label: '纯文本', value: 'text/plain' },
  { label: 'ZIP 压缩包', value: 'application/zip' },
  { label: 'MP4 视频', value: 'video/mp4' },
  { label: 'MP3 音频', value: 'audio/mpeg' },
]

function getFileIcon(mimeType: string) {
  if (mimeType.startsWith('image/')) return FileImage
  if (mimeType.startsWith('video/')) return FileVideo
  if (mimeType.startsWith('audio/')) return Music
  if (mimeType.includes('zip') || mimeType.includes('compressed')) {
    return FileArchive
  }
  if (
    mimeType.startsWith('text/') ||
    mimeType.includes('pdf') ||
    mimeType.includes('document') ||
    mimeType.includes('json')
  ) {
    return FileText
  }
  return FileIcon
}

export default function FilesPage() {
  const [selectedFileIds, setSelectedFileIds] = useState<string[]>([])
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleRefresh = useCallback(() => {
    setSelectedFileIds([])
    setRefreshTrigger(prev => prev + 1)
  }, [])

  const handleDelete = (fileId: string) => {
    setSelectedFileIds([fileId])
    setDeleteDialogOpen(true)
  }

  const handleBulkDelete = () => {
    if (selectedFileIds.length > 0) {
      setDeleteDialogOpen(true)
    }
  }

  const handleDetail = (fileId: string) => {
    setSelectedFileId(fileId)
    setDetailDialogOpen(true)
  }

  const handleCopyUrl = async (file: FileResponseDto) => {
    try {
      await navigator.clipboard.writeText(file.url)
      toast({ title: '成功', description: '链接已复制到剪贴板' })
    } catch (error) {
      console.error('复制链接失败:', error)
      toast({
        variant: 'destructive',
        title: '错误',
        description: '复制链接失败',
      })
    }
  }

  const handleDownload = (file: FileResponseDto) => {
    window.open(file.url, '_blank')
  }

  const columns: TableColumn<FileResponseDto>[] = [
    {
      key: 'select',
      title: '',
      width: 50,
      render: (_, record) => (
        <Checkbox
          checked={selectedFileIds.includes(record.id)}
          onChange={e => {
            if (e.target.checked) {
              setSelectedFileIds(prev => [...prev, record.id])
            } else {
              setSelectedFileIds(prev => prev.filter(id => id !== record.id))
            }
          }}
        />
      ),
    },
    {
      key: 'search',
      title: '文件名',
      dataIndex: 'originalName',
      width: 280,
      searchable: true,
      searchType: 'input',
      searchProps: { placeholder: '请输入文件名' },
      render: (value, record) => {
        const Icon = getFileIcon(record.mimeType)
        const isImage = record.mimeType.startsWith('image/')
        return (
          <div className="flex min-w-0 items-center gap-3">
            {isImage ? (
              <img
                src={record.url}
                alt={record.originalName}
                className="h-8 w-8 flex-shrink-0 rounded object-cover"
              />
            ) : (
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded bg-muted">
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>
            )}
            <span className="truncate" title={value}>
              {value}
            </span>
          </div>
        )
      },
    },
    {
      key: 'mimeType',
      title: '文件类型',
      dataIndex: 'mimeType',
      width: 160,
      searchable: true,
      searchType: 'select',
      searchProps: { options: MIME_TYPE_OPTIONS },
      render: value => (
        <Badge variant="secondary" className="font-normal">
          {value}
        </Badge>
      ),
    },
    {
      key: 'size',
      title: '文件大小',
      dataIndex: 'size',
      width: 100,
      align: 'right',
      sortable: true,
      render: value => formatFileSize(value),
    },
    {
      key: 'createdAt',
      title: '上传时间',
      dataIndex: 'createdAt',
      width: 180,
      sortable: true,
      render: value => formatDate(value),
    },
    {
      key: 'actions',
      title: '操作',
      width: 100,
      align: 'center',
      render: (_, record) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleDetail(record.id)}>
              <FolderOpen className="mr-2 h-4 w-4" />
              查看详情
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleCopyUrl(record)}>
              <Copy className="mr-2 h-4 w-4" />
              复制链接
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDownload(record)}>
              <Download className="mr-2 h-4 w-4" />
              下载
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDelete(record.id)}
              className="text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              删除
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  const loadData = async (params: any) => {
    const { pagination, searchValues, sorter } = params

    const queryParams: any = {
      page: String(pagination.current),
      limit: String(pagination.pageSize),
    }

    if (searchValues.search) {
      queryParams.search = searchValues.search
    }

    if (
      searchValues.mimeType !== undefined &&
      searchValues.mimeType !== '' &&
      searchValues.mimeType !== 'all'
    ) {
      queryParams.mimeType = searchValues.mimeType
    }

    if (sorter?.field) {
      queryParams.sortBy = sorter.field
      queryParams.sortOrder = sorter.order === 'asc' ? 'ASC' : 'DESC'
    }

    const result = await getApiFilesListFunc(queryParams)

    return {
      data: result.list,
      total: result.total,
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">文件管理</h1>
          <p className="text-muted-foreground">管理系统中的所有上传文件</p>
        </div>
        <div className="flex items-center gap-2">
          {selectedFileIds.length > 0 && (
            <Button variant="destructive" onClick={handleBulkDelete}>
              <Trash2 className="mr-2 h-4 w-4" />
              删除选中 ({selectedFileIds.length})
            </Button>
          )}
          <Button onClick={() => setUploadDialogOpen(true)}>
            <Upload className="mr-2 h-4 w-4" />
            上传文件
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        loadData={loadData}
        pagination={{
          current: 1,
          pageSize: 10,
          total: 0,
          pageSizeOptions: [10, 20, 50, 100],
          showSizeChanger: true,
          showQuickJumper: true,
        }}
        rowKey="id"
        autoLoad={true}
        key={refreshTrigger}
        headerConfig={{
          statistics: selectedFileIds.length > 0 && (
            <span className="text-sm text-muted-foreground">
              已选择 {selectedFileIds.length} 项
            </span>
          ),
        }}
      />

      <UploadFileDialog
        open={uploadDialogOpen}
        onOpenChange={setUploadDialogOpen}
        onSuccess={handleRefresh}
      />

      <DeleteFileDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        fileIds={selectedFileIds}
        onSuccess={handleRefresh}
      />

      <FileDetailDialog
        open={detailDialogOpen}
        onOpenChange={setDetailDialogOpen}
        fileId={selectedFileId}
      />
    </div>
  )
}
