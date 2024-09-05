import { useNavigate, useParams } from 'react-router-dom'
import { SimpleCard } from '@/components/_commons/Card/SimpleCard'
import { Form as FormFormik, Formik } from 'formik'
import { Text } from '@/components/_commons/Form/Text'
import {
  Container,
  Form,
  InputGroup,
  Row,
  Col,
  FormControl
} from 'react-bootstrap'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import {
  CollaboratorRequest,
  CollaboratorResponse
} from '@/core/domain/Collaborator/Collaborator.types'
import { CompanieSelect } from '@/components/Companies/Selects/CompanieSelect'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@/components/_commons/Form/Button'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { ChangeEvent, useEffect, useState } from 'react'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { Collaborators } from '@/core/domain/Collaborator/Index'
import { SearchOption } from '@/components/_commons/Form/SearchSelectNew'
import { Check } from '@/components/_commons/Form/Check'
import { activeType } from '@/core/domain/_commons/Common.types'

interface PermissionsProps {
  [key: string]: any
  carrier: activeType
  costcenter: activeType
  collaborator: activeType
  companie: activeType
  holiday: activeType
  location: activeType
  vehicle: activeType
  operation_admin: activeType
  admin: activeType
}

export const CollaboratorsFormPage = () => {
  const navigate = useNavigate()
  const { collaborator_id } = useParams()

  const [showPassword, setShowPassword] = useState(false)
  const [collaborator, setCollaborator] = useState<
    CollaboratorResponse | undefined
  >(undefined)
  const [disabled, setDisabled] = useState<Boolean>(false)
  const [defaults, setDefaults] = useState<any>()

  const createMutation = Collaborators.useCreate()
  const updateMutation = Collaborators.useUpdate()

  const { data, isLoading } = Collaborators.usefindOne(Number(collaborator_id))

  const findPermissionValue = (permissions: any, permissionSlug: string) => {
    if (Array.isArray(permissions) && permissions.length > 0) {
      const foundPermission = permissions.find(
        permission => permission.slug === permissionSlug
      )
      return foundPermission ? 'active' : 'inactive'
    } else {
      return 'inactive'
    }
  }

  const initialValuePermissions: PermissionsProps = {
    carrier: findPermissionValue(collaborator?.permissions || [], 'carrier'),
    costcenter: findPermissionValue(
      collaborator?.permissions || [],
      'costcenter'
    ),
    collaborator: findPermissionValue(
      collaborator?.permissions || [],
      'collaborator'
    ),
    companie: findPermissionValue(collaborator?.permissions || [], 'companie'),
    holiday: findPermissionValue(collaborator?.permissions || [], 'holiday'),
    location: findPermissionValue(collaborator?.permissions || [], 'location'),
    vehicle: findPermissionValue(collaborator?.permissions || [], 'vehicle'),
    operation_admin: findPermissionValue(
      collaborator?.permissions || [],
      'operation_admin'
    ),
    admin: findPermissionValue(collaborator?.permissions || [], 'admin')
  }

  const initialValues: CollaboratorRequest = {
    name: collaborator?.name || '',
    email: collaborator?.user?.email || '',
    enrollment: collaborator?.enrollment || '',
    companie_id: collaborator?.companie_id || undefined,

    phone: collaborator?.phones?.phone || '',

    zip_code: collaborator?.address?.zip_code || '',
    address: collaborator?.address?.address || '',
    address_number: collaborator?.address?.address_number || '',
    complement: collaborator?.address?.complement || '',
    neighborhood: collaborator?.address?.neighborhood || '',
    city: collaborator?.address?.city || '',
    state: collaborator?.address?.state || '',

    single_password: collaborator?.user?.single_password || '',
    ck_command_access: collaborator?.user?.single_password
      ? 'active'
      : 'inactive',

    fixed: collaborator?.user?.fixed || 'inactive',
    operation: collaborator?.user?.operation || 'inactive',
    validator: collaborator?.user?.validator || 'inactive',
    approver: collaborator?.user?.approver || 'inactive',

    ...initialValuePermissions
  }

  const [permissions, setPermission] = useState<PermissionsProps>(
    initialValuePermissions
  )

  const validateCreate = {
    password: Yup.string()
      .required('Informe uma senha')
      .min(8, 'A senha deve ter no mínimo 8 caracteres'),
    password_confirmation: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'As senhas devem ser iguais'
    )
  }

  let validationSchema = Yup.object().shape({
    name: Yup.string().required('Este campo é obrigatório'),
    companie_id: Yup.number().required('Este campo é obrigatório'),
    single_password: Yup.string().when('ck_command_access', {
      is: 'active',
      then: Yup.string().required('Este campo é obrigatório'),
      otherwise: Yup.string()
    })
  })

  if (typeof collaborator_id === 'undefined') {
    validationSchema = validationSchema.concat(
      Yup.object().shape(validateCreate)
    )
  }

  async function handleSubmit(requests: CollaboratorRequest) {
    try {
      let Phones = {}
      if (requests.phone) {
        if (requests.phone) {
          Phones = {
            phone: requests.phone
          }
        }
      }

      let Address = {}
      if (requests.zip_code) {
        Address = {
          zip_code: requests.zip_code,
          address_number: requests.address_number,
          address: requests.address,
          neighborhood: requests.neighborhood,
          complement: requests.complement,
          state: requests.state,
          city: requests.city
        }
      }

      const request = {
        ...requests,
        name: requests.name,
        companie_id: requests.companie_id,
        phones: Phones,
        adresses: Address,
        users: {
          email: requests.email,
          password: requests.password,
          password_confirmation: requests.password_confirmation
        }
      }

      if (typeof collaborator_id !== 'undefined') {
        await updateMutation.mutateAsync({
          id: Number(collaborator_id),
          obj: request
        })

        return
      }

      const result = await createMutation.mutateAsync(request)

      if (result.code && result.code === 404) {
        toast.error('Não foi possível cadastrar, tente novamente')
        return
      }

      // console.log(result.data)

      // if (result && result.data) {
      //   navigate(`/app/collaborators/search`)
      // }
    } catch (error) {
      toast.error('Não foi possível cadastrar, tente novamente')
    }
  }

  const searchAddress = async (setFieldValue: any, itens: any) => {
    const response = await axios.get(
      `https://viacep.com.br/ws/${itens.zip_code}/json/`
    )

    if (response && response.status && response.status === 200) {
      setFieldValue('address', response.data.logradouro)
      setFieldValue('neighborhood', response.data.bairro)
      setFieldValue('city', response.data.localidade)
      setFieldValue('state', response.data.uf)
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
      setDefaults(setCompanieComponent(data.data.companies))

      const permissions = initialValuePermissions
      if (data.data.permissions) {
        data.data.permissions.forEach(item => {
          permissions[item.slug] = 'active'
        })
      }

      setPermission(permissions)
      setCollaborator(data.data)
      setDisabled(true)
    }
  }, [data])

  return (
    <Container fluid className="content">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        enableReinitialize={true}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          setFieldValue,
          isSubmitting
        }) => {
          const [disabledSinglePassword, setDisabledSinglePassword] =
            useState<boolean>(false)

          useEffect(() => {
            const { ck_command_access } = values

            const disabled =
              typeof ck_command_access === 'undefined' ||
              ck_command_access === 'inactive'

            setDisabledSinglePassword(disabled)
          }, [values])

          const setStateCbPermissions = (
            checked: any,
            permissionName: string,
            setFieldValue: any
          ) => {
            setPermission(prevPermissions => ({
              ...prevPermissions,
              [permissionName]: checked ? 'active' : 'inactive'
            }))

            setFieldValue(permissionName, checked ? 'active' : 'inactive')
          }

          const setActiveCommandAccess = (
            checked: boolean,
            setFieldValue: any
          ) => {
            if (!checked) {
              setFieldValue('single_password', '')
              setFieldValue('fixed', 'inactve')
            }

            setFieldValue('ck_command_access', checked ? 'active' : 'inactive')
          }

          return (
            <FormFormik>
              <SimpleCard
                headerTitle="Cadastro de Colaborador"
                footerButtonsRight={[
                  {
                    label: 'Voltar',
                    variant: 'danger',
                    onClick: () => navigate(-1)
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
                    label="Nome Completo"
                    name="name"
                    value={values.name}
                    onHandleInput={handleChange}
                    error={errors.name && touched.name ? errors.name : null}
                    grid="col-md-7"
                  />

                  <Text
                    type="phone"
                    label="Telefone"
                    name="phone"
                    value={values.phone}
                    onHandleInput={handleChange}
                    grid="col-md-2"
                  />

                  <CompanieSelect
                    name={'companie_id'}
                    grid="col-md-3"
                    defaultValue={defaults}
                  />
                </Row>

                <Row>
                  <Col md={'12'}>
                    <strong>Endereço</strong>

                    <hr className="hr" />
                  </Col>
                  <Col md={'3'}>
                    <Form.Group className="mb-3 pt-2">
                      <label className="mb-1" htmlFor="password">
                        CEP
                      </label>
                      <InputGroup>
                        <Form.Control
                          name="zip_code"
                          onChange={handleChange}
                          value={values.zip_code}
                          type={'text'}
                        />
                        <Button
                          variant="outline-secondary"
                          id="button-addon2"
                          onClick={() => searchAddress(setFieldValue, values)}
                        >
                          <FontAwesomeIcon icon={faSearch as IconProp} />
                        </Button>
                      </InputGroup>
                    </Form.Group>
                  </Col>

                  <Text
                    type="text"
                    label="Endereço"
                    name="address"
                    value={values.address}
                    onHandleInput={handleChange}
                    grid="col-md-7"
                  />

                  <Text
                    type="text"
                    label="Nº"
                    name="address_number"
                    value={values.address_number}
                    onHandleInput={handleChange}
                    grid="col-md-2"
                  />

                  <Text
                    type="text"
                    label="Complemento"
                    name="complement"
                    value={values.complement}
                    onHandleInput={handleChange}
                    grid="col-md-12"
                  />

                  <Text
                    type="text"
                    label="Complemento"
                    name="neighborhood"
                    value={values.neighborhood}
                    onHandleInput={handleChange}
                    grid="col-md-5"
                  />

                  <Text
                    type="text"
                    label="Cidade"
                    name="city"
                    value={values.city}
                    onHandleInput={handleChange}
                    grid="col-md-5"
                  />

                  <Text
                    type="text"
                    label="Estado"
                    name="state"
                    value={values.state}
                    onHandleInput={handleChange}
                    grid="col-md-2"
                  />
                </Row>

                <Row>
                  <Col md={'12'}>
                    <strong>Dados de Acesso</strong>
                    <hr className="hr" />
                  </Col>

                  <Text
                    type="email"
                    label="Email"
                    name="email"
                    disabled={!!disabled}
                    readOnly={!!disabled}
                    value={values.email}
                    onHandleInput={handleChange}
                    error={errors.email && touched.email ? errors.email : null}
                    grid="col-md-6"
                    autoComplete={'off'}
                  />

                  <Col md={'3'}>
                    <Form.Group className="mt-2">
                      <label className="mb-1" htmlFor="password">
                        Senha
                      </label>
                      <InputGroup>
                        <Form.Control
                          name="password"
                          onChange={handleChange}
                          value={values?.password}
                          type={showPassword ? 'text' : 'password'}
                          autoComplete="off"
                        />
                        <Button
                          variant="outline-secondary"
                          id="button-addon2"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <FontAwesomeIcon
                            icon={
                              showPassword
                                ? (faEye as IconProp)
                                : (faEyeSlash as IconProp)
                            }
                          />
                        </Button>
                      </InputGroup>
                      <p className="text-danger my-1">
                        {errors.password && touched.password
                          ? errors.password
                          : null}
                      </p>
                    </Form.Group>
                  </Col>

                  <Col md={'3'}>
                    <Form.Group>
                      <label className="mt-2" htmlFor="password_confirmation">
                        Confirmar senha
                      </label>
                      <InputGroup>
                        <Form.Control
                          name="password_confirmation"
                          onChange={handleChange}
                          value={values.password_confirmation}
                          type={showPassword ? 'text' : 'password'}
                          autoComplete={'off'}
                        />
                      </InputGroup>
                      <p className="text-danger my-1">
                        {errors.password_confirmation &&
                        touched.password_confirmation
                          ? errors.password_confirmation
                          : null}
                      </p>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={'12'}>
                    <strong>Acesso a Comanda</strong>

                    <hr className="hr" />
                  </Col>
                </Row>

                <Row>
                  <Col className="col-md-4">
                    <Form.Label
                      htmlFor="basic-url"
                      title="Necessidade de evidência"
                    >
                      Senha de Acesso
                    </Form.Label>

                    <InputGroup>
                      <Button variant="outline-secondary">
                        <Form.Check
                          name="ck_command_access"
                          onChange={e =>
                            setActiveCommandAccess(
                              e.target.checked,
                              setFieldValue
                            )
                          }
                          checked={values.ck_command_access === 'active'}
                        />
                      </Button>

                      <FormControl
                        type="text"
                        name="single_password"
                        value={values.single_password}
                        onChange={handleChange}
                        disabled={disabledSinglePassword}
                      />
                    </InputGroup>
                  </Col>

                  <Check
                    label="Fixo?"
                    name="fixed"
                    onHandleCheck={(e: ChangeEvent<HTMLInputElement>) => {
                      setFieldValue(
                        'fixed',
                        e.target.checked ? 'active' : 'inactive'
                      )
                    }}
                    isChecked={values?.fixed === 'active'}
                    grid="col-md-4 align-self-end"
                    disabled={disabledSinglePassword}
                  />
                </Row>

                <Row>
                  <Check
                    label="Operador de Comanda"
                    name="operation"
                    onHandleCheck={(e: ChangeEvent<HTMLInputElement>) => {
                      setStateCbPermissions(
                        e.target.checked,
                        'operation',
                        setFieldValue
                      )
                    }}
                    isChecked={values?.operation === 'active'}
                    grid="col-md-4 align-self-end"
                  />

                  <Check
                    label="Aprovador"
                    name="approver"
                    onHandleCheck={(e: ChangeEvent<HTMLInputElement>) => {
                      setFieldValue(
                        'approver',
                        e.target.checked ? 'active' : 'inactive'
                      )
                    }}
                    isChecked={values?.approver === 'active'}
                    grid="col-md-4 align-self-end"
                  />

                  <Check
                    label="Validador"
                    name="validator"
                    onHandleCheck={(e: ChangeEvent<HTMLInputElement>) => {
                      setFieldValue(
                        'validator',
                        e.target.checked ? 'active' : 'inactive'
                      )
                    }}
                    isChecked={values?.validator === 'active'}
                    grid="col-md-4 align-self-end"
                  />
                </Row>

                <Row>
                  <Col md={'12'}>
                    <strong>Permissões de Acesso</strong>
                    <hr className="hr" />
                  </Col>
                </Row>

                <Row>
                  <Check
                    label="Transportadora"
                    name="carrier"
                    onHandleCheck={(e: ChangeEvent<HTMLInputElement>) => {
                      setStateCbPermissions(
                        e.target.checked,
                        'carrier',
                        setFieldValue
                      )
                    }}
                    isChecked={permissions.carrier === 'active'}
                    grid="col-md-5 align-self-end"
                  />

                  <Check
                    label="Centro de Custo"
                    name="costcenter"
                    onHandleCheck={(e: ChangeEvent<HTMLInputElement>) => {
                      setStateCbPermissions(
                        e.target.checked,
                        'costcenter',
                        setFieldValue
                      )
                    }}
                    isChecked={permissions.costcenter === 'active'}
                    grid="col-md-5 align-self-end"
                  />

                  <Check
                    label="Usuários"
                    name="collaborator"
                    onHandleCheck={(e: ChangeEvent<HTMLInputElement>) => {
                      setStateCbPermissions(
                        e.target.checked,
                        'collaborator',
                        setFieldValue
                      )
                    }}
                    isChecked={permissions.collaborator === 'active'}
                    grid="col-md-5 align-self-end"
                  />

                  <Check
                    label="Unidades"
                    name="companie"
                    onHandleCheck={(e: ChangeEvent<HTMLInputElement>) => {
                      setStateCbPermissions(
                        e.target.checked,
                        'companie',
                        setFieldValue
                      )
                    }}
                    isChecked={permissions.companie === 'active'}
                    grid="col-md-5 align-self-end"
                  />

                  <Check
                    label="Feriado"
                    name="holiday"
                    onHandleCheck={(e: ChangeEvent<HTMLInputElement>) => {
                      setStateCbPermissions(
                        e.target.checked,
                        'holiday',
                        setFieldValue
                      )
                    }}
                    isChecked={permissions.holiday === 'active'}
                    grid="col-md-5 align-self-end"
                  />

                  <Check
                    label="Local/Prédio"
                    name="location"
                    onHandleCheck={(e: ChangeEvent<HTMLInputElement>) => {
                      setStateCbPermissions(
                        e.target.checked,
                        'location',
                        setFieldValue
                      )
                    }}
                    isChecked={permissions.location === 'active'}
                    grid="col-md-5 align-self-end"
                  />

                  <Check
                    label="Veículos"
                    name="vehicle"
                    onHandleCheck={(e: ChangeEvent<HTMLInputElement>) => {
                      setStateCbPermissions(
                        e.target.checked,
                        'vehicle',
                        setFieldValue
                      )
                    }}
                    isChecked={permissions.vehicle === 'active'}
                    grid="col-md-5 align-self-end"
                  />

                  <Check
                    label="Administrador da Comanda"
                    name="operation_admin"
                    onHandleCheck={(e: ChangeEvent<HTMLInputElement>) => {
                      setStateCbPermissions(
                        e.target.checked,
                        'operation_admin',
                        setFieldValue
                      )
                    }}
                    isChecked={permissions.operation_admin === 'active'}
                    grid="col-md-5 align-self-end"
                  />

                  <Check
                    label="Administrador Geral"
                    name="admin"
                    onHandleCheck={(e: ChangeEvent<HTMLInputElement>) => {
                      setStateCbPermissions(
                        e.target.checked,
                        'admin',
                        setFieldValue
                      )
                    }}
                    isChecked={permissions.admin === 'active'}
                    grid="col-md-5 align-self-end"
                  />
                </Row>
              </SimpleCard>
            </FormFormik>
          )
        }}
      </Formik>
    </Container>
  )
}
