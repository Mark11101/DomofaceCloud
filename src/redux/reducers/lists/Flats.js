import { 
  showSuccessMessage,
  showErrorMessage,
} from '../../../utils/notifications/messages'

export const initialState = {
  flats: [],
  isFlatsLoading: false,
  isFlatsListLoading: false,
}

const FacesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_FLATS':
      return {
        ...state,
        isFlatsListLoading: true,
      }

    case 'REQUEST_FLATS_SUCCESS':
      return {
        ...state,
        flats: action.payload.flats,
        isFlatsListLoading: false,
      }

    case 'REQUEST_FLATS_ERROR':
      return {
        ...state,
        isFlatsListLoading: false,
      }

    case 'REQUEST_CREATE_FLAT':
      return {
        ...state,
        isFlatsLoading: true,
      }

    case 'REQUEST_CREATE_FLAT_SUCCESS':
      return {
        ...state,
        flats: [
          ...state.flats,
          action.payload.response,
        ],
        isFlatsLoading: false,
      }

    case 'REQUEST_CREATE_FLAT_ERROR':

      showErrorMessage('Не удалось добавить квартиру, попробуйте еще раз')  

      return {
        ...state,
        isFlatsLoading: false,
      }

    case 'REQUEST_UPDATE_FLAT':
      return {
        ...state,
        isFlatsLoading: true,
      }

    case 'REQUEST_UPDATE_FLAT_SUCCESS':

      showSuccessMessage('Данные успешно обновлены!')
      
      return {
        ...state,
        flats: [
          ...state.flats.filter((flat) => flat.id !== action.payload.response.id),
          action.payload.response,
        ],
        isFlatsLoading: false,
      }

    case 'REQUEST_UPDATE_FLAT_ERROR':

      showErrorMessage('Не удалось обновить квартиру, попробуйте еще раз')  

      return {
        ...state,
        isFlatsLoading: false,
      }

    case 'REQUEST_DELETE_FLAT':
      return {
        ...state,
        isFlatsLoading: true,
      }

    case 'REQUEST_DELETE_FLAT_SUCCESS':
      return {
        ...state,
        flats: state.flats.filter((flat) => flat.id !== action.payload.id),
        isFlatsLoading: false,
      }

    case 'REQUEST_DELETE_FLAT_ERROR':

      showErrorMessage('Не удалось удалить квартиру, попробуйте еще раз')  

      return {
        ...state,
        isFlatsLoading: false,
      }

    default:
      return state
  }
}

export default FacesReducer;
