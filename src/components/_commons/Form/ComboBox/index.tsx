import React, { InputHTMLAttributes } from 'react'
import { Tooltip as ReactTooltip } from 'react-tooltip'

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
  noDefaultOption?: boolean
  extraStyling?: React.CSSProperties
}

export function ComboBox({
  grid,
  label,
  name,
  onHandleSelect,
  info = '',
  validation,
  options,
  error,
  noDefaultOption = true,
  extraStyling = undefined,
  ...rest
}: SelectProps) {
  const styleLabel: React.CSSProperties = {
    width: '100%',
    whiteSpace: 'nowrap' as 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis' as 'ellipsis',
    ...extraStyling
  }

  const Select = (
    <div className={'mb-2 form-group ' + grid}>
      <ReactTooltip
        anchorId={`id-info-` + name}
        className="react-tooltip-display"
      />

      {label && (
        <label
          htmlFor={name}
          className="form-label"
          title={label}
          style={styleLabel}
        >
          {info && (
            <a
              id={`id-info-` + name}
              data-tooltip-content={info}
              data-tooltip-variant="info"
              className="me-2"
            >
              <i className="fa fa-info-circle text-primary"></i>
            </a>
          )}
          {label}
        </label>
      )}
      <select
        className={'form-select'}
        onChange={onHandleSelect}
        name={name}
        {...rest}
      >
        <option value="">{noDefaultOption && `Selecione uma Opção..`}</option>

        {options.map(({ value, name, disabled }: Option, key) => {
          return (
            <option key={key} value={value} disabled={disabled}>
              {name}
            </option>
          )
        })}
      </select>

      <p className="text-danger my-1">{error}</p>
    </div>
  )

  return Select
}
