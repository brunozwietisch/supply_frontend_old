import React, { HTMLAttributes } from 'react'
import { Col, Row } from 'react-bootstrap'

interface TitleHeaderProps extends HTMLAttributes<HTMLElement> {
  title: string
  children?: React.ReactNode
}

export const TitleHeader = ({ title, children, ...rest }: TitleHeaderProps) => {
  return (
    <Row>
      <Col
        {...rest}
        className={`content-header d-flex justify-content-between mb-0 gap-4 flex-wrap-reverse pt-0 ${
          { ...rest }.className
        }`}
      >
        <h1 className="align-top px-2">{title}</h1>
        {children}
      </Col>
    </Row>
  )
}
