import api from '@/core/api'
import {
  HolidayRequest,
  HolidayResponse,
  HolidaysSearch
} from '@/core/domain/Holiday/Holiday.types'
import {
  ApiResponse,
  PaginatedApiResponse
} from '@/core/domain/_commons/Common.types'

export async function searchHoliday(params: HolidaysSearch) {
  const result = api.get(`/holidays/search`, params) as unknown

  return result as PaginatedApiResponse<HolidayResponse>
}

export async function createHoliday(obj: HolidayRequest) {
  const result = api.post(`/holidays`, obj) as unknown

  return result as ApiResponse<HolidayResponse>
}

export async function updateHoliday(id: number, obj: HolidayRequest) {
  const result = api.put(`/holidays/${id}`, obj) as unknown

  return result as ApiResponse<HolidayResponse>
}

export async function findOneHoliday(holiday_id: number) {
  const result = api.get(`/holidays/findOne/${holiday_id}`) as unknown

  return result as ApiResponse<HolidayResponse>
}

export async function removeHoliday(id: number) {
  const result = api.remove(`/holidays/${id}`) as unknown
  return result as ApiResponse<unknown>
}

/* @ */
export async function getStandardHolidays(obj?: { year?: number }) {
  const result = api.get(`/holidays/getStandardHolidays`, obj) as unknown
  return result as ApiResponse<unknown>
}
