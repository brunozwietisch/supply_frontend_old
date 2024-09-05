export type statusType =
  | 'operation_paused'
  | 'in_operation'
  | 'awaiting_validation'
  | 'waiting_for_approval'
  | 'approved_operation'
  | 'canceled_operation'
  | 'pending_operation'
  | 'waiting_for_conference'

export interface StatusResponse {
  operation_id: number
  stage: string
  status_id: statusType
  description: string
}
