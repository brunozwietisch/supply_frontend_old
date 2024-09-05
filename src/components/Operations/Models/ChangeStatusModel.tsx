import { DialogBox, DialogBoxProps } from '@/components/_commons/Modal'
import {
  OperationRequest,
  OperationResponse
} from '@/core/domain/Operation/Operation.types'
import { useEffect, useState } from 'react'
import { TextArea } from '@/components/_commons/Form/TextArea'
import { Form, Formik, FormikHelpers } from 'formik'

export const ChangeStatusModel = ({
  operation,
  onHandleAction,
  onHandleClose,
  ...rest
}: DialogBoxProps & { operation?: OperationResponse }) => {
  // const { getPermissions, collaborator } = useAuth()
  const [message, setMessage] = useState<any>()

  const initialValues: any = {
    description: ''
  }

  useEffect(() => {
    if (operation) {
      if (operation.status) {
        if (operation.status.status_id === 'awaiting_validation') {
          setMessage(`Você está validando a comanda ${operation.id}`)
        }

        if (operation.status.status_id === 'waiting_for_approval') {
          setMessage(`Você está aprovando a comanda ${operation.id}`)
        }
      }
    }
  }, [operation])

  const handleSubmit = (values: any, { resetForm }: FormikHelpers<any>) => {
    const obj: OperationRequest = {
      operation_id: operation?.id,
      status_id: operation?.status?.status_id,
      ...values
    }

    onHandleAction && onHandleAction(obj)
    resetForm()
    onHandleClose && onHandleClose()
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {({
        values,
        errors,
        handleChange,
        resetForm,
        isSubmitting,
        submitForm: submitFormStatus
      }) => {
        return (
          <DialogBox
            size="md"
            footerButtonLeft={{
              label: `Confirmar`,
              variant: 'success',
              onClick: submitFormStatus
            }}
            onHandleClose={() => {
              onHandleClose && onHandleClose()
              resetForm()
            }}
            titleHeader={message ?? ''}
            centered
            titleButtonCancel={'Fechar'}
            dialogClassName={'mb-6'}
            {...rest}
          >
            <Form>
              <TextArea
                label="Descrição"
                name="description"
                onHandleTextArea={handleChange}
                value={values.description}
                grid="col-md-12"
                rows={5}
              />
            </Form>
          </DialogBox>
        )
      }}
    </Formik>
  )
}
