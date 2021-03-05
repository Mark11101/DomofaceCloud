export const requestCompanies = () => {

  return {
    type: 'REQUEST_COMPANIES'
  }
}

export const requestCompaniesSuccess = (companies) => {

  return {
    type: 'REQUEST_COMPANIES_SUCCESS',
    payload: {
      companies
    }
  }
}

export const requestCompaniesError = (error) => {

  return {
    type: 'REQUEST_COMPANIES_ERROR',
    error,
  }
}

export const requestCompany = (companyId) => {

  return {
    type: 'REQUEST_COMPANY',
    payload: {
      companyId
    }
  }
}

export const requestCompanySuccess = (response) => {

  return {
    type: 'REQUEST_COMPANY_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestCompanyError = (error) => {

  return {
    type: 'REQUEST_COMPANY_ERROR',
    error,
  }
}

export const requestCreateCompany = (login, password, organization) => {

  return {
    type: 'REQUEST_CREATE_COMPANY',
    payload: {
      login,
      password,
      organization,
    }
  }
}

export const requestCreateCompanySuccess = (response) => {

  return {
    type: 'REQUEST_CREATE_COMPANY_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestCreateCompanyError = (error) => {

  return {
    type: 'REQUEST_CREATE_COMPANY_ERROR',
    error,
  }
}

export const requestUpdateCompany = (id, password, organization) => {

  return {
    type: 'REQUEST_UPDATE_COMPANY',
    payload: {
      id,
      password,
      organization,
    }
  }
}

export const requestUpdateCompanySuccess = (response) => {

  return {
    type: 'REQUEST_UPDATE_COMPANY_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestUpdateCompanyError = (error) => {

  return {
    type: 'REQUEST_UPDATE_COMPANY_ERROR',
    error,
  }
}

export const requestDeleteCompany = (id) => {

  return {
    type: 'REQUEST_DELETE_COMPANY',
    payload: {
      id
    }
  }
}

export const requestDeleteCompanySuccess = (response, id) => {

  return {
    type: 'REQUEST_DELETE_COMPANY_SUCCESS',
    payload: {
      response,
      id,
    }
  }
}

export const requestDeleteCompanyError = (error) => {

  return {
    type: 'REQUEST_DELETE_COMPANY_ERROR',
    error,
  }
}
