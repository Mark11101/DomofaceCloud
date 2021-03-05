import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'

import InputField from '../input-field/InputField'
import testRegex from '../../../utils/string/testRegex'

const AuthInputs = (props) => {
  const {
    accounts,
    login,
    onSubmit,
    withoutLogin,
  } = props;

  const [isLoginAlreadyExist, setIsLoginAlreadyExist] = useState(false);
  const [isPasswordValid, setPasswordValid] = useState(true);
  const [isConfirmedPasswordValid, setIsConfirmedPasswordValid] = useState(true);

  const [newAccount, setNewAccount] = useState({
    login: login || '',
    password: '',
    confirmedPassword: '',
  });

  const isInputsValid = 
    newAccount.login &&
    newAccount.password &&
    isPasswordValid &&
    (newAccount.password === newAccount.confirmedPassword);

  const handleInputChange = (event) => {
    const value = event.target.value;
    const name  = event.target.name;

    if (name === 'login') {
      
      accounts.some((account) => account.data === value)
      ?
        setIsLoginAlreadyExist(true)
      :
        setIsLoginAlreadyExist(false)
    }

    if (name === 'password') {

      testRegex(value, /[A-Z]/) &&
      testRegex(value, /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
      ?
          setPasswordValid(true)
      :
      setPasswordValid(false)

      value === newAccount.confirmedPassword || newAccount.confirmedPassword === ''
      ?
        setIsConfirmedPasswordValid(true)
      :
        setIsConfirmedPasswordValid(false)
    }

    if (name === 'confirmedPassword') {

      value === newAccount.password
      ?
        setIsConfirmedPasswordValid(true)
      :
        setIsConfirmedPasswordValid(false)
    }

    setNewAccount({
      ...newAccount,
      [name]: value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    setNewAccount({
      login: '',
      password: '',
      confirmedPassword: '',
    })

    onSubmit && onSubmit(newAccount)
  }  

  return (
    <Form onSubmit={handleSubmit}>   
      {
        !withoutLogin
        &&
          <InputField 
            type='text'
            name='login'
            innerLabel='Логин'
            value={newAccount.login}
            onChange={handleInputChange}
            error={isLoginAlreadyExist}
            helperText={isLoginAlreadyExist && 'Логин занят'}
          />  
      }           
      <InputField 
        type='password'
        name='password'
        innerLabel='Пароль'
        customPasswordValidation
        value={newAccount.password}
        onChange={handleInputChange}
        error={!isPasswordValid}
        helperText={!isPasswordValid && 'Введите по крайней мере одну прописную и заглавную латинские буквы, одно число и один спец. символ ((#?!@$%^&*-). Минимальная длина пароля: 8 символов.'}
      />     
      <InputField 
        type='password'
        name='confirmedPassword'
        innerLabel='Подтвердите пароль'
        customPasswordValidation
        value={newAccount.confirmedPassword}
        onChange={handleInputChange}
        error={!isConfirmedPasswordValid}
        helperText={!isConfirmedPasswordValid && 'Пароли не совпадают'}
      />
      <button  
        type='submit'
        className='b-button b-modal__submit-btn'
        disabled={!isInputsValid || isLoginAlreadyExist}
      >
        Добавить
      </button>
    </Form>
  )
}

export default AuthInputs
