import { showErrorMessage } from '../../../utils/notifications/messages'

export const initialState = {
  rfidKeys: [],
  isRfidKeysLoading: false,
  isRfidKeysListLoading: false,
}

const FacesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_RFID_KEYS':
      return {
        ...state,
        isRfidKeysListLoading: true,
      }

    case 'REQUEST_RFID_KEYS_SUCCESS':
      return {
        ...state,
        rfidKeys: action.payload.rfidKeys,
        isRfidKeysListLoading: false,
      }

    case 'REQUEST_RFID_KEYS_ERROR':
      return {
        ...state,
        isRfidKeysListLoading: false,
      }

    case 'REQUEST_CREATE_RFID_KEY':
      return {
        ...state,
        isRfidKeysLoading: true,
      }

    case 'REQUEST_CREATE_RFID_KEY_SUCCESS':
      return {
        ...state,
        rfidKeys: [
          ...state.rfidKeys,
          action.payload.response,
        ],
        isRfidKeysLoading: false,
      }

    case 'REQUEST_CREATE_RFID_KEY_ERROR':

      showErrorMessage('Не удалось добавить ключ, попробуйте еще раз')  

      return {
        ...state,
        isRfidKeysLoading: false,
      }

    case 'REQUEST_DELETE_RFID_KEY':
      return {
        ...state,
        isRfidKeysLoading: true,
      }

    case 'REQUEST_DELETE_RFID_KEY_SUCCESS':
      return {
        ...state,
        rfidKeys: state.rfidKeys.filter((rfidKey) => rfidKey.id !== action.payload.id),
        isRfidKeysLoading: false,
      }

    case 'REQUEST_DELETE_RFID_KEY_ERROR':

      showErrorMessage('Не удалось удалить ключ, попробуйте еще раз')  

      return {
        ...state,
        isRfidKeysLoading: false,
      }

    default:
      return state
  }
}

export default FacesReducer;
