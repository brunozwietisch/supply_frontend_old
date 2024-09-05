import { HTMLAttributes, ReactNode } from 'react'

interface StepContentProps extends HTMLAttributes<HTMLDivElement> {
  tabKey?: string
  activeTabKey?: string
  children: ReactNode
}

export const StepContent = ({
  tabKey,
  children,
  activeTabKey,
  ...rest
}: StepContentProps) => {
  const isActive = activeTabKey === tabKey

  return (
    <div
      {...rest}
      id={tabKey}
      className={
        isActive
          ? `content active dstepper-block ${{ ...rest }.className}`
          : `content ${{ ...rest }.className}`
      }
      role="tabpanel"
      aria-labelledby={`${tabKey}-trigger`}
      style={{
        minHeight: 'auto'
      }}
    >
      {children}
    </div>
  )
}
