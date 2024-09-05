import { ChangeEvent, useEffect, useState, InputHTMLAttributes } from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap'

import { ApiNamespacesType } from '@/core/domain/_commons/Common.types'
import type { AttachmentResponse } from '@/core/domain/Attachment/Attachment.types'

import NotFoundImage from '@/assets/img/not_found.png'

interface SearchImageProps {
  attachmentableId?: number | string
  options?: {
    filePath: string
    attachmentable_type: ApiNamespacesType
  }
  disabled?: boolean
  // @deprecated
  multiple?: boolean
  defaultAttachments?: AttachmentResponse[]
  acceptFileTypes?: string
  onUpdate?: () => void
}

export const SearchImage = ({
  defaultAttachments,
  acceptFileTypes,
  disabled
}: SearchImageProps) => {
  const [defaults, setDefaults] = useState<AttachmentResponse[]>()

  useEffect(() => {
    if (defaultAttachments && defaultAttachments.length > 0) {
      setDefaults(defaultAttachments)
    }

    return () => setDefaults(undefined)
  }, [defaultAttachments])

  return (
    <Container fluid>
      <Row className="justify-content-center">
        {defaults && defaults.length > 0 ? (
          <Col
            sm="12"
            md="4"
            lg="3"
            style={{
              width: 'auto',
              height: '100%',
              maxWidth: '100%',
              maxHeight: 1000
            }}
            className="mb-3 px-0"
          >
            <ImagePreview attachment={defaults} disabled={disabled} />
          </Col>
        ) : (
          <Col
            sm="12"
            md="4"
            lg="3"
            style={{ width: '100%', height: 400, maxHeight: 400 }}
            className="mb-3 px-0"
          >
            <ViewBox disabled={disabled} acceptFileTypes={acceptFileTypes} />
          </Col>
        )}
      </Row>
    </Container>
  )
}

const ImagePreview = ({
  attachment
}: {
  loading?: boolean
  attachment?: AttachmentResponse[]
  disabled?: boolean
  onRemove?: (id: number) => void
}) => {
  return (
    <div
      className="border h-100 w-100 d-flex justify-content-center align-items-center position-relative"
      style={{ overflow: 'hidden' }}
    >
      <Image
        src={attachment && attachment[0] ? `${attachment[0].file}` : ''}
        alt={
          attachment && attachment.length > 0 ? attachment[0].original_name : ''
        }
        fluid
      />
    </div>
  )
}

const ViewBox = ({
  isLoading = false,
  acceptFileTypes,
  disabled,
  onChange
}: {
  isLoading?: boolean
  acceptFileTypes: string | undefined
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
}) => {
  return (
    <div className="border h-100 w-100 d-flex justify-content-center align-items-center">
      <label
        htmlFor="attachment"
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
          <div>
            <i className="fa fa-times fs-2" />
            <br />
            <p className="mb-0 mt-2">Nenhnum anexo carregado</p>
          </div>
        )}
      </label>

      {!isLoading && (
        <input
          disabled={disabled}
          id="attachment"
          type="file"
          hidden
          accept={acceptFileTypes}
          onChange={onChange}
        />
      )}
    </div>
  )
}

interface ImageProps extends InputHTMLAttributes<HTMLInputElement> {
  fallbackImage?: string
  grid?: string
  src?: string
  fluid?: boolean
}

export const Image = ({
  fallbackImage,
  grid,
  src,
  fluid = true,
  ...rest
}: ImageProps) => {
  return (
    <div className={'mb-2 form-group ' + grid}>
      <img
        style={{ objectFit: 'cover', aspectRatio: 'auto', cursor: 'pointer' }}
        onClick={() =>
          window.open(`${process.env.REACT_APP_API_STORAGE_URL}/${src}`)
        }
        src={
          src
            ? `${process.env.REACT_APP_API_STORAGE_URL}/${src}`
            : NotFoundImage
        }
        alt={src ? { ...rest }.alt : 'Imagem não encontrada'}
        className={`img-fluid  ${fluid ?? 'img-fluid'} ${src}`}
      />
    </div>
  )
}
