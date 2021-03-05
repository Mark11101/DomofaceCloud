export const requestOpenDoor = (intercomId) => {

  return {
    type: 'REQUEST_OPEN_DOOR',
    payload: {
      intercomId
    }
  }
}

export const requestOpenDoorSuccess = (response) => {

  return {
    type: 'REQUEST_OPEN_DOOR_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestOpenDoorError = (error) => {

  return {
    type: 'REQUEST_OPEN_DOOR_ERROR',
    error,
  }
}

export const requestRebootIntercom = (intercomId) => {

  return {
    type: 'REQUEST_REBOOT_INTERCOM',
    payload: {
      intercomId
    }
  }
}

export const requestRebootIntercomSuccess = () => {

  return {
    type: 'REQUEST_REBOOT_INTERCOM_SUCCESS'
  }
}

export const requestRebootIntercomError = () => {

  return {
    type: 'REQUEST_REBOOT_INTERCOM_ERROR'
  }
}

export const requestUpdateIntercomFirmware = (intercomId, firmwareId) => {

  return {
    type: 'REQUEST_UPDATE_INTERCOM_FIRMWARE',
    payload: {
      intercomId, 
      firmwareId
    }
  }
}

export const requestUpdateIntercomFirmwareSuccess = (response) => {

  return {
    type: 'REQUEST_UPDATE_INTERCOM_FIRMWARE_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestUpdateIntercomFirmwareError = (error) => {

  return {
    type: 'REQUEST_UPDATE_INTERCOM_FIRMWARE_ERROR',
    error
  }
}

export const setIntercomInfo = (intercom) => {

  return {
    type: 'SET_INTERCOM_INFO',
    payload: {
      intercom
    }
  }
}
