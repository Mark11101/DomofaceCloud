export const requestStunServers = (companyId) => {

  return {
    type: 'REQUEST_STUN_SERVERS',
    payload: {
      companyId
    }
  }
}

export const requestStunServersSuccess = (stunServers) => {

  return {
    type: 'REQUEST_STUN_SERVERS_SUCCESS',
    payload: {
      stunServers
    }
  }
}

export const requestStunServersError = (error) => {

  return {
    type: 'REQUEST_STUN_SERVERS_ERROR',
    error,
  }
}

export const requestCreateStunServer = (newStunServer) => {

  return {
    type: 'REQUEST_CREATE_STUN_SERVER',
    payload: {
      newStunServer
    }
  }
}

export const requestCreateStunServerSuccess = (response) => {

  return {
    type: 'REQUEST_CREATE_STUN_SERVER_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestCreateStunServerError = (error) => {

  return {
    type: 'REQUEST_CREATE_STUN_SERVER_ERROR',
    error,
  }
}

export const requestUpdateStunServer = (id, editedStunServer) => {

  return {
    type: 'REQUEST_UPDATE_STUN_SERVER',
    payload: {
      id,
      editedStunServer,
    }
  }
}

export const requestUpdateStunServerSuccess = (response) => {

  return {
    type: 'REQUEST_UPDATE_STUN_SERVER_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestUpdateStunServerError = (error) => {

  return {
    type: 'REQUEST_UPDATE_STUN_SERVER_ERROR',
    error,
  }
}

export const requestDeleteStunServer = (id) => {

  return {
    type: 'REQUEST_DELETE_STUN_SERVER',
    payload: {
      id
    }
  }
}

export const requestDeleteStunServerSuccess = (response, id) => {

  return {
    type: 'REQUEST_DELETE_STUN_SERVER_SUCCESS',
    payload: {
      response,
      id,
    }
  }
}

export const requestDeleteStunServerError = (error) => {

  return {
    type: 'REQUEST_DELETE_STUN_SERVER_ERROR',
    error,
  }
}
