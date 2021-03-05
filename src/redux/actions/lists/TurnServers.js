export const requestTurnServers = (companyId) => {

  return {
    type: 'REQUEST_TURN_SERVERS',
    payload: {
      companyId
    }
  }
}

export const requestTurnServersSuccess = (turnServers) => {

  return {
    type: 'REQUEST_TURN_SERVERS_SUCCESS',
    payload: {
      turnServers
    }
  }
}

export const requestTurnServersError = (error) => {

  return {
    type: 'REQUEST_TURN_SERVERS_ERROR',
    error,
  }
}

export const requestCreateTurnServer = (newTurnServer) => {

  return {
    type: 'REQUEST_CREATE_TURN_SERVER',
    payload: {
      newTurnServer
    }
  }
}

export const requestCreateTurnServerSuccess = (response) => {

  return {
    type: 'REQUEST_CREATE_TURN_SERVER_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestCreateTurnServerError = (error) => {

  return {
    type: 'REQUEST_CREATE_TURN_SERVER_ERROR',
    error,
  }
}

export const requestUpdateTurnServer = (id, editedTurnServer) => {

  return {
    type: 'REQUEST_UPDATE_TURN_SERVER',
    payload: {
      id,
      editedTurnServer,
    }
  }
}

export const requestUpdateTurnServerSuccess = (response) => {

  return {
    type: 'REQUEST_UPDATE_TURN_SERVER_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestUpdateTurnServerError = (error) => {

  return {
    type: 'REQUEST_UPDATE_TURN_SERVER_ERROR',
    error,
  }
}

export const requestDeleteTurnServer = (id) => {

  return {
    type: 'REQUEST_DELETE_TURN_SERVER',
    payload: {
      id
    }
  }
}

export const requestDeleteTurnServerSuccess = (response, id) => {

  return {
    type: 'REQUEST_DELETE_TURN_SERVER_SUCCESS',
    payload: {
      response,
      id,
    }
  }
}

export const requestDeleteTurnServerError = (error) => {

  return {
    type: 'REQUEST_DELETE_TURN_SERVER_ERROR',
    error,
  }
}
