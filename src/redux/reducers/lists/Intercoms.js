import { 
  showSuccessMessage,
  showErrorMessage,
} from '../../../utils/notifications/messages'

export const initialState = {
	intercoms: [],
	isIntercomsLoading: false,
	isIntercomsListLoading: false,
  isIntercomWasUpdated: false,
};

const IntercomsReducer = (state = initialState, action) => {
	switch(action.type) {
    case 'REQUEST_INTERCOMS':
      return {
        ...state,
        isIntercomsListLoading: true,
      }

    case 'REQUEST_INTERCOMS_SUCCESS':
      return {
        ...state,
        intercoms: action.payload.intercoms,
        isIntercomsListLoading: false,
      }

    case 'REQUEST_INTERCOMS_ERROR':
      return {
        ...state,
        isIntercomsListLoading: false,
      }

    case 'REQUEST_CREATE_INTERCOM':
      return {
        ...state,
        isIntercomsLoading: true,
      }

    case 'REQUEST_CREATE_INTERCOM_SUCCESS':
      return {
        ...state,
        intercoms: [
          ...state.intercoms,
          action.payload.response,
        ],
        isIntercomsLoading: false,
      }

    case 'REQUEST_CREATE_INTERCOM_ERROR':

      showErrorMessage('Не удалось добавить домофон, попробуйте еще раз')  

      return {
        ...state,
        isIntercomsLoading: false,
      }

    case 'REQUEST_UPDATE_INTERCOM':
      return {
        ...state,
        // isIntercomsLoading: true,
      }

    case 'REQUEST_UPDATE_INTERCOM_SUCCESS':

      showSuccessMessage('Данные успешно обновлены!')

      return {
        ...state,
        intercoms: [
          ...state.intercoms.filter((intercom) => intercom.id !== action.payload.response.id),
          action.payload.response,
        ],
        isIntercomWasUpdated: true,
        // isIntercomsLoading: false,
      }

    case 'REQUEST_UPDATE_INTERCOM_ERROR':

      showErrorMessage('Не удалось обновить домофон, попробуйте еще раз')  

      return {
        ...state,
        // isIntercomsLoading: false,
      }

    case 'REQUEST_DELETE_INTERCOM':
      return {
        ...state,
        isIntercomsLoading: true,
      }

    case 'REQUEST_DELETE_INTERCOM_SUCCESS':
      return {
        ...state,
        intercoms: state.intercoms.filter((intercom) => intercom.id !== action.payload.id),
        isIntercomsLoading: false,
      }

    case 'REQUEST_DELETE_INTERCOM_ERROR':

      showErrorMessage('Не удалось удалить домофон, попробуйте еще раз')  

      return {
        ...state,
        isIntercomsLoading: false,
      }

    case 'REQUEST_RECREATE_SIP_CREDENTIALS_SUCCESS':

    showSuccessMessage('SIP пользователи успешно привязаны!')
    return state

    case 'REQUEST_RECREATE_SIP_CREDENTIALS_ERROR':

    showErrorMessage('Не удалось привязать SIP пользователей, попробуйте еще раз')
    return state

    case 'REQUEST_RECREATE_SIP_ACCOUNTS_SUCCESS':

    showSuccessMessage('SIP аккаунты успешно привязаны!')
    return state

    case 'REQUEST_RECREATE_SIP_ACCOUNTS_ERROR':

    showErrorMessage('Не удалось привязать SIP аккаунты, попробуйте еще раз')
    return state

    case 'SET_INTERCOM_WAS_UPDATED':
      return {
        ...state,
        isIntercomWasUpdated: action.payload.condition,
      }
    
		default:
			return state
	}
}

export default IntercomsReducer
