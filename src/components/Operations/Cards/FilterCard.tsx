import { CollaboratorSelect } from '@/components/Collaborators/Selects/CollaboratorSelect'
import { CompanieSelect } from '@/components/Companies/Selects/CompanieSelect'
import { SimpleCard } from '@/components/_commons/Card/SimpleCard'
import { Check } from '@/components/_commons/Form/Check'
import { ComboBox } from '@/components/_commons/Form/ComboBox'
// import { SearchOption } from '@/components/_commons/Form/SearchSelectNew'
import { Text } from '@/components/_commons/Form/Text'
import { TextGroup } from '@/components/_commons/Form/TextGroup/Index'
import { OperationsSearch } from '@/core/domain/Operation/Operation.types'
import { statusType } from '@/core/domain/Status/Status.types'
import { UserResponse } from '@/core/domain/User/User.types'
import { rulesType } from '@/core/domain/_commons/rules.types'
import { Form, Formik } from 'formik'
import { ChangeEvent } from 'react'
// import { format } from 'date-fns'

interface OperationsSearchProps {
  rules?: rulesType
  params?: any
  collaborator?: UserResponse
  onSearch: (values: OperationsSearch) => void
  onClearTable: () => void
}
export const FilterCard = ({
  rules,
  params,
  collaborator,
  onSearch,
  onClearTable
}: OperationsSearchProps) => {
  // const [defaults, setDefaults] = useState<any>()
  // const dataAtual = new Date()

  const initialValues: OperationsSearch = {
    current_page: 1
  }
  // start_operations: format(
  //   new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 1),
  //   'yyyy-MM-dd HH:mm:ss'
  // ),
  // end_operations: format(dataAtual, 'yyyy-MM-dd HH:mm:ss'),
  // ...params
  // const [init, setInit] = useState<OperationsSearch>(initialValues)

  const arr_status_id: statusType[] = [
    'waiting_for_conference',
    'pending_operation',
    'canceled_operation',
    'approved_operation',
    'operation_paused',
    'in_operation',
    'awaiting_validation',
    'waiting_for_approval'
  ]

  const handleSubmit = (values: OperationsSearch) => {
    const activeValues: statusType[] = arr_status_id.filter(
      key => values[key] === 'active'
    )

    onSearch({
      ...values,
      arr_status_id: activeValues
    })
  }

  const onClear = (resetForm: any) => {
    resetForm && resetForm()
    onClearTable()
  }

  // const toSetDefaults = (itens: any | null) => {
  //   if (itens === null) return undefined
  //   return {
  //     value: itens.id,
  //     name: itens.name
  //   } as SearchOption
  // }

  // useEffect(() => {
  //   const newDefaults: any = []

  //   if (collaborator && collaborator.companies) {
  //     const companies = toSetDefaults(collaborator.companies)
  //     newDefaults.companies = companies
  //   }
  //   setDefaults(newDefaults)
  // }, [collaborator])

  // useEffect(() => {
  //   if (params.arr_status_id && params.arr_status_id.length > 0) {
  //     const newInit: any = { ...params }

  //     params.arr_status_id.forEach((status: any) => {
  //       if (arr_status_id.includes(status)) {
  //         newInit[status] = 'active'
  //       }
  //     })

  //     arr_status_id.forEach(status => {
  //       if (!newInit[status]) {
  //         newInit[status] = 'inactive'
  //       }
  //     })
  //     setInit(newInit)
  //   } else {
  //     const newInit: any = { ...params }
  //     arr_status_id.forEach(status => {
  //       newInit[status] = 'inactive'
  //     })
  //     setInit(newInit)
  //   }
  // }, [params])

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {({ values, handleChange, submitForm, resetForm, setFieldValue }) => {
        return (
          <Form>
            <SimpleCard
              headerTitle="Filtros"
              isCollapsible
              startsClosed={true}
              footerButtonsRight={[
                {
                  label: 'Limpar filtros',
                  variant: 'danger',
                  type: 'reset',
                  onClick: () => onClear(resetForm)
                },
                {
                  label: 'Buscar',
                  variant: 'primary',
                  type: 'submit',
                  onClick: submitForm
                }
              ]}
            >
              <div className="row">
                <Text
                  label="Nº Comanda"
                  name="operation_id"
                  onHandleInput={handleChange}
                  grid="col-md-3"
                />

                {/* {(rules?.isAdmin || rules?.isAdminOperation) && ( */}
                <CompanieSelect
                  placeholder={'Pesquisar Unidade'}
                  label={'Unidade'}
                  name={'companie_id'}
                  grid="col-md-3"
                  // defaultValue={defaults?.companies}
                  disabled={
                    rules && (!rules.isAdminOperation || !rules.isAdmin)
                  }
                />
                {/* )} */}

                <ComboBox
                  label="Turno"
                  name="shift"
                  value={''}
                  onHandleSelect={e => {
                    handleChange(e)
                  }}
                  options={[
                    {
                      value: 'diurnal',
                      name: 'Diurno'
                    },
                    {
                      value: 'nocturnal',
                      name: 'Noturno'
                    }
                  ]}
                  grid="col-md-3"
                />
              </div>

              {(rules?.isAdmin || rules?.isAdminOperation) && (
                <div className="row">
                  <CollaboratorSelect
                    name={'operator_id'}
                    label={'Operador'}
                    placeholder={'Pesquisar Operador'}
                    grid="col-md-3"
                  />

                  <CollaboratorSelect
                    name={'validator_id'}
                    label={'Validador'}
                    placeholder={'Pesquisar Validador'}
                    grid="col-md-3"
                  />

                  <CollaboratorSelect
                    name={'approver_id'}
                    label={'Aprovador'}
                    placeholder={'Pesquisar aprovador'}
                    grid="col-md-3"
                  />
                </div>
              )}

              <div className="row">
                <Check
                  label="Operação Pausada"
                  name="operation_paused"
                  onHandleCheck={(e: ChangeEvent<HTMLInputElement>) => {
                    setFieldValue(
                      'operation_paused',
                      e.target.checked ? 'active' : 'inactive'
                    )
                  }}
                  isChecked={values.operation_paused === 'active'}
                  disabled={
                    rules && (!rules.isAdmin || !rules.isAdminOperation)
                  }
                  grid="col-md-3 align-self-end"
                />

                <Check
                  label="Em Operação"
                  name="in_operation"
                  onHandleCheck={(e: ChangeEvent<HTMLInputElement>) => {
                    setFieldValue(
                      'in_operation',
                      e.target.checked ? 'active' : 'inactive'
                    )
                  }}
                  isChecked={values.in_operation === 'active'}
                  disabled={
                    rules && (!rules.isAdmin || !rules.isAdminOperation)
                  }
                  grid="col-md-3 align-self-end"
                />

                <Check
                  label="Aguardando Validação"
                  name="awaiting_validation"
                  onHandleCheck={(e: ChangeEvent<HTMLInputElement>) => {
                    setFieldValue(
                      'awaiting_validation',
                      e.target.checked ? 'active' : 'inactive'
                    )
                  }}
                  isChecked={values.awaiting_validation === 'active'}
                  disabled={
                    rules && (!rules.isAdmin || !rules.isAdminOperation)
                  }
                  grid="col-md-3 align-self-end"
                />

                <Check
                  label="Aguardando Aprovação"
                  name="waiting_for_approval"
                  onHandleCheck={(e: ChangeEvent<HTMLInputElement>) => {
                    setFieldValue(
                      'waiting_for_approval',
                      e.target.checked ? 'active' : 'inactive'
                    )
                  }}
                  isChecked={values.waiting_for_approval === 'active'}
                  disabled={
                    rules && (!rules.isAdmin || !rules.isAdminOperation)
                  }
                  grid="col-md-3 align-self-end"
                />

                <Check
                  label="Operação Aprovada"
                  name="approved_operation"
                  onHandleCheck={(e: ChangeEvent<HTMLInputElement>) => {
                    setFieldValue(
                      'approved_operation',
                      e.target.checked ? 'active' : 'inactive'
                    )
                  }}
                  isChecked={values.approved_operation === 'active'}
                  disabled={
                    rules && (!rules.isAdmin || !rules.isAdminOperation)
                  }
                  grid="col-md-3 align-self-end"
                />

                <Check
                  label="Operação Cancelada"
                  name="canceled_operation"
                  onHandleCheck={(e: ChangeEvent<HTMLInputElement>) => {
                    setFieldValue(
                      'canceled_operation',
                      e.target.checked ? 'active' : 'inactive'
                    )
                  }}
                  isChecked={values.canceled_operation === 'active'}
                  disabled={
                    rules && (!rules.isAdmin || !rules.isAdminOperation)
                  }
                  grid="col-md-3 align-self-end"
                />

                <Check
                  label="Operação Pendente'"
                  name="pending_operation"
                  onHandleCheck={(e: ChangeEvent<HTMLInputElement>) => {
                    setFieldValue(
                      'pending_operation',
                      e.target.checked ? 'active' : 'inactive'
                    )
                  }}
                  isChecked={values.pending_operation === 'active'}
                  disabled={
                    rules && (!rules.isAdmin || !rules.isAdminOperation)
                  }
                  grid="col-md-3 align-self-end"
                />

                <Check
                  label="Aguardando Conferência"
                  name="waiting_for_conference"
                  onHandleCheck={(e: ChangeEvent<HTMLInputElement>) => {
                    setFieldValue(
                      'waiting_for_conference',
                      e.target.checked ? 'active' : 'inactive'
                    )
                  }}
                  isChecked={values.waiting_for_conference === 'active'}
                  disabled={
                    rules && (!rules.isAdmin || !rules.isAdminOperation)
                  }
                  grid="col-md-3 align-self-end"
                />
              </div>

              <div className="row">
                <ComboBox
                  label="Serviço"
                  name="type_service"
                  value={''}
                  onHandleSelect={e => {
                    handleChange(e)
                  }}
                  options={collunms}
                  grid="col-md-3"
                />

                <Text
                  label="Centro de Custo"
                  name="cost_center_id"
                  onHandleInput={handleChange}
                  value={''}
                  grid="col-md-3"
                  onChange={e => {
                    handleChange(e)
                  }}
                />

                <Text
                  label="Local/Prédio"
                  name="location_id"
                  onHandleInput={handleChange}
                  value={''}
                  grid="col-md-3"
                  onChange={e => {
                    handleChange(e)
                  }}
                />
              </div>
              <div className="row">
                <TextGroup
                  label="De"
                  name="start_operations"
                  value={values.start_operations}
                  onHandleInput={handleChange}
                  type="date"
                  grid="col-md-6"
                />

                <TextGroup
                  label="Ate"
                  name="end_operations"
                  value={values.end_operations}
                  onHandleInput={handleChange}
                  type="date"
                  grid="col-md-6"
                />
              </div>
            </SimpleCard>
          </Form>
        )
      }}
    </Formik>
  )
}

const collunms = [
  {
    value: 'man-hour',
    name: 'Homem Hora'
  },
  {
    value: 'sampling',
    name: 'Amostragem'
  },
  {
    value: 'truckload',
    name: 'Carga'
  },
  {
    value: 'truck_unloading',
    name: 'Descarga'
  },
  {
    value: 'repacking',
    name: 'Repaletização'
  },
  {
    value: 'others',
    name: 'Outros'
  },

  {
    value: 'labeling',
    name: 'Etiquetagem'
  },
  {
    value: 'relabeling',
    name: 'Reetiquetagem'
  }
]
