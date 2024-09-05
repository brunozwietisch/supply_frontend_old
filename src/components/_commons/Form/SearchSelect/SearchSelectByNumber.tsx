import React, { useEffect, useState } from 'react'
import { Button, Form, InputGroup, Image, Card } from 'react-bootstrap'
import { useFormikContext } from 'formik'
import debounce from 'lodash.debounce'
import { DialogBox } from '@/components/_commons/Modal'
import { Loader } from '@/components/_commons/Loader'
import folderIcon from '@/assets/img/folder_icon.jpg'

export interface SearchOptionByNumber {
  value: any
  label?: string | number | null
  name?: string | number | null
}

export interface SearchSelectByNumberProps {
  name: string
  label?: string
  placeholder?: string
  loading?: boolean
  defaultValue?: SearchOptionByNumber
  options?: Array<SearchOptionByNumber>
  grid?: string
  imputType?: string
  onSearch?: (value: any) => void
  onChange?: (value: any) => void
}

export const SearchSelectByNumber = ({
  label,
  name,
  defaultValue,
  placeholder = 'Selecione uma opção',
  loading = false,
  options = [],
  grid = 'col-md-3',
  imputType = 'text',
  error = '',
  onSearch,
  onChange
}: SearchSelectByNumberProps & { error?: string }) => {
  const [selected, setSelected] = useState<SearchOptionByNumber>()

  const [showModal, setShowModal] = useState<boolean>(false)

  const { values, errors, setFieldValue } = useFormikContext()

  const toggleSearchModal = () => {
    onSearch && onSearch(0)
    setShowModal(!showModal)
  }

  const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch && onSearch(e.target.value)
  }, 500)

  const handleSelect = (option: SearchOptionByNumber) => {
    setSelected(option)
    setFieldValue(name, option.value)
    if (onChange) onChange(option)
    toggleSearchModal()
  }

  const handleClear = () => {
    setSelected(undefined)
    setFieldValue(name, null)
    if (onChange) onChange(undefined)
  }

  useEffect(() => {
    // @ts-ignore
    const hasValue = values[name] !== null && values[name] !== undefined

    if (hasValue) {
      setSelected(defaultValue)
    }
  }, [defaultValue])

  useEffect(() => {
    // @ts-ignore
    if (values[name] === null || values[name] === undefined) {
      setSelected(undefined)
    }
  }, [values])

  return (
    <div className={`form-group mb-2 pb-1 ${grid}`}>
      <label
        htmlFor={name}
        className="form-label"
        title={label}
        style={{
          width: '100%',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}
      >
        {label}
      </label>
      <InputGroup>
        <Form.Control
          placeholder={selected ? String(selected.value) : placeholder}
          aria-label={label}
          disabled
        />
        {selected ? (
          <Button variant="danger" onClick={() => handleClear()}>
            <i className="fa fa-times"></i>
          </Button>
        ) : (
          <Button variant="primary" onClick={() => toggleSearchModal()}>
            <i className="fa fa-search"></i>
          </Button>
        )}
      </InputGroup>

      <p className="text-danger my-1">
        {/* @ts-ignore */}
        {errors[name] || error || null}
      </p>

      <DialogBox
        size="md"
        show={showModal}
        titleHeader={placeholder}
        titleButtonAction="Cancelar"
        centered
        loadButtonAction={loading}
        onHandleAction={toggleSearchModal}
        onHandleClose={toggleSearchModal}
      >
        <Form.Control
          placeholder="Digite os termos da pesquisa"
          className="form-control mb-3"
          onInput={handleSearch}
          type={imputType}
        />
        <div
          style={{
            maxHeight: 250,
            overflowY: 'auto',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column'
          }}
        >
          <Loader loading={loading}>
            {options.length === 0 ? (
              <div className="text-center" style={{ maxWidth: '340px' }}>
                <Image
                  style={{
                    width: '100px',
                    height: '100px'
                  }}
                  src={folderIcon}
                />
                <h5 className="mt-2 mb-0">Nenhum Resultado Encontrado</h5>
                <p>
                  <small>
                    Tente mudar sua busca ou ajustar seus filtros para encontrar
                    o que precisa.
                  </small>
                </p>
              </div>
            ) : (
              <>
                {options.map((option, i) => (
                  <Card key={i} className="mb-1 w-100">
                    <Card.Body className="p-2 d-flex justify-content-between align-items-center">
                      {option.value}
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleSelect(option)}
                      >
                        Selecionar
                      </Button>
                    </Card.Body>
                  </Card>
                ))}
              </>
            )}
          </Loader>
        </div>
      </DialogBox>
    </div>
  )
}
