import {
  searchLocation,
  createLocation,
  findOneLocation,
  updateLocation,
  removeLocation
} from '@/core/domain/Location/Location.services'
import {
  LocationRequest,
  LocationsSearch
} from '@/core/domain/Location/Location.types'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'

export function useSearchLocation(params: LocationsSearch) {
  const query = useQuery(['searchLocation', params], () =>
    searchLocation(params)
  )
  return query
}

export function usefindOneLocation(location_id: number) {
  const query = useQuery(
    ['findOneLocation', location_id],
    () => findOneLocation(location_id),
    {
      enabled: !!location_id,
      onSuccess(res) {
        if (res.code === 404) {
          toast.warning('Local/Prédio selecionado não existe.')
        }
      }
    }
  )

  return query
}

export function useCreateLocation() {
  const mutation = useMutation((obj: LocationRequest) => createLocation(obj), {
    onSuccess() {
      toast.success('Local/Prédio cadastrado com sucesso')
    },
    onError() {
      toast.error('Ocorreu um erro ao cadastrar.')
    }
  })

  return mutation
}

export function useUpdateLocation() {
  const mutation = useMutation(
    ({ id, obj }: { id: number; obj: LocationRequest }) =>
      updateLocation(id, obj),
    {
      onSuccess() {
        toast.success('Local/Prédio atualizado com sucesso')
      },
      onError() {
        toast.error('Ocorreu um erro ao atualizar a Unidade.')
      }
    }
  )

  return mutation
}

export function useDeleteLocation() {
  const mutation = useMutation(({ id }: { id: number }) => removeLocation(id), {
    onSuccess() {
      toast.success('Local/Prédio deletado com sucesso!')
    },
    onError() {
      toast.error('Ocorreu um erro ao deletar, tente novamente mais tarde.')
    }
  })

  return mutation
}
