import { 
  showSuccessMessage,
  showErrorMessage,
} from '../../../utils/notifications/messages'

export const initialState = {
  sipCredentials: [],
  isSipCredentialsLoading: false,
  isSipCredentialsListLoading: false,
}

const FacesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_SIP_CREDENTIALS':
      return {
        ...state,
        isSipCredentialsListLoading: true,
      }

    case 'REQUEST_SIP_CREDENTIALS_SUCCESS':
      return {
        ...state,
        sipCredentials: action.payload.sipCredentials,
        isSipCredentialsListLoading: false,
      }

    case 'REQUEST_SIP_CREDENTIALS_ERROR':
      return {
        ...state,
        isSipCredentialsListLoading: false,
      }

    case 'REQUEST_CREATE_SIP_CREDENTIAL':
      return {
        ...state,
        isSipCredentialsLoading: true,
      }

    case 'REQUEST_CREATE_SIP_CREDENTIAL_SUCCESS':
      return {
        ...state,
        sipCredentials: [
          ...state.sipCredentials,
          action.payload.response,
        ],
        isSipCredentialsLoading: false,
      }

    case 'REQUEST_CREATE_SIP_CREDENTIAL_ERROR':

      showErrorMessage('Не удалось добавить пользователя, попробуйте еще раз')  

      return {
        ...state,
        isSipCredentialsLoading: false,
      }

    case 'REQUEST_UPDATE_SIP_CREDENTIAL':
      return {
        ...state,
        isSipCredentialsLoading: true,
      }

    case 'REQUEST_UPDATE_SIP_CREDENTIAL_SUCCESS':

      showSuccessMessage('Данные успешно обновлены!')

      return {
        ...state,
        sipCredentials: [
          ...state.sipCredentials.filter((sipCredential) => sipCredential.id !== action.payload.response.id),
          action.payload.response,
        ],
        isSipCredentialsLoading: false,
      }

    case 'REQUEST_UPDATE_SIP_CREDENTIAL_ERROR':

      showErrorMessage('Не удалось обновить пользователя, попробуйте еще раз')  

      return {
        ...state,
        isSipCredentialsLoading: false,
      }

    case 'REQUEST_DELETE_SIP_CREDENTIAL':
      return {
        ...state,
        isSipCredentialsLoading: true,
      }

    case 'REQUEST_DELETE_SIP_CREDENTIAL_SUCCESS':
      return {
        ...state,
        sipCredentials: state.sipCredentials.filter((sipCredential) => sipCredential.id !== action.payload.id),
        isSipCredentialsLoading: false,
      }

    case 'REQUEST_DELETE_SIP_CREDENTIAL_ERROR':

      showErrorMessage('Не удалось удалить пользователя, попробуйте еще раз')  

      return {
        ...state,
        isSipCredentialsLoading: false,
      }

    default:
      return state
  }
}

export default FacesReducer;
