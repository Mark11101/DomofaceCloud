export const requestPinCodes = (companyId) => {

  return {
    type: 'REQUEST_PIN_CODES',
    payload: {
      companyId
    }
  }
}

export const requestPinCodesSuccess = (pinCodes) => {

  return {
    type: 'REQUEST_PIN_CODES_SUCCESS',
    payload: {
      pinCodes
    }
  }
}

export const requestPinCodesError = (error) => {

  return {
    type: 'REQUEST_PIN_CODES_ERROR',
    error,
  }
}

export const requestCreatePinCode = (newPinCode) => {

  return {
    type: 'REQUEST_CREATE_PIN_CODE',
    payload: {
      newPinCode
    }
  }
}

export const requestCreatePinCodeSuccess = (response) => {

  return {
    type: 'REQUEST_CREATE_PIN_CODE_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestCreatePinCodeError = (error) => {

  return {
    type: 'REQUEST_CREATE_PIN_CODE_ERROR',
    error,
  }
}

export const requestDeletePinCode = (id) => {

  return {
    type: 'REQUEST_DELETE_PIN_CODE',
    payload: {
      id
    }
  }
}

export const requestDeletePinCodeSuccess = (response, id) => {

  return {
    type: 'REQUEST_DELETE_PIN_CODE_SUCCESS',
    payload: {
      response,
      id,
    }
  }
}

export const requestDeletePinCodeError = (error) => {

  return {
    type: 'REQUEST_DELETE_PIN_CODE_ERROR',
    error,
  }
}
