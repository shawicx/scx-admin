import type { MeMenuNodeDto } from '@/service/identity/types/MeMenuNodeDto'

/**
 * @description MeMenusResponseDto
 */
export interface MeMenusResponseDto {
  /** @description  */
  menus: MeMenuNodeDto[]
  /** @description  */
  permissions: string[]
}
