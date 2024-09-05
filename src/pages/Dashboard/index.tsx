import { FilterCard } from '@/components/Operations/Cards/FilterCard'
import { SimpleCard } from '@/components/_commons/Card/SimpleCard'
import { Button } from '@/components/_commons/Form/Button'
import { Loader } from '@/components/_commons/Loader'
import { SmartTable } from '@/components/_commons/SmartTable'
import { useAuth } from '@/core/contexts/AuthContext'
import { Operations } from '@/core/domain/Operation/Index'
import {
  OperationRequest,
  OperationResponse,
  OperationsSearch
} from '@/core/domain/Operation/Operation.types'
import { CSSProperties, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
// import { format } from 'date-fns'
import { FormModel } from '@/components/Operations/Models/FormModel'
import { rulesType } from '@/core/domain/_commons/rules.types'
// import { statusType } from '@/core/domain/Status/Status.types'

export const DashboardPage = () => {
  const { collaborator, getPermissions } = useAuth()

  const navigate = useNavigate()
  // const dataAtual = new Date()

  const [operations, setOperations] = useState<any>(undefined)
  const [operation, setOperation] = useState<OperationResponse | undefined>(
    undefined
  )
  const [showSaveModal, setShowSaveModal] = useState<boolean>(false)
  const initRules: rulesType = {
    canUpdate: false,
    isAdmin: false,
    isAdminOperation: false,
    operation: undefined
  }

  const [rules, setRules] = useState<rulesType>(initRules)

  const [params, setParams] = useState<OperationsSearch>({
    current_page: 1,
    items_per_page: 15
  })
  // companie_id: collaborator?.companies?.id ?? undefined
  // start_operations: format(
  //   new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 1),
  //   'yyyy-MM-dd HH:mm:ss'
  // ),
  // end_operations: format(dataAtual, 'yyyy-MM-dd HH:mm:ss')

  const { data: itens, isLoading, refetch } = Operations.useSearch(params)

  const createMutation = Operations.useCreate()
  const updateMutation = Operations.useUpdate()
  const updateStageMutation = Operations.useUpdateStatus()

  const handleClear = () => {
    setParams({
      current_page: 1,
      items_per_page: 15
    })
  }

  const handleSearch = (values: OperationsSearch) => {
    setParams({ ...params, ...values })
  }

  useEffect(() => {
    let operations

    if (itens && itens.data && itens.data.length > 0) {
      operations = itens.data
    }

    setOperations(operations)
  }, [itens])

  const [floatingButton, setFloatingButton] = useState<boolean>(true)
  const toggleSaveModal = (OperationResponse?: OperationResponse) => {
    const canUpdate = OperationResponse
      ? setRulesStatus(OperationResponse)
      : false

    setRules({
      ...rules,
      canUpdate
    })

    setOperation(OperationResponse)
    setFloatingButton(!floatingButton)
    setShowSaveModal(!showSaveModal)
  }

  const setRulesStatus = (values: OperationResponse) => {
    let canUpdate: boolean = false
    if (values) {
      if (values.status && values.status.status_id) {
        if (
          values.status.status_id === 'approved_operation' ||
          values.status.status_id === 'canceled_operation' ||
          values.status.status_id === 'awaiting_validation' ||
          values.status.status_id === 'waiting_for_approval'
        ) {
          canUpdate = true
        }
      }
    }

    return canUpdate
  }

  const handleSave = async (values: OperationRequest) => {
    const obj: OperationRequest = {
      ...values
    }

    if (operation) {
      await updateMutation.mutateAsync({
        id: operation.id as number,
        obj: obj
      })
    } else {
      await createMutation.mutateAsync(obj)
    }
    refetch()
    toggleSaveModal()
  }

  const onHandleActionStatus = async (values: any) => {
    await updateStageMutation.mutateAsync({
      obj: {
        colaborator_id: collaborator?.id,
        ...values
      }
    })

    setParams({ ...params })
    refetch()
  }

  useEffect(() => {
    let isAdmin: boolean = false
    let isAdminOperation: boolean = false

    if (getPermissions) {
      const permissions = getPermissions()
      isAdmin = permissions
        ? permissions.some(permission => permission.permission === 'admin')
        : false

      isAdminOperation = permissions
        ? permissions.some(
            permission => permission.permission === 'operation_admin'
          )
        : false
    }

    let operation
    if (collaborator) {
      operation = {
        approver: collaborator.approver === 'active',
        fixed: collaborator.fixed === 'active',
        operation: collaborator.operation === 'active',
        validator: collaborator.validator === 'active'
      }
    }

    setRules({
      ...rules,
      operation: { ...operation },
      isAdmin,
      isAdminOperation
    })
  }, [getPermissions])

  // const applyPermissions = (collaborator: any): statusType[] => {
  //   const arr_status_id: statusType[] = []

  //   // Verifica as permissões do colaborador e ajusta arr_status_id de acordo com as regras
  //   if (collaborator) {
  //     if (collaborator.approver === 'active') {
  //       arr_status_id.push('waiting_for_approval')
  //     }
  //     if (collaborator.operation === 'active') {
  //       arr_status_id.push(
  //         'waiting_for_conference',
  //         'operation_paused',
  //         'in_operation'
  //       )
  //     }
  //     if (collaborator.validator === 'active') {
  //       arr_status_id.push('awaiting_validation')
  //     }
  //   }

  //   return arr_status_id
  // }

  // useEffect(() => {
  //   let valueParams: any = {}

  //   if (collaborator) {
  //     valueParams = {
  //       companie_id: collaborator?.companies?.id ?? 0,
  //       arr_status_id: applyPermissions(collaborator)
  //     }
  //   }

  //   handleSearch({ ...params, ...valueParams })
  //   refetch && refetch()
  // }, [collaborator])

  return rules &&
    rules.operation &&
    (rules.operation.approver ||
      rules.operation.fixed ||
      rules.operation.operation ||
      rules.operation.validator) ? (
    <>
      <FilterCard
        onSearch={handleSearch}
        onClearTable={handleClear}
        rules={rules}
        collaborator={collaborator}
        params={params}
      />

      <Container fluid className="p-0 mt-2">
        <Loader loading={isLoading}>
          <SimpleCard
            cardFoter={false}
            cardHeader={false}
            className="py-3 px-3"
            footerButtonsRight={[
              {
                onClick: () => toggleSaveModal(undefined),
                icon: 'fa-solid fa-plus',
                label: 'Nova Comanda'
              }
            ]}
            footerButtonsLeft={[
              {
                onClick: () => navigate('/app/operation/create'),
                icon: 'fa-regular fa-file-pdf',
                label: 'Gerar Relatório'
              }
            ]}
            floatingBaseboard={floatingButton}
          >
            <SmartTable
              columns={columns}
              data={
                operations &&
                operations.length > 0 &&
                operations.map((item: OperationResponse) => ({
                  operation_number: item.id,
                  shift: item?.shift_work ?? '',
                  location: item?.location_id ?? '',
                  service: item?.service?.service ?? '',
                  cost_center: item?.cost_center_id ?? '',
                  carrier: item?.service?.carrier_id ?? '',
                  tractor_plate: item?.service?.tractor_plate ?? '',
                  companie: item?.companie?.name ?? '',
                  weight: item?.service?.weight ?? '',
                  start_of_operation: item?.start_op ?? '',
                  end_of_operation: item?.end_op ?? '',
                  total_time: item?.total_time ?? '',
                  holiday: item?.holiday,
                  actions: (
                    <div className="text-center">
                      <Button
                        title={'Relatório'}
                        size="sm"
                        variant="outline-secondary"
                        className="border-0 me-2"
                        // onClick={() => toggleSaveModal(item)}
                      >
                        <i className="fa fa-regular fa-file-pdf" />
                      </Button>

                      <Button
                        title={'Editar'}
                        size="sm"
                        variant="outline-secondary"
                        className="border-0 me-2"
                        onClick={() => toggleSaveModal(item)}
                      >
                        <i className="fas fa-edit" />
                      </Button>
                    </div>
                  )
                }))
              }
              pagination={{
                current: itens?.current_page || 1,
                total: itens?.last_page || 1,
                onPaginate(page) {
                  setParams({
                    ...params,
                    current_page: page,
                    items_per_page: 15
                  })
                }
              }}
              hoverable
              stripped
              loading={isLoading}
            />
          </SimpleCard>
        </Loader>

        <FormModel
          show={showSaveModal}
          operation={operation}
          titleHeader={
            operation ? `Comanda Nº ${operation.id}` : 'Nova Comanda'
          }
          loadButtonAction={
            isLoading || createMutation.isLoading || updateMutation.isLoading
          }
          titleButtonAction={
            rules.canUpdate ? undefined : operation ? 'Salvar' : 'Cadastrar'
          }
          onHandleAction={handleSave}
          onHandleClose={toggleSaveModal}
          onHandleActionStatus={onHandleActionStatus}
          rules={rules}
        />
      </Container>
    </>
  ) : (
    <></>
  )
}

const columns = [
  {
    label: 'Comanda',
    key: 'operation_number'
  },
  {
    label: 'Turno',
    key: 'shift'
  },
  {
    label: 'Prédio',
    key: 'location'
  },
  {
    label: 'Serviço',
    key: 'service'
  },
  {
    label: 'Centro de Custo',
    key: 'cost_center'
  },
  {
    label: 'Transportadora',
    key: 'carrier'
  },
  {
    label: 'Placa',
    key: 'tractor_plate'
  },
  {
    label: 'Unidade',
    key: 'companie'
  },
  {
    label: 'Inicio',
    key: 'start_of_operation'
  },
  {
    label: 'Término',
    key: 'end_of_operation'
  },
  {
    label: 'Tempo Total',
    key: 'total_time'
  },
  {
    label: '',
    key: 'actions',
    headerCellStyle: { width: '60px', textAlign: 'center' } as CSSProperties
  }
]
