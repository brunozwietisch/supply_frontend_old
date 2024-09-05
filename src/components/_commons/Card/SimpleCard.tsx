import React, { HTMLAttributes, ReactNode, useEffect, useState } from 'react'
import { ButtonProps as BsButtonProps, Card, Collapse } from 'react-bootstrap'

import { Button } from '@/components/_commons/Form/Button'
import { CardBody, CardFooter, CardHeader, CardWrapper } from './index'

import './styles.scss'

type DisplayData = {
  title: string
  content?: string
}

export interface FooterButton extends BsButtonProps {
  label: string
  icon?: React.ReactNode
  onClick?: () => void
  isLoading?: boolean
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'card' | 'box'
  isCollapsible?: boolean
  startsClosed?: boolean
  children: ReactNode

  headerTitle?: string
  cardHeader?: boolean
  cardFoter?: boolean
  footerButtonRight?: FooterButton
  footerButtonsRight?: FooterButton[]
  footerButtonsLeft?: FooterButton[]
  displayData?: DisplayData[]
  openAction?: boolean
  className?: string
  floatingBaseboard?: boolean
}

export const SimpleCard = ({
  variant = 'card',
  isCollapsible = false,
  startsClosed = false,
  openAction = false,
  children,
  displayData,
  className,
  headerTitle,
  cardHeader = true,
  cardFoter = true,
  floatingBaseboard = false,
  footerButtonRight,
  footerButtonsRight,
  footerButtonsLeft,
  ...rest
}: CardProps) => {
  const [isCollapsed, setIsCollapsed] = useState(startsClosed)

  useEffect(() => {
    if (openAction) {
      setIsCollapsed(false)
    }
  }, [openAction])

  return (
    <>
      <CardWrapper variant={variant} className={className}>
        {cardHeader && (
          <CardHeader
            isCollapsed={isCollapsed}
            isCollapsible={isCollapsible}
            variant={variant}
            displayData={displayData}
            onCollapse={() => setIsCollapsed(!isCollapsed)}
          >
            {headerTitle}
          </CardHeader>
        )}

        <Collapse in={isCollapsible ? !isCollapsed : true}>
          <div>
            <CardBody variant={variant} {...rest}>
              {children}
            </CardBody>

            {cardFoter && (
              <CardFooter
                variant={variant}
                className="row justify-content-between"
              >
                <div className="col-4 d-flex p-2">
                  {footerButtonsLeft &&
                    footerButtonsLeft.map(
                      (
                        { label, onClick, icon, isLoading = false, ...rest },
                        index
                      ) => (
                        <Button
                          key={index}
                          {...rest}
                          onClick={onClick}
                          isLoading={isLoading}
                          className={index > 0 ? 'ms-2' : ''}
                        >
                          {icon && <i className={`fa ${icon}`} />}
                          {` ${label}`}
                        </Button>
                      )
                    )}
                </div>
                <div className="col-4">
                  {footerButtonRight && (
                    <Button onClick={footerButtonRight.onClick}>
                      {footerButtonRight.icon}
                      {footerButtonRight.label}
                    </Button>
                  )}

                  {footerButtonsRight &&
                    footerButtonsRight
                      .filter(button => button !== null)
                      .map(
                        (
                          { label, onClick, icon, isLoading = false, ...rest },
                          index
                        ) => (
                          <Button
                            key={index}
                            {...rest}
                            onClick={onClick}
                            isLoading={isLoading}
                            className={index > 0 ? 'ms-2' : ''}
                          >
                            {icon && <i className={`fa ${icon}`} />}
                            {` ${label}`}
                          </Button>
                        )
                      )}
                </div>
              </CardFooter>
            )}
          </div>
        </Collapse>
      </CardWrapper>

      {floatingBaseboard && (
        <div className={`floating_baseboard visible`}>
          <Card>
            <CardFooter>
              <div className="d-flex justify-content-between">
                <div className="justify-content-start">
                  {footerButtonsLeft &&
                    footerButtonsLeft.map(
                      (
                        { label, onClick, icon, isLoading = false, ...rest },
                        index
                      ) => (
                        <Button
                          key={index}
                          {...rest}
                          onClick={onClick}
                          isLoading={isLoading}
                          className={index > 0 ? 'ms-2' : ''}
                        >
                          {icon && (
                            <>
                              <i className={`fa ${icon}`} /> {label}
                            </>
                          )}
                        </Button>
                      )
                    )}
                </div>
                <div className="justify-content-end">
                  {footerButtonsRight &&
                    footerButtonsRight.map(
                      (
                        { label, onClick, icon, isLoading = false, ...rest },
                        index
                      ) => (
                        <Button
                          key={index}
                          {...rest}
                          onClick={onClick}
                          isLoading={isLoading}
                          className={index > 0 ? 'ms-2' : ''}
                        >
                          {icon && (
                            <>
                              <i className={`fa ${icon}`} /> {label}
                            </>
                          )}
                        </Button>
                      )
                    )}
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  )
}
