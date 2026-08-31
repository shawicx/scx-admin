/**
 * @description SendResult
 */
export interface SendResult {
  /** @description  */
  success: boolean
  /** @description  */
  message: string
  /** @description  */
  code?: string | null
  /** @description  */
  error?: string | null
}
