export const requestSignIn = (login, password) => {

  return {
    type: 'REQUEST_SIGN_IN',
    payload: {
      login,
      password,
    }
  }
}

export const requestSignInSuccess = (tokens) => {

  return {
    type: 'REQUEST_SIGN_IN_SUCCESS',
    payload: {
      tokens
    }
  }
}

export const requestSignInError = (error) => {

  return {
    type: 'REQUEST_SIGN_IN_ERROR',
    error
  }
}

export const requestCurrentUser = () => {

  return {
    type: 'REQUEST_CURRENT_USER'
  }
}

export const requestCurrentUserSuccess = (userData) => {

  return {
    type: 'REQUEST_CURRENT_USER_SUCCESS',
    payload: {
      userData
    }
  }
}

export const requestCurrentUserError = (error) => {

  return {
    type: 'REQUEST_CURRENT_USER_ERROR',
    error,
  }
}

export const requestUpdateToken = (refresh_token) => {

  return {
    type: 'REQUEST_UPDATE_TOKEN',
    payload: {
      refresh_token
    }
  }
}

export const requestUpdateTokenSuccess = (access_token) => {

  return {
    type: 'REQUEST_UPDATE_TOKEN_SUCCESS',
    payload: {
      access_token
    }
  }
}

export const requestUpdateTokenError = (error) => {

  return {
    type: 'REQUEST_UPDATE_TOKEN_ERROR',
    error
  }
}

export const requestLogOut = () => {

  return {
    type: 'REQUEST_LOG_OUT'
  }
}

export const requestLogOutSuccess = () => {

  return {
    type: 'REQUEST_LOG_OUT_SUCCESS'
  }
}

export const requestLogOutError = (error) => {

  return {
    type: 'REQUEST_LOG_OUT_ERROR',
    error,
  }
}

export const requestIntercomHealthCheck = () => {

  return {
    type: 'REQUEST_INTERCOM_HEALTH_CHECK'
  }
}

export const requestIntercomHealthCheckSuccess = () => {

  return {
    type: 'REQUEST_INTERCOM_HEALTH_CHECK_SUCCESS'
  }
}

export const requestIntercomHealthCheckError = (error) => {

  return {
    type: 'REQUEST_INTERCOM_HEALTH_CHECK_ERROR',
    error,
  }
}

export const requestCheckAuth = () => {

  return {
    type: 'REQUEST_CHECK_AUTH'
  }
}

export const requestCheckAuthSuccess = (response) => {

  return {
    type: 'REQUEST_CHECK_AUTH_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestCheckAuthError = (error) => {

  return {
    type: 'REQUEST_CHECK_AUTH_ERROR',
    error,
  }
}