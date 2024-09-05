import InputMask from 'react-input-mask'
import React, { ChangeEvent, InputHTMLAttributes } from 'react'
import { Tooltip as ReactTooltip } from 'react-tooltip'

type Error = {
  name: string
  message: string
}

interface TextProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'capture'> {
  label?: string
  name: string
  grid?: string
  info?: string
  masked?: string
  type?: string
  lock?: boolean
  error?: string | null
  validation?: Error[]
  max?: any
  min?: any
  ref?: any
  extraStyling?: React.CSSProperties
  onHandleInput?: (e: ChangeEvent<HTMLInputElement>) => void
}

export function Text({
  grid,
  label,
  name,
  value,
  onHandleInput,
  masked = '',
  info = '',
  type = 'text',
  lock,
  validation,
  error,
  max,
  min,
  extraStyling = undefined,
  ref,
  ...rest
}: TextProps) {
  const styleLabel: React.CSSProperties = {
    width: '100%',
    whiteSpace: 'nowrap' as 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis' as 'ellipsis',
    ...extraStyling
  }

  const Input = (
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

      <input
        {...rest}
        name={name}
        value={value}
        type={type}
        onChange={onHandleInput}
        className={`form-control ${{ ...rest }.className}`}
        max={max}
        min={min}
        autoComplete={'off'}
      />
      <p className="text-danger my-1">{error}</p>
    </div>
  )

  const Inputmask = (
    <div className={'form-group ' + grid}>
      <ReactTooltip id="id-info" />

      {label && (
        <label htmlFor={name} className="form-label">
          {info && (
            <a
              id="id-info"
              data-tooltip-content={info}
              data-tooltip-variant="info"
            >
              <i className="fa fa-info-circle me-2 text-primary"></i>
            </a>
          )}
          {label}
        </label>
      )}

      <InputMask
        {...rest}
        mask={masked}
        name={name}
        value={value}
        onChange={onHandleInput}
        type="text"
        className={`form-control ${{ ...rest }.className}`}
      />
    </div>
  )
  return masked === '' ? Input : Inputmask
}
