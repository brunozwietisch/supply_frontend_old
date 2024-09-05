import { useNavigate, useParams } from 'react-router-dom'
import { SimpleCard } from '@/components/_commons/Card/SimpleCard'
import { Form as FormFormik, Formik } from 'formik'
import { Text } from '@/components/_commons/Form/Text'
import { Container, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import {
  CostCenterRequest,
  CostCenterResponse
} from '@/core/domain/CostCenter/CostCenter.types'
import { useEffect, useState } from 'react'
import { CostCenter } from '@/core/domain/CostCenter/Index'
import { ComboBox, Option } from '@/components/_commons/Form/ComboBox'
import { SearchOption } from '@/components/_commons/Form/SearchSelectNew'
import { CompanieSelect } from '@/components/Companies/Selects/CompanieSelect'

export const CostCentersFormPage = () => {
  const navigate = useNavigate()
  const { cost_center_id } = useParams()

  const [defaults, setDefaults] = useState<any>(undefined)
  const [CostCenters, setCostCenter] = useState<CostCenterResponse | undefined>(
    undefined
  )

  const createMutation = CostCenter.useCreateCostCenter()
  const updateMutation = CostCenter.useUpdateCostCenter()

  const { data, isLoading, refetch } = CostCenter.usefindOneCostCenter(
    Number(cost_center_id)
  )

  const initialValues: CostCenterRequest = {
    name: CostCenters?.name || '',
    status: CostCenters?.status || 'active',
    companie_id: CostCenters?.companie_id || undefined
  }

  const CostCenterValidate = Yup.object().shape({
    name: Yup.string().required('Este campo é obrigatório'),
    status: Yup.string().required('Este campo é obrigatório'),
    companie_id: Yup.string().required('Este campo é obrigatório')
  })

  async function handleSubmit(requests: CostCenterRequest) {
    try {
      if (typeof cost_center_id === 'undefined') {
        const stored = await createMutation.mutateAsync(requests)

        if (stored && stored.code && stored.code === 200 && stored.data) {
          navigate(`/app/costcenters/${stored.data.id}`)
          return
        }
      }

      await updateMutation.mutateAsync({
        id: Number(cost_center_id),
        obj: requests
      })

      refetch()

      return
    } catch (error) {
      toast.error('Não foi possível cadastrar, tente novamente')
    }
  }

  const setCompanieComponent = (companie: any | null) => {
    if (!companie || typeof companie === 'undefined' || companie === null)
      return undefined

    return {
      value: companie?.id || 0,
      name: companie?.name || ''
    } as SearchOption
  }

  useEffect(() => {
    if (data && data.code === 200 && data.data) {
      setDefaults(setCompanieComponent(data.data.companie))
      setCostCenter(data.data)
    }
  }, [data])

  return (
    <Container fluid className="content">
      <Formik
        initialValues={initialValues}
        validationSchema={CostCenterValidate}
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
                  onClick: () => navigate(`/app/costcenters/search`)
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
                  label="Centro de Custo"
                  name="name"
                  value={values.name}
                  onHandleInput={handleChange}
                  error={errors.name && touched.name ? errors.name : null}
                  grid="col-md-5"
                />

                <CompanieSelect
                  name={'companie_id'}
                  grid="col-md-4"
                  defaultValue={defaults}
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
