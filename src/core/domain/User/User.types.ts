import { CompanieResponse } from '@/core/domain/Companie/Companie.types'
import { UserPermissions } from '@/core/domain/Permission/Permission.types'
import { activeType } from '@/core/domain/_commons/Common.types'

export interface UserResponse {
  id: number
  name: string
  email: string

  single_password?: string

  permissions: Array<UserPermissions>

  companies: CompanieResponse

  operation: activeType
  fixed: activeType
  validator: activeType
  approver: activeType
}
