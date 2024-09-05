import React, { InputHTMLAttributes } from 'react'
import { FormGroup, InputGroup } from 'react-bootstrap'

type Error = {
  name: string
  message: string
}

export interface Option {
  value: string | number
  name: string
  selected?: boolean
  disabled?: boolean
}

export interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  name: string
  label?: string
  grid?: string
  onHandleSelect?: React.ChangeEventHandler<HTMLSelectElement>
  info?: string
  error?: string | null
  validation?: Array<Error>
  options: Array<Option>
}

export function ComboBoxGroup({
  grid,
  label,
  name,
  onHandleSelect,
  info = '',
  validation,
  options,
  error,
  ...rest
}: SelectProps) {
  return (
    <FormGroup className={`mb-3 ${grid}`}>
      <InputGroup>
        <InputGroup.Text>{label}</InputGroup.Text>

        <select
          className="form-select"
          onChange={onHandleSelect}
          name={name}
          {...rest}
        >
          <option value="">Selecione uma Opção..</option>

          {options.map(({ value, name, disabled }: Option, key) => {
            return (
              <option key={key} value={value} disabled={disabled}>
                {name}
              </option>
            )
          })}
        </select>
      </InputGroup>
      <p className="text-danger my-1">{error}</p>
    </FormGroup>
  )
}
