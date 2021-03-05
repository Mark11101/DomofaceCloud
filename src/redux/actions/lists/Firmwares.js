export const requestFirmwares = () => {

  return {
    type: 'REQUEST_FIRMWARES'
  }
}

export const requestFirmwaresSuccess = (firmwares) => {

  return {
    type: 'REQUEST_FIRMWARES_SUCCESS',
    payload: {
      firmwares
    }
  }
}

export const requestFirmwaresError = (error) => {

  return {
    type: 'REQUEST_FIRMWARES_ERROR',
    error,
  }
}

export const requestFirmwaresFiles = (firmwares) => {
  
  return {
    type: 'REQUEST_FIRMWARES_FILES',
    payload: {
      firmwares
    }
  }
}

export const requestFirmwaresFilesSuccess = (file, id, firmwares) => {
  
  return {
    type: 'REQUEST_FIRMWARES_FILES_SUCCESS',
    payload: {
      file,
      id,
      firmwares,
    }
  }
}

export const requestFirmwaresFilesError = (error) => {

  return {
    type: 'REQUEST_FIRMWARES_FILES_ERROR',
    error,
  }
}

export const requestFirmwaresEncryptedFiles = (firmwares) => {

  return {
    type: 'REQUEST_FIRMWARES_ENCRYPTED_FILES',
    payload: {
      firmwares
    }
  }
}

export const requestFirmwaresEncryptedFilesSuccess = (encryptedFile, id) => {

  return {
    type: 'REQUEST_FIRMWARES_ENCRYPTED_FILES_SUCCESS',
    payload: {
      encryptedFile,
      id,
    }
  }
}

export const requestFirmwaresEncryptedFilesError = (error) => {

  return {
    type: 'REQUEST_FIRMWARES_ENCRYPTED_FILES_ERROR',
    error,
  }
}

export const requestCreateFirmware = (file) => {

  return {
    type: 'REQUEST_CREATE_FIRMWARE',
    payload: {
      file
    }
  }
}

export const requestCreateFirmwareSuccess = (response) => {

  return {
    type: 'REQUEST_CREATE_FIRMWARE_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestCreateFirmwareError = (error) => {

  return {
    type: 'REQUEST_CREATE_FIRMWARE_ERROR',
    error,
  }
}

export const requestUpdateFirmware = (id, file) => {

  return {
    type: 'REQUEST_UPDATE_FIRMWARE',
    payload: {
      id,
      file,
    }
  }
}

export const requestUpdateFirmwareSuccess = (response) => {

  return {
    type: 'REQUEST_UPDATE_FIRMWARE_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestUpdateFirmwareError = (error) => {

  return {
    type: 'REQUEST_UPDATE_FIRMWARE_ERROR',
    error,
  }
}

export const requestDeleteFirmware = (id) => {

  return {
    type: 'REQUEST_DELETE_FIRMWARE',
    payload: {
      id
    }
  }
}

export const requestDeleteFirmwareSuccess = (response, id) => {

  return {
    type: 'REQUEST_DELETE_FIRMWARE_SUCCESS',
    payload: {
      response,
      id,
    }
  }
}

export const requestDeleteFirmwareError = (error) => {

  return {
    type: 'REQUEST_DELETE_FIRMWARE_ERROR',
    error,
  }
}

export const requestDownloadFirmware = (id) => {

  return {
    type: 'REQUEST_DOWNLOAD_FIRMWARE',
    payload: {
      id
    }
  }
}

export const requestDownloadFirmwareSuccess = (response) => {

  return {
    type: 'REQUEST_DOWNLOAD_FIRMWARE_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestDownloadFirmwareError = (error) => {

  return {
    type: 'REQUEST_DOWNLOAD_FIRMWARE_ERROR',
    error,
  }
}

export const requestDownloadEncryptedFirmware = (id) => {

  return {
    type: 'REQUEST_DOWNLOAD_ENCRYPTED_FIRMWARE',
    payload: {
      id
    }
  }
}

export const requestDownloadEncryptedFirmwareSuccess = (response) => {

  return {
    type: 'REQUEST_DOWNLOAD_ENCRYPTED_FIRMWARE_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestDownloadEncryptedFirmwareError = (error) => {

  return {
    type: 'REQUEST_DOWNLOAD_ENCRYPTED_FIRMWARE_ERROR',
    error,
  }
}
