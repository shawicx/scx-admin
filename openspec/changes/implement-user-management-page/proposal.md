# Change: 实现用户管理页面

## Why

当前用户管理页面只显示硬编码的假数据，无法进行真实的用户管理操作（查询、创建、删除、分配角色、启用/禁用）。需要完善用户管理功能，使其能够与后端 API 交互，提供完整的用户管理能力。

## What Changes

- 添加用户列表查询、搜索、分页功能
- 实现创建用户功能
- 实现删除用户功能
- 实现为用户分配/移除角色功能
- 实现启用/禁用用户功能
- 集成现有 DataTable 组件实现响应式表格
- 集成已实现的后端 API 服务

## Impact

- Affected specs: `user-management` (新增)
- Affected code:
  - `src/app/users/page.tsx` - 完全重构用户管理页面
  - 新增 `src/components/users/` 目录 - 用户管理相关组件
- 已完成 API: `src/service/YongHuGuanLi/index.ts` 已实现所有用户管理 API
