import { 
  showSuccessMessage,
  showErrorMessage,
} from '../../../utils/notifications/messages'

export const initialState = {
  entrances: [],
  isEntrancesLoading: false,
  isEntrancesListLoading: false,
}

const FacesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_ENTRANCES':
      return {
        ...state,
        isEntrancesListLoading: true,
      }

    case 'REQUEST_ENTRANCES_SUCCESS':
      return {
        ...state,
        entrances: action.payload.entrances,
        isEntrancesListLoading: false,
      }

    case 'REQUEST_ENTRANCES_ERROR':
      return {
        ...state,
        isEntrancesListLoading: false,
      }
      
    case 'REQUEST_CREATE_ENTRANCE':
      return {
        ...state,
        isEntrancesLoading: true,
      }

    case 'REQUEST_CREATE_ENTRANCE_SUCCESS':
      return {
        ...state,
        entrances: [
          ...state.entrances,
          action.payload.response,
        ],
        isEntrancesLoading: false,
      }

    case 'REQUEST_CREATE_ENTRANCE_ERROR':

      showErrorMessage('Не удалось добавить подъезд, попробуйте еще раз')  

      return {
        ...state,
        isEntrancesLoading: false,
      }

    case 'REQUEST_UPDATE_ENTRANCE':
      return {
        ...state,
        isEntrancesLoading: true,
      }

    case 'REQUEST_UPDATE_ENTRANCE_SUCCESS':

      showSuccessMessage('Данные успешно обновлены!')

      return {
        ...state,
        entrances: [
          ...state.entrances.filter((entrance) => entrance.id !== action.payload.response.id),
          action.payload.response,
        ],
        isEntrancesLoading: false,
      }

    case 'REQUEST_UPDATE_ENTRANCE_ERROR':

      showErrorMessage('Не удалось обновить подъезд, попробуйте еще раз')  

      return {
        ...state,
        isEntrancesLoading: false,
      }

    case 'REQUEST_DELETE_ENTRANCE':
      return {
        ...state,
        isEntrancesLoading: true,
      }

    case 'REQUEST_DELETE_ENTRANCE_SUCCESS':
      return {
        ...state,
        entrances: state.entrances.filter((entrance) => entrance.id !== action.payload.id),
        isEntrancesLoading: false,
      }

    case 'REQUEST_DELETE_ENTRANCE_ERROR':

      showErrorMessage('Не удалось удалить подъезд, попробуйте еще раз')  

      return {
        ...state,
        isEntrancesLoading: false,
      }

    default:
      return state
  }
}

export default FacesReducer;
