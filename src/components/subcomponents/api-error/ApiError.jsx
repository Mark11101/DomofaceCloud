import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import './ApiError.css'

const ApiError = (props) => {
  const {
    title,
    content,
    footer,
    className,
  } = props

  return (
    <Container className={['b-api-error', (className || '')].join(' ').trim()}>
      <Row className='b-api-error__header'>
        <Col>
          <h1 className='huge-title b-api-error__title'>
            {title}
          </h1>
        </Col>
      </Row>
      <Row className='b-api-error__content'>
        <Col>
          {content}
        </Col>
      </Row>
      <Row className='b-api-error__footer'>
        <Col>
          {footer}
        </Col>
      </Row>
    </Container>
  )
}

export default ApiError
