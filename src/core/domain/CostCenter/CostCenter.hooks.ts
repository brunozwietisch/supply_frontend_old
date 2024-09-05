import {
  searchCostCenter,
  createCostCenter,
  findOneCostCenter,
  updateCostCenter,
  removeCostCenter
} from '@/core/domain/CostCenter/CostCenter.services'
import {
  CostCenterRequest,
  CostCentersSearch
} from '@/core/domain/CostCenter/CostCenter.types'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'

export function useSearchCostCenter(params: CostCentersSearch) {
  const query = useQuery(['searchCostCenter', params], () =>
    searchCostCenter(params)
  )
  return query
}

export function useCreateCostCenter() {
  const mutation = useMutation(
    (obj: CostCenterRequest) => createCostCenter(obj),
    {
      onSuccess() {
        toast.success('Centro de Custo cadastrado com sucesso')
      },
      onError() {
        toast.error('Ocorreu um erro ao cadastrar.')
      }
    }
  )

  return mutation
}

export function useUpdateCostCenter() {
  const mutation = useMutation(
    ({ id, obj }: { id: number; obj: CostCenterRequest }) =>
      updateCostCenter(id, obj),
    {
      onSuccess() {
        toast.success('Centro de custo atualizado com sucesso')
      },
      onError() {
        toast.error('Ocorreu um erro ao atualizar a Unidade.')
      }
    }
  )

  return mutation
}

export function usefindOneCostCenter(cost_center_id: number) {
  const query = useQuery(
    ['findOneCostCenter', cost_center_id],
    () => findOneCostCenter(cost_center_id),
    {
      enabled: !!cost_center_id,
      onSuccess(res) {
        if (res.code === 404) {
          toast.warning('Esse Centro do Custo não existe.')
        }
      }
    }
  )

  return query
}
export function useDeleteCostCenter() {
  const mutation = useMutation(
    ({ id }: { id: number }) => removeCostCenter(id),
    {
      onSuccess() {
        toast.success('Centro de custo deletada com sucesso!')
      },
      onError() {
        toast.error('Ocorreu um erro ao deletar, tente novamente mais tarde.')
      }
    }
  )

  return mutation
}
