import { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'card' | 'box'
  children?: ReactNode
}

export const CardFooter = ({
  variant = 'card',
  children,
  ...rest
}: CardProps) => {
  return (
    <div
      {...rest}
      className={`${variant}-footer text-end ${{ ...rest }.className ?? ''}`}
    >
      {children}
    </div>
  )
}
