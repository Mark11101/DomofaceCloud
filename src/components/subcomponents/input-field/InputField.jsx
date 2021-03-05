import React from 'react'
import TextField from '@material-ui/core/TextField'

import appendClassName from '../../../utils/string/appendClassName'

import './InputField.css'

const InputField = (props) => {
  const {
    label,
    type,
    name,
    innerLabel,
    innerDescriptionLabel,
    customPasswordValidation,
    step,
    value,
    className,
    onChange,
    onBlur,
    onKeyDown,
    error,
    helperText,
    changePasswordValidity,
  } = props;

  const [isPasswordToShort, setIsPasswordToShort] = React.useState(false);

  const handleFocus = (event) => {

    if (event.target.type === 'number') {
      event.target.select()
    }
  }

  const handleChange = (event) => {
    const value = event.target.value;
    
    if (
      type === 'password' && 
      name !== 'confirmedPassword' &&
      value.length < 4 && 
      value !== '' && 
      !customPasswordValidation
    ) {
      
      setIsPasswordToShort(true)      
      changePasswordValidity && changePasswordValidity(false)

    } else {

      setIsPasswordToShort(false)
      changePasswordValidity && changePasswordValidity(true)      
    }

    onChange && onChange(event)
  }

  return (
    <div className={
      className
      ?
        appendClassName('b-input-field', className)
      :
        'b-input-field'
    }>
      {
        label
        &&
          <small className='b-input-field__label'>
            {label}
          </small>
      }
      {
        innerDescriptionLabel
        &&
          <div className='b-input-field__inner-description-label'>
            {innerDescriptionLabel}
          </div>
      }
      <TextField
        type={type}
        variant="outlined"
        autoComplete='new-password'
        className={
          innerDescriptionLabel
          ?
            appendClassName(
              'b-input-panel',
              'b-input-panel--with-inner-description-label'
            )
          :
            'b-input-panel'
        }
        step={step}
        label={innerLabel}
        name={name}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        error={error || isPasswordToShort}
        helperText={
          isPasswordToShort
          ?
            'Слишком короткий пароль'
          :
            helperText
        }
      />
    </div>
  )
}

export default InputField
