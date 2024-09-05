import {
  getSearchAttachment,
  removeAttachment,
  uploadAttachment
} from '@/core/domain/Attachment/Attachment.services'
import {
  AttachmentRequest,
  AttachmentSearch
} from '@/core/domain/Attachment/Attachment.types'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'

export function useUploadAttachment() {
  const mutation = useMutation(
    (obj: AttachmentRequest) => uploadAttachment(obj),
    {
      onSuccess() {
        toast.success('Anexo carregado com sucesso!')
      },
      onError() {
        toast.error('Ocorreu um erro ao carregar o anexo.')
      }
    }
  )

  return mutation
}

export function useRemoveAttachment() {
  const mutation = useMutation((id: number) => removeAttachment(id), {
    onSuccess() {
      toast.success('Anexo removido com sucesso!')
    },
    onError() {
      toast.error('Ocorreu um erro ao remover o anexo.')
    }
  })

  return mutation
}

export function useSearchAttachment(params: AttachmentSearch) {
  const query = useQuery(['getSearchAttachment', params], () =>
    getSearchAttachment(params)
  )

  return query
}
