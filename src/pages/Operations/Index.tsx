import { FilterCard } from '@/components/Operations/Cards/FilterCard'
import { SimpleCard } from '@/components/_commons/Card/SimpleCard'
import { Loader } from '@/components/_commons/Loader'
import { SmartTable } from '@/components/_commons/SmartTable'
import { Operations } from '@/core/domain/Operation/Index'
import {
  OperationResponse,
  OperationsSearch
} from '@/core/domain/Operation/Operation.types'
import { CSSProperties, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/_commons/Form/Button'

export const OperationsPage = () => {
  const navigate = useNavigate()

  const [operations, setOperations] = useState<any>(undefined)
  const [params, setParams] = useState<OperationsSearch>({
    current_page: 1,
    items_per_page: 15
  })

  const { data: itens, isLoading } = Operations.useSearch(params)

  const handleClear = () => {
    setParams({
      current_page: 1,
      items_per_page: 15
    })
  }

  const handleSearch = (values: OperationsSearch) => {
    setParams({ ...{ current_page: 1, items_per_page: 15 }, ...values })
  }

  useEffect(() => {
    let operations

    if (itens && itens.data && itens.data.length > 0) {
      operations = itens.data
    }

    setOperations(operations)
  }, [itens])

  return (
    <>
      <FilterCard onSearch={handleSearch} onClearTable={handleClear} />

      <Container fluid className="p-0 mt-2">
        <Loader loading={isLoading}>
          <SimpleCard
            cardFoter={true}
            headerTitle="Listagem"
            className="py-3 px-3"
            footerButtonsRight={[
              {
                onClick: () => navigate('/app/operation/create'),
                icon: 'fa-solid fa-plus',
                label: 'Nova Comanda'
              },
              {
                onClick: () => navigate('/app/operation/create'),
                icon: 'fa-regular fa-file-pdf',
                label: 'Gerar Relatório'
              }
            ]}
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
                  tractor_plate: item?.service?.tractor_plate,
                  companie: item?.companie?.name ?? '',
                  weight: item?.service?.weight,
                  start_of_operation: item?.start_op,
                  end_of_operation: item?.end_op,
                  total_time: item?.total_time ?? '',
                  actions: (
                    <div className="text-center">
                      <Button
                        title={'Relatório'}
                        size="sm"
                        variant="outline-secondary"
                        className="border-0 me-2"
                        // onClick={}
                      >
                        <i className="fa fa-regular fa-file-pdf" />
                      </Button>

                      <Button
                        title={'Editar'}
                        size="sm"
                        variant="outline-secondary"
                        className="border-0 me-2"
                        onClick={() =>
                          navigate(`/app/operation/${item.id}/edit`)
                        }
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
                  setParams({ current_page: page, items_per_page: 15 })
                }
              }}
              variant="card"
              hoverable
              stripped
              loading={isLoading}
            />
          </SimpleCard>
        </Loader>
      </Container>
    </>
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
