import { useNavigate, useParams } from 'react-router-dom'
import { SimpleCard } from '@/components/_commons/Card/SimpleCard'
import { Form as FormFormik, Formik } from 'formik'
import { Text } from '@/components/_commons/Form/Text'
import { Container, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import {
  VehicleRequest,
  VehicleResponse
} from '@/core/domain/Vehicle/Vehicle.types'
import { useEffect, useState } from 'react'
import { Vehicle } from '@/core/domain/Vehicle/Index'
import { ComboBox, Option } from '@/components/_commons/Form/ComboBox'
import { CompanieSelect } from '@/components/Companies/Selects/CompanieSelect'
import { SearchOption } from '@/components/_commons/Form/SearchSelectNew'

export const VehiclesFormPage = () => {
  const navigate = useNavigate()
  const { vehicle_id } = useParams()

  const [defaults, setDefaults] = useState<any>(undefined)
  const [vehicles, setVehicle] = useState<VehicleResponse | undefined>(
    undefined
  )

  const createMutation = Vehicle.useCreateVehicle()
  const updateMutation = Vehicle.useUpdateVehicle()

  const { data, isLoading, refetch } = Vehicle.usefindOneVehicle(
    Number(vehicle_id)
  )

  const initialValues: VehicleRequest = {
    name: vehicles?.name || '',
    status: vehicles?.status || 'active',
    companie_id: vehicles?.companie_id || undefined
  }

  const VehicleValidate = Yup.object().shape({
    name: Yup.string().required('Este campo é obrigatório'),
    status: Yup.string().required('Este campo é obrigatório'),
    companie_id: Yup.string().required('Este campo é obrigatório')
  })

  async function handleSubmit(requests: VehicleRequest) {
    try {
      if (typeof vehicle_id === 'undefined') {
        const stored = await createMutation.mutateAsync(requests)

        if (stored && stored.code && stored.code === 200 && stored.data) {
          navigate(`/app/vehicles/${stored.data.id}`)
          return
        }
      }

      await updateMutation.mutateAsync({
        id: Number(vehicle_id),
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
      setVehicle(data.data)
    }
  }, [data])

  return (
    <Container fluid className="content">
      <Formik
        initialValues={initialValues}
        validationSchema={VehicleValidate}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={false}
        enableReinitialize
      >
        {({ values, errors, touched, handleChange, isSubmitting }) => (
          <FormFormik>
            <SimpleCard
              headerTitle="Cadastro de Veículos"
              footerButtonsRight={[
                {
                  label: 'Voltar',
                  variant: 'danger',
                  onClick: () => navigate(`/app/vehicles/search`)
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
                  label="Veículos"
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
