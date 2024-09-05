import { Loader } from '@/components/_commons/Loader'
import React, { HTMLAttributes, ReactNode } from 'react'

import './styles.scss'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  loading?: boolean
  variant?: 'card' | 'box'
  children: ReactNode
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant = 'card', loading, ...rest }, ref) => {
    return (
      <Loader loading={loading}>
        <div
          {...rest}
          ref={ref}
          className={`${variant} ${{ ...rest }.className ?? ''}`}
        >
          {children}
        </div>
      </Loader>
    )
  }
)

Card.displayName = 'Card'
