import api from '@/core/api'

import { ApiResponse } from '../_commons/Common.types'
import { AuthRequest, AuthResponse } from '@/core/domain/Auth/Auth.types'

export async function login(obj: AuthRequest) {
  const result = api.post('/users/auth', obj) as unknown

  return result as ApiResponse<AuthResponse>
}
