import { useNavigate, useParams } from 'react-router-dom'
import { SimpleCard } from '@/components/_commons/Card/SimpleCard'
import { Form as FormFormik, Formik } from 'formik'
import { Text } from '@/components/_commons/Form/Text'
import { Container, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import {
  HolidayRequest,
  HolidayResponse
} from '@/core/domain/Holiday/Holiday.types'
import { useEffect, useState } from 'react'
import { Holiday } from '@/core/domain/Holiday/Index'
import { ComboBox, Option } from '@/components/_commons/Form/ComboBox'
import { CompanieSelect } from '@/components/Companies/Selects/CompanieSelect'
import { SearchOption } from '@/components/_commons/Form/SearchSelectNew'

interface DefaultsType {
  companie?: SearchOption
}

export const HolidaysFormPage = () => {
  const navigate = useNavigate()
  const { holiday_id } = useParams()

  const [holidays, setHoliday] = useState<HolidayResponse | undefined>(
    undefined
  )

  const [defaults, setDefaults] = useState<DefaultsType>()

  const createMutation = Holiday.useHolidayCreate()
  const updateMutation = Holiday.useHolidayUpdate()

  const { data, isLoading, refetch } = Holiday.useHolidayFindOne(
    Number(holiday_id)
  )

  const initialValues: HolidayRequest = {
    name: holidays?.name || '',
    date_holiday: holidays?.date_holiday || '',
    status: holidays?.status || 'active'
  }

  const HolidayValidate = Yup.object().shape({
    name: Yup.string().required('Este campo é obrigatório'),
    date_holiday: Yup.string().required('Este campo é obrigatório'),
    status: Yup.string().required('Este campo é obrigatório')
  })

  async function handleSubmit(requests: HolidayRequest) {
    try {
      if (typeof holiday_id === 'undefined') {
        const stored = await createMutation.mutateAsync(requests)

        if (stored && stored.code && stored.code === 200 && stored.data) {
          navigate(`/app/holidays/search`)
          return
        }
      }

      await updateMutation.mutateAsync({
        id: Number(holiday_id),
        obj: requests
      })

      refetch()

      return
    } catch (error) {
      toast.error('Não foi possível cadastrar, tente novamente')
    }
  }

  const setCompanieComponent = (companie: any | null) => {
    if (companie === null) return undefined

    return {
      value: companie?.id || 0,
      name: companie?.name || ''
    } as SearchOption
  }

  useEffect(() => {
    if (data && data.code === 200 && data.data) {
      setHoliday(data.data)
      data.data.companie &&
        setDefaults({ companie: setCompanieComponent(data.data.companie) })
    }
  }, [data])

  return (
    <Container fluid className="content">
      <Formik
        initialValues={initialValues}
        validationSchema={HolidayValidate}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={false}
        enableReinitialize
      >
        {({ values, errors, touched, handleChange, isSubmitting }) => (
          <FormFormik>
            <SimpleCard
              headerTitle="Cadastro de Feriado"
              footerButtonsRight={[
                {
                  label: 'Voltar',
                  variant: 'danger',
                  onClick: () => navigate(`/app/holidays/search`)
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
                  label="Feriado"
                  name="name"
                  value={values.name}
                  onHandleInput={handleChange}
                  error={errors.name && touched.name ? errors.name : null}
                  grid="col-md-3"
                />

                <CompanieSelect
                  name={'companie_id'}
                  grid="col-md-3"
                  defaultValue={defaults?.companie}
                />

                <Text
                  type="date"
                  label="Data do Feriado"
                  name="date_holiday"
                  value={values.date_holiday}
                  onHandleInput={handleChange}
                  error={
                    errors.date_holiday && touched.date_holiday
                      ? errors.date_holiday
                      : null
                  }
                  grid="col-md-2"
                />

                <Text
                  type="date"
                  label="Data Final do Feriado"
                  name="date_end_holiday"
                  value={values.date_end_holiday}
                  min={values.date_holiday}
                  onHandleInput={handleChange}
                  error={
                    errors.date_end_holiday && touched.date_end_holiday
                      ? errors.date_end_holiday
                      : null
                  }
                  grid="col-md-2"
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
                  grid="col-md-2"
                />
              </Row>
            </SimpleCard>
          </FormFormik>
        )}
      </Formik>
    </Container>
  )
}
