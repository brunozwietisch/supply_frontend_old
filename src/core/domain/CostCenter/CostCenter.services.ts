import api from '@/core/api'
import {
  CostCenterRequest,
  CostCenterResponse,
  CostCentersSearch
} from '@/core/domain/CostCenter/CostCenter.types'
import {
  ApiResponse,
  PaginatedApiResponse
} from '@/core/domain/_commons/Common.types'

export async function searchCostCenter(params: CostCentersSearch) {
  const result = api.get(`/costcenters/search`, params) as unknown

  return result as PaginatedApiResponse<CostCenterResponse>
}

export async function createCostCenter(obj: CostCenterRequest) {
  const result = api.post(`/costcenters`, obj) as unknown

  return result as ApiResponse<CostCenterResponse>
}

export async function updateCostCenter(id: number, obj: CostCenterRequest) {
  const result = api.put(`/costcenters/${id}`, obj) as unknown

  return result as ApiResponse<CostCenterResponse>
}

export async function findOneCostCenter(cost_center_id: number) {
  const result = api.get(`/costcenters/findOne/${cost_center_id}`) as unknown

  return result as ApiResponse<CostCenterResponse>
}

export async function removeCostCenter(id: number) {
  const result = api.remove(`/costcenters/${id}`) as unknown
  return result as ApiResponse<unknown>
}
