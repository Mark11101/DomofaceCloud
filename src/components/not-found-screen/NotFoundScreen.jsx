import React from 'react'
import { useHistory } from 'react-router'

import ApiError from '../subcomponents/api-error/ApiError'
import NotFoundPageImage from '../../images/404.png'

import './NotFoundScreen.css'

const NotFoundScreen = () => {

  const history = useHistory();

  React.useEffect(() => {
    notFoundPageOpen()

    return notFoundPageClose
  }, [])

  const handleGoBackClick = (event) => {
    event.preventDefault()

    history.goBack()
  }

  return (
    <>
      <ApiError
        className='b-not-found'
        content={
          <img 
            src={NotFoundPageImage} 
            alt='' 
            className='b-not-found__image'
          />
        }
        footer={
          <>
            <h4 className='b-not-found__title'>Страницы не существует</h4>
            <div className='b-not-found__help-message'>
              <button
                className='b-button b-not-found__back-btn'
                onClick={handleGoBackClick}
              >
                Перейти на предыдущую страницу
              </button>
            </div>
          </>
        }
      />
    </>
  )
}

export default NotFoundScreen

export const notFoundPageOpen = () => {
  document.body.classList.add('not-found-page')
}

export const notFoundPageClose = () => {
  document.body.classList.remove('not-found-page')
}
