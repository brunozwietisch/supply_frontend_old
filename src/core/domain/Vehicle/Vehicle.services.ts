import api from '@/core/api'
import {
  VehicleRequest,
  VehicleResponse,
  VehiclesSearch
} from '@/core/domain/Vehicle/Vehicle.types'
import {
  ApiResponse,
  PaginatedApiResponse
} from '@/core/domain/_commons/Common.types'

export async function searchVehicle(params: VehiclesSearch) {
  const result = api.get(`/vehicles/search`, params) as unknown

  return result as PaginatedApiResponse<VehicleResponse>
}

export async function createVehicle(obj: VehicleRequest) {
  const result = api.post(`/vehicles`, obj) as unknown

  return result as ApiResponse<VehicleResponse>
}

export async function updateVehicle(id: number, obj: VehicleRequest) {
  const result = api.put(`/vehicles/${id}`, obj) as unknown

  return result as ApiResponse<VehicleResponse>
}

export async function findOneVehicle(cost_center_id: number) {
  const result = api.get(`/vehicles/findOne/${cost_center_id}`) as unknown

  return result as ApiResponse<VehicleResponse>
}

export async function removeVehicle(id: number) {
  const result = api.remove(`/vehicles/${id}`) as unknown
  return result as ApiResponse<unknown>
}
