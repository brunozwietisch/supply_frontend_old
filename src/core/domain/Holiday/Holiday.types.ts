import { CompanieResponse } from '@/core/domain/Companie/Companie.types'
import { activeBrType, activeType } from '@/core/domain/_commons/Common.types'

export interface HolidayResponse {
  id: number
  name: string
  date_holiday: string
  date_end_holiday?: string

  companie?: CompanieResponse

  status: activeType
  stage?: activeBrType
}

export interface HolidaysSearch {
  current_page: number
  items_per_page?: number

  name?: string
  year?: string
  status?: activeType
}

export interface HolidayRequest {
  name: string
  date_holiday: string
  date_end_holiday?: string
  status: activeType
}
