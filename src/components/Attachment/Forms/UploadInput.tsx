import { ChangeEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap'
import { Image } from '@/components/_commons/Image'
import { Attachment } from '@/core/domain/Attachment'
import { ApiNamespacesType } from '@/core/domain/_commons/Common.types'
import type { AttachmentResponse } from '@/core/domain/Attachment/Attachment.types'
import { DialogBox, DialogBoxProps } from '@/components/_commons/Modal'

interface FormUploadProps {
  attachmentableId?: number | string
  options?: {
    filePath: string
    attachmentable_type: ApiNamespacesType
  }
  // @deprecated
  multiple?: boolean
  defaultAttachments?: AttachmentResponse[]
  acceptFileTypes?: string
  acceptFiles?: string
  openOnClick?: boolean
  onUpdate?: () => void
  isDisabled?: boolean
  isDisabledRemove?: boolean
  maxHeight?: string
  height?: string
  keyUploadFile: string | number
}

/* const acceptableFileTypes = [
  'image/png',
  'image/jpg',
  'image/jpeg',
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
] */

const prohibitedMimeTypes = [
  'application/x-msdownload', // para .exe e .bat
  'application/javascript', // para .js
  'text/vbscript', // para .vbs
  'application/vnd.ms-word.document.macroEnabled.12', // para .docm
  'application/vnd.ms-excel.sheet.macroEnabled.12', // para .xlsm
  'application/vnd.ms-powerpoint.presentation.macroEnabled.12' // para .pptm
]

export const UploadInput = ({
  attachmentableId,
  defaultAttachments,
  acceptFileTypes,
  options,
  openOnClick,
  onUpdate,
  isDisabled = false,
  multiple = false,
  isDisabledRemove = false,
  acceptFiles,
  maxHeight = '400px',
  height = '400px',
  keyUploadFile
}: FormUploadProps) => {
  const [defaults, setDefaults] = useState<AttachmentResponse[]>()

  const uploadMutation = Attachment.useUploadAttachment()

  const removeMutation = Attachment.useRemoveAttachment()

  const UploadMultiple = multiple

  const FilesAccept = acceptFiles

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    if (files && files[0]) {
      if (prohibitedMimeTypes.includes(files[0].type)) {
        toast.warning('Este tipo de arquivo não é permitido.')
        return
      }

      if (attachmentableId === undefined) {
        toast.warning('Você não possui nenhuma entidade associada.')
        return
      }

      const result = await uploadMutation.mutateAsync({
        attachment: files[0] as File,
        attachmentable_id: attachmentableId,
        ...options
      })

      if (result.code !== 200) {
        toast.error('Ocorreu um erro ao carregar o anexo.')
        return
      }

      setDefaults(result.data?.attachment)
      onUpdate && onUpdate()
    }
  }

  const handleRemoveAttachment = async (attachmentId: number) => {
    const result = await removeMutation.mutateAsync(attachmentId)

    if (result.code !== 200) {
      toast.error('Ocorreu um erro ao remover o anexo.')
      return
    }

    setDefaults([])
    onUpdate && onUpdate()
  }

  useEffect(() => {
    if (defaultAttachments && defaultAttachments.length > 0) {
      setDefaults(defaultAttachments)
    }

    return () => setDefaults(undefined)
  }, [defaultAttachments])

  return (
    <Container fluid>
      <Row>
        {defaults && defaults.length > 0 ? (
          <Col
            sm="12"
            md="4"
            lg="3"
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: maxHeight,
              objectFit: 'cover'
            }}
            className="mb-3 px-0"
          >
            <ImagePreview
              openOnClick={openOnClick}
              loading={removeMutation.isLoading || isDisabledRemove}
              attachment={defaults}
              onRemove={handleRemoveAttachment}
            />
          </Col>
        ) : (
          <Col
            sm="12"
            md="4"
            lg="3"
            style={{ width: '100%', height: height, maxHeight: maxHeight }}
            className="mb-3 px-0"
          >
            <UploadBox
              keyUploadFile={keyUploadFile}
              isDisabled={isDisabled}
              isLoading={uploadMutation.isLoading}
              acceptFileTypes={acceptFileTypes}
              onChange={handleFileChange}
              UploadMultiple={UploadMultiple}
              AcceptFiles={FilesAccept}
            />
          </Col>
        )}
      </Row>
    </Container>
  )
}

