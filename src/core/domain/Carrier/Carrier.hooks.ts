import {
  searchCarrier,
  createCarrier,
  findOneCarrier,
  updateCarrier,
  removeCarrier
} from '@/core/domain/Carrier/Carrier.services'
import {
  CarrierRequest,
  CarriersSearch
} from '@/core/domain/Carrier/Carrier.types'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'

export function useSearchCarrier(params: CarriersSearch) {
  const query = useQuery(['searchCarrier', params], () => searchCarrier(params))
  return query
}

export function useCreateCarrier() {
  const mutation = useMutation((obj: CarrierRequest) => createCarrier(obj), {
    onSuccess() {
      toast.success('Transportadora cadastrada com sucesso')
    },
    onError() {
      toast.error('Ocorreu um erro ao cadastrar.')
    }
  })

  return mutation
}

export function useUpdateCarrier() {
  const mutation = useMutation(
    ({ id, obj }: { id: number; obj: CarrierRequest }) =>
      updateCarrier(id, obj),
    {
      onSuccess() {
        toast.success('Transportadora atualizada com sucesso')
      },
      onError() {
        toast.error('Ocorreu um erro ao atualizar a Unidade.')
      }
    }
  )

  return mutation
}

export function usefindOneCarrier(carrier_id: number) {
  const query = useQuery(
    ['findOneCarrier', carrier_id],
    () => findOneCarrier(carrier_id),
    {
      enabled: !!carrier_id,
      onSuccess(res) {
        if (res.code === 404) {
          toast.warning('Essa trasnprotadora não existe.')
        }
      }
    }
  )

  return query
}
export function useDeleteCarrier() {
  const mutation = useMutation(({ id }: { id: number }) => removeCarrier(id), {
    onSuccess() {
      toast.success('Transportadora deletada com sucesso!')
    },
    onError() {
      toast.error('Ocorreu um erro ao deletar, tente novamente mais tarde.')
    }
  })

  return mutation
}
