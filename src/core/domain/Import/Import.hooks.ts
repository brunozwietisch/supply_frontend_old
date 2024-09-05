import { toast } from 'react-toastify'
import { useMutation } from 'react-query'

import { uploadFile } from '@/core/domain/Import/Import.services'
import { ImportRequest } from '@/core/domain/Import/Import.types'

export function useImport() {
  const mutation = useMutation((obj: ImportRequest) => uploadFile(obj), {
    onSuccess() {
      toast.success('Arquivo importado com sucesso!')
    },
    onError() {
      toast.error('Ocorreu um erro ao carregar o arquivo.')
    }
  })

  return mutation
}
