// import { Operations } from '@/core/domain/Operation/Index'
import * as Yup from 'yup'
import {
  OperationRequest,
  OperationResponse
} from '@/core/domain/Operation/Operation.types'
// import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import { Form, Formik, FormikHelpers } from 'formik'
import { useAuth } from '@/core/contexts/AuthContext'
import { SearchOption } from '@/components/_commons/Form/SearchSelectNew'

// Inputs
import { Text } from '@/components/_commons/Form/Text'
import { TextArea } from '@/components/_commons/Form/TextArea'
import { ComboBox } from '@/components/_commons/Form/ComboBox'

import { CompanieSelect } from '@/components/Companies/Selects/CompanieSelect'
import { CollaboratorSelect } from '@/components/Collaborators/Selects/CollaboratorSelect'
import { CoastCenterSelect } from '@/components/CostCenters/Selects/CoastCenterSelect'
import { LocationSelect } from '@/components/Locations/Selects/LocationSelect'
import { CarrierSelect } from '@/components/Carriers/Selects/CarrierSelect'
import { VehicleSelect } from '@/components/Vehicles/Selects/VehicleSelect'
import { rulesType } from '@/core/domain/_commons/rules.types'
import { HeaderCard } from '@/components/Operations/Cards/HeaderCard'
import { BreakTimeCard } from '@/components/Operations/Cards/BreakTimeCard'
import { DialogBox, DialogBoxProps } from '@/components/_commons/Modal'
import { CardBody, CardWrapper } from '@/components/_commons/Card'
import { ChangeStatusModel } from '@/components/Operations/Models/ChangeStatusModel'

