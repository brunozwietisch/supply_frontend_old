import api from '@/core/api'
import {
  OperationDefault,
  OperationRequest,
  OperationResponse,
  OperationsSearch
} from '@/core/domain/Operation/Operation.types'
import {
  ApiResponse,
  PaginatedApiResponse
} from '@/core/domain/_commons/Common.types'

export async function search(params: OperationsSearch) {
  const result = api.get(`/operations/search`, params) as unknown

  return result as PaginatedApiResponse<OperationResponse>
}

export async function findOne(Operation_id: number) {
  const result = api.get(`/operations/findOne/${Operation_id}`) as unknown

  return result as ApiResponse<OperationResponse>
}

export async function generateDefaultData(user_id: number | null) {
  const result = api.get(
    `/operations/generateDefaultData/${user_id}`
  ) as unknown

  return result as ApiResponse<OperationDefault>
}

export async function create(obj: OperationRequest) {
  const result = api.post(`/operations`, obj) as unknown

  return result as ApiResponse<OperationResponse>
}

export async function update(id: number, obj: OperationRequest) {
  const result = api.put(`/operations/${id}`, obj) as unknown

  return result as ApiResponse<OperationResponse>
}

export async function updateStage(obj: any) {
  const result = api.post(`/operations/onChangeStatus`, obj) as unknown

  return result as ApiResponse<OperationResponse>
}

export async function remove(id: number) {
  const result = api.remove(`/operations/${id}`) as unknown
  return result as ApiResponse<unknown>
}
