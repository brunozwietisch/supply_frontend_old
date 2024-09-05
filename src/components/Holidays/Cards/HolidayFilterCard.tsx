import { SimpleCard } from '@/components/_commons/Card/SimpleCard'
import { ComboBox, Option } from '@/components/_commons/Form/ComboBox'
import { Text } from '@/components/_commons/Form/Text'
import { HolidaysSearch } from '@/core/domain/Holiday/Holiday.types'
import { Form, Formik } from 'formik'

interface HolidaysSearchProps {
  onSearch: (values: HolidaysSearch) => void
  onClearTable: () => void
}

export const HolidayFilterCard = ({
  onSearch,
  onClearTable
}: HolidaysSearchProps) => {
  const initialValues: HolidaysSearch = {
    current_page: 1,
    items_per_page: 15,
    year: '',
    status: 'active'
  }

  const handleSubmit = (values: HolidaysSearch) => {
    onSearch({
      ...values
    })
  }
  const onClear = (resetForm: any) => {
    resetForm && resetForm()
    onClearTable()
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {({ values, handleChange, submitForm, resetForm, setFieldValue }) => (
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
                label="Nome"
                name="name"
                value={values.name}
                onHandleInput={handleChange}
                grid="col-md-9"
              />

              <ComboBox
                label="Status"
                name="status"
                onHandleSelect={e => {
                  handleChange(e)
                }}
                value={values.status}
                options={
                  [
                    {
                      name: 'Ativo',
                      value: 'active'
                    },
                    {
                      name: 'Inativo',
                      value: 'inactive'
                    }
                  ] as Option[]
                }
                grid="col-md-3"
              />
            </div>
          </SimpleCard>
        </Form>
      )}
    </Formik>
  )
}
