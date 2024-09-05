import api from '@/core/api'
import { ImportRequest } from '@/core/domain/Import/Import.types'
import { ApiResponse } from '@/core/domain/_commons/Common.types'

export async function uploadFile(obj: ImportRequest) {
  const formData = new FormData()

  Object.entries(obj).forEach(values => {
    formData.append(values[0], values[1])
  })

  const result = api.upload(`/import`, formData) as unknown

  return result as ApiResponse<unknown>
}
