export const requestSipAccounts = (companyId) => {

  return {
    type: 'REQUEST_SIP_ACCOUNTS',
    payload: {
      companyId
    }
  }
}

export const requestSipAccountsSuccess = (sipAccounts) => {

  return {
    type: 'REQUEST_SIP_ACCOUNTS_SUCCESS',
    payload: {
      sipAccounts
    }
  }
}

export const requestSipAccountsError = (error) => {

  return {
    type: 'REQUEST_SIP_ACCOUNTS_ERROR',
    error,
  }
}

export const requestCreateSipAccount = (
  intercom_id,
  sip_server_id,
  flat_id,
  login,
  password,
) => {

  return {
    type: 'REQUEST_CREATE_SIP_ACCOUNT',
    payload: {
      intercom_id,
      sip_server_id,
      flat_id,
      login,
      password,
    }
  }
}

export const requestCreateSipAccountSuccess = (response) => {

  return {
    type: 'REQUEST_CREATE_SIP_ACCOUNT_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestCreateSipAccountError = (error) => {

  return {
    type: 'REQUEST_CREATE_SIP_ACCOUNT_ERROR',
    error,
  }
}

export const requestUpdateSipAccount = (
  id,
  intercom_id,
  sip_server_id,
  flat_id,
  login,
  password,
) => {

  return {
    type: 'REQUEST_UPDATE_SIP_ACCOUNT',
    payload: {
      id,
      intercom_id,
      sip_server_id,
      flat_id,
      login,
      password,
    }
  }
}

export const requestUpdateSipAccountSuccess = (response) => {

  return {
    type: 'REQUEST_UPDATE_SIP_ACCOUNT_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestUpdateSipAccountError = (error) => {

  return {
    type: 'REQUEST_UPDATE_SIP_ACCOUNT_ERROR',
    error,
  }
}

export const requestDeleteSipAccount = (id) => {

  return {
    type: 'REQUEST_DELETE_SIP_ACCOUNT',
    payload: {
      id
    }
  }
}

export const requestDeleteSipAccountSuccess = (response, id) => {

  return {
    type: 'REQUEST_DELETE_SIP_ACCOUNT_SUCCESS',
    payload: {
      response,
      id,
    }
  }
}

export const requestDeleteSipAccountError = (error) => {

  return {
    type: 'REQUEST_DELETE_SIP_ACCOUNT_ERROR',
    error,
  }
}
