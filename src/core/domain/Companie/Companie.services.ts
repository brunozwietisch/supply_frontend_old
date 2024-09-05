import api from '@/core/api'
import {
  CompanieRequest,
  CompanieResponse,
  CompanieSearch
} from '@/core/domain/Companie/Companie.types'
import {
  ApiResponse,
  PaginatedApiResponse
} from '@/core/domain/_commons/Common.types'

export async function search(params: CompanieSearch) {
  const result = api.get(`/companies/search`, params) as unknown

  return result as PaginatedApiResponse<CompanieResponse>
}

export async function findOne(companie_id: number) {
  const result = api.get(`/companies/findOne/${companie_id}`) as unknown

  return result as ApiResponse<CompanieResponse>
}

export async function create(obj: CompanieRequest) {
  const result = api.post(`/companies`, obj) as unknown

  return result as ApiResponse<CompanieResponse>
}

export async function update(id: number, obj: CompanieRequest) {
  const result = api.put(`/companies/${id}`, obj) as unknown

  return result as ApiResponse<CompanieResponse>
}

export async function remove(id: number) {
  const result = api.remove(`/companies/${id}`) as unknown
  return result as ApiResponse<unknown>
}
