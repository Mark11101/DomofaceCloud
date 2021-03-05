export const requestAdmins = () => {
  
  return {
    type: 'REQUEST_ADMINS'
  }
}

export const requestAdminsSuccess = (admins) => {
  
  return {
    type: 'REQUEST_ADMINS_SUCCESS',
    payload: {
      admins
    }
  }
}

export const requestAdminsError = (error) => {
  
  return {
    type: 'REQUEST_ADMINS',
    error,
  }
}

export const requestCreateAdmin = (login, password) => {

  return {
    type: 'REQUEST_CREATE_ADMIN',
    payload: {
      login,
      password,
    }
  }
}

export const requestCreateAdminSuccess = (response) => {

  return {
    type: 'REQUEST_CREATE_ADMIN_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestCreateAdminError = (error) => {

  return {
    type: 'REQUEST_CREATE_ADMIN_ERROR',
    error,
  }
}

export const requestUpdateAdmin = (id, password) => {

  return {
    type: 'REQUEST_UPDATE_ADMIN',
    payload: {
      id,
      password,
    }
  }
}

export const requestUpdateAdminSuccess = (response) => {

  return {
    type: 'REQUEST_UPDATE_ADMIN_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestUpdateAdminError = (error) => {

  return {
    type: 'REQUEST_UPDATE_ADMIN_ERROR',
    error,
  }
}

export const requestDeleteAdmin = (id) => {

  return {
    type: 'REQUEST_DELETE_ADMIN',
    payload: {
      id
    }
  }
}

export const requestDeleteAdminSuccess = (response, id) => {

  return {
    type: 'REQUEST_DELETE_ADMIN_SUCCESS',
    payload: {
      response,
      id,
    }
  }
}

export const requestDeleteAdminError = (error) => {

  return {
    type: 'REQUEST_DELETE_ADMIN_ERROR',
    error,
  }
}
