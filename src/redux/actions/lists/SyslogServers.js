export const requestSyslogServers = (companyId) => {

  return {
    type: 'REQUEST_SYSLOG_SERVERS',
    payload: {
      companyId
    }
  }
}

export const requestSyslogServersSuccess = (syslogServers) => {

  return {
    type: 'REQUEST_SYSLOG_SERVERS_SUCCESS',
    payload: {
      syslogServers
    }
  }
}

export const requestSyslogServersError = (error) => {

  return {
    type: 'REQUEST_SYSLOG_SERVERS_ERROR',
    error,
  }
}

export const requestCreateSyslogServer = (newSyslogServer) => {

  return {
    type: 'REQUEST_CREATE_SYSLOG_SERVER',
    payload: {
      newSyslogServer
    }
  }
}

export const requestCreateSyslogServerSuccess = (response) => {

  return {
    type: 'REQUEST_CREATE_SYSLOG_SERVER_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestCreateSyslogServerError = (error) => {

  return {
    type: 'REQUEST_CREATE_SYSLOG_SERVER_ERROR',
    error,
  }
}

export const requestUpdateSyslogServer = (id, editedSyslogServer) => {

  return {
    type: 'REQUEST_UPDATE_SYSLOG_SERVER',
    payload: {
      id,
      editedSyslogServer,
    }
  }
}

export const requestUpdateSyslogServerSuccess = (response) => {

  return {
    type: 'REQUEST_UPDATE_SYSLOG_SERVER_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestUpdateSyslogServerError = (error) => {

  return {
    type: 'REQUEST_UPDATE_SYSLOG_SERVER_ERROR',
    error,
  }
}

export const requestDeleteSyslogServer = (id) => {

  return {
    type: 'REQUEST_DELETE_SYSLOG_SERVER',
    payload: {
      id
    }
  }
}

export const requestDeleteSyslogServerSuccess = (response, id) => {

  return {
    type: 'REQUEST_DELETE_SYSLOG_SERVER_SUCCESS',
    payload: {
      response,
      id,
    }
  }
}

export const requestDeleteSyslogServerError = (error) => {

  return {
    type: 'REQUEST_DELETE_SYSLOG_SERVER_ERROR',
    error,
  }
}
