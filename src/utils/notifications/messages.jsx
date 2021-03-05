import React from 'react'
import { toast } from 'react-toastify'

import './messages.css'

export const NotificationContent = (props) => {
  const {
    message,
  } = props

  return (
    <div className='b-notification'>
      {message}
    </div>
  )
}

export const defaults = {
  position: toast.POSITION.TOP_RIGHT,
  autoClose: 3000,
  className: 'rotateY animated',
  rtl: false,
  closeButton: true,
}

/**
 * Converts notification type to library type
 */
export const convertType = (type) => {
  switch (type) {
    case 'info':
      return toast.TYPE.INFO
    case 'success':
      return toast.TYPE.SUCCESS
    case 'warning':
      return toast.TYPE.WARNING
    case 'error':
      return toast.TYPE.ERROR
    case 'default':
      return toast.TYPE.DEFAULT
    default:
      throw new Error(`Unhandled message type ${type}`)
  }
}

/**
 * Function that display notification
 */
export const showNotification = (message, type) => {
  if ('Notification' in global && Notification.permission === 'granted') {
    new Notification(message)
  } else {
    toast(
      <NotificationContent message={message} />,
      {
        ...defaults,
        type: convertType(type),
      },
    )
  }
}

export const showWarningMessage = (message) => {
  showNotification(message, 'warning')
}

export const showSuccessMessage = (message) => {
  showNotification(message, 'success')
}

export const showInformationMessage = (message) => {
  showNotification(message, 'info')
}

export const showErrorMessage = (message) => {
  showNotification(message, 'error')
}
