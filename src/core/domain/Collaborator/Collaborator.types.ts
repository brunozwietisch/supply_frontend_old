import { AddressResponse } from '@/core/domain/Address/Address.types'
import { AttachmentResponse } from '@/core/domain/Attachment/Attachment.types'
import { CompanieResponse } from '@/core/domain/Companie/Companie.types'
import { UserPermissions } from '@/core/domain/Permission/Permission.types'
import { PhonesResponse } from '@/core/domain/Phones/Phones.types'
import { UserResponse } from '@/core/domain/User/User.types'
import { activeType } from '@/core/domain/_commons/Common.types'

export interface CollaboratorResponse {
  id: number
  name: string
  email?: string
  enrollment?: string
  companie_id?: number
  password?: string
  password_confirmation?: string
  phone?: string
  secundary_phone?: string

  ck_command_access?: activeType
  single_password?: string
  fixed?: activeType
  validator?: activeType
  approver?: activeType

  operation?: activeType

  carrier?: activeType
  costcenter?: activeType
  collaborator?: activeType
  companie?: activeType
  holiday?: activeType
  location?: activeType
  vehicle?: activeType

  zip_code?: string
  address_number?: string
  complement?: string
  neighborhood?: string
  city?: string
  state?: string

  adresses?: any

  user?: UserResponse
  companies?: CompanieResponse
  phones?: PhonesResponse
  address?: AddressResponse
  attachment?: AttachmentResponse

  permissions: Array<UserPermissions>
}

export interface CollaboratorsSearch {
  current_page: number
  items_per_page?: number

  name?: string
  email?: string
  companie_id?: number

  operation?: activeType
  fixed?: activeType
  validator?: activeType
  approver?: activeType
}

export interface CollaboratorRequest {
  name: string
  email?: string
  enrollment?: string
  companie_id?: number
  password?: string
  password_confirmation?: string
  phone?: string
  secundary_phone?: string

  ck_command_access?: activeType
  single_password?: string
  operation: activeType
  fixed?: activeType
  validator?: activeType
  approver?: activeType

  carrier: activeType
  costcenter: activeType
  collaborator: activeType
  companie: activeType
  holiday: activeType
  location: activeType
  vehicle: activeType

  zip_code?: string
  address?: string
  address_number?: string
  complement?: string
  neighborhood?: string
  city?: string
  state?: string

  adresses?: any
}
