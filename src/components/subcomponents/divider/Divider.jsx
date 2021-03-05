import React from 'react'

import appendClassName from '../../../utils/string/appendClassName'

import './Divider.css'

const Divider = (props) => {
  const {
    className
  } = props;

  return (
    <hr className={
      className 
      ? 
        appendClassName('b-divider', className)
      :
        'b-divider'
    } />
  )
}

export default Divider
