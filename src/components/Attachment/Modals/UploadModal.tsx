import { toast } from 'react-toastify'
import { ChangeEvent, useState } from 'react'
import { Row, Col, Modal, Badge } from 'react-bootstrap'

import { Button } from '@/components/_commons/Form/Button'
import { Import } from '@/core/domain/Import'

type FileTypes = 'png' | 'jpg' | 'jpeg' | 'xlsx' | 'xls' | 'csv'

interface UploadModalProps {
  show: boolean
  titleHeader: string
  titleButtonAction?: string
  titleButtonClose?: string
  onHandleClose?: () => void
  onHandleAction?: (obj?: any) => void
  onUpdate?: () => void

  acceptFileTypes: FileTypes[]
  multipleFiles?: boolean
}

export const UploadModal = ({
  titleHeader,
  titleButtonAction,
  titleButtonClose,
  show,
  onUpdate,
  onHandleClose,
  onHandleAction,
  acceptFileTypes,
  multipleFiles = true
}: UploadModalProps) => {
  const [isDragging, setIsDragging] = useState(false)
  const [fileList, setFileList] = useState<FileList>({} as FileList)

  const importMutation = Import.useImport()

  const formattedFileTypes = acceptFileTypes
    .map((type: FileTypes) => {
      if (type === 'xlsx') {
        return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      }

      if (type === 'xls') return 'application/vnd.ms-excel'

      return `.${type}`
    })
    .join(', ')

  // TODO: Refatorar componente e torná-lo genérico para customizar o OnHandleFileDrop
  const handleFileDrop = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target

    if (!files) return

    if (files.length > 1) {
      let blockUpload = false

      Object.entries(files).forEach(([_, file]) => {
        if (!formattedFileTypes.includes(file.type)) {
          blockUpload = true
        }
      })

      if (blockUpload) {
        toast.error('Um ou mais arquivo(s) não tem o tipo permitido.')
        return
      }
    }

    if (files[0]) {
      if (!formattedFileTypes.includes(files[0].type)) {
        toast.error('Este tipo de arquivo não é permitido.')
        return
      }
    }

    setFileList(files)

    fileList &&
      Object.entries(fileList).forEach((_, index) => {
        if (Object.keys(fileList).length === index + 1) {
          let obj: FileList = {} as FileList

          Object.entries(files).forEach(([key, file], i) => {
            obj = {
              ...obj,
              [index + i + 1]: file
            }
          })

          setFileList({ ...fileList, ...obj })
        }
      })

    const filesArr = Object.entries(files).map(([, file]) => file)

    for (const file of filesArr) {
      const result = await importMutation.mutateAsync({
        import: 'qualitymanagement',
        file: file as File
      })

      if (result.code !== 200) {
        toast.error('Ocorreu um erro ao carregar o anexo.')
      }
    }

    onUpdate && onUpdate()
  }

  const handleClose = () => {
    setFileList({} as FileList)

    onHandleClose && onHandleClose()
  }

  const handleAction = () => {
    setFileList({} as FileList)

    onHandleAction && onHandleAction && onHandleAction()
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <b>{titleHeader}</b>
      </Modal.Header>

      <Modal.Body className="show-grid">
        <Row>
          <Col
            sm="12"
            md="4"
            lg="3"
            style={{ width: '100%', height: 250, maxHeight: 250 }}
            className="mb-0"
          >
            <label
              draggable
              onDragEnter={() => setIsDragging(true)}
              onDragLeave={() => setIsDragging(false)}
              onDrop={() => setIsDragging(false)}
              htmlFor="attachment"
              className={`rounded text-center cursor-pointer text-secondary w-100 h-100 d-flex justify-content-center align-items-center position-relative ${
                isDragging ? 'opacity-100' : 'opacity-100'
              }`}
              style={{
                cursor: 'pointer',
                flexDirection: 'column',
                border: '2px dashed black'
              }}
            >
              <div>
                <i className="fa fa-upload fs-2" />
                <br />
                <p className="mb-0 mt-3">
                  {isDragging ? (
                    <>
                      Solte seus arquivos <b>aqui</b>.
                    </>
                  ) : (
                    <>
                      <b>Arraste e solte</b> seu arquivo <br /> ou
                      <b> clique</b> para pesquisar.
                    </>
                  )}
                </p>
              </div>

              <input
                id="attachment"
                type="file"
                onChange={handleFileDrop}
                style={{
                  cursor: 'pointer',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: 'inherit',
                  height: 'inherit',
                  zIndex: 999,
                  opacity: 0
                }}
                accept={formattedFileTypes}
                multiple={multipleFiles}
              />
            </label>
          </Col>
        </Row>
        <Row>
          <Col sm="12" md="12" lg="12">
            {Object.entries(fileList).map(([key, file]) => {
              return (
                <div
                  key={key}
                  className="d-flex align-items-center justify-content-between mt-2 p-1 "
                >
                  <div className="d-flex align-items-center">
                    <div className="p-2 me-2">
                      <i className="fa fa-file text-secondary"></i>
                    </div>
                    <p className="mb-0">{file.name}</p>
                  </div>
                  <h5>
                    {importMutation.isSuccess && (
                      <Badge bg="success">Concluido</Badge>
                    )}

                    {importMutation.isLoading && (
                      <Badge bg="warning">Carregando..</Badge>
                    )}

                    {importMutation.isError && <Badge bg="danger">Falha</Badge>}
                  </h5>
                </div>
              )
            })}
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer>
        {titleButtonClose && (
          <Button variant="secondary" onClick={handleClose}>
            {titleButtonClose}
          </Button>
        )}

        {titleButtonAction && (
          <Button variant="secondary" onClick={handleAction}>
            {titleButtonAction}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  )
}
