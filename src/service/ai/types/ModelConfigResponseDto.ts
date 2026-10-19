/**
 * @description AI 模型配置响应
 */
export interface ModelConfigResponseDto {
  /** @description 配置 ID */
  id: string
  /** @description OpenAI 兼容 API 地址 */
  baseUrl: string
  /** @description 模型名 */
  model: string
  /** @description 系统提示词 */
  systemPrompt?: string | null
  /** @description 采样温度 */
  temperature?: number | null
  /** @description 是否已配置 API Key */
  hasApiKey: boolean
  /** @description API Key 掩码（如 sk-…ab12） */
  apiKeyMasked?: string | null
  /** @description 创建时间 */
  createdAt: string
  /** @description 更新时间 */
  updatedAt: string
}
