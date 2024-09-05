import { CompanieResponse } from '@/core/domain/Companie/Companie.types'
import { UserPermissions } from '@/core/domain/Permission/Permission.types'
import { activeType } from '@/core/domain/_commons/Common.types'

export interface AuthRequest {
  email: string
  password: string
  device_name: string
}

export interface AuthResponse {
  token: string
  id: number
  name: string
  email: string

  operation: activeType
  validator: activeType
  approver: activeType
  fixed: activeType

  companies: CompanieResponse

  permissions: Array<UserPermissions>
}
