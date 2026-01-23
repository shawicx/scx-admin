## ADDED Requirements

### Requirement: 用户列表查询

系统 SHALL 提供用户列表查询功能，支持分页、搜索、排序和状态筛选。

#### Scenario: 查询用户列表

- **WHEN** 管理员访问用户管理页面
- **THEN** 系统调用 `getUsersApi` API，默认每页显示 10 条记录
- **AND** 传递参数：`page=1`, `limit=10`
- **AND** 显示返回的用户列表（`UserListItemDto` 数组）
- **AND** 显示总用户数、当前页码和分页控件

#### Scenario: 搜索用户

- **WHEN** 管理员在搜索框输入姓名或邮箱关键词
- **THEN** 系统调用 `getUsersApi` API，传递 `search` 参数
- **AND** API 返回匹配关键词的用户列表
- **AND** 显示搜索结果数量和过滤后的用户

#### Scenario: 状态筛选用户

- **WHEN** 管理员选择状态筛选条件（启用/禁用）
- **THEN** 系统调用 `getUsersApi` API，传递 `isActive` 参数（'true' 或 'false'）
- **AND** API 返回对应状态的用户列表
- **AND** 显示筛选后的用户

#### Scenario: 分页浏览

- **WHEN** 管理员点击分页控件（上一页、下一页或跳转到指定页）
- **THEN** 系统调用 `getUsersApi` API，传递更新后的 `page` 参数
- **AND** API 返回对应页的用户数据
- **AND** 更新分页控件状态

#### Scenario: 排序用户

- **WHEN** 管理员点击表格列标题（如创建时间、最后登录时间）
- **THEN** 系统调用 `getUsersApi` API，传递 `sortBy` 和 `sortOrder` 参数
- **AND** `sortBy` 为排序字段（如 'createdAt', 'lastLoginAt'）
- **AND** `sortOrder` 为排序方向（'asc' 或 'desc'）
- **AND** API 返回排序后的用户列表
- **AND** 显示排序指示器

### Requirement: 创建用户

系统 SHALL 提供创建用户功能，允许管理员添加新用户到系统并分配初始角色。

#### Scenario: 打开创建用户对话框

- **WHEN** 管理员点击"添加用户"按钮
- **THEN** 系统显示创建用户对话框
- **AND** 对话框包含必填字段：姓名、邮箱、密码
- **AND** 对话框包含可选字段：是否启用、角色选择

#### Scenario: 加载可用角色列表

- **WHEN** 创建用户对话框打开
- **THEN** 系统调用 `getRolesApi` API 获取可用角色列表
- **AND** 在角色选择下拉框中显示所有角色
- **AND** 支持多选角色

#### Scenario: 提交创建用户表单（无角色）

- **WHEN** 管理员填写完整的用户信息（姓名、邮箱、密码、是否启用）并点击"确认"按钮
- **THEN** 系统验证表单数据（邮箱格式、密码强度等）
- **AND** 调用 `postUsersCreateApi` API
- **AND** 传递参数：`email`, `name`, `password`, `isActive`
- **AND** 成功后关闭对话框并刷新用户列表
- **AND** 显示成功提示消息

#### Scenario: 提交创建用户表单（带角色）

- **WHEN** 管理员填写完整的用户信息并选择初始角色后点击"确认"按钮
- **THEN** 系统验证表单数据
- **AND** 调用 `postUsersCreateApi` API
- **AND** 传递参数：`email`, `name`, `password`, `isActive`, `roleIds`（数组）
- **AND** 成功后关闭对话框并刷新用户列表
- **AND** 显示成功提示消息

#### Scenario: 创建用户表单验证失败

- **WHEN** 管理员提交的表单数据不完整或不符合要求
- **THEN** 系统显示相应的字段错误提示
- **AND** 不调用 API 请求

### Requirement: 删除用户

系统 SHALL 提供删除用户功能，支持单个和批量删除用户。

#### Scenario: 单个删除用户 - 显示确认对话框

- **WHEN** 管理员点击用户行的"删除"按钮
- **THEN** 系统显示删除确认对话框
- **AND** 对话框提示删除操作的不可逆性和潜在影响

#### Scenario: 单个删除用户 - 确认删除

- **WHEN** 管理员在确认对话框中点击"确认删除"按钮
- **THEN** 系统调用 `deleteUsersApi` API
- **AND** 传递参数：`userIds: [userId]`（包含单个用户 ID 的数组）
- **AND** API 返回 `DeleteUsersResponseType`（包含 `count` 和 `message`）
- **AND** 成功后从用户列表中移除该用户
- **AND** 显示成功提示消息：`"已删除 ${count} 个用户"`

