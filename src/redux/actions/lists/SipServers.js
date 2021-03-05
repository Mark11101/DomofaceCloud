export const requestSipServers = (companyId) => {

  return {
    type: 'REQUEST_SIP_SERVERS',
    payload: {
      companyId
    }
  }
}

export const requestSipServersSuccess = (sipServers) => {

  return {
    type: 'REQUEST_SIP_SERVERS_SUCCESS',
    payload: {
      sipServers
    }
  }
}

export const requestSipServersError = (error) => {

  return {
    type: 'REQUEST_SIP_SERVERS_ERROR',
    error,
  }
}

export const requestCreateSipServer = (newSipServer) => {

  return {
    type: 'REQUEST_CREATE_SIP_SERVER',
    payload: {
      newSipServer
    }
  }
}

export const requestCreateSipServerSuccess = (response) => {

  return {
    type: 'REQUEST_CREATE_SIP_SERVER_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestCreateSipServerError = (error) => {

  return {
    type: 'REQUEST_CREATE_SIP_SERVER_ERROR',
    error,
  }
}

export const requestUpdateSipServer = (id, editedSipServer) => {

  return {
    type: 'REQUEST_UPDATE_SIP_SERVER',
    payload: {
      id,
      editedSipServer,
    }
  }
}

export const requestUpdateSipServerSuccess = (response) => {

  return {
    type: 'REQUEST_UPDATE_SIP_SERVER_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestUpdateSipServerError = (error) => {

  return {
    type: 'REQUEST_UPDATE_SIP_SERVER_ERROR',
    error,
  }
}

export const requestDeleteSipServer = (id) => {

  return {
    type: 'REQUEST_DELETE_SIP_SERVER',
    payload: {
      id
    }
  }
}

export const requestDeleteSipServerSuccess = (response, id) => {

  return {
    type: 'REQUEST_DELETE_SIP_SERVER_SUCCESS',
    payload: {
      response,
      id,
    }
  }
}

export const requestDeleteSipServerError = (error) => {

  return {
    type: 'REQUEST_DELETE_SIP_SERVER_ERROR',
    error,
  }
}
