import api from '@/core/api'
import {
  CollaboratorRequest,
  CollaboratorResponse,
  CollaboratorsSearch
} from '@/core/domain/Collaborator/Collaborator.types'
import {
  ApiResponse,
  PaginatedApiResponse
} from '@/core/domain/_commons/Common.types'

export async function search(params: CollaboratorsSearch) {
  const result = api.get(`/collaborators/search`, params) as unknown

  return result as PaginatedApiResponse<CollaboratorResponse>
}

export async function create(obj: CollaboratorRequest) {
  const result = api.post(`/collaborators`, obj) as unknown

  return result as ApiResponse<CollaboratorResponse>
}

export async function update(id: number, obj: CollaboratorRequest) {
  const result = api.put(`/collaborators/${id}`, obj) as unknown

  return result as ApiResponse<CollaboratorResponse>
}

export async function findOne(collaborator_id: number) {
  const result = api.get(`/collaborators/findOne/${collaborator_id}`) as unknown

  return result as ApiResponse<CollaboratorResponse>
}