#### Scenario: 批量删除用户

- **WHEN** 管理员选择多个用户并点击"批量删除"按钮
- **THEN** 系统显示批量删除确认对话框
- **AND** 对话框显示将删除的用户数量和用户列表
- **AND** 管理员确认后，系统调用 `deleteUsersApi` API
- **AND** 传递参数：`userIds: [userId1, userId2, ...]`
- **AND** 成功后从用户列表中移除这些用户
- **AND** 显示成功提示消息：`"已删除 ${count} 个用户"`

#### Scenario: 取消删除用户

- **WHEN** 管理员在确认对话框中点击"取消"按钮
- **THEN** 系统关闭对话框
- **AND** 不执行删除操作

### Requirement: 分配角色

系统 SHALL 提供为用户分配角色的功能，允许管理员管理用户的角色权限。

#### Scenario: 打开角色分配对话框

- **WHEN** 管理员点击用户行的"分配角色"按钮
- **THEN** 系统显示角色分配对话框
- **AND** 系统调用 `getRolesApi` API 获取所有可用角色
- **AND** 系统调用 `getUsersRolesApi` API 获取用户当前角色
- **AND** 对话框显示所有角色，并标识用户当前已分配的角色

#### Scenario: 为用户分配新角色

- **WHEN** 管理员在角色分配对话框中选择未分配的角色并点击"确认"按钮
- **THEN** 系统调用 `postUsersAssignRoleApi` API
- **AND** 传递参数：`userId`, `roleId`
- **AND** API 返回 `PostUsersAssignRoleResponseType`
- **AND** 成功后更新用户的角色显示
- **AND** 显示成功提示消息

#### Scenario: 为用户批量分配角色

- **WHEN** 管理员在角色分配对话框中选择多个未分配的角色并点击"确认"按钮
- **THEN** 系统调用 `postUsersAssignRolesBatchApi` API
- **AND** 传递参数：`userId`, `roleIds`（数组）
- **AND** API 返回 `PostUsersAssignRolesBatchResponseType`
- **AND** 成功后更新用户的角色显示
- **AND** 显示成功提示消息

#### Scenario: 移除用户角色

- **WHEN** 管理员在角色分配对话框中取消选择已分配的角色并点击"确认"按钮
- **THEN** 系统调用 `deleteUsersRemoveRoleApi` API
- **AND** 传递参数：`id` (用户 ID), `roleId`
- **AND** API 返回 `DeleteUsersRemoveRoleResponseType`
- **AND** 成功后更新用户的角色显示
- **AND** 显示成功提示消息

### Requirement: 用户状态管理

系统 SHALL 提供启用/禁用用户的功能，支持单个和批量状态切换。

#### Scenario: 单个启用用户

- **WHEN** 管理员将禁用用户的状态开关切换为启用
- **THEN** 系统调用 `patchUsersToggleStatusApi` API
- **AND** 传递参数：`userIds: [userId]`, `isActive: true`
- **AND** API 返回 `PatchUsersToggleStatusResponseType`（包含 `count` 和 `message`）
- **AND** 成功后更新用户状态显示为"活跃"
- **AND** 显示成功提示消息：`"已启用 ${count} 个用户"`

#### Scenario: 单个禁用用户

- **WHEN** 管理员将活跃用户的状态开关切换为禁用
- **THEN** 系统显示确认对话框
- **AND** 提示禁用后用户将无法登录
- **AND** 管理员确认后，系统调用 `patchUsersToggleStatusApi` API
- **AND** 传递参数：`userIds: [userId]`, `isActive: false`
- **AND** 成功后更新用户状态显示为"禁用"
- **AND** 显示成功提示消息：`"已禁用 ${count} 个用户"`

#### Scenario: 批量切换用户状态

- **WHEN** 管理员选择多个用户并点击"批量启用"或"批量禁用"按钮
- **THEN** 系统显示批量操作确认对话框
- **AND** 显示将操作的用户数量
- **AND** 管理员确认后，系统调用 `patchUsersToggleStatusApi` API
- **AND** 传递参数：`userIds: [userId1, userId2, ...]`, `isActive: true/false`
- **AND** 成功后更新所有选中用户的状态
- **AND** 显示成功提示消息：`"已启用/禁用 ${count} 个用户"`

#### Scenario: 取消状态切换

- **WHEN** 管理员在确认对话框中点击"取消"按钮
- **THEN** 系统关闭对话框
- **AND** 不执行状态切换操作
