import { CompanieResponse } from '@/core/domain/Companie/Companie.types'
import { activeBrType, activeType } from '@/core/domain/_commons/Common.types'

export interface CostCenterResponse {
  id: number
  name: string

  companie_id?: number
  companie?: CompanieResponse

  status: activeType
  stage?: activeBrType
}

export interface CostCentersSearch {
  current_page: number
  items_per_page?: number

  name?: string
  companie_id?: number
  status?: activeType
}

export interface CostCenterRequest {
  name: string
  status: activeType
  companie_id?: number
}
