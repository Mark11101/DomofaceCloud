import { 
  showSuccessMessage,
  showErrorMessage,
} from '../../../utils/notifications/messages'

export const initialState = {
  admins: [],
  isAdminsLoading: false,
  isAdminslistLoading: false,
}

const FacesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_ADMINS':
      return {
        ...state,
        isAdminslistLoading: true,
      }

    case 'REQUEST_ADMINS_SUCCESS':
      return {
        ...state,
        admins: action.payload.admins,
        isAdminslistLoading: false,
      }

    case 'REQUEST_ADMINS_ERROR':
      return {
        ...state,
        isAdminslistLoading: false,
      }
      
    case 'REQUEST_CREATE_ADMIN':
      return {
        ...state,
        isAdminsLoading: true,
      }

    case 'REQUEST_CREATE_ADMIN_SUCCESS':
      return {
        ...state,
        admins: [
          ...state.admins,
          action.payload.response,
        ],
        isAdminsLoading: false,
      }

    case 'REQUEST_CREATE_ADMIN_ERROR':

      showErrorMessage('Не удалось добавить аккаунт, попробуйте еще раз')  

      return {
        ...state,
        isAdminsLoading: false,
      }

    case 'REQUEST_UPDATE_ADMIN':
      return {
        ...state,
        isAdminsLoading: true,
      }

    case 'REQUEST_UPDATE_ADMIN_SUCCESS':

      showSuccessMessage('Аккаунт успешно обновлен!')

      return {
        ...state,
        admins: [
          ...state.admins.filter((admin) => admin.id !== action.payload.response.id),
          action.payload.response,
        ],
        isAdminsLoading: false,
      }

    case 'REQUEST_UPDATE_ADMIN_ERROR':

      showErrorMessage('Не удалось обновить аккаунт, попробуйте еще раз')  

      return {
        ...state,
        isAdminsLoading: false,
      }

    case 'REQUEST_DELETE_ADMIN':
      return {
        ...state,
        isAdminsLoading: true,
      }

    case 'REQUEST_DELETE_ADMIN_SUCCESS':
      return {
        ...state,
        admins: state.admins.filter((admin) => admin.id !== action.payload.id),
        isAdminsLoading: false,
      }

    case 'REQUEST_DELETE_ADMIN_ERROR':

      showErrorMessage('Не удалось удалить аккаунт, попробуйте еще раз')  

      return {
        ...state,
        isAdminsLoading: false,
      }

    default:
      return state
  }
}

export default FacesReducer;
