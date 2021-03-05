import { 
  showSuccessMessage,
  showErrorMessage,
} from '../../../utils/notifications/messages'

export const initialState = {
  residents: [],
  resident: {
    id: '',
    flat_id: '',
    login: '',
    password: '',
    name: '',
    role: '',
  },
  isResidentsLoading: false,
  isResidentsListLoading: false,
}

const FacesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_RESIDENTS':
      return {
        ...state,
        isResidentsListLoading: true,
      }
      
    case 'REQUEST_RESIDENTS_SUCCESS':
      return {
        ...state,
        residents: action.payload.residents,
        isResidentsListLoading: false,
      }
      
    case 'REQUEST_RESIDENTS_ERROR':
      return {
        ...state,
        isResidentsListLoading: false,
      }
      
    case 'REQUEST_RESIDENT':
      return {
        ...state,
        resident: action.payload.response,
      }

    case 'REQUEST_CREATE_RESIDENT':
      return {
        ...state,
        isResidentsLoading: true,
      }

    case 'REQUEST_CREATE_RESIDENT_SUCCESS':
      return {
        ...state,
        residents: [
          ...state.residents,
          action.payload.response,
        ],
        isResidentsLoading: false,
      }

    case 'REQUEST_CREATE_RESIDENT_ERROR':

      showErrorMessage('Не удалось добавить аккаунт, попробуйте еще раз')  

      return {
        ...state,
        isResidentsLoading: false,
      }

    case 'REQUEST_UPDATE_RESIDENT':
      return {
        ...state,
        isResidentsLoading: true,
      }

    case 'REQUEST_UPDATE_RESIDENT_SUCCESS':

      showSuccessMessage('Данные успешно обновлены!')

      return {
        ...state,
        residents: [
          ...state.residents.filter((resident) => resident.id !== action.payload.response.id),
          action.payload.response,
        ],
        isResidentsLoading: false,
      }

    case 'REQUEST_UPDATE_RESIDENT_ERROR':

      showErrorMessage('Не удалось обновить аккаунт, попробуйте еще раз')  

      return {
        ...state,
        isResidentsLoading: false,
      }

    case 'REQUEST_DELETE_RESIDENT':
      return {
        ...state,
        isResidentsLoading: true,
      }

    case 'REQUEST_DELETE_RESIDENT_SUCCESS':
      return {
        ...state,
        residents: state.residents.filter((resident) => resident.id !== action.payload.id),
        isResidentsLoading: false,
      }

    case 'REQUEST_DELETE_RESIDENT_ERROR':

      showErrorMessage('Не удалось удалить аккаунт, попробуйте еще раз')  

      return {
        ...state,
        isResidentsLoading: false,
      }

    default:
      return state
  }
}

export default FacesReducer;
