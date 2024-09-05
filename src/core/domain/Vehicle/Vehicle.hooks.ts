import {
  searchVehicle,
  createVehicle,
  findOneVehicle,
  updateVehicle,
  removeVehicle
} from '@/core/domain/Vehicle/Vehicle.services'
import {
  VehicleRequest,
  VehiclesSearch
} from '@/core/domain/Vehicle/Vehicle.types'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'

export function useSearchVehicle(params: VehiclesSearch) {
  const query = useQuery(['searchVehicle', params], () => searchVehicle(params))
  return query
}

export function useCreateVehicle() {
  const mutation = useMutation((obj: VehicleRequest) => createVehicle(obj), {
    onSuccess() {
      toast.success('Veículo cadastrado com sucesso')
    },
    onError() {
      toast.error('Ocorreu um erro ao cadastrar.')
    }
  })

  return mutation
}

export function useUpdateVehicle() {
  const mutation = useMutation(
    ({ id, obj }: { id: number; obj: VehicleRequest }) =>
      updateVehicle(id, obj),
    {
      onSuccess() {
        toast.success('Veículo atualizado com sucesso')
      },
      onError() {
        toast.error('Ocorreu um erro ao atualizar a Unidade.')
      }
    }
  )

  return mutation
}

export function usefindOneVehicle(Vehicle_id: number) {
  const query = useQuery(
    ['findOneVehicle', Vehicle_id],
    () => findOneVehicle(Vehicle_id),
    {
      enabled: !!Vehicle_id,
      onSuccess(res) {
        if (res.code === 404) {
          toast.warning('Essa trasnprotadora não existe.')
        }
      }
    }
  )

  return query
}
export function useDeleteVehicle() {
  const mutation = useMutation(({ id }: { id: number }) => removeVehicle(id), {
    onSuccess() {
      toast.success('Veículo deletado com sucesso!')
    },
    onError() {
      toast.error('Ocorreu um erro ao deletar, tente novamente mais tarde.')
    }
  })

  return mutation
}
