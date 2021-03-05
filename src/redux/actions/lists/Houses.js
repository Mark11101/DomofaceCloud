export const requestHouses = (companyId) => {

  return {
    type: 'REQUEST_HOUSES',
    payload: {
      companyId
    }
  }
}

export const requestHousesSuccess = (houses) => {

  return {
    type: 'REQUEST_HOUSES_SUCCESS',
    payload: {
      houses
    }
  }
}

export const requestHousesError = (error) => {

  return {
    type: 'REQUEST_HOUSES_ERROR',
    error,
  }
}

export const requestCreateHouse = (service_company_id, address, lat, long) => {

  return {
    type: 'REQUEST_CREATE_HOUSE',
    payload: {
      service_company_id,
      address,
      lat,
      long,
    }
  }
}

export const requestCreateHouseSuccess = (response) => {

  return {
    type: 'REQUEST_CREATE_HOUSE_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestCreateHouseError = (error) => {

  return {
    type: 'REQUEST_CREATE_HOUSE_ERROR',
    error,
  }
}

export const requestUpdateHouse = (id, service_company_id, address, lat, long) => {

  return {
    type: 'REQUEST_UPDATE_HOUSE',
    payload: {
      id,
      service_company_id,
      address,
      lat,
      long,
    }
  }
}

export const requestUpdateHouseSuccess = (response) => {

  return {
    type: 'REQUEST_UPDATE_HOUSE_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestUpdateHouseError = (error) => {

  return {
    type: 'REQUEST_UPDATE_HOUSE_ERROR',
    error,
  }
}

export const requestDeleteHouse = (id) => {

  return {
    type: 'REQUEST_DELETE_HOUSE',
    payload: {
      id
    }
  }
}

export const requestDeleteHouseSuccess = (response, id) => {

  return {
    type: 'REQUEST_DELETE_HOUSE_SUCCESS',
    payload: {
      response,
      id,
    }

  }
}

export const requestDeleteHouseError = (error) => {

  return {
    type: 'REQUEST_DELETE_HOUSE_ERROR',
    error,
  }
}
