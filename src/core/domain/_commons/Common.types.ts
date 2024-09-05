export interface ApiResponse<T> {
  code?: number
  success?: boolean
  status?: number
  message?: string
  data?: T
}

export interface ApiResponseAll<T> {
  code?: number
  success?: boolean
  status?: number
  message?: string
  data?: T[]
}

export interface PaginatedApiResponse<T> {
  current_page: number
  data: T[]
  first_page_url: string
  from: number | null
  last_page: number
  last_page_url: string
  links: Array<{
    url: string | null
    label: string
    active: boolean
  }>
  next_page_url: string | null
  path: number
  per_page: number
  prev_page_url: string | null
  to: number | null
  total: number
}

export interface PageRequest {
  current_page: number
}

export type ApiNamespacesType = 'App\\Models\\Collaborator'

export type activeType = 'active' | 'inactive'

export type activeBrType = 'Ativo' | 'Inativo'

export type pendingType = 'pending' | 'initialized' | 'concluded' | 'closed'

export type storageType = 'storage' | 'supply'

export type approveType = 'approved' | 'disapproved'

export type yesNoType = 'yes' | 'no'
