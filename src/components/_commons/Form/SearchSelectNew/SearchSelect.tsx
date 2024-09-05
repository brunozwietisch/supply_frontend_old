import folderIcon from '@/assets/img/folder_icon.jpg'
import { Loader } from '@/components/_commons/Loader'
import { DialogBox } from '@/components/_commons/Modal'
import debounce from 'lodash.debounce'
import React, { useEffect, useState } from 'react'
import { Button, Card, Form, Image, InputGroup } from 'react-bootstrap'

export interface SearchOption {
  value: number
  name: string
}

export interface SearchSelectProps<T = any> {
  name: string
  label?: string
  placeholder?: string
  loading?: boolean
  disabled?: boolean
  defaultValue?: SearchOption
  options?: Array<SearchOption>
  selectedOptions?: Array<any>
  isInputSearch?: boolean
  grid?: string
  params?: T
  error?: string
  onSearch?: (value: string) => void
  onSelect?: (value: any) => void
  onChange: (value: any) => void
  onClear?: () => void
}

export const SearchSelect = ({
  label,
  name,
  disabled,
  defaultValue,
  placeholder = 'Selecione uma opção',
  loading = false,
  options = [],
  grid = 'col-md-3',
  error = '',
  isInputSearch = true,
  onSearch,
  onChange,
  onClear
}: SearchSelectProps<any>) => {
  const [selected, setSelected] = useState<SearchOption>()

  const [showModal, setShowModal] = useState<boolean>(false)

  const toggleSearchModal = () => {
    onSearch && onSearch('')
    setShowModal(!showModal)
  }

  const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch && onSearch(e.target.value)
  }, 500)

  const handleSelect = (option: SearchOption) => {
    setSelected(option)
    toggleSearchModal()
    onChange && onChange(option)
  }

  const handleClear = () => {
    setSelected(undefined)
    onChange && onChange(undefined)
    onClear && onClear()
  }

  useEffect(() => {
    let currentValue

    if (defaultValue) {
      currentValue = defaultValue
    }

    setSelected(currentValue)
  }, [defaultValue])

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
        {selected ? (
          <Button
            disabled={disabled}
            variant="danger"
            onClick={() => {
              handleClear()
            }}
          >
            <i className="fa fa-times"></i>
          </Button>
        ) : (
          <Button
            disabled={disabled}
            variant="primary"
            onClick={() => toggleSearchModal()}
          >
            <i className="fa fa-search"></i>
          </Button>
        )}
      </InputGroup>

      <p className="text-danger my-1">
        {/* @ts-ignore */}
        {error || null}
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
        floatingBaseboard={false}
      >
        {isInputSearch && (
          <Form.Control
            placeholder="Digite os termos da pesquisa"
            className="form-control mb-3"
            onInput={handleSearch}
          />
        )}
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
                        onClick={() => {
                          handleSelect(option)
                        }}
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
