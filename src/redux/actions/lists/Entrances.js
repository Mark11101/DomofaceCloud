export const requestEntrances = (companyId) => {

  return {
    type: 'REQUEST_ENTRANCES',
    payload: {
      companyId
    }
  }
}

export const requestEntrancesSuccess = (entrances) => {

  return {
    type: 'REQUEST_ENTRANCES_SUCCESS',
    payload: {
      entrances
    }
  }
}

export const requestEntrancesError = (error) => {

  return {
    type: 'REQUEST_ENTRANCES_ERROR',
    error,
  }
}

export const requestCreateEntrance = (house_id, number) => {

  return {
    type: 'REQUEST_CREATE_ENTRANCE',
    payload: {
      house_id,
      number,
    }
  }
}

export const requestCreateEntranceSuccess = (response) => {

  return {
    type: 'REQUEST_CREATE_ENTRANCE_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestCreateEntranceError = (error) => {

  return {
    type: 'REQUEST_CREATE_ENTRANCE_ERROR',
    error,
  }
}

export const requestUpdateEntrance = (id, house_id, number) => {

  return {
    type: 'REQUEST_UPDATE_ENTRANCE',
    payload: {
      id,
      house_id,
      number,
    }
  }
}

export const requestUpdateEntranceSuccess = (response) => {

  return {
    type: 'REQUEST_UPDATE_ENTRANCE_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestUpdateEntranceError = (error) => {

  return {
    type: 'REQUEST_UPDATE_ENTRANCE_ERROR',
    error,
  }
}

export const requestDeleteEntrance = (id) => {

  return {
    type: 'REQUEST_DELETE_ENTRANCE',
    payload: {
      id
    }
  }
}

export const requestDeleteEntranceSuccess = (response, id) => {

  return {
    type: 'REQUEST_DELETE_ENTRANCE_SUCCESS',
    payload: {
      response,
      id,
    }
  }
}

export const requestDeleteEntranceError = (error) => {

  return {
    type: 'REQUEST_DELETE_ENTRANCE_ERROR',
    error,
  }
}
