import { VehicleFilterCard } from '@/components/Vehicles/Cards/VehicleFilterCard'
import { SimpleCard } from '@/components/_commons/Card/SimpleCard'
import { SmartTable } from '@/components/_commons/SmartTable'
import {
  VehicleResponse,
  VehiclesSearch
} from '@/core/domain/Vehicle/Vehicle.types'
import { Vehicle } from '@/core/domain/Vehicle/Index'
import { CSSProperties, useState } from 'react'
import { Container } from 'react-bootstrap'
import { Button } from '@/components/_commons/Form/Button'
import { useNavigate } from 'react-router-dom'
import { DialogBox, DialogBoxProps } from '@/components/_commons/Modal'

export const VehiclesPage = () => {
  const navigate = useNavigate()

  const [Vehicles, setVehicle] = useState<VehicleResponse>()
  const [showRemoveModal, setShowRemoveModal] = useState<boolean>(false)

  const [params, setParams] = useState<VehiclesSearch>({
    current_page: 1,
    items_per_page: 15,
    status: 'active'
  })

  const {
    data: items,
    isLoading: loading,
    refetch
  } = Vehicle.useSearchVehicle(params)

  const removeMutation = Vehicle.useDeleteVehicle()

  const handleRemove = async () => {
    if (Vehicles) {
      await removeMutation.mutateAsync({ id: Vehicles.id })
      setShowRemoveModal(false)
      refetch()
    }
  }

  const handleClear = () => {
    setParams({
      current_page: 1,
      items_per_page: 15
    })
  }

  const handleSearch = (values: VehiclesSearch) => {
    setParams({ ...{ current_page: 1, items_per_page: 15 }, ...values })
  }

  const toggleRemoveModal = (item?: VehicleResponse) => {
    setVehicle(item)
    setShowRemoveModal(!showRemoveModal)
  }

  return (
    <Container className="content">
      <VehicleFilterCard onSearch={handleSearch} onClearTable={handleClear} />
      <br />
      <SimpleCard
        cardFoter={true}
        headerTitle="Listagem"
        className="py-3 px-3"
        footerButtonRight={{
          onClick: () => navigate('/app/vehicles/create'),
          icon: '',
          label: 'Novo Veículo'
        }}
      >
        <SmartTable
          columns={columns}
          data={
            items &&
            items.data &&
            items.data.map(item => ({
              id: item.id || '',
              vehicle: item.name,
              companie: item?.companie?.name || '',
              status: item.stage || '',
              actions: (
                <div className="d-flex justify-content-center">
                  <Button
                    title="Editar"
                    variant="outline-secondary"
                    size="sm"
                    className="border-0 outline-secondary"
                    onClick={() => navigate(`/app/vehicles/${item.id}`)}
                  >
                    <i className="fas fa-edit" />
                  </Button>

                  <Button
                    title="Pré-vizualização"
                    variant="outline-secondary"
                    size="sm"
                    className="border-0 outline-secondary"
                    onClick={() => toggleRemoveModal(item)}
                  >
                    <i className="fa fa-trash" />
                  </Button>
                </div>
              )
            }))
          }
          pagination={{
            current: items?.current_page || 1,
            total: items?.last_page || 1,
            onPaginate(page) {
              setParams({ current_page: page, items_per_page: 15 })
            }
          }}
          hoverable
          stripped
          loading={loading}
        />
      </SimpleCard>

      <RemoveModal
        show={showRemoveModal}
        titleHeader="Remover Veículo"
        loadButtonAction={removeMutation.isLoading}
        titleButtonAction="Remover"
        titleButtonCancel="Fechar"
        onHandleAction={handleRemove}
        onHandleClose={toggleRemoveModal}
      />
    </Container>
  )
}

const columns = [
  {
    label: '',
    key: 'id'
  },
  {
    label: 'Veículo',
    key: 'vehicle'
  },
  {
    label: 'Unidade',
    key: 'companie'
  },
  {
    label: 'Status',
    key: 'status'
  },
  {
    label: '',
    key: 'actions',
    headerCellStyle: { width: '60px', textAlign: 'center' } as CSSProperties
  }
]

export const RemoveModal = ({ ...rest }: DialogBoxProps) => {
  return (
    <DialogBox centered {...rest}>
      Deseja realmente excluir essa Veículo?
    </DialogBox>
  )
}
