import { ApiNamespacesType } from '@/core/domain/_commons/Common.types'

export interface AttachmentRequest {
  attachment: File
  attachmentable_id: number | string
  filePath?: string
  attachmentable_type?: ApiNamespacesType
  temp?: number // -1 para arquivos temporários
  description?: string | null
}

export interface AttachmentResponse {
  id: number
  original_name: string
  file: string
  attachmentable_type: ApiNamespacesType
  attachmentable_id: number
  user_id: number

  created_at: string | null
  updated_at: string | null
  deleted_at: string | null
}

export interface AttachmentSearch {
  current_page: number
  items_per_page?: number
  attachmentable_type: ApiNamespacesType
  attachmentable_id: number
}
