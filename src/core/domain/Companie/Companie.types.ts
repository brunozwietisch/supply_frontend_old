import { EmailsResponse } from '@/core/domain/Emails/Emails.types'
import { PhonesResponse } from '@/core/domain/Phones/Phones.types'
import { activeBrType, activeType } from '@/core/domain/_commons/Common.types'

export interface CompanieRequest {
  name: string
  phone?: string
  email?: string
  status: activeType
}

export interface CompanieResponse {
  id: number
  name: string
  status: activeType

  phone?: PhonesResponse
  email?: EmailsResponse

  stage?: activeBrType
}

export interface CompanieSearch {
  current_page: number
  items_per_page?: number

  name?: string
  status?: activeType
}
