import { CompanieSelect } from '@/components/Companies/Selects/CompanieSelect'
import { SimpleCard } from '@/components/_commons/Card/SimpleCard'
import { Check } from '@/components/_commons/Form/Check'
import { Text } from '@/components/_commons/Form/Text'
import { CollaboratorsSearch } from '@/core/domain/Collaborator/Collaborator.types'
import { Form, Formik } from 'formik'
import { ChangeEvent } from 'react'

interface CollaboratorsSearchProps {
  onSearch: (values: CollaboratorsSearch) => void
  onClearTable: () => void
}

export const CollaboratorsFilterCard = ({
  onSearch,
  onClearTable
}: CollaboratorsSearchProps) => {
  const initialValues: CollaboratorsSearch = {
    current_page: 1,
    items_per_page: 15,
    companie_id: undefined
  }

  const handleSubmit = (values: CollaboratorsSearch) => {
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
                grid="col-md-4"
              />

              <Text
                label="E-mail"
                name="email"
                value={values.email}
                onHandleInput={handleChange}
                grid="col-md-4"
              />

              <CompanieSelect name={'companie_id'} grid="col-md-4" />

              <Check
                label="Operador"
                name="operation"
                grid="col-md-3 align-self-end"
                onHandleCheck={(e: ChangeEvent<HTMLInputElement>) => {
                  setFieldValue(
                    'operation',
                    e.target.checked ? 'active' : 'inactive'
                  )
                }}
                isChecked={values.operation === 'active'}
              />

              <Check
                label="Operador Fixo"
                name="fixed"
                grid="col-md-3 align-self-end"
                disabled={!values.operation || values.operation !== 'active'}
                onHandleCheck={(e: ChangeEvent<HTMLInputElement>) => {
                  setFieldValue(
                    'fixed',
                    e.target.checked ? 'active' : 'inactive'
                  )
                }}
                isChecked={values.fixed === 'active'}
              />

              <Check
                label="Validador"
                name="validator"
                grid="col-md-3 align-self-end"
                onHandleCheck={(e: ChangeEvent<HTMLInputElement>) => {
                  setFieldValue(
                    'validator',
                    e.target.checked ? 'active' : 'inactive'
                  )
                }}
                isChecked={values.validator === 'active'}
              />

              <Check
                label="Aprovador"
                name="approver"
                grid="col-md-3 align-self-end"
                onHandleCheck={(e: ChangeEvent<HTMLInputElement>) => {
                  setFieldValue(
                    'approver',
                    e.target.checked ? 'active' : 'inactive'
                  )
                }}
                isChecked={values.approver === 'active'}
              />
            </div>
          </SimpleCard>
        </Form>
      )}
    </Formik>
  )
}
