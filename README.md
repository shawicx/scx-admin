# SCX Admin - 现代化管理后台系统

基于 Next.js 14 构建的现代化管理后台系统，集成了最新的前端技术栈。

## 技术栈

- **框架**: Next.js 14 (App Router)
- **UI 库**: Tailwind CSS + shadcn/ui
- **状态管理**: Zustand
- **表单验证**: Zod + React Hook Form
- **图标**: Lucide React
- **代码规范**: Prettier + Oxlint
- **Git 钩子**: Husky + Commitlint
- **包管理**: pnpm

## 功能特性

- ✅ 响应式设计，支持移动端
- ✅ 深色/浅色主题切换
- ✅ 用户认证系统（邮箱密码 + 验证码登录）
- ✅ 统一的菜单管理系统
- ✅ 现代化的 UI 组件
- ✅ TypeScript 类型安全
- ✅ 代码格式化和提交规范

## 项目结构

```
src/
├── app/                    # Next.js App Router 页面
│   ├── login/             # 登录页面
│   ├── register/          # 注册页面
│   ├── users/             # 用户管理页面
│   ├── settings/          # 系统设置页面
│   └── layout.tsx         # 根布局
├── components/            # 可复用组件
│   ├── ui/               # shadcn/ui 组件
│   ├── layout/           # 布局组件
│   ├── header.tsx        # 头部组件
│   ├── sidebar.tsx       # 侧边栏组件
│   ├── theme-provider.tsx # 主题提供者
│   └── theme-toggle.tsx  # 主题切换组件
├── stores/               # Zustand 状态管理
│   ├── auth.ts          # 认证状态
│   └── theme.ts         # 主题状态
├── hooks/               # 自定义 Hooks
│   └── use-countdown.ts # 倒计时 Hook
├── lib/                 # 工具函数和配置
│   ├── validations/     # Zod 验证模式
│   ├── menu.ts         # 菜单配置
│   └── utils.ts        # 工具函数
└── styles/             # 样式文件
```

## 快速开始

1. 安装依赖：

```bash
pnpm install
```

2. 启动开发服务器：

```bash
pnpm dev
```

3. 打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 可用脚本

- `pnpm dev` - 启动开发服务器
- `pnpm build` - 构建生产版本
- `pnpm start` - 启动生产服务器
- `pnpm lint` - 运行代码检查
- `pnpm format` - 格式化代码

## 登录信息

系统提供了模拟的登录功能：

- **验证码登录**: 使用任意邮箱，验证码输入 `123456`
- **密码登录**: 使用任意邮箱和至少6位密码

## 主要页面

- `/` - 仪表板首页
- `/login` - 登录页面
- `/register` - 注册页面
- `/users` - 用户管理
- `/settings` - 系统设置

## 开发规范

项目使用了严格的代码规范：

- **提交规范**: 使用 Conventional Commits
- **代码格式**: Prettier 自动格式化
- **代码检查**: Oxlint 静态分析
- **Git 钩子**: 提交前自动检查和格式化

## 许可证

MIT License
