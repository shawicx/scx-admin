## ADDED Requirements

### Requirement: 权限列表查询

系统 SHALL 提供权限列表查询功能，支持分页、搜索和排序。

#### Scenario: 查询权限列表

- **WHEN** 管理员访问权限管理页面
- **THEN** 系统调用 `getPermissionsApi` API，默认每页显示 10 条记录
- **AND** 传递参数：`page=1`, `limit=10`
- **AND** 显示返回的权限列表（`PermissionResponseDto` 数组）
- **AND** 显示总权限数、当前页码和分页控件

#### Scenario: 搜索权限

- **WHEN** 管理员在搜索框输入权限名称关键词
- **THEN** 系统调用 `getPermissionsApi` API，传递 `search` 参数
- **AND** API 返回匹配关键词的权限列表
- **AND** 显示搜索结果数量和过滤后的权限

#### Scenario: 分页浏览

- **WHEN** 管理员点击分页控件（上一页、下一页或跳转到指定页）
- **THEN** 系统调用 `getPermissionsApi` API，传递更新后的 `page` 参数
- **AND** API 返回对应页的权限数据
- **AND** 更新分页控件状态

#### Scenario: 排序权限

- **WHEN** 管理员点击表格列标题（如创建时间、更新时间）
- **THEN** 系统调用 `getPermissionsApi` API，传递 `sortBy` 和 `sortOrder` 参数
- **AND** `sortBy` 为排序字段（如 'createdAt', 'updatedAt'）
- **AND** `sortOrder` 为排序方向（'asc' 或 'desc'）
- **AND** API 返回排序后的权限列表
- **AND** 显示排序指示器

### Requirement: 创建权限

系统 SHALL 提供创建权限功能，允许管理员添加新的权限到系统。

#### Scenario: 打开创建权限对话框

- **WHEN** 管理员点击"添加权限"按钮
- **THEN** 系统显示创建权限对话框
- **AND** 对话框包含必填字段：权限名称、操作动作、资源名称
- **AND** 对话框包含可选字段：权限描述

#### Scenario: 提交创建权限表单

- **WHEN** 管理员填写完整的权限信息（权限名称、操作动作、资源名称、权限描述）并点击"确认"按钮
- **THEN** 系统验证表单数据
- **AND** 调用 `postPermissionsApi` API
- **AND** 传递参数：`name`, `action`, `resource`, `description`（可选）
- **AND** 成功后关闭对话框并刷新权限列表
- **AND** 显示成功提示消息

#### Scenario: 创建权限表单验证失败

- **WHEN** 管理员提交的表单数据不完整或不符合要求
- **THEN** 系统显示相应的字段错误提示
- **AND** 不调用 API 请求

### Requirement: 编辑权限

系统 SHALL 提供编辑权限功能，允许管理员更新权限信息。

#### Scenario: 打开编辑权限对话框

- **WHEN** 管理员点击权限行的"编辑"按钮
- **THEN** 系统显示编辑权限对话框
- **AND** 系统调用 `getPermissionsDetailApi` API 获取权限详情
- **AND** 对话框预填充权限当前数据（权限名称、操作动作、资源名称、权限描述）

#### Scenario: 提交编辑权限表单

- **WHEN** 管理员修改权限信息后点击"确认"按钮
- **THEN** 系统验证表单数据
- **AND** 调用 `putPermissionsApi` API
- **AND** 传递参数：`id`, `name`, `action`, `resource`, `description`（可选）
- **AND** 成功后关闭对话框并刷新权限列表
- **AND** 显示成功提示消息

#### Scenario: 编辑权限表单验证失败

- **WHEN** 管理员提交的表单数据不完整或不符合要求
- **THEN** 系统显示相应的字段错误提示
- **AND** 不调用 API 请求

### Requirement: 删除权限

系统 SHALL 提供删除权限功能，支持单个和批量删除权限。

#### Scenario: 单个删除权限 - 显示确认对话框

- **WHEN** 管理员点击权限行的"删除"按钮
- **THEN** 系统显示删除确认对话框
- **AND** 对话框提示删除操作的不可逆性和潜在影响

#### Scenario: 单个删除权限 - 确认删除

- **WHEN** 管理员在确认对话框中点击"确认删除"按钮
- **THEN** 系统调用 `deletePermissionsApi` API
- **AND** 传递参数：`id`（权限 ID）
- **AND** API 返回 `DeletePermissionsResponseType`
- **AND** 成功后从权限列表中移除该权限
- **AND** 显示成功提示消息

#### Scenario: 批量删除权限

- **WHEN** 管理员选择多个权限并点击"批量删除"按钮
- **THEN** 系统显示批量删除确认对话框
- **AND** 对话框显示将删除的权限数量
- **AND** 管理员确认后，系统逐个调用 `deletePermissionsApi` API
- **AND** 成功后从权限列表中移除这些权限
- **AND** 显示成功提示消息

#### Scenario: 取消删除权限

- **WHEN** 管理员在确认对话框中点击"取消"按钮
- **THEN** 系统关闭对话框
- **AND** 不执行删除操作