export const FormModel = ({
  operation,
  loadButtonAction,
  rules,
  onHandleActionStatus,
  onHandleAction,
  onHandleClose,
  ...rest
}: DialogBoxProps & {
  operation?: OperationResponse
  rules: rulesType
  onHandleActionStatus?: (obj?: any) => void
}) => {
  const { getPermissions, collaborator } = useAuth()
  const [isShow, setShow] = useState<boolean>(false)
  // const navigate = useNavigate()
  // const initRules: rulesType = {
  //   canUpdate: false,
  //   isAdmin: false
  // }

  // const [rules, setRules] = useState<rulesType>(initRules)

  const [isAdmin, setIsAdmin] = useState<boolean>(true)
  const [companie_id, setCompanieId] = useState<number | undefined>(undefined)

  const initialValues: OperationRequest = {
    cost_center_id: operation?.cost_center_id ?? undefined,
    location_id: operation?.location_id ?? undefined,
    type_service: operation?.service?.type_service ?? undefined,
    shift: operation?.shift ?? undefined,
    companie_id: operation?.companie_id ?? undefined,
    operator_id: operation?.operator_id ?? undefined,
    validator_id: operation?.validator_id ?? undefined,
    approver_id: operation?.approver_id ?? undefined,
    description: operation?.service?.description ?? undefined,
    number_assistants: operation?.service?.number_assistants ?? undefined,
    number_operators: operation?.service?.number_operators ?? undefined,
    number_tractor_drivers:
      operation?.service?.number_tractor_drivers ?? undefined,
    number_others: operation?.service?.number_others ?? undefined,
    ticket_number: operation?.service?.ticket_number ?? undefined,
    invoice: operation?.service?.invoice ?? undefined,
    transportation_number:
      operation?.service?.transportation_number ?? undefined,
    loose_cargo: operation?.service?.loose_cargo ?? undefined,
    palletized_cargo: operation?.service?.palletized_cargo ?? undefined,
    carrier_id: operation?.service?.carrier_id ?? undefined,
    vehicle_id: operation?.service?.vehicle_id ?? undefined,
    tractor_plate: operation?.service?.tractor_plate ?? undefined,
    trailer_plate: operation?.service?.trailer_plate ?? undefined,
    cod: operation?.service?.cod ?? undefined,
    lot: operation?.service?.lot ?? undefined,
    weight: operation?.service?.weight ?? undefined,
    amount: operation?.service?.amount ?? undefined,
    others: operation?.service?.others ?? undefined
  }

  const validator = Yup.object().shape({
    cost_center_id: Yup.string().required('Este campo é obrigatório'),
    location_id: Yup.string().required('Este campo é obrigatório'),
    type_service: Yup.string().required('Este campo é obrigatório')
  })

  const handleSubmit = (
    values: OperationRequest,
    { resetForm }: FormikHelpers<OperationRequest>
  ) => {
    const obj: OperationRequest = {
      ...values
    }

    onHandleAction && onHandleAction(obj)
    resetForm()
    onHandleClose && onHandleClose()
  }

  const onChangeStatus = (values?: any) => {
    onHandleActionStatus && onHandleActionStatus(values)
    onHandleClose && onHandleClose()
  }

  const updateTypeServiceOptions = () => {
    const services = [
      {
        value: 'labeling',
        name: 'Etiquetagem'
      },
      {
        value: 'relabeling',
        name: 'Reetiquetagem'
      }
    ]

    setTypeServiceOptions(prevOptions => [...prevOptions, ...services])
  }

  const renderDefauls = async () => {
    setTypeServiceOptions(optionsService)

    if (operation && operation.companie_id && operation.companie_id === 4) {
      updateTypeServiceOptions()
    }
  }

  useEffect(() => {
    const permissions = getPermissions()
    if (permissions) {
      const hasOperationPermission = permissions.some(
        obj => obj.permission === 'operation'
      )

      if (hasOperationPermission) {
        setIsAdmin(true)
      }
    }
  }, [getPermissions])

  // useEffect(() => {
  //   if (operation) {
  //     if (operation.operator) {
  //       setDefaultSelects({
  //         operator: {
  //           value: operation.operator.id,
  //           name: operation.operator.name
  //         }
  //       })
  //       renderDefauls()
  //     }

  //     if (operation && operation.companie_id && operation.companie_id === 4)
  //       updateTypeServiceOptions()
  //   }
  // }, [operation])

  const [typeServiceOptions, setTypeServiceOptions] =
    useState<Array<{ value: string; name: string }>>(optionsService)

  const onChangeCollaborator = async (operator_id?: number) => {
    if (typeof operator_id !== 'undefined') {
      await renderDefauls()
    }
  }

  useEffect(() => {
    if (collaborator && collaborator.companies && collaborator.companies.id) {
      setCompanieId(collaborator.companies.id)
    }
  }, [collaborator])

  const toggleChangeModals = () => {
    setShow(!isShow)
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validator}
      enableReinitialize={true}
    >
      {({
        values,
        errors,
        handleChange,
        resetForm,
        isSubmitting,
        submitForm
      }) => {
        const [buttonLeft, setButtonLeft] = useState<any>(undefined)

        useEffect(() => {
          const { companie_id } = values

          if (companie_id) {
            setCompanieId(companie_id)
          }
        }, [values])

        useEffect(() => {
          if (operation && operation.status) {
            if (
              operation.status.status_id === 'awaiting_validation' &&
              collaborator &&
              collaborator?.validator === 'active'
            ) {
              setButtonLeft({
                label: 'Validar',
                variant: 'success',
                onClick: toggleChangeModals
              })
            }

            if (
              operation.status.status_id === 'waiting_for_approval' &&
              collaborator &&
              collaborator?.approver === 'active'
            ) {
              setButtonLeft({
                label: 'Aprovar',
                variant: 'success',
                onClick: toggleChangeModals
              })
            }

            if (
              operation.status.status_id === 'waiting_for_conference' &&
              collaborator &&
              collaborator?.operation === 'active'
            ) {
              setButtonLeft({
                label: 'Enviar para Validação',
                variant: 'warning',
                onClick: toggleChangeModals
              })
            }
          }
        }, [operation])

        return (
          <DialogBox
            onHandleAction={submitForm}
            onHandleClose={() => {
              onHandleClose && onHandleClose()
              resetForm()
            }}
            size="xl"
            centered
            titleButtonCancel={'Fechar'}
            dialogClassName={'mb-6'}
            footerButtonLeft={buttonLeft}
            {...rest}
          >
            <Container fluid className="content">
              {operation && (
                <>
                  <HeaderCard operation={operation && operation} />
                </>
              )}
              <Form>
                <CardWrapper>
                  <CardBody>
                    <Row className="mb-2 gy-2">
                      {isAdmin && (
                        <>
                          <CollaboratorSelect
                            name={'operator_id'}
                            label={'Operador'}
                            placeholder={'Pesquisar Operador'}
                            grid="col-md-4"
                            onChange={(response: SearchOption) => {
                              response &&
                                response.value &&
                                onChangeCollaborator(response.value)
                            }}
                            onClear={() =>
                              setTypeServiceOptions(optionsService)
                            }
                            setValue={operation?.operator_id}
                            disabled={rules.canUpdate}
                            defaultValue={
                              operation && operation.operator
                                ? {
                                    value: operation?.operator?.id ?? undefined,
                                    name: operation?.operator?.name ?? undefined
                                  }
                                : undefined
                            }
                          />

                          <CompanieSelect
                            placeholder={'Pesquisar Unidade'}
                            label={'Unidade'}
                            name={'companie_id'}
                            grid="col-md-4"
                            defaultValue={
                              operation && operation.companie
                                ? {
                                    value: operation.companie.id,
                                    name: operation.companie.name
                                  }
                                : undefined
                            }
                            disabled={rules.canUpdate}
                          />

                          <ComboBox
                            label="Turno"
                            name="shift"
                            value={values.shift}
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
                            grid="col-md-4"
                            disabled={rules.canUpdate}
                          />
                        </>
                      )}

                      <CoastCenterSelect
                        placeholder={'Pesquisar Centro de Custo'}
                        label={'Centro de Custo'}
                        name="cost_center_id"
                        grid="col-md-4"
                        defaultValue={
                          values && values.cost_center_id
                            ? {
                                value: values.cost_center_id,
                                name: values.cost_center_id
                              }
                            : undefined
                        }
                        companie_id={companie_id}
                        disabled={rules.canUpdate}
                      />

                      <LocationSelect
                        placeholder={'Pesquisar Local/Prédio'}
                        label={'Local/Prédio'}
                        name={'location_id'}
                        grid="col-md-4"
                        defaultValue={
                          values && values.location_id
                            ? {
                                value: values.location_id,
                                name: values.location_id
                              }
                            : undefined
                        }
                        companie_id={companie_id}
                        disabled={rules.canUpdate}
                      />

                      <ComboBox
                        label="Serviço"
                        name="type_service"
                        value={values.type_service}
                        error={errors.type_service}
                        onHandleSelect={e => {
                          handleChange(e)
                        }}
                        options={typeServiceOptions}
                        grid="col-md-4"
                        disabled={rules.canUpdate}
                      />

                      {values && values.type_service && (
                        <>
                          {/* Caso o serviço seja Homem Hora */}
                          {values.type_service === 'man-hour' && (
                            <>
                              <h3>Homem Hora</h3>
                              <hr className="hr" />

                              <Text
                                label="QUANTIDADE DE AUXILIARES"
                                name="number_assistants"
                                onHandleInput={handleChange}
                                value={values.number_assistants}
                                grid="col-md-3"
                                onChange={e => {
                                  handleChange(e)
                                }}
                                disabled={rules.canUpdate}
                              />

                              <Text
                                label="QUANTIDADE DE OPERADORES"
                                name="number_operators"
                                onHandleInput={handleChange}
                                value={values.number_operators}
                                grid="col-md-3"
                                onChange={e => {
                                  handleChange(e)
                                }}
                                disabled={rules.canUpdate}
                              />

                              <Text
                                label="QUANTIDADE DE TRATORISTAS"
                                name="number_tractor_drivers"
                                onHandleInput={handleChange}
                                value={values.number_tractor_drivers}
                                grid="col-md-3"
                                onChange={e => {
                                  handleChange(e)
                                }}
                                disabled={rules.canUpdate}
                              />

                              <Text
                                label="QUANTIDADE DE OUTROS"
                                name="number_others"
                                onHandleInput={handleChange}
                                value={values.number_others}
                                grid="col-md-3"
                                onChange={e => {
                                  handleChange(e)
                                }}
                                disabled={rules.canUpdate}
                              />
                            </>
                          )}

                          {/* Caso o serviço seja Carga ou Descarga */}
                          {(values.type_service === 'truckload' ||
                            values.type_service === 'truck_unloading') && (
                            <>
                              {values.type_service === 'truckload' && (
                                <h4>Carga</h4>
                              )}
                              {values.type_service === 'truck_unloading' && (
                                <h4>Descarga</h4>
                              )}
                              <hr className="hr" />

                              <Text
                                label="Nº TICKET"
                                name="ticket_number"
                                onHandleInput={handleChange}
                                value={values.ticket_number}
                                grid="col-md-4"
                                onChange={e => {
                                  handleChange(e)
                                }}
                                disabled={rules.canUpdate}
                              />

                              <Text
                                label="NOTA FISCAL"
                                name="invoice"
                                onHandleInput={handleChange}
                                value={values.invoice}
                                grid="col-md-4"
                                onChange={e => {
                                  handleChange(e)
                                }}
                                disabled={rules.canUpdate}
                              />

                              <Text
                                label="Nº DO TRANSPORTE"
                                name="transportation_number"
                                onHandleInput={handleChange}
                                value={values.transportation_number}
                                grid="col-md-4"
                                onChange={e => {
                                  handleChange(e)
                                }}
                                disabled={rules.canUpdate}
                              />

                              <Text
                                label="CARGA SOLTA"
                                name="loose_cargo"
                                onHandleInput={handleChange}
                                value={values.loose_cargo}
                                grid="col-md-4"
                                onChange={e => {
                                  handleChange(e)
                                }}
                                disabled={rules.canUpdate}
                              />

                              <Text
                                label="CARGA PALETIZADA"
                                name="palletized_cargo"
                                onHandleInput={handleChange}
                                value={values.palletized_cargo}
                                grid="col-md-4"
                                onChange={e => {
                                  handleChange(e)
                                }}
                                disabled={rules.canUpdate}
                              />

                              <CarrierSelect
                                name={'carrier_id'}
                                grid="col-md-4"
                                label={'Transportadora'}
                                placeholder="Pesquisar Transportadora"
                                defaultValue={
                                  values && values.carrier_id
                                    ? {
                                        value: values.carrier_id,
                                        name: values.carrier_id
                                      }
                                    : undefined
                                }
                                companie_id={
                                  collaborator && collaborator.companies
                                    ? collaborator.companies.id
                                    : undefined
                                }
                                disabled={rules.canUpdate}
                              />

                              <VehicleSelect
                                grid="col-md-4"
                                name={'vehicle_id'}
                                label="Veículos"
                                placeholder="Pesquisar Veículos"
                                defaultValue={
                                  values && values.vehicle_id
                                    ? {
                                        value: values.vehicle_id,
                                        name: values.vehicle_id
                                      }
                                    : undefined
                                }
                                companie_id={
                                  collaborator && collaborator.companies
                                    ? collaborator.companies.id
                                    : undefined
                                }
                                disabled={rules.canUpdate}
                              />

                              <Text
                                label="PLACA DO CAVALO"
                                name="tractor_plate"
                                onHandleInput={handleChange}
                                value={values.tractor_plate}
                                grid="col-md-4"
                                onChange={e => {
                                  handleChange(e)
                                }}
                                disabled={rules.canUpdate}
                              />

                              <Text
                                label="PLACA DA CARRETA"
                                name="trailer_plate"
                                onHandleInput={handleChange}
                                value={values.trailer_plate}
                                grid="col-md-4"
                                onChange={e => {
                                  handleChange(e)
                                }}
                                disabled={rules.canUpdate}
                              />
                            </>
                          )}

                          {/* Caso o serviço seja Amostragem */}
                          {values.type_service === 'sampling' && (
                            <>
                              <h3>Amostragem</h3>
                              <hr className="hr" />
                            </>
                          )}

                          {/* Caso o serviço seja Repaletização */}
                          {values.type_service === 'repacking' && (
                            <>
                              <h3>Repaletização</h3>
                              <hr className="hr" />
                              <Text
                                label="PESO"
                                name="weight"
                                onHandleInput={handleChange}
                                value={values.weight}
                                grid="col-md-3"
                                onChange={e => {
                                  handleChange(e)
                                }}
                                disabled={rules.canUpdate}
                              />
                            </>
                          )}

                          {/* Caso o serviço seja Outros */}
                          {values.type_service === 'others' && (
                            <>
                              <h3>Outros</h3>
                              <TextArea
                                label="DESCREVA O SERVIÇO"
                                name="others"
                                onHandleTextArea={handleChange}
                                value={values.others}
                                grid="col-md-12"
                                rows={5}
                                disabled={rules.canUpdate}
                              />
                            </>
                          )}

                          {/* Caso o serviço seja Reetiquetagem */}
                          {/* Caso o serviço seja Etiquetagem */}
                          {(values.type_service === 'relabeling' ||
                            values.type_service === 'labeling') && (
                            <>
                              {values.type_service === 'relabeling' && (
                                <h3>Reetiquetagem</h3>
                              )}
                              {values.type_service === 'labeling' && (
                                <h3>Etiquetagem</h3>
                              )}

                              <Text
                                label="NOTA FISCAL"
                                name="invoice"
                                onHandleInput={handleChange}
                                value={values.invoice}
                                grid="col-md-4"
                                onChange={e => {
                                  handleChange(e)
                                }}
                                disabled={rules.canUpdate}
                              />

                              <Text
                                label="Nº DO TRANSPORTE"
                                name="transportation_number"
                                onHandleInput={handleChange}
                                value={values.transportation_number}
                                grid="col-md-4"
                                onChange={e => {
                                  handleChange(e)
                                }}
                                disabled={rules.canUpdate}
                              />

                              <Text
                                label="QUANTIDADE"
                                name="amount"
                                onHandleInput={handleChange}
                                value={values.amount}
                                grid="col-md-4"
                                onChange={e => {
                                  handleChange(e)
                                }}
                                disabled={rules.canUpdate}
                              />

                              <Text
                                label="CÓDIGO"
                                name="cod"
                                onHandleInput={handleChange}
                                value={values.cod}
                                grid="col-md-4"
                                onChange={e => {
                                  handleChange(e)
                                }}
                                disabled={rules.canUpdate}
                              />

                              <Text
                                label="LOTE"
                                name="lot"
                                onHandleInput={handleChange}
                                value={values.lot}
                                grid="col-md-4"
                                onChange={e => {
                                  handleChange(e)
                                }}
                                disabled={rules.canUpdate}
                              />

                              <Text
                                label="PESO"
                                name="weight"
                                onHandleInput={handleChange}
                                value={values.weight}
                                grid="col-md-3"
                                onChange={e => {
                                  handleChange(e)
                                }}
                                disabled={rules.canUpdate}
                              />
                            </>
                          )}
                        </>
                      )}

                      <TextArea
                        label="OBSERVAÇÃO"
                        name="description"
                        onHandleTextArea={handleChange}
                        value={values.description}
                        grid="col-md-12"
                        rows={5}
                        disabled={rules.canUpdate}
                      />
                    </Row>
                  </CardBody>
                </CardWrapper>
              </Form>
              {operation && isAdmin && (
                <>
                  <BreakTimeCard operation={operation && operation} />
                </>
              )}

              <ChangeStatusModel
                show={isShow}
                onHandleClose={toggleChangeModals}
                onHandleAction={onChangeStatus}
                operation={operation}
              />
            </Container>
          </DialogBox>
        )
      }}
    </Formik>
  )
}

const optionsService = [
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
  }
]
