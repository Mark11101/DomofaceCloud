export const requestIntercom = (id) => {

	return {
		type: 'REQUEST_INTERCOM',
		payload: {
			id
		}
	}
}

export const requestIntercomSuccess = (intercom) => {

	return {
		type: 'REQUEST_INTERCOM_SUCCESS',
		payload: {
			intercom
		}
	}
}

export const requestIntercomError = (error) => {

	return {
		type: 'REQUEST_INTERCOM_ERROR',
		error,
	}
}

export const requestIntercoms = (companyId) => {

	return {
		type: 'REQUEST_INTERCOMS',
		payload: {
			companyId
		}
	}
}

export const requestIntercomsSuccess = (intercoms) => {

	return {
		type: 'REQUEST_INTERCOMS_SUCCESS',
		payload: {
			intercoms
		}
	}
}

export const requestIntercomsError = (error) => {

	return {
		type: 'REQUEST_INTERCOMS_ERROR',
		error,
	}
}

export const requestCreateIntercom = (intercom) => {

	return {
		type: 'REQUEST_CREATE_INTERCOM',
		payload: {
			intercom
		}
	}
}

export const requestCreateIntercomSuccess = (response) => {

	return {
		type: 'REQUEST_CREATE_INTERCOM_SUCCESS',
		payload: {
			response
		}
	}
}

export const requestCreateIntercomError = (error) => {

	return {
		type: 'REQUEST_CREATE_INTERCOM_ERROR',
		error,
	}
}

export const requestUpdateIntercom = (id, intercom) => {

	return {
		type: 'REQUEST_UPDATE_INTERCOM',
		payload: {
			id, 
			intercom,
		}
	}
}

export const requestUpdateIntercomSuccess = (response) => {

	return {
		type: 'REQUEST_UPDATE_INTERCOM_SUCCESS',
		payload: {
			response
		}
	}
}

export const requestUpdateIntercomError = (error) => {

	return {
		type: 'REQUEST_UPDATE_INTERCOM_ERROR',
		error,
	}
}

export const requestDeleteIntercom = (id) => {

	return {
		type: 'REQUEST_DELETE_INTERCOM',
		payload: {
			id
		}
	}
}

export const requestDeleteIntercomSuccess = (response, id) => {

	return {
		type: 'REQUEST_DELETE_INTERCOM_SUCCESS',
		payload: {
			response,
			id,
		}
	}
}

export const requestDeleteIntercomError = (error) => {

	return {
		type: 'REQUEST_DELETE_INTERCOM_ERROR',
		error,
	}
}

export const requestRecreateSipCredentials = (intercom_id) => {

	return {
		type: 'REQUEST_RECREATE_SIP_CREDENTIALS',
		payload: {
			intercom_id
		}
	}
}

export const requestRecreateSipCredentialsSuccess = (response) => {

	return {
		type: 'REQUEST_RECREATE_SIP_CREDENTIALS_SUCCESS',
		payload: {
			response
		}
	}
}

export const requestRecreateSipCredentialsError = (error) => {

	return {
		type: 'REQUEST_RECREATE_SIP_CREDENTIALS_ERROR',
		error,
	}
}

export const requestRecreateSipAccounts = (intercom_id) => {

	return {
		type: 'REQUEST_RECREATE_SIP_ACCOUNTS',
		payload: {
			intercom_id
		}
	}
}

export const requestRecreateSipAccountsSuccess = (response) => {

	return {
		type: 'REQUEST_RECREATE_SIP_ACCOUNTS_SUCCESS',
		payload: {
			response
		}
	}
}

export const requestRecreateSipAccountsError = (error) => {

	return {
		type: 'REQUEST_RECREATE_SIP_ACCOUNTS_ERROR',
		error,
	}
}
	
export const setIntercomWasUpdated = (condition) => {

	return {
		type: 'SET_INTERCOM_WAS_UPDATED',
		payload: {
			condition
		}
	}
}
