# Project Context

## Purpose

SCX Admin 是一个管理系统，提供用户认证、基于角色的访问控制（RBAC）、AI 服务集成和邮件服务等功能。系统支持密码和验证码两种登录方式，并提供了用户、角色、权限的完整管理能力。

## Tech Stack

- **前端框架**: Next.js 16.1.1 (App Router)
- **UI 框架**: React 18.3.1
- **开发语言**: TypeScript (严格模式)
- **样式方案**: Tailwind CSS 3.4.19
- **UI 组件库**: shadcn/ui (基于 Radix UI)
- **状态管理**: Zustand 4.5.7
- **表单处理**: react-hook-form 7.70.0 + Zod 3.25.76
- **HTTP 客户端**: Axios 1.13.2
- **API 工具**: @scxfe/api-tool 0.4.10
- **数据持久化**: IndexedDB (本地) + Cookie (middleware)
- **加密**: crypto-js 4.2.0
- **代码检查**: oxlint 0.9.10
- **格式化**: Prettier 3.7.4
- **版本控制**: Git with Husky 8.0.3 (lint-staged)

## Project Conventions

### Code Style

- **客户端组件**: 必须在文件顶部添加 `'use client'`
- **导入顺序**: 外部库 → 项目内部导入 → 类型导入
- **导入方式**: 优先使用具名导入而非默认导入
- **路径别名**: 使用 `@/*` 导入项目内部模块（如 `@/components/ui/button`）
- **命名约定**:
  - 组件: PascalCase (Button, LoginPage)
  - 函数: camelCase (login, handleSubmit)
  - 常量: UPPER_SNAKE_CASE (TIMEOUT, BASE_URL)
  - 文件名: kebab-case (use-auth.ts, button.tsx)
  - Hook: `use` 前缀 (useAuth, useCountdown)
- **格式化规则**: 不使用分号、单引号、2 空格缩进、80 字符行宽、ES5 尾随逗号
- **API 函数命名**: `{Method}{Module}{Action}Api` (如 postUsersLoginApi)
- **类型命名**: `{Method}{Module}{Action}RequestType/ResponseType`

### Architecture Patterns

- **App Router**: 使用 Next.js App Router 结构
- **服务层**: API 请求集中在 `src/service/` 目录，使用统一的 `request()` 函数
- **状态管理**: 优先使用 Zustand，需要持久化时使用 `persist` 中间件
- **组件模式**:
  - UI 组件使用 `React.forwardRef` 传递 ref
  - 使用 `class-variance-authority` (cva) 管理组件变体
  - 通过 `cn()` 函数合并 Tailwind 类名
- **表单处理**: 使用 react-hook-form + zod 进行表单验证
- **错误处理**: 异步函数使用 try-catch-finally，用户可见错误使用 toast 显示
- **Hook 模式**: 自定义 Hooks 放在 `src/hooks/` 目录

### Testing Strategy

本项目当前未配置测试框架。如需添加测试，请先与团队确认测试策略和框架选择。

### Git Workflow

- **分支策略**: 未在文档中明确说明
- **提交规范**: 使用 commitlint 强制 conventional commits
- **提交前检查**: Husky + lint-staged，自动运行 oxlint 和 prettier
- **Commitlint 配置**: 遵循 @commitlint/config-conventional

## Domain Context

### 核心功能模块

1. **用户管理** (YongHuGuanLi)
   - 用户注册、登录（密码/验证码）、登出
   - 用户角色分配、权限检查
   - 密码加密传输（使用加密密钥）

2. **角色管理** (JueSeGuanLi)
   - 角色创建、更新、删除
   - 为角色分配权限

3. **权限管理** (QuanXianGuanLi)
   - 权限创建、更新、删除
   - 为权限分配角色

4. **邮件服务** (YouXiangFuWu)
   - 发送验证码邮件
   - 发送欢迎邮件
   - 发送 HTML 邮件

5. **AI 服务** (AIFuWu, AIFuWuLiuShi)
   - AI 对话服务
   - AI 流式输出

### 认证流程

- **密码登录**: 获取加密密钥 → 加密密码 → 发送登录请求
- **验证码登录**: 获取邮箱验证码 → 发送验证码登录请求
- **Token 管理**: accessToken 存储在 IndexedDB 和 Cookie 中，供 API 请求和 middleware 使用
- **权限验证**: 基于角色的访问控制（RBAC）

### 数据持久化

- **用户数据**: IndexedDB (@/lib/indexeddb-manager)
- **认证状态**: Zustand persist 中间件
- **敏感数据**: 同时存储在 Cookie 中供 Next.js middleware 使用

## Important Constraints

- **API 超时**: 5 秒（TIMEOUT = 5 \* 1000）
- **重复请求**: 自动取消重复请求（除非在白名单中）
- **请求防缓存**: GET 请求自动添加时间戳参数
- **Token 认证**: 所有 API 请求自动携带 Authorization header (Bearer token)
- **后端地址**: http://127.0.0.1:3000（BASE_LINE_PROXY_PATH）

## External Dependencies

- **后端 API**: http://127.0.0.1:3000
- **加密服务**: 前端加密使用 crypto-js，后端提供加密密钥接口
- **邮件服务**: 通过后端 API 集成邮件发送功能
- **API 工具**: @scxfe/api-tool 提供 RequestMethod 枚举和工具函数
