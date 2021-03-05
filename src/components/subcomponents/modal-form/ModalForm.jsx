import React from 'react'
import Modal from 'react-bootstrap/Modal'

import './ModalForm.css'

const ModalForm = (props) => {
  const {
    title,
    show = true,
    withoutHeader,
    children,
    handleCloseModal,
  } = props;

  return (
    <Modal 
      show={show} 
      onHide={handleCloseModal}
      className='b-modal-form'
      centered
    >
      {
        !withoutHeader
        &&
          <Modal.Header className='b-modal-form__header'>
            <h1 className='b-modal-form__header-title'>
              {title}
            </h1>
            <button 
              className='b-button b-modal-form__close-modal-btn'
              onClick={handleCloseModal}
            >
              x
            </button>
          </Modal.Header>
      }
      <Modal.Body>
        {children}
      </Modal.Body>
      {
        withoutHeader
        &&
          <button 
            className='b-button b-modal-form__footer-close-modal-btn'
            onClick={handleCloseModal}
          >
            x
          </button>
      }
    </Modal>
  )
}

export default ModalForm
