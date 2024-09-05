import {
  searchHoliday,
  createHoliday,
  findOneHoliday,
  updateHoliday,
  removeHoliday,
  getStandardHolidays
} from '@/core/domain/Holiday/Holiday.services'
import {
  HolidayRequest,
  HolidaysSearch
} from '@/core/domain/Holiday/Holiday.types'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'

export function useSearch(params: HolidaysSearch) {
  const query = useQuery(['searchHoliday', params], () => searchHoliday(params))
  return query
}

export function useHolidayCreate() {
  const mutation = useMutation((obj: HolidayRequest) => createHoliday(obj), {
    onSuccess() {
      toast.success('Feriado cadastrado com sucesso')
    },
    onError() {
      toast.error('Ocorreu um erro ao cadastrar.')
    }
  })

  return mutation
}

export function useHolidayUpdate() {
  const mutation = useMutation(
    ({ id, obj }: { id: number; obj: HolidayRequest }) =>
      updateHoliday(id, obj),
    {
      onSuccess() {
        toast.success('Feriado atualizado com sucesso')
      },
      onError() {
        toast.error('Ocorreu um erro ao atualizar a Unidade.')
      }
    }
  )

  return mutation
}

export function useHolidayFindOne(Holiday_id: number) {
  const query = useQuery(
    ['findOneHoliday', Holiday_id],
    () => findOneHoliday(Holiday_id),
    {
      enabled: !!Holiday_id,
      onSuccess(res) {
        if (res.code === 404) {
          toast.warning('Esse Feriado não existe.')
        }
      }
    }
  )

  return query
}

export function useHolidayDelete() {
  const mutation = useMutation(({ id }: { id: number }) => removeHoliday(id), {
    onSuccess() {
      toast.success('Feriado deletado com sucesso!')
    },
    onError() {
      toast.error('Ocorreu um erro ao deletar, tente novamente mais tarde.')
    }
  })

  return mutation
}

/* @ */
export function useStandardHolidays(params?: { year?: number }) {
  const query = useQuery(['getStandardHolidays', params], () =>
    getStandardHolidays(params)
  )
  return query
}
