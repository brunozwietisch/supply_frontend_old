import { HolidayFilterCard } from '@/components/Holidays/Cards/HolidayFilterCard'
import { SimpleCard } from '@/components/_commons/Card/SimpleCard'
import { SmartTable } from '@/components/_commons/SmartTable'
import {
  HolidayResponse,
  HolidaysSearch
} from '@/core/domain/Holiday/Holiday.types'
import { Holiday } from '@/core/domain/Holiday/Index'
import { CSSProperties, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { Button } from '@/components/_commons/Form/Button'
import { useNavigate } from 'react-router-dom'
import { DialogBox, DialogBoxProps } from '@/components/_commons/Modal'
import { formatDate } from '@/core/utils/formatters'

export const HolidaysPage = () => {
  const navigate = useNavigate()

  const [item, setHoliday] = useState<HolidayResponse>()
  const [holidays, setHolidays] = useState<any>([])
  const [showRemoveModal, setShowRemoveModal] = useState<boolean>(false)

  const [params, setParams] = useState<HolidaysSearch>({
    current_page: 1,
    items_per_page: 15,
    status: 'active'
  })
  const { data: items, isLoading: loading, refetch } = Holiday.useSearch(params)

  const param = { year: new Date().getFullYear() }
  const { data: standardHolidays } = Holiday.useStandardHolidays(param)
  // isLoading: holidaysLoading,54
  // refetch: holidaysRefetch

  const removeMutation = Holiday.useHolidayDelete()

  const handleRemove = async () => {
    if (item) {
      await removeMutation.mutateAsync({ id: item.id })
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

  const handleSearch = (values: HolidaysSearch) => {
    setParams({ ...{ current_page: 1, items_per_page: 15 }, ...values })
  }

  const toggleRemoveModal = (item?: HolidayResponse) => {
    setHoliday(item)
    setShowRemoveModal(!showRemoveModal)
  }

  useEffect(() => {
    let arrHolidays: any[] = []

    if (items && items.data && items.data.length > 0) {
      arrHolidays = items.data
    }

    const holidays = arrHolidays.concat(standardHolidays)
    setHolidays(holidays)
  }, [items, standardHolidays])

  return (
    <Container className="content">
      <HolidayFilterCard onSearch={handleSearch} onClearTable={handleClear} />
      <br />
      <SimpleCard
        cardFoter={true}
        headerTitle="Listagem"
        className="py-3 px-3"
        footerButtonRight={{
          onClick: () => navigate('/app/holidays/create'),
          icon: '',
          label: 'Novo Feriado'
        }}
      >
        <SmartTable
          columns={columns}
          data={holidays.map((item: any) => ({
            id: item?.id || '',
            holiday: item?.name,
            date_holiday: item?.date_holiday
              ? formatDate(item.date_holiday)
              : '',
            date_end_holiday: item?.date_end_holiday
              ? formatDate(item.date_end_holiday)
              : '',
            locale: item?.companie?.name || 'Nacional',
            status: item?.stage || '',
            actions: item?.id ? (
              <div className="d-flex justify-content-center">
                <Button
                  title="Editar"
                  variant="outline-secondary"
                  size="sm"
                  className="border-0 outline-secondary"
                  onClick={() => navigate(`/app/holidays/${item.id}`)}
                >
                  <i className="fas fa-edit" />
                </Button>

                {item.status === 'inactive' && (
                  <Button
                    title="Remover Feriado"
                    variant="outline-secondary"
                    size="sm"
                    className="border-0 outline-secondary"
                    onClick={() => toggleRemoveModal(item)}
                  >
                    <i className="fa fa-trash" />
                  </Button>
                )}
              </div>
            ) : (
              ''
            )
          }))}
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
        titleHeader="Remover Feriado"
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
    label: 'Feriado',
    key: 'holiday'
  },
  {
    label: 'Data Feriado',
    key: 'date_holiday'
  },
  {
    label: 'Data Feriado Final',
    key: 'date_end_holiday'
  },
  {
    label: 'Local',
    key: 'locale'
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
      Deseja realmente excluir esse Feriado?
    </DialogBox>
  )
}
