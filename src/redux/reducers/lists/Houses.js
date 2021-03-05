import { 
  showSuccessMessage,
  showErrorMessage,
} from '../../../utils/notifications/messages'

export const initialState = {
  houses: [],
  isHousesLoading: false,
  isHousesListLoading: false,
}

const FacesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_HOUSES':
      return {
        ...state,
        isHousesListLoading: true,
      }

    case 'REQUEST_HOUSES_SUCCESS':
      return {
        ...state,
        houses: action.payload.houses,
        isHousesListLoading: false,
      }

    case 'REQUEST_HOUSES_ERROR':
      return {
        ...state,
        isHousesListLoading: false,
      }

    case 'REQUEST_CREATE_HOUSE':
      return {
        ...state,
        isHousesLoading: true,
      }

    case 'REQUEST_CREATE_HOUSE_SUCCESS':
      return {
        ...state,
        houses: [
          ...state.houses,
          action.payload.response,
        ],
        isHousesLoading: false,
      }

    case 'REQUEST_CREATE_HOUSE_ERROR':

      showErrorMessage('Не удалось добавить дом, попробуйте еще раз')  

      return {
        ...state,
        isHousesLoading: false,
      }

    case 'REQUEST_UPDATE_HOUSE':
      return {
        ...state,
        isHousesLoading: true,
      }

    case 'REQUEST_UPDATE_HOUSE_SUCCESS':

      showSuccessMessage('Данные успешно обновлены!')

      return {
        ...state,
        houses: [
          ...state.houses.filter((house) => house.id !== action.payload.response.id),
          action.payload.response,
        ],
        isHousesLoading: false,
      }

    case 'REQUEST_UPDATE_HOUSE_ERROR':

      showErrorMessage('Не удалось обновить дом, попробуйте еще раз')  

      return {
        ...state,
        isHousesLoading: false,
      }

    case 'REQUEST_DELETE_HOUSE':
      return {
        ...state,
        isHousesLoading: true,
      }

    case 'REQUEST_DELETE_HOUSE_SUCCESS':
      return {
        ...state,
        houses: state.houses.filter((house) => house.id !== action.payload.id),
        isHousesLoading: false,
      }

    case 'REQUEST_DELETE_HOUSE_ERROR':

      showErrorMessage('Не удалось удалить дом, попробуйте еще раз')  

      return {
        ...state,
        isHousesLoading: false,
      }

    default:
      return state
  }
}

export default FacesReducer;
