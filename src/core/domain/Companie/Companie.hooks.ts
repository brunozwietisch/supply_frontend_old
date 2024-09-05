import {
  search,
  create,
  update,
  findOne,
  remove
} from '@/core/domain/Companie/Companie.services'
import {
  CompanieRequest,
  CompanieSearch
} from '@/core/domain/Companie/Companie.types'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'

export function useSearch(params: CompanieSearch) {
  const query = useQuery(['search', params], () => search(params))
  return query
}

export function usefindOne(companie_id: number) {
  const query = useQuery(['findOne', companie_id], () => findOne(companie_id), {
    enabled: !!companie_id,
    onSuccess(res) {
      if (res.code === 404) {
        toast.warning('Unidade selecionada não existe.')
      }
    }
  })

  return query
}

export function useCreate() {
  const mutation = useMutation((obj: CompanieRequest) => create(obj), {
    onSuccess() {
      toast.success('Unidade cadastrada com sucesso')
    },
    onError() {
      toast.error('Ocorreu um erro ao cadastrar.')
    }
  })

  return mutation
}

export function useUpdate() {
  const mutation = useMutation(
    ({ id, obj }: { id: number; obj: CompanieRequest }) => update(id, obj),
    {
      onSuccess() {
        toast.success('Unidade atualizada com sucesso')
      },
      onError() {
        toast.error('Ocorreu um erro ao atualizar a Unidade.')
      }
    }
  )

  return mutation
}

export function useDelete() {
  const mutation = useMutation(({ id }: { id: number }) => remove(id), {
    onSuccess() {
      toast.success('Unidade deletada com sucesso!')
    },
    onError() {
      toast.error('Ocorreu um erro ao deletar, tente novamente mais tarde.')
    }
  })

  return mutation
}
