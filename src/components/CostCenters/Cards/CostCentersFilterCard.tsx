import { CompanieSelect } from '@/components/Companies/Selects/CompanieSelect'
import { SimpleCard } from '@/components/_commons/Card/SimpleCard'
import { ComboBox, Option } from '@/components/_commons/Form/ComboBox'
import { Text } from '@/components/_commons/Form/Text'
import { CostCentersSearch } from '@/core/domain/CostCenter/CostCenter.types'
import { Form, Formik } from 'formik'

interface CostCentersSearchProps {
  onSearch: (values: CostCentersSearch) => void
  onClearTable: () => void
}

export const CostCentersFilterCard = ({
  onSearch,
  onClearTable
}: CostCentersSearchProps) => {
  const initialValues: CostCentersSearch = {
    current_page: 1,
    items_per_page: 15,
    companie_id: undefined,
    status: 'active'
  }

  const handleSubmit = (values: CostCentersSearch) => {
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
                grid="col-md-5"
              />

              <CompanieSelect name={'companie_id'} grid="col-md-4" />

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
