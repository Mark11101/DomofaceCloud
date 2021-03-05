export const requestRfidKeys = (companyId) => {

  return {
    type: 'REQUEST_RFID_KEYS',
    payload: {
      companyId
    }
  }
}

export const requestRfidKeysSuccess = (rfidKeys) => {

  return {
    type: 'REQUEST_RFID_KEYS_SUCCESS',
    payload: {
      rfidKeys
    }
  }
}

export const requestRfidKeysError = (error) => {

  return {
    type: 'REQUEST_RFID_KEYS_ERROR',
    error,
  }
}

export const requestCreateRfidKey = (newRfidKey) => {

  return {
    type: 'REQUEST_CREATE_RFID_KEY',
    payload: {
      newRfidKey
    }
  }
}

export const requestCreateRfidKeySuccess = (response) => {

  return {
    type: 'REQUEST_CREATE_RFID_KEY_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestCreateRfidKeyError = (error) => {

  return {
    type: 'REQUEST_CREATE_RFID_KEY_ERROR',
    error,
  }
}

export const requestDeleteRfidKey = (id) => {

  return {
    type: 'REQUEST_DELETE_RFID_KEY',
    payload: {
      id
    }
  }
}

export const requestDeleteRfidKeySuccess = (response, id) => {

  return {
    type: 'REQUEST_DELETE_RFID_KEY_SUCCESS',
    payload: {
      response,
      id,
    }
  }
}

export const requestDeleteRfidKeyError = (error) => {

  return {
    type: 'REQUEST_DELETE_RFID_KEY_ERROR',
    error,
  }
}
