import { CompaniesFilterCard } from '@/components/Companies/Cards/CompaniesFilterCard'
import { SimpleCard } from '@/components/_commons/Card/SimpleCard'
import { SmartTable } from '@/components/_commons/SmartTable'
import {
  CompanieResponse,
  CompanieSearch
} from '@/core/domain/Companie/Companie.types'
import { Companie } from '@/core/domain/Companie/Index'
import { CSSProperties, useState } from 'react'
import { Container } from 'react-bootstrap'
import { Button } from '@/components/_commons/Form/Button'
import { useNavigate } from 'react-router-dom'
import { DialogBox, DialogBoxProps } from '@/components/_commons/Modal'
import { Loader } from '@/components/_commons/Loader'

export const CompaniesPage = () => {
  const navigate = useNavigate()

  const [companies, setCompanie] = useState<CompanieResponse>()
  const [showRemoveModal, setShowRemoveModal] = useState<boolean>(false)

  const [params, setParams] = useState<CompanieSearch>({
    current_page: 1,
    items_per_page: 15
  })

  const { data: items, isLoading, refetch } = Companie.useSearch(params)

  const removeMutation = Companie.useDelete()

  const handleRemove = async () => {
    if (companies) {
      await removeMutation.mutateAsync({ id: companies.id })
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

  const handleSearch = (values: CompanieSearch) => {
    setParams({ ...{ current_page: 1, items_per_page: 15 }, ...values })
  }

  const toggleRemoveModal = (item?: CompanieResponse) => {
    setCompanie(item)
    setShowRemoveModal(!showRemoveModal)
  }

  return (
    <Container className="content">
      <CompaniesFilterCard onSearch={handleSearch} onClearTable={handleClear} />
      <br />
      <SimpleCard
        cardFoter={true}
        headerTitle="Listagem"
        className="py-3 px-3"
        footerButtonRight={{
          onClick: () => navigate('/app/companies/create'),
          icon: '',
          label: 'Nova Unidade'
        }}
      >
        <Loader loading={isLoading}>
          <SmartTable
            columns={columns}
            data={
              items &&
              items.data &&
              items.data.map(item => ({
                name: item.name,
                status: item.stage || '',
                actions: (
                  <div className="d-flex justify-content-center">
                    <Button
                      title="Editar"
                      variant="outline-secondary"
                      size="sm"
                      className="border-0 outline-secondary"
                      onClick={() => navigate(`/app/companies/${item.id}`)}
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
            loading={isLoading}
          />
        </Loader>
      </SimpleCard>

      <RemoveModal
        show={showRemoveModal}
        titleHeader="Remover Unidade"
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
  { label: 'Nome', key: 'name' },
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
      Deseja realmente excluir essa Unidade?
    </DialogBox>
  )
}
