import { CollaboratorsFilterCard } from '@/components/Collaborators/Cards/CollaboratorsFilterCard'
import { SimpleCard } from '@/components/_commons/Card/SimpleCard'
import { SmartTable } from '@/components/_commons/SmartTable'
import { CollaboratorsSearch } from '@/core/domain/Collaborator/Collaborator.types'
import { Collaborators } from '@/core/domain/Collaborator/Index'
import { CSSProperties, useState } from 'react'
import { Container } from 'react-bootstrap'
import { Button } from '@/components/_commons/Form/Button'
import { useNavigate } from 'react-router-dom'

export const CollaboratorsPage = () => {
  const navigate = useNavigate()

  const [params, setParams] = useState<CollaboratorsSearch>({
    current_page: 1,
    items_per_page: 15
  })

  const { data: items, isLoading: loading } =
    Collaborators.useCollaboratorSearch(params)

  const handleClear = () => {
    setParams({
      current_page: 1,
      items_per_page: 15
    })
  }

  const handleSearch = (values: CollaboratorsSearch) => {
    setParams({ ...{ current_page: 1, items_per_page: 15 }, ...values })
  }

  return (
    <Container className="content">
      <CollaboratorsFilterCard
        onSearch={handleSearch}
        onClearTable={handleClear}
      />
      <br />
      <SimpleCard
        cardFoter={true}
        headerTitle="Listagem"
        className="py-3 px-3"
        footerButtonRight={{
          onClick: () => navigate('/app/collaborators/create'),
          icon: '',
          label: 'Novo Colaborador'
        }}
      >
        <SmartTable
          columns={columns}
          data={
            items &&
            items.data &&
            items.data.map(item => ({
              name: item.name,
              email: item.user?.email || '',
              companie: item.companies?.name || '',
              operation:
                item?.user?.operation === 'active' ? (
                  <i className="far fa-check-circle" />
                ) : (
                  ''
                ),
              validator:
                item?.user?.validator === 'active' ? (
                  <i className="far fa-check-circle" />
                ) : (
                  ''
                ),
              approver:
                item?.user?.approver === 'active' ? (
                  <i className="far fa-check-circle" />
                ) : (
                  ''
                ),
              actions: (
                <div className="d-flex justify-content-center">
                  <Button
                    title="Editar"
                    variant="outline-secondary"
                    size="sm"
                    className="border-0 outline-secondary"
                    onClick={() => navigate(`/app/collaborators/${item.id}`)}
                  >
                    <i className="fas fa-edit" />
                  </Button>

                  <Button
                    title="Pré-vizualização"
                    variant="outline-secondary"
                    size="sm"
                    className="border-0 outline-secondary"
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
    </Container>
  )
}

const columns = [
  { label: 'Nome', key: 'name' },
  {
    label: 'E-mail',
    key: 'email'
  },
  {
    label: 'Unidade',
    key: 'companie'
  },
  {
    label: 'Operador',
    key: 'operation'
  },
  {
    label: 'Validador',
    key: 'validator'
  },
  {
    label: 'Aprovador',
    key: 'approver'
  },
  {
    label: '',
    key: 'actions',
    headerCellStyle: { width: '60px', textAlign: 'center' } as CSSProperties
  }
]
