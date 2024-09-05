import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { InputHTMLAttributes } from 'react'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  grid?: string
  name: string
  label: string
  onHandleTextArea?: React.FormEventHandler
  info?: string
  infoVisible?: string
  error?: string | null
  rows?: number
}

export const TextArea = ({
  grid,
  name,
  label,
  onHandleTextArea,
  info = '',
  infoVisible = '',
  error,
  rows = 0,
  ...rest
}: TextAreaProps) => {
  return (
    <div className={grid + ' form-group mb-2'}>
      <ReactTooltip
        anchorId={`id-info-` + name}
        className="react-tooltip-display"
      />

      {label && (
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

      {infoVisible && (
        <p className="">
          <FontAwesomeIcon
            icon={faInfoCircle as IconProp}
            color="blue"
            data-for="info"
            className="me-2"
          />
          {infoVisible}
        </p>
      )}

      <textarea
        onChange={onHandleTextArea}
        name={name}
        id={name}
        className="form-control"
        rows={rows}
        {...rest}
      />
      <p className="text-danger my-1">{error}</p>
    </div>
  )
}
