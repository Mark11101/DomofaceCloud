export const requestSipCredentials = (companyId) => {

  return {
    type: 'REQUEST_SIP_CREDENTIALS',
    payload: {
      companyId
    }
  }
}

export const requestSipCredentialsSuccess = (sipCredentials) => {

  return {
    type: 'REQUEST_SIP_CREDENTIALS_SUCCESS',
    payload: {
      sipCredentials
    }
  }
}

export const requestSipCredentialsError = (error) => {

  return {
    type: 'REQUEST_SIP_CREDENTIALS_ERROR',
    error,
  }
}

export const requestCreateSipCredential = (sip_server_id, login, password) => {

  return {
    type: 'REQUEST_CREATE_SIP_CREDENTIAL',
    payload: {
      sip_server_id,
      login,
      password,
    }
  }
}

export const requestCreateSipCredentialSuccess = (response) => {

  return {
    type: 'REQUEST_CREATE_SIP_CREDENTIAL_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestCreateSipCredentialError = (error) => {

  return {
    type: 'REQUEST_CREATE_SIP_CREDENTIAL_ERROR',
    error,
  }
}

export const requestUpdateSipCredential = (id, sip_server_id, login, password) => {

  return {
    type: 'REQUEST_UPDATE_SIP_CREDENTIAL',
    payload: {
      id,
      sip_server_id,
      login,
      password,
    }
  }
}

export const requestUpdateSipCredentialSuccess = (response) => {

  return {
    type: 'REQUEST_UPDATE_SIP_CREDENTIAL_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestUpdateSipCredentialError = (error) => {

  return {
    type: 'REQUEST_UPDATE_SIP_CREDENTIAL_ERROR',
    error,
  }
}

export const requestDeleteSipCredential = (id) => {

  return {
    type: 'REQUEST_DELETE_SIP_CREDENTIAL',
    payload: {
      id
    }
  }
}

export const requestDeleteSipCredentialSuccess = (response, id) => {

  return {
    type: 'REQUEST_DELETE_SIP_CREDENTIAL_SUCCESS',
    payload: {
      response,
      id,
    }
  }
}

export const requestDeleteSipCredentialError = (error) => {

  return {
    type: 'REQUEST_DELETE_SIP_CREDENTIAL_ERROR',
    error,
  }
}
