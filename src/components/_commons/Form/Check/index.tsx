import React, { InputHTMLAttributes } from 'react'

interface CheckProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  grid?: string
  label: string
  isChecked: boolean
  flexCenter?: boolean
  error?: string | null
  onHandleCheck?: React.FormEventHandler
}

export const Check = ({
  grid,
  name,
  flexCenter,
  error,
  label,
  isChecked,
  onHandleCheck,
  ...rest
}: CheckProps) => {
  let alignItem = ''
  if (flexCenter) {
    alignItem = ' d-flex align-items-center mt-4 pt-2'
  }

  return (
    <div className={grid + alignItem}>
      <div className="form-check p-0 pb-2 pt-2">
        <div className="form-switch">
          <br />
          <input
            {...rest}
            className="form-check-input"
            type="checkbox"
            id={name}
            name={name}
            onChange={onHandleCheck}
            checked={isChecked ?? false}
          />
          <label
            className="form-check-label"
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
        </div>

        <p className="text-danger my-1">{error}</p>
      </div>
    </div>
  )
}
