import { ChangeEvent, InputHTMLAttributes } from 'react'
import { InputGroup } from 'react-bootstrap'

interface TextGroupProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'capture'> {
  grid?: string
  label?: string
  name: string
  type?: string
  error?: string | null
  validation?: Error[]
  onHandleInput?: (e: ChangeEvent<HTMLInputElement>) => void
}

export function TextGroup({
  grid,
  label,
  name,
  value,
  onHandleInput,
  type = 'text',
  validation,
  error,
  ...rest
}: TextGroupProps) {
  return (
    <div className={`mb-2 form-group ${grid}`}>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">{label}</InputGroup.Text>

        <input
          {...rest}
          name={name}
          value={value}
          type={type}
          onChange={onHandleInput}
          aria-describedby="basic-addon1"
          className={`form-control ${{ ...rest }.className}`}
        />

        <p className="text-danger my-1">{error}</p>
      </InputGroup>
    </div>
  )
}
