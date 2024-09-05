import api from '@/core/api'
import {
  LocationRequest,
  LocationResponse,
  LocationsSearch
} from '@/core/domain/Location/Location.types'
import {
  ApiResponse,
  PaginatedApiResponse
} from '@/core/domain/_commons/Common.types'

export async function searchLocation(params: LocationsSearch) {
  const result = api.get(`/locations/search`, params) as unknown

  return result as PaginatedApiResponse<LocationResponse>
}

export async function findOneLocation(Locations_id: number) {
  const result = api.get(`/locations/findOne/${Locations_id}`) as unknown

  return result as ApiResponse<LocationResponse>
}

export async function createLocation(obj: LocationRequest) {
  const result = api.post(`/locations`, obj) as unknown

  return result as ApiResponse<LocationResponse>
}

export async function updateLocation(id: number, obj: LocationRequest) {
  const result = api.put(`/locations/${id}`, obj) as unknown

  return result as ApiResponse<LocationResponse>
}

export async function removeLocation(id: number) {
  const result = api.remove(`/locations/${id}`) as unknown
  return result as ApiResponse<unknown>
}
