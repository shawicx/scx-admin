/**
 * @description 连通性测试请求
 */
export interface TestConnectionDto {
  /** @description OpenAI 兼容 API 地址 */
  baseUrl: string
  /** @description API Key（传空时使用已保存的 Key） */
  apiKey?: string | null
}
