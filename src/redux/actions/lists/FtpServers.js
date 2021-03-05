export const requestFtpServers = (companyId) => {

  return {
    type: 'REQUEST_FTP_SERVERS',
    payload: {
      companyId
    }
  }
}

export const requestFtpServersSuccess = (ftpServers) => {

  return {
    type: 'REQUEST_FTP_SERVERS_SUCCESS',
    payload: {
      ftpServers
    }
  }
}

export const requestFtpServersError = (error) => {

  return {
    type: 'REQUEST_FTP_SERVERS_ERROR',
    error,
  }
}

export const requestCreateFtpServer = (newFtpServer) => {

  return {
    type: 'REQUEST_CREATE_FTP_SERVER',
    payload: {
      newFtpServer
    }
  }
}

export const requestCreateFtpServerSuccess = (response) => {

  return {
    type: 'REQUEST_CREATE_FTP_SERVER_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestCreateFtpServerError = (error) => {

  return {
    type: 'REQUEST_CREATE_FTP_SERVER_ERROR',
    error,
  }
}

export const requestUpdateFtpServer = (id, editedFtpServer) => {

  return {
    type: 'REQUEST_UPDATE_FTP_SERVER',
    payload: {
      id,
      editedFtpServer
    }
  }
}

export const requestUpdateFtpServerSuccess = (response) => {

  return {
    type: 'REQUEST_UPDATE_FTP_SERVER_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestUpdateFtpServerError = (error) => {

  return {
    type: 'REQUEST_UPDATE_FTP_SERVER_ERROR',
    error,
  }
}

export const requestDeleteFtpServer = (id) => {

  return {
    type: 'REQUEST_DELETE_FTP_SERVER',
    payload: {
      id
    }
  }
}

export const requestDeleteFtpServerSuccess = (response, id) => {

  return {
    type: 'REQUEST_DELETE_FTP_SERVER_SUCCESS',
    payload: {
      response,
      id,
    }
  }
}

export const requestDeleteFtpServerError = (error) => {

  return {
    type: 'REQUEST_DELETE_FTP_SERVER_ERROR',
    error,
  }
}
