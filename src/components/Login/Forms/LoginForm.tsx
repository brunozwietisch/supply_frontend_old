import * as Yup from 'yup'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form as FormikForm, Formik } from 'formik'
import { FormattedMessage, useIntl } from 'react-intl'
import { Form, InputGroup, Row, Stack } from 'react-bootstrap'
import { Text } from '@/components/_commons/Form/Text'
import { Button } from '@/components/_commons/Form/Button'
import { useAuth } from '@/core/contexts/AuthContext'
import { useLogin } from '@/core/domain/Auth/Auth.hooks'
import type { AuthRequest } from '@/core/domain/Auth/Auth.types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { toast } from 'react-toastify'
import LogoImg from '../../../assets/img/logo.png'

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)

  const intl = useIntl()

  const navigate = useNavigate()

  const { saveUser } = useAuth()

  const loginMutation = useLogin()

  const initialValues: AuthRequest = {
    email: '',
    password: '',
    device_name: 'aplication-web'
  }

  const AuthSchema = Yup.object().shape({
    email: Yup.string()
      .required('Informe o e-mail')
      .email('Informe um e-mail válido'),
    password: Yup.string()
      .required('Informe uma senha')
      .min(8, 'A senha deve ter no mínimo 8 caracteres')
  })

  async function handleSignIn(values: AuthRequest) {
    try {
      const result = await loginMutation.mutateAsync(values)

      if (result.code === 200) {
        saveUser(result.data)

        navigate('/app/dashboard')
      }
    } catch (error) {
      toast.error('Os dados fornecidos são inválidos.')
    }
  }

  return (
    <Row
      className="login-box card card-outline card-primary p-2 pt-4 pb-4 mx-auto"
      style={{
        maxWidth: `360px`,
        border: `1px #192179`
      }}
    >
      <div className="text-center">
        <img src={LogoImg} alt="Logo MWMW" style={{ width: '60%' }} />
      </div>

      <Stack className="card-body">
        {/* <div>
          <p className="h4 mb-1">
            <b>
              <FormattedMessage id="auth.login.form.title" />
            </b>
          </p>
          <p className="mb-4">
            <FormattedMessage id="auth.login.form.subtitle" />
          </p>
        </div> */}

        <Formik
          initialValues={initialValues}
          onSubmit={handleSignIn}
          validationSchema={AuthSchema}
        >
          {({ values, errors, touched, handleChange, submitForm }) => (
            <FormikForm>
              <Stack gap={2} as="fieldset">
                <Text
                  name="email"
                  label="E-mail"
                  placeholder="Email"
                  onHandleInput={handleChange}
                  error={errors.email && touched.email ? errors.email : null}
                />

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput2"
                >
                  <label className="mb-1" htmlFor="password">
                    Senha
                  </label>
                  <InputGroup>
                    <Form.Control
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      placeholder={intl.formatMessage({
                        id: 'common.form.input.password'
                      })}
                      type={showPassword ? 'text' : 'password'}
                    />
                    <Button
                      variant="outline-secondary"
                      id="button-addon2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <FontAwesomeIcon
                        icon={
                          showPassword
                            ? (faEyeSlash as IconProp)
                            : (faEye as IconProp)
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
              </Stack>
              <p className="d-grid">
                <Button
                  variant="primary"
                  style={{ background: `#049544` }}
                  onClick={submitForm}
                  isLoading={loginMutation.isLoading}
                >
                  <FormattedMessage id="auth.login.form.button" />
                </Button>
              </p>
            </FormikForm>
          )}
        </Formik>
      </Stack>
    </Row>
  )
}
