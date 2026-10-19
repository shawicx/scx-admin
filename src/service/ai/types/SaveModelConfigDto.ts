/**
 * @description 保存 AI 模型配置请求
 */
export interface SaveModelConfigDto {
  /** @description OpenAI 兼容 API 地址（如 https://dashscope.aliyuncs.com/compatible-mode/v1） */
  baseUrl: string
  /** @description API Key（首次配置必填；已保存过且传空表示保留原值） */
  apiKey?: string | null
  /** @description 模型名（如 qwen-plus / deepseek-chat / glm-4） */
  model: string
  /** @description 系统提示词（可选） */
  systemPrompt?: string | null
  /** @description 采样温度 0-2（可选） */
  temperature?: number | null
}
