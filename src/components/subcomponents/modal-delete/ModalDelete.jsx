import React from 'react';
import ModalForm from '../modal-form/ModalForm';

import './ModalDelete.css';

const ModalDelete = (props) => {
  const {
    show = true,
    handleCloseModal,
    handleDeleteAll,
    header = 'Вы уверены, что хотите удалить все данные?',
  } = props;

  return (
    <div className='b-modal-delete'>
      <ModalForm
        title='Удалить все данные'
        show={show}
        withoutHeader
        handleCloseModal={handleCloseModal}
      >
        <div className="b-modal-delete__title">
          {header}
        </div>
        <div className='b-modal-delete__control-btns'>
          <button
            className='b-button b-button--delete b-modal-delete__btn-delete'
            onClick={handleDeleteAll}
          >
            Да
          </button>
          <button
            className='b-button b-button--cancel'
            onClick={handleCloseModal}
          >
            Нет
          </button>
        </div>
      </ModalForm>
    </div>
  )
}

export default ModalDelete
