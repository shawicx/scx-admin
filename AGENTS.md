# AGENTS.md - 代码库指南

本文文件为在此代码库中工作的 AI 代理提供指导。

## 命令

### 开发

- `npm run dev` - 启动开发服务器（端口 3369）
- `npm run build` - 构建生产版本
- `npm run start` - 启动生产服务器

### Lint 和格式化

- `npm run lint` - 使用 oxlint 检查代码
- `npm run lint:fix` - 自动修复 oxlint 问题
- `npm run format` - 使用 prettier 格式化代码
- `npm run format:check` - 检查代码格式

### 测试

本项目未配置测试框架。如需添加测试，请先与团队确认。

## 代码风格

### 导入规范

- 客户端组件在文件顶部添加 `'use client'`
- 使用路径别名 `@/*` 导入项目内部模块（如 `@/components/ui/button`）
- 导入顺序：外部库 → 项目内部导入 → 类型导入
- 使用具名导入而非默认导入

```ts
'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/use-auth'
import type { User } from '@/types'
```

### 格式化规则（Prettier）

- 不使用分号
- 单引号
- 2 空格缩进
- ES5 尾随逗号
- 80 字符行宽
- 对象花括号内加空格
- 箭头函数参数不加括号（单个参数时）
- LF 换行符

### TypeScript

- 启用严格模式
- 明确标注函数参数和返回值类型
- 使用 `interface` 定义对象类型
- 使用 `type` 定义联合类型和工具类型

```ts
interface User {
  id: string
  email: string
  name?: string
}

type Theme = 'light' | 'dark' | 'system'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
}
```

### 命名约定

- **组件**: PascalCase（如 `Button`、`LoginPage`）
- **函数**: camelCase（如 `login`、`handleSubmit`）
- **常量**: UPPER_SNAKE_CASE（如 `TIMEOUT`、`BASE_URL`）
- **文件名**: kebab-case（如 `use-auth.ts`、`button.tsx`）
- **Hook**: `use` 前缀 + 功能名（如 `useAuth`、`useCountdown`）

### API 服务层

- API 定义放在 `src/service/` 目录
- `src/service/` 禁止修改，只能通过 `npx api-power generate` 更新
- 函数命名格式：`{Method}{Module}{Action}Api`（如 `postUsersLoginApi`）
- 类型命名格式：`{Method}{Module}{Action}RequestType/ResponseType`
- 统一使用 `request()` 函数发起请求

```ts
export async function postUsersLoginApi(
  params: PostUsersLoginRequestType
): Promise<PostUsersLoginResponseType> {
  const config: RequestConfig = {
    url: '/api/users/login',
    method: 'POST',
    data: params,
  }
  return request<PostUsersLoginResponseType>(config)
}
```

### React 组件

- 客户端组件必须标记 `'use client'`
- 使用 `React.forwardRef` 传递 ref
- 表单使用 `react-hook-form` + `zod` 验证
- 使用 `className` 属性组合样式，通过 `cn()` 函数合并类名
- 表单元素使用 `htmlFor` 关联 label

```ts
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
```

### 错误处理

- 异步函数使用 try-catch-finally 结构
- 使用 `console.error` 记录错误
- 用户可见错误使用 toast 组件显示（`@/components/ui/use-toast`）

```ts
const login = async (email: string, password: string) => {
  try {
    const user = await postUsersLoginApi({ email, password })
    return user
  } catch (error) {
    console.error('登录失败:', error)
    toast({
      variant: 'destructive',
      title: '错误',
      description: '登录失败，请重试',
    })
    throw error
  }
}
```

### 状态管理

- 优先使用 Zustand（`@/stores/` 目录）
- 持久化使用 `persist` 中间件
- Store 中包含状态和操作函数

```ts
export const useTheme = create<ThemeState>()(
  persist(
    set => ({
      theme: 'system',
      setTheme: (theme: Theme) => set({ theme }),
    }),
    { name: 'theme-storage' }
  )
)
```

### 样式

- 使用 Tailwind CSS 进行样式
- 组件变体使用 `class-variance-authority`（`cva`）
- UI 组件放在 `@/components/ui/` 目录
- 通过 `cn()` 函数合并 Tailwind 类名

### 数据持久化

- 用户数据存储在 IndexedDB（`@/lib/indexeddb-manager`）
- 敏感数据（如 token）同时存储在 Cookie 中供 middleware 使用

## 项目结构

```
src/
├── app/           # Next.js App Router 页面
├── components/    # React 组件
│   └── ui/       # 基础 UI 组件（shadcn/ui）
├── hooks/        # 自定义 React Hooks
├── lib/          # 工具函数和工具类
├── service/      # API 服务层
└── stores/       # Zustand 状态管理
```

## 注意事项

- 完成代码修改后，必须运行 `npm run lint` 和 `npm run format`
- 修改 API 相关代码前，先查看 `src/service/request.ts` 了解请求处理逻辑
- 添加新组件时，遵循 `src/components/ui/` 中现有组件的模式
- 不需要在代码中添加注释，除非特别要求
