import { 
  showSuccessMessage,
  showErrorMessage,
} from '../../../utils/notifications/messages'

export const initialState = {
  sipAccounts: [],
  isSipAccountsLoading: false,
  isSipAccountsListLoading: false,
}

const FacesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_SIP_ACCOUNTS':
      return {
        ...state,
        isSipAccountsListLoading: true,
      }

    case 'REQUEST_SIP_ACCOUNTS_SUCCESS':
      return {
        ...state,
        sipAccounts: action.payload.sipAccounts,
        isSipAccountsListLoading: false,
      }

    case 'REQUEST_SIP_ACCOUNTS_ERROR':
      return {
        ...state,
        isSipAccountsListLoading: false,
      }

    case 'REQUEST_CREATE_SIP_ACCOUNT':
      return {
        ...state,
        isSipAccountsLoading: true,
      }

    case 'REQUEST_CREATE_SIP_ACCOUNT_SUCCESS':
      return {
        ...state,
        sipAccounts: [
          ...state.sipAccounts,
          action.payload.response,
        ],
        isSipAccountsLoading: false,
      }

    case 'REQUEST_CREATE_SIP_ACCOUNT_ERROR':

      showErrorMessage('Не удалось добавить аккаунт, попробуйте еще раз')  

      return {
        ...state,
        isSipAccountsLoading: false,
      }

    case 'REQUEST_UPDATE_SIP_ACCOUNT':
      return {
        ...state,
        isSipAccountsLoading: true,
      }

    case 'REQUEST_UPDATE_SIP_ACCOUNT_SUCCESS':

      showSuccessMessage('Данные успешно обновлены!')

      return {
        ...state,
        sipAccounts: [
          ...state.sipAccounts.filter((sipAccount) => sipAccount.id !== action.payload.response.id),
          action.payload.response,
        ],
        isSipAccountsLoading: false,
      }

    case 'REQUEST_UPDATE_SIP_ACCOUNT_ERROR':

      showErrorMessage('Не удалось обновить аккаунт, попробуйте еще раз')  

      return {
        ...state,
        isSipAccountsLoading: false,
      }

    case 'REQUEST_DELETE_SIP_ACCOUNT':
      return {
        ...state,
        isSipAccountsLoading: true,
      }

    case 'REQUEST_DELETE_SIP_ACCOUNT_SUCCESS':
      return {
        ...state,
        sipAccounts: state.sipAccounts.filter((sipAccount) => sipAccount.id !== action.payload.id),
        isSipAccountsLoading: false,
      }

    case 'REQUEST_DELETE_SIP_ACCOUNT_ERROR':

      showErrorMessage('Не удалось удалить аккаунт, попробуйте еще раз')  

      return {
        ...state,
        isSipAccountsLoading: false,
      }

    default:
      return state
  }
}

export default FacesReducer;
