export const requestQrCodes = (companyId) => {

  return {
    type: 'REQUEST_QR_CODES',
    payload: {
      companyId
    }
  }
}

export const requestQrCodesSuccess = (qrCodes) => {

  return {
    type: 'REQUEST_QR_CODES_SUCCESS',
    payload: {
      qrCodes
    }
  }
}

export const requestQrCodesError = (error) => {

  return {
    type: 'REQUEST_QR_CODES_ERROR',
    error,
  }
}

export const requestCreateQrCode = (newQrCode) => {

  return {
    type: 'REQUEST_CREATE_QR_CODE',
    payload: {
      newQrCode
    }
  }
}

export const requestCreateQrCodeSuccess = () => {

  return {
    type: 'REQUEST_CREATE_QR_CODE_SUCCESS'
  }
}

export const requestCreateQrCodeError = (error) => {

  return {
    type: 'REQUEST_CREATE_QR_CODE_ERROR',
    error,
  }
}

export const requestDeleteQrCode = (id) => {

  return {
    type: 'REQUEST_DELETE_QR_CODE',
    payload: {
      id
    }
  }
}

export const requestDeleteQrCodeSuccess = () => {

  return {
    type: 'REQUEST_DELETE_QR_CODE_SUCCESS'
  }
}

export const requestDeleteQrCodeError = (error) => {

  return {
    type: 'REQUEST_DELETE_QR_CODE_ERROR',
    error,
  }
}
