## Context

用户管理是 SCX Admin 的核心功能之一。当前页面使用假数据，需要转换为真实的数据管理功能。项目已经有 DataTable 组件（`src/components/table/data-table`），可以复用。后端 API 已经完整实现，可直接集成。

## Goals / Non-Goals

- **Goals**:
  - 提供完整的用户列表展示、搜索、分页功能
  - 实现用户的创建、删除操作（支持批量）
  - 实现用户角色的分配和移除
  - 实现用户启用/禁用状态切换（支持批量）
  - 使用现有 DataTable 组件，保持 UI 一致性
  - 集成已实现的后端 API
- **Non-Goals**:
  - 用户批量导入/导出功能（后续迭代）
  - 用户权限的直接管理（通过角色管理）
  - 用户活动的详细日志（后续迭代）

## Decisions

- **Decision**: 使用现有 DataTable 组件构建用户列表
  - **理由**: 项目已经有功能完善的 DataTable 组件，支持搜索、排序、分页，复用可以减少代码重复并保持 UI 一致性
  - **替代方案**: 使用原生 table 标签（已存在但不灵活）、使用第三方表格库（增加依赖）
- **Decision**: 集成已实现的后端 API
  - **理由**: API 已经完整实现，包括所有 CRUD 操作和角色管理功能
  - **API 列表**:
    - `getUsersApi` - 查询用户列表（支持分页、搜索、排序、状态筛选）
    - `postUsersCreateApi` - 创建用户（支持初始角色分配）
    - `deleteUsersApi` - 删除用户（支持批量）
    - `patchUsersToggleStatusApi` - 切换用户状态（支持批量）
    - `postUsersAssignRoleApi` / `postUsersAssignRolesBatchApi` - 分配角色
    - `deleteUsersRemoveRoleApi` - 移除角色
- **Decision**: 用户列表数据结构使用 `UserListItemDto`
  - **理由**: 后端 API 返回的数据类型，包含用户基本信息和状态
  - **字段**: id, name, email, emailVerified, lastLoginIp, lastLoginAt, loginCount, isActive, createdAt, updatedAt
- **Decision**: 角色信息通过 `getRolesApi` 单独获取
  - **理由**: 避免在用户列表中嵌套复杂的角色数据，保持接口简洁
  - **替代方案**: 用户列表返回角色列表（增加接口复杂度）

## Risks / Trade-offs

- **Risk**: 用户删除可能导致数据关联问题
  - **Mitigation**: 删除前显示确认对话框，后端实现软删除（如需要）
- **Trade-off**: 获取用户角色需额外请求 vs 在用户列表中包含角色信息
  - **选择**: 需要时通过 `getUsersRolesApi` 获取，避免冗余数据传输

## Migration Plan

1. 重构 `src/app/users/page.tsx`，使用 DataTable 组件
2. 创建用户管理相关组件（创建用户对话框、删除确认对话框等）
3. 集成 API 调用，实现用户列表查询
4. 实现搜索、分页、排序功能
5. 实现创建、删除、状态切换功能
6. 实现角色分配功能
7. 运行 lint 和 format 检查代码质量

## Open Questions

无 - 后端 API 已完整实现，数据结构清晰。
