export interface rulesType {
  canUpdate: boolean
  isAdmin: boolean
  isAdminOperation: boolean
  operation: OperationsRulesType | undefined
}

export interface OperationsRulesType {
  operation?: boolean
  fixed?: boolean
  validator?: boolean
  approver?: boolean
}
