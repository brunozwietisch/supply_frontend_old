import { CollaboratorResponse } from '@/core/domain/Collaborator/Collaborator.types'
import { CompanieResponse } from '@/core/domain/Companie/Companie.types'
import { ServiceResponse } from '@/core/domain/Operation/Service/Service.types'
import { serviceType } from '@/core/domain/Service/Service.types'
import { shiftType } from '@/core/domain/Shift/Shift.types'
import { StatusResponse, statusType } from '@/core/domain/Status/Status.types'
import { activeType } from '@/core/domain/_commons/Common.types'

export interface OperationResponse {
  id: number
  companie_id?: number
  operator_id?: number
  validator_id?: number
  approver_id?: number

  cost_center_id?: string

  shift_work?: string
  location_id?: string
  cost_center?: string
  carrier?: string
  start_op?: string
  end_op?: string

  total_time?: string
  tota_pause_duration?: string
  shift?: shiftType

  holiday: string

  service?: ServiceResponse
  companie?: CompanieResponse
  operator?: CollaboratorResponse
  validator?: CollaboratorResponse
  approver?: CollaboratorResponse
  break_time?: Array<BreakTimeResponse>
  status?: StatusResponse
  stages?: Array<StatusResponse>
}

export interface OperationsSearch {
  current_page: number
  items_per_page?: number
  order_number?: number

  companie_id?: number
  start_operations?: any
  end_operations?: any
  arr_status_id?: Array<statusType>

  operation_paused?: activeType
  in_operation?: activeType
  awaiting_validation?: activeType
  waiting_for_approval?: activeType
  approved_operation?: activeType
  canceled_operation?: activeType
  pending_operation?: activeType
  waiting_for_conference?: activeType
}

export interface OperationRequest {
  companie_id?: number
  operator_id?: number
  validator_id?: number
  approver_id?: number

  shift?: shiftType
  cost_center_id?: string
  location_id?: string
  type_service?: serviceType

  // Amostragem
  description?: string

  // Homem Hora
  number_assistants?: string
  number_operators?: string
  number_tractor_drivers?: string
  number_others?: string

  // Carga e Descarga
  ticket_number?: string
  invoice?: string
  transportation_number?: string
  loose_cargo?: string
  palletized_cargo?: string
  carrier_id?: string
  vehicle_id?: string
  tractor_plate?: string
  trailer_plate?: string

  shift_work?: string

  // Etiquetagem
  cod?: string
  lot?: string
  weight?: string
  amount?: string

  others?: string
}

export interface OperationDefault {
  current_date?: string
  shift?: { shifts_name: string; shift_id: shiftType }
  companie_id: number
  companie?: CompanieResponse
}

export interface BreakTimeResponse {
  id: number
  operation_id: number

  started_at: string
  start_at: string
  collaborator_started: string | number
  collaborator_start: CollaboratorResponse

  collaborator_ended?: string | number
  collaborator_end?: CollaboratorResponse
  ended_at?: string
  end_at?: string

  description?: string
}