const ImagePreview = ({
  loading,
  attachment,
  openOnClick,
  onRemove
}: {
  loading: boolean
  attachment?: AttachmentResponse[]
  openOnClick?: boolean
  onRemove: (id: number) => void
}) => {
  const fileType = (string: string) => {
    return string.split('.').pop()
  }

  const [showRemoveModal, setShowRemoveModal] = useState<boolean>(false)

  return (
    <div
      className="border h-100 w-100 d-flex justify-content-center align-items-center position-relative"
      style={{ overflow: 'hidden' }}
    >
      <Button
        variant="danger"
        size="sm"
        className="position-absolute"
        disabled={loading}
        style={{ top: 0, right: 0 }}
        onClick={() => setShowRemoveModal(true)}
      >
        <i className="fa fa-trash"></i>
      </Button>
      <Image
        src={attachment && attachment[0] ? `${attachment[0].file}` : ''}
        fileType={
          attachment && attachment[0]
            ? `${fileType(attachment[0].original_name)}`
            : ''
        }
        alt={
          attachment && attachment.length > 0 ? attachment[0].original_name : ''
        }
        openOnClick={openOnClick}
        fluid
      />

      <AttachmentRemoveModal
        show={showRemoveModal}
        titleHeader="Remover anexo"
        loadButtonAction={false}
        titleButtonAction="Remover anexo"
        onHandleAction={() => {
          attachment && onRemove(attachment[0].id)
          setShowRemoveModal(false)
        }}
        onHandleClose={() => setShowRemoveModal(false)}
      />
    </div>
  )
}

const AttachmentRemoveModal = ({ ...rest }: DialogBoxProps) => {
  return (
    <DialogBox centered {...rest}>
      Deseja realmente excluir o anexo?
    </DialogBox>
  )
}

const UploadBox = ({
  isDisabled = false,
  isLoading = false,
  acceptFileTypes,
  UploadMultiple = false,
  AcceptFiles,
  keyUploadFile,
  onChange
}: {
  isDisabled: boolean
  isLoading: boolean
  UploadMultiple: boolean
  acceptFileTypes: string | undefined
  AcceptFiles?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  keyUploadFile: number | string
}) => {
  const FilesAccept = AcceptFiles

  return (
    <div
      className={
        isDisabled
          ? 'border h-100 w-100 d-flex justify-content-center align-items-center bg-secondary bg-opacity-10'
          : 'border h-100 w-100 d-flex justify-content-center align-items-center'
      }
    >
      <label
        htmlFor={`attachment-${keyUploadFile}`}
        className="text-center cursor-pointer text-secondary w-100 h-100 d-flex justify-content-center align-items-center"
        style={{
          cursor: 'pointer',
          flexDirection: 'column'
        }}
      >
        {isLoading ? (
          <div>
            <Spinner variant="secondary" animation="border" />
            <br />
            <p className="mt-1 mb-0">Carregando arquivo...</p>
          </div>
        ) : (
          <Row>
            <Col md={'12'}>
              <div>
                <i className="fas fa-file-upload fa-2x"></i>
              </div>
              <div className="mt-2">
                <strong>Clique aqui para selecionar um arquivo</strong>
              </div>
            </Col>
            {FilesAccept !== 'acceptAllFiles' ? (
              <Col md={'12'}>
                <div className="mt-2">
                  {acceptFileTypes && (
                    <span>Tipo aceito: {acceptFileTypes}</span>
                  )}
                </div>
              </Col>
            ) : (
              ''
            )}
          </Row>
        )}
      </label>

      {!isLoading &&
        (FilesAccept !== 'acceptAllFiles' ? (
          <input
            id={`attachment-${keyUploadFile}`}
            type="file"
            hidden
            disabled={isDisabled}
            onChange={onChange}
            multiple={UploadMultiple}
          />
        ) : (
          <input
            id={`attachment-${keyUploadFile}`}
            type="file"
            hidden
            disabled={isDisabled}
            accept={acceptFileTypes}
            onChange={onChange}
            multiple={UploadMultiple}
          />
        ))}
    </div>
  )
}
