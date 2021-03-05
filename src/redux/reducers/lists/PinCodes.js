import { showErrorMessage } from '../../../utils/notifications/messages'

export const initialState = {
  pinCodes: [],
  isPinCodesLoading: false,
  isPinCodesListLoading: false,
}

const FacesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_PIN_CODES':
      return {
        ...state,
        isPinCodesListLoading: true,
      }

    case 'REQUEST_PIN_CODES_SUCCESS':
      return {
        ...state,
        pinCodes: action.payload.pinCodes,
        isPinCodesListLoading: false,
      }

    case 'REQUEST_PIN_CODES_ERROR':
      return {
        ...state,
        isPinCodesListLoading: false,
      }

    case 'REQUEST_CREATE_PIN_CODE':
      return {
        ...state,
        isPinCodesLoading: true,
      }

    case 'REQUEST_CREATE_PIN_CODE_SUCCESS':
      return {
        ...state,
        pinCodes: [
          ...state.pinCodes,
          action.payload.response,
        ],
        isPinCodesLoading: false,
      }

    case 'REQUEST_CREATE_PIN_CODE_ERROR':

      showErrorMessage('Не удалось добавить код, попробуйте еще раз')  

      return {
        ...state,
        isPinCodesLoading: false,
      }

    case 'REQUEST_DELETE_PIN_CODE':
      return {
        ...state,
        isPinCodesLoading: true,
      }

    case 'REQUEST_DELETE_PIN_CODE_SUCCESS':
      return {
        ...state,
        pinCodes: state.pinCodes.filter((pinCode) => pinCode.id !== action.payload.id),
        isPinCodesLoading: false,
      }

    case 'REQUEST_DELETE_PIN_CODE_ERROR':

      showErrorMessage('Не удалось удалить код, попробуйте еще раз')  

      return {
        ...state,
        isPinCodesLoading: false,
      }

    default:
      return state
  }
}

export default FacesReducer;
