import { useNavigate, useParams } from 'react-router-dom'
import { SimpleCard } from '@/components/_commons/Card/SimpleCard'
import { Form as FormFormik, Formik } from 'formik'
import { Text } from '@/components/_commons/Form/Text'
import { Container, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import {
  CompanieRequest,
  CompanieResponse
} from '@/core/domain/Companie/Companie.types'
import { useEffect, useState } from 'react'
import { Companie } from '@/core/domain/Companie/Index'
import { ComboBox, Option } from '@/components/_commons/Form/ComboBox'

export const CompaniesFormPage = () => {
  const navigate = useNavigate()
  const { companie_id } = useParams()

  const [companie, setCompanie] = useState<CompanieResponse | undefined>(
    undefined
  )

  const createMutation = Companie.useCreate()
  const updateMutation = Companie.useUpdate()

  const { data, isLoading, refetch } = Companie.usefindOne(Number(companie_id))

  const initialValues: CompanieRequest = {
    name: companie?.name || '',
    status: companie?.status || 'active',

    phone: companie?.phone?.phone || '',
    email: companie?.email?.email || ''
  }

  const CompanieValidate = Yup.object().shape({
    name: Yup.string().required('Este campo é obrigatório'),
    status: Yup.string().required('Este campo é obrigatório')
  })

  async function handleSubmit(requests: CompanieRequest) {
    try {
      if (typeof companie_id === 'undefined') {
        const stored = await createMutation.mutateAsync(requests)

        if (stored && stored.code && stored.code === 200 && stored.data) {
          navigate(`/app/companies/${stored.data.id}`)
          return
        }
      }

      await updateMutation.mutateAsync({
        id: Number(companie_id),
        obj: requests
      })

      refetch()

      return
    } catch (error) {
      toast.error('Não foi possível cadastrar, tente novamente')
    }
  }

  useEffect(() => {
    if (data && data.code === 200 && data.data) {
      setCompanie(data.data)
    }
  }, [data])

  return (
    <Container fluid className="content">
      <Formik
        initialValues={initialValues}
        validationSchema={CompanieValidate}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={false}
        enableReinitialize
      >
        {({ values, errors, touched, handleChange, isSubmitting }) => (
          <FormFormik>
            <SimpleCard
              headerTitle="Cadastro de Emrpesas"
              footerButtonsRight={[
                {
                  label: 'Voltar',
                  variant: 'danger',
                  onClick: () => navigate(`/app/companies/search`)
                },
                {
                  label: 'Salvar',
                  variant: 'primary',
                  type: 'submit',
                  disabled: isSubmitting,
                  isLoading
                }
              ]}
            >
              <Row className="mb-2 gy-2">
                <Text
                  type="text"
                  label="Unidade"
                  name="name"
                  value={values.name}
                  onHandleInput={handleChange}
                  error={errors.name && touched.name ? errors.name : null}
                  grid="col-md-3"
                />

                <Text
                  type="text"
                  label="Telefone"
                  name="phone"
                  value={values.phone}
                  onHandleInput={handleChange}
                  grid="col-md-3"
                />

                <Text
                  type="text"
                  label="Email"
                  name="email"
                  value={values.email}
                  onHandleInput={handleChange}
                  grid="col-md-3"
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
              </Row>
            </SimpleCard>
          </FormFormik>
        )}
      </Formik>
    </Container>
  )
}
