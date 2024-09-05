import { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'card' | 'box'
  children: ReactNode
}

export const CardBody = ({
  variant = 'card',
  children,
  ...rest
}: CardProps) => {
  return (
    <div {...rest} className={`${variant}-body ${{ ...rest }.className ?? ''}`}>
      {children}
    </div>
  )
}
