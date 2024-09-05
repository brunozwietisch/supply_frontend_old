import {
  search,
  create,
  findOne,
  update
} from '@/core/domain/Collaborator/Collaborator.services'
import {
  CollaboratorRequest,
  CollaboratorsSearch
} from '@/core/domain/Collaborator/Collaborator.types'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'

export function useCollaboratorSearch(params: CollaboratorsSearch) {
  const query = useQuery(['search', params], () => search(params))
  return query
}

export function useCreate() {
  const mutation = useMutation((obj: CollaboratorRequest) => create(obj), {
    onSuccess() {
      toast.success('Colaborador cadastrada com sucesso')
    },
    onError(error: any) {
      if (error && error.message) {
        for (const key in error.message) {
          const messagesArray = error.message[key]
          messagesArray.forEach((message: string) => {
            toast.error(message)
          })
        }
      }
    }
  })

  return mutation
}

export function useUpdate() {
  const mutation = useMutation(
    ({ id, obj }: { id: number; obj: CollaboratorRequest }) => update(id, obj),
    {
      onSuccess() {
        toast.success('Colaborador atualizado com sucesso')
      },
      onError() {
        toast.error('Ocorreu um erro ao atualizar o Colaborador.')
      }
    }
  )

  return mutation
}

export function usefindOne(collaborator_id: number) {
  const query = useQuery(
    ['findOne', collaborator_id],
    () => findOne(collaborator_id),
    {
      enabled: !!collaborator_id,
      onSuccess(res) {
        if (res.code === 404) {
          toast.warning('Esse Colaborador não existe.')
        }
      }
    }
  )

  return query
}
