import { CostCentersFilterCard } from '@/components/CostCenters/Cards/CostCentersFilterCard'
import { SimpleCard } from '@/components/_commons/Card/SimpleCard'
import { SmartTable } from '@/components/_commons/SmartTable'
import {
  CostCenterResponse,
  CostCentersSearch
} from '@/core/domain/CostCenter/CostCenter.types'
import { CostCenter } from '@/core/domain/CostCenter/Index'
import { CSSProperties, useState } from 'react'
import { Container } from 'react-bootstrap'
import { Button } from '@/components/_commons/Form/Button'
import { useNavigate } from 'react-router-dom'
import { DialogBox, DialogBoxProps } from '@/components/_commons/Modal'

export const CostCentersPage = () => {
  const navigate = useNavigate()

  const [costcenters, setCostCenter] = useState<CostCenterResponse>()
  const [showRemoveModal, setShowRemoveModal] = useState<boolean>(false)

  const [params, setParams] = useState<CostCentersSearch>({
    current_page: 1,
    items_per_page: 15,
    status: 'active'
  })

  const {
    data: items,
    isLoading: loading,
    refetch
  } = CostCenter.useSearchCostCenter(params)

  const removeMutation = CostCenter.useDeleteCostCenter()

  const handleRemove = async () => {
    if (costcenters) {
      await removeMutation.mutateAsync({ id: costcenters.id })
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

  const handleSearch = (values: CostCentersSearch) => {
    setParams({ ...{ current_page: 1, items_per_page: 15 }, ...values })
  }

  const toggleRemoveModal = (item?: CostCenterResponse) => {
    setCostCenter(item)
    setShowRemoveModal(!showRemoveModal)
  }

  return (
    <Container className="content">
      <CostCentersFilterCard
        onSearch={handleSearch}
        onClearTable={handleClear}
      />
      <br />
      <SimpleCard
        cardFoter={true}
        headerTitle="Listagem"
        className="py-3 px-3"
        footerButtonRight={{
          onClick: () => navigate('/app/costcenters/create'),
          icon: '',
          label: 'Novo Centro de Custo'
        }}
      >
        <SmartTable
          columns={columns}
          data={
            items &&
            items.data &&
            items.data.map(item => ({
              id: item.id || '',
              costcenter: item.name,
              companie: item?.companie?.name || '',
              status: item.stage || '',
              actions: (
                <div className="d-flex justify-content-center">
                  <Button
                    title="Editar"
                    variant="outline-secondary"
                    size="sm"
                    className="border-0 outline-secondary"
                    onClick={() => navigate(`/app/costcenters/${item.id}`)}
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
          variant="card"
          hoverable
          stripped
          loading={loading}
        />
      </SimpleCard>

      <RemoveModal
        show={showRemoveModal}
        titleHeader="Remover Centro de Custo"
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
    label: 'Centro de Custo',
    key: 'costcenter'
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
      Deseja realmente excluir esse Centro de Custo?
    </DialogBox>
  )
}
