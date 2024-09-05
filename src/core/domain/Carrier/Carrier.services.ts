import api from '@/core/api'
import {
  CarrierRequest,
  CarrierResponse,
  CarriersSearch
} from '@/core/domain/Carrier/Carrier.types'
import {
  ApiResponse,
  PaginatedApiResponse
} from '@/core/domain/_commons/Common.types'

export async function searchCarrier(params: CarriersSearch) {
  const result = api.get(`/carriers/search`, params) as unknown

  return result as PaginatedApiResponse<CarrierResponse>
}

export async function createCarrier(obj: CarrierRequest) {
  const result = api.post(`/carriers`, obj) as unknown

  return result as ApiResponse<CarrierResponse>
}

export async function updateCarrier(id: number, obj: CarrierRequest) {
  const result = api.put(`/carriers/${id}`, obj) as unknown

  return result as ApiResponse<CarrierResponse>
}

export async function findOneCarrier(cost_center_id: number) {
  const result = api.get(`/carriers/findOne/${cost_center_id}`) as unknown

  return result as ApiResponse<CarrierResponse>
}

export async function removeCarrier(id: number) {
  const result = api.remove(`/carriers/${id}`) as unknown
  return result as ApiResponse<unknown>
}
