import { HTMLAttributes, ReactNode } from 'react'

interface StepContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const StepContainer = ({ children, ...rest }: StepContainerProps) => {
  return (
    <div {...rest} className={`bs-stepper ${{ ...rest }.className}`}>
      {children}
    </div>
  )
}
