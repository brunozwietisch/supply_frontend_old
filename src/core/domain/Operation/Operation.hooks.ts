import {
  search,
  create,
  findOne,
  update,
  remove,
  generateDefaultData,
  updateStage
} from '@/core/domain/Operation/Operation.services'
import {
  OperationRequest,
  OperationsSearch
} from '@/core/domain/Operation/Operation.types'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'

export function useSearch(params: OperationsSearch) {
  const query = useQuery(['search', params], () => search(params))
  return query
}

export function useCreate() {
  const mutation = useMutation((obj: OperationRequest) => create(obj), {
    onSuccess() {
      toast.success('Comanda cadastrada com sucesso')
    },
    onError() {
      toast.error('Ocorreu um erro ao cadastrar.')
    }
  })

  return mutation
}

export function useUpdate() {
  const mutation = useMutation(
    ({ id, obj }: { id: number; obj: OperationRequest }) => update(id, obj),
    {
      onSuccess() {
        toast.success('Comanda atualizada com sucesso')
      },
      onError() {
        toast.error('Ocorreu um erro ao atualizar a Comanda.')
      }
    }
  )

  return mutation
}
export function useUpdateStatus() {
  const mutation = useMutation(({ obj }: { obj: any }) => updateStage(obj), {
    onSuccess() {
      toast.success('Comanda atualizada com sucesso')
    },
    onError() {
      toast.error('Ocorreu um erro ao atualizar a Comanda.')
    }
  })

  return mutation
}

export function usefindOne(operation_id: number) {
  const query = useQuery(
    ['findOne', operation_id],
    () => findOne(operation_id),
    {
      enabled: !!operation_id,
      onSuccess(res) {
        if (res.code === 404) {
          toast.warning('Essa comanda não existe.')
        }
      }
    }
  )

  return query
}

export function useDefaultData(user_id: number | null) {
  const query = useQuery(['generateDefaultData', user_id], () =>
    generateDefaultData(user_id)
  )

  return query
}

export function useDelete() {
  const mutation = useMutation(({ id }: { id: number }) => remove(id), {
    onSuccess() {
      toast.success('Comanda deletada com sucesso!')
    },
    onError() {
      toast.error('Ocorreu um erro ao deletar, tente novamente mais tarde.')
    }
  })

  return mutation
}
