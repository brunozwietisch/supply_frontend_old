import React, { useEffect, useState } from 'react'
import { Button, Form, InputGroup, Image, Card } from 'react-bootstrap'
import { useFormikContext } from 'formik'
import debounce from 'lodash.debounce'

import { DialogBox } from '@/components/_commons/Modal'
import { Loader } from '@/components/_commons/Loader'
import folderIcon from '@/assets/img/folder_icon.jpg'

export interface SearchOption {
  value: number
  name: string
}

export interface SearchSelectTagProps {
  name: string
  label?: string
  placeholder?: string
  loading?: boolean
  disabled?: boolean
  defaultValue?: SearchOption
  options?: Array<SearchOption>
  grid?: string
  onSearch?: (value: string) => void
  onChange?: (value: any) => void
}

export const SearchSelectTag = ({
  label,
  name,
  disabled,
  defaultValue,
  placeholder = 'Selecione uma opção',
  loading = false,
  options = [],
  grid = 'col-md-3',
  onSearch,
  onChange
}: SearchSelectTagProps) => {
  const [selected, setSelected] = useState<SearchOption>()
  const [showModal, setShowModal] = useState<boolean>(false)
  const { values, errors, touched, setFieldValue } = useFormikContext()

  const toggleSearchModal = () => {
    onSearch && onSearch('')
    setShowModal(!showModal)
  }

  const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch && onSearch(e.target.value)
  }, 500)

  const handleSelect = (option: SearchOption) => {
    setSelected(option)
    setFieldValue(name, option.value)
    if (onChange) onChange(option)
    toggleSearchModal()
    setSelected(undefined)
    setFieldValue(name, null)
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
          placeholder={selected ? selected.name : placeholder}
          aria-label={label}
          disabled
        />
        <Button
          variant="primary"
          disabled={disabled || false}
          onClick={() => toggleSearchModal()}
        >
          <i className="fa fa-search"></i>
        </Button>
      </InputGroup>

      <p className="text-danger my-1">
        {/* @ts-ignore */}
        {errors[name] && touched[name] ? errors[name] : null}
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
                      {option.name}
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
