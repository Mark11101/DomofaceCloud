import React from 'react'
import Container from 'react-bootstrap/Container'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import IconButton from '@material-ui/core/IconButton'

import RouteHandler from '../route-handler/RouteHandlerContainer'
import DomoFaceLogo from '../../images/domoface-logo.png'
import { showErrorMessage } from '../../utils/notifications/messages'

import './SignIn.css'

const SignIn = (props) => {
  const {
    isLogged,
    requestSignIn,
  } = props;

  const [values, setValues] = React.useState({
    login: '',
    password: '',
    showPassword: false,
  });

  React.useEffect(() => {
    onAuthPageOpen()

    return onAuthPageClose
  }, []) 

  if (isLogged) {

    return (
      <RouteHandler />
    )
  }
  
  const handleChange = (prop) => (event) => {

    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {

    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleSubmit = (event) => {
    event.preventDefault()

    if (values.login === '') {
      showErrorMessage('Введите логин')
    } else if (values.password === '') {
      showErrorMessage('Введите пароль')
    } else {
      requestSignIn(values.login, values.password)
    }
  }

  return (
    <div className='b-sign-in'>
      <div className='b-sign-in__logo'>
        <img 
          src={DomoFaceLogo} 
          alt='logo' 
          className='b-sign-in__logo-image'
        />
      </div>
      <Container className='b-sign-in__panel b-panel'>
        <form className='b-sign-in__input' autoComplete='off' onSubmit={handleSubmit}>
          <input name='login' type='text' className='b-input-field__empty-input' />
          <input name='password' type='password' className='b-input-field__empty-input' />
          <InputLabel htmlFor="standard-adornment-password">Логин</InputLabel>
          <Input
            type='text'
            autoComplete='none'
            value={values.login}
            onChange={handleChange('login')}
          />
          <InputLabel htmlFor="standard-adornment-password">Пароль</InputLabel>
          <Input
            type={values.showPassword ? 'text' : 'password'}
            autoComplete='none'
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          <button
            type='submit'
            className='b-button b-sign-in__submit'
          >
            Войти
          </button>
        </form>
      </Container>
    </div>
  )
}

export default SignIn

export const onAuthPageOpen = () => {
  document.body.classList.add('auth-page')
}

export const onAuthPageClose = () => {
  document.body.classList.remove('auth-page')
}
