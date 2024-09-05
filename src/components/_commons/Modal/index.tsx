import React, { CSSProperties } from 'react'
import Modal from 'react-bootstrap/Modal'

import { ButtonProps as BsButtonProps, Card } from 'react-bootstrap'
import { Button } from '@/components/_commons/Form/Button'

import './styles.scss'
import { CardFooter } from '@/components/_commons/Card'
// import { useDom } from '@/core/hooks/useDom'

export interface FooterButton extends BsButtonProps {
  label: string
  icon?: React.ReactNode
  onClick?: () => void
  isLoading?: boolean
}

export interface DialogBoxProps {
  titleHeader?: string
  titleButtonAction?: string
  titleButtonCancel?: string
  show: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
  onHandleClose?: () => void
  onHandleAction?: (obj?: any) => void
  loadButtonAction?: boolean
  children?: React.ReactNode
  centered?: boolean
  closeButton?: boolean
  gridContent?: boolean
  footer?: boolean
  footerButton?: FooterButton
  footerButtons?: FooterButton[]
  footerButtonLeft?: FooterButton
  footerButtonsLeft?: FooterButton[]
  floatingBaseboard?: boolean
  dialogClassName?: string
  styles?: CSSProperties
}

export function DialogBox({
  titleHeader,
  titleButtonAction,
  titleButtonCancel,
  show,
  size = 'md',
  onHandleClose,
  onHandleAction,
  children,
  loadButtonAction = false,
  centered = false,
  closeButton = true,
  footer = true,
  footerButton,
  footerButtons,
  footerButtonLeft,
  footerButtonsLeft,
  gridContent,
  floatingBaseboard = false,
  dialogClassName,
  styles
}: DialogBoxProps) {
  if (floatingBaseboard) {
    footer = false
  }

  return (
    <Modal
      show={show}
      onHide={onHandleClose}
      centered={centered}
      size={size === 'md' ? undefined : size}
      backdrop="static"
      dialogClassName={dialogClassName ?? undefined}
    >
      <Modal.Header closeButton={closeButton}>
        <b>{titleHeader}</b>
      </Modal.Header>

      <Modal.Body className={gridContent ? 'show-grid' : ''} style={styles}>
        {children}
      </Modal.Body>

      {footer && (
        <Modal.Footer className="d-flex justify-content-between">
          <div className="justify-content-start">
            {footerButtonLeft && (
              <Button
                variant={footerButtonLeft.variant}
                className={'ms-2'}
                onClick={footerButtonLeft.onClick}
              >
                {footerButtonLeft.label}
              </Button>
            )}

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
                    {icon}
                    {label}
                  </Button>
                )
              )}
          </div>

          <div className="justify-content-end">
            {!footerButtons ? (
              footerButton ? (
                <Button
                  onClick={footerButton.onClick}
                  variant={footerButton?.variant || 'primary'}
                  className={'ms-2'}
                >
                  {footerButton.icon}
                  {footerButton.label}
                </Button>
              ) : null
            ) : (
              footerButtons.map(
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
                    {icon}
                    {label}
                  </Button>
                )
              )
            )}

            {titleButtonCancel && (
              <Button
                variant="secondary"
                className={'ms-2'}
                onClick={onHandleClose}
              >
                {titleButtonCancel}
              </Button>
            )}

            {titleButtonAction && (
              <Button
                variant="primary"
                isLoading={loadButtonAction}
                onClick={onHandleAction}
                className={'ms-2'}
              >
                {titleButtonAction}
              </Button>
            )}
          </div>
        </Modal.Footer>
      )}

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
                          {icon}
                          {label}
                        </Button>
                      )
                    )}
                </div>
                <div className="justify-content-end">
                  {!footerButtons ? (
                    footerButton ? (
                      <Button
                        onClick={footerButton.onClick}
                        variant={footerButton?.variant || 'primary'}
                        className={'ms-2'}
                      >
                        {footerButton.icon}
                        {footerButton.label}
                      </Button>
                    ) : null
                  ) : (
                    footerButtons.map(
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
                          {index}
                          {icon}
                          {label}
                        </Button>
                      )
                    )
                  )}

                  {titleButtonCancel && (
                    <Button
                      variant="danger"
                      className={'ms-2'}
                      onClick={onHandleClose}
                    >
                      {titleButtonCancel}
                    </Button>
                  )}

                  {titleButtonAction && (
                    <Button
                      variant="primary"
                      isLoading={loadButtonAction}
                      onClick={onHandleAction}
                      className={'ms-2'}
                    >
                      {titleButtonAction}
                    </Button>
                  )}
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
    </Modal>
  )
}
