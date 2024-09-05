import React from 'react'
import {
  Button as BsButton,
  ButtonProps as BsButtonProps,
  Spinner
} from 'react-bootstrap'

import './styles.scss'

interface ButtonProps extends BsButtonProps {
  children: React.ReactNode | string
  isLoading?: boolean
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  children,
  isLoading = false,
  disabled = false,
  ...rest
}) => {
  let spinnerTemplate

  if (isLoading) {
    spinnerTemplate = (
      <Spinner
        className="me-2"
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      />
    )
  }

  return (
    <BsButton {...rest} disabled={isLoading || disabled}>
      {isLoading ? spinnerTemplate : null}
      {children}
    </BsButton>
  )
}
