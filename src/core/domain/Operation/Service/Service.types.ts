import { serviceType } from '@/core/domain/Service/Service.types'

export interface ServiceResponse {
  id: number
  operation_id?: number

  type_service?: serviceType
  service?: string

  ticket_number?: string
  invoice?: string
  transportation_number?: string
  cod?: string
  lot?: string
  carrier_id?: string
  vehicle_id?: string
  tractor_plate?: string
  trailer_plate?: string
  amount?: string
  eight?: string
  loose_cargo?: string
  palletized_cargo?: string
  number_assistants?: string
  number_operators?: string
  number_tractor_drivers?: string
  number_others?: string
  description?: string
  others?: string
  weight?: string
}
