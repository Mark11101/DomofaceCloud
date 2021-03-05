import { showErrorMessage } from '../../../utils/notifications/messages'

export const initialState = {
  qrCodes: [],
  isQrCodesLoading: false,
}

const FacesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_QR_CODES_SUCCESS':
      return {
        ...state,
        qrCodes: action.payload.qrCodes,
      }

    case 'REQUEST_CREATE_QR_CODE':
      return {
        ...state,
        isQrCodesLoading: true,
      }

    case 'REQUEST_CREATE_QR_CODE_SUCCESS':
      return {
        ...state,
        isQrCodesLoading: false,
      }

    case 'REQUEST_CREATE_QR_CODE_ERROR':

      showErrorMessage('Не удалось добавить код, попробуйте еще раз')  

      return {
        ...state,
        isQrCodesLoading: false,
      }

    case 'REQUEST_DELETE_QR_CODE':
      return {
        ...state,
        isQrCodesLoading: true,
      }

    case 'REQUEST_DELETE_QR_CODE_SUCCESS':
      return {
        ...state,
        isQrCodesLoading: false,
      }

    case 'REQUEST_DELETE_QR_CODE_ERROR':

      showErrorMessage('Не удалось удалить код, попробуйте еще раз')  

      return {
        ...state,
        isQrCodesLoading: false,
      }

    default:
      return state
  }
}

export default FacesReducer;
