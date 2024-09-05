import { toast } from 'react-toastify'
import { useMutation } from 'react-query'
import { login } from '@/core/domain/Auth/Auth.services'
import { AuthRequest } from '@/core/domain/Auth/Auth.types'

export function useLogin() {
  const mutation = useMutation((obj: AuthRequest) => login(obj), {
    onSuccess: res => {
      if (res.success) {
        toast.success('Login efetuado com sucesso')
      } else {
        toast.error('Os dados fornecidos são inválidos.')
      }
    }
  })

  return mutation
}
