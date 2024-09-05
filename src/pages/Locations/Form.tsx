import { useNavigate, useParams } from 'react-router-dom'
import { SimpleCard } from '@/components/_commons/Card/SimpleCard'
import { Form as FormFormik, Formik } from 'formik'
import { Text } from '@/components/_commons/Form/Text'
import { Container, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import {
  LocationRequest,
  LocationResponse
} from '@/core/domain/Location/Location.types'
import { useEffect, useState } from 'react'
import { Locations } from '@/core/domain/Location/Index'
import { ComboBox, Option } from '@/components/_commons/Form/ComboBox'
import { CompanieSelect } from '@/components/Companies/Selects/CompanieSelect'
import { SearchOption } from '@/components/_commons/Form/SearchSelectNew'

export const LocationsFormPage = () => {
  const navigate = useNavigate()
  const { location_id } = useParams()

  const [defaults, setDefaults] = useState<any>(undefined)
  const [location, setLocation] = useState<LocationResponse | undefined>(
    undefined
  )

  const createMutation = Locations.useCreateLocation()
  const updateMutation = Locations.useUpdateLocation()

  const { data, isLoading, refetch } = Locations.usefindOneLocation(
    Number(location_id)
  )

  const initialValues: LocationRequest = {
    name: location?.name || '',
    status: location?.status || 'active',
    companie_id: location?.companie_id || undefined
  }

  const LocationValidate = Yup.object().shape({
    name: Yup.string().required('Este campo é obrigatório'),
    status: Yup.string().required('Este campo é obrigatório'),
    companie_id: Yup.string().required('Este campo é obrigatório')
  })

  async function handleSubmit(requests: LocationRequest) {
    try {
      if (typeof location_id === 'undefined') {
        const stored = await createMutation.mutateAsync(requests)

        if (stored && stored.code && stored.code === 200 && stored.data) {
          navigate(`/app/locations/${stored.data.id}`)
          return
        }
      }

      await updateMutation.mutateAsync({
        id: Number(location_id),
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
      setLocation(data.data)
    }
  }, [data])

  return (
    <Container fluid className="content">
      <Formik
        initialValues={initialValues}
        validationSchema={LocationValidate}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={false}
        enableReinitialize
      >
        {({ values, errors, touched, handleChange, isSubmitting }) => (
          <FormFormik>
            <SimpleCard
              headerTitle="Cadastro de Local/Prédio"
              footerButtonsRight={[
                {
                  label: 'Voltar',
                  variant: 'danger',
                  onClick: () => navigate(`/app/locations/search`)
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
                  label="Local/Prédio"
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
