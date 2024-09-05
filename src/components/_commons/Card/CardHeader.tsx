import { HTMLAttributes, ReactNode } from 'react'
import { Fade } from 'react-bootstrap'

import { Button } from '@/components/_commons/Form/Button'

type DisplayData = {
  title: string
  content?: string
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  variant?: 'card' | 'box'
  onCollapse?: () => void
  isCollapsed?: boolean
  isCollapsible?: boolean
  displayData?: DisplayData[]
}

export const CardHeader = ({
  children,
  onCollapse,
  displayData,
  variant = 'card',
  isCollapsed = false,
  isCollapsible = false,
  ...rest
}: CardProps) => {
  const hasRightContent = isCollapsible || displayData

  const itemClassnames = [
    variant === 'card'
      ? 'card-header d-flex align-items-center justify-content-between'
      : 'box-header with-border',
    isCollapsed ? 'border-bottom-0' : null
  ]
    .filter(p => p)
    .join(' ')

  function handleCollapse() {
    onCollapse?.()
  }

  return (
    <div
      className={`${itemClassnames}`}
      style={{
        paddingBlock: isCollapsible ? '' : '10px'
      }}
      {...rest}
    >
      {variant === 'card' ? (
        <h6 className={`${variant}-title m-0 pt-1 pb-1`}>{children}</h6>
      ) : (
        <p className={`${variant}-title m-0 pt-1 pb-1`}>{children}</p>
      )}

      {hasRightContent && (
        <div className="box-tools pull-right d-flex">
          {displayData && displayData.length !== 0 && (
            <Fade in={isCollapsed}>
              <div
                className={`gap-3 align-items-center me-3 ${
                  isCollapsed ? 'd-flex' : 'd-none'
                }`}
              >
                {displayData?.map((data, index) => (
                  <p key={index} className="mb-0">
                    <b className="text-bold">{data.title}</b> {data.content}
                  </p>
                ))}
              </div>
            </Fade>
          )}

          {isCollapsible && (
            <>
              {isCollapsed ? (
                <Button
                  type="button"
                  variant="transparent"
                  className="btn btn-box-tool"
                  data-toggle="tooltip"
                  onClick={() => handleCollapse()}
                >
                  <i className="fa fa-angle-down"></i>
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="transparent"
                  className="btn btn-box-tool"
                  data-toggle="tooltip"
                  onClick={() => handleCollapse()}
                >
                  <i className="fa fa-angle-up"></i>
                </Button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
