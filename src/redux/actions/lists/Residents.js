export const requestResidents = (companyId) => {

  return {
    type: 'REQUEST_RESIDENTS',
    payload: {
      companyId
    }
  }
}

export const requestResidentsSuccess = (residents) => {

  return {
    type: 'REQUEST_RESIDENTS_SUCCESS',
    payload: {
      residents
    }
  }
}

export const requestResidentsError = (error) => {

  return {
    type: 'REQUEST_RESIDENTS_ERROR',
    error,
  }
}

export const requestResident = (id) => {

  return {
    type: 'REQUEST_RESIDENT',
    payload: {
      id
    }
  }
}

export const requestResidentSuccess = (response) => {

  return {
    type: 'REQUEST_RESIDENT_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestResidentError = (error) => {

  return {
    type: 'REQUEST_RESIDENT_ERROR',
    error
  }
}

export const requestCreateResident = (flat_id, login, password, temporary, name) => {

  return {
    type: 'REQUEST_CREATE_RESIDENT',
    payload: {
      flat_id,
      login,
      password,
      temporary,
      name,
    }
  }
}

export const requestCreateResidentSuccess = (response) => {

  return {
    type: 'REQUEST_CREATE_RESIDENT_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestCreateResidentError = (error) => {

  return {
    type: 'REQUEST_CREATE_RESIDENT_ERROR',
    error,
  }
}

export const requestUpdateResident = (id, flat_id, login, password, temporary, name) => {

  return {
    type: 'REQUEST_UPDATE_RESIDENT',
    payload: {
      id,
      flat_id,
      login,
      password,
      temporary,
      name,
    }
  }
}

export const requestUpdateResidentSuccess = (response) => {

  return {
    type: 'REQUEST_UPDATE_RESIDENT_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestUpdateResidentError = (error) => {

  return {
    type: 'REQUEST_UPDATE_RESIDENT_ERROR',
    error,
  }
}

export const requestDeleteResident = (id) => {

  return {
    type: 'REQUEST_DELETE_RESIDENT',
    payload: {
      id
    }
  }
}

export const requestDeleteResidentSuccess = (response, id) => {

  return {
    type: 'REQUEST_DELETE_RESIDENT_SUCCESS',
    payload: {
      response,
      id,
    }
  }
}

export const requestDeleteResidentError = (error) => {

  return {
    type: 'REQUEST_DELETE_RESIDENT_ERROR',
    error,
  }
}
