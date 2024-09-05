import api from '@/core/api'
import {
  AttachmentResponse,
  AttachmentRequest,
  AttachmentSearch
} from '@/core/domain/Attachment/Attachment.types'
import {
  ApiResponse,
  PaginatedApiResponse
} from '@/core/domain/_commons/Common.types'

export async function uploadAttachment(obj: AttachmentRequest) {
  const formData = new FormData()

  Object.entries(obj).forEach(values => {
    formData.append(values[0], values[1])
  })

  const result = api.upload(`/attachment`, formData) as unknown

  return result as ApiResponse<{ attachment: AttachmentResponse[] }>
}

export async function removeAttachment(id: number) {
  const result = api.remove(`/attachment/${id}`) as unknown

  return result as ApiResponse<unknown>
}

export async function getSearchAttachment(obj: AttachmentSearch) {
  const result = api.get(`/attachment/search`, obj) as unknown

  return result as PaginatedApiResponse<AttachmentResponse>
}
