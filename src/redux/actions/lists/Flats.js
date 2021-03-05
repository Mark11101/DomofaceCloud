export const requestFlats = (companyId) => {

  return {
    type: 'REQUEST_FLATS',
    payload: {
      companyId
    }
  }
}

export const requestFlatsSuccess = (flats) => {

  return {
    type: 'REQUEST_FLATS_SUCCESS',
    payload: {
      flats
    }
  }
}

export const requestFlatsError = (error) => {

  return {
    type: 'REQUEST_FLATS_ERROR',
    error,
  }
}

export const requestCreateFlat = (newFlat) => {

  return {
    type: 'REQUEST_CREATE_FLAT',
    payload: {
      newFlat
    }
  }
}

export const requestCreateFlatSuccess = (response) => {

  return {
    type: 'REQUEST_CREATE_FLAT_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestCreateFlatError = (error) => {

  return {
    type: 'REQUEST_CREATE_FLAT_ERROR',
    error,
  }
}

export const requestUpdateFlat = (id, editedFlat) => {

  return {
    type: 'REQUEST_UPDATE_FLAT',
    payload: {
      id,
      editedFlat
    }
  }
}

export const requestUpdateFlatSuccess = (response) => {

  return {
    type: 'REQUEST_UPDATE_FLAT_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestUpdateFlatError = (error) => {

  return {
    type: 'REQUEST_UPDATE_FLAT_ERROR',
    error,
  }
}

export const requestDeleteFlat = (id) => {

  return {
    type: 'REQUEST_DELETE_FLAT',
    payload: {
      id
    }
  }
}

export const requestDeleteFlatSuccess = (response, id) => {

  return {
    type: 'REQUEST_DELETE_FLAT_SUCCESS',
    payload: {
      response,
      id,
    }
  }
}

export const requestDeleteFlatError = (error) => {

  return {
    type: 'REQUEST_DELETE_FLAT_ERROR',
    error,
  }
}
