/**
 * @description MeMenuNodeDto
 */
export interface MeMenuNodeDto {
  /** @description  */
  id: string
  /** @description  */
  name: string
  /** @description  */
  path?: string | null
  /** @description  */
  icon?: string | null
  /** @description  */
  sort: number
  /** @description  */
  children: MeMenuNodeDto[]
}
