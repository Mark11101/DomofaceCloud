import { 
  showSuccessMessage,
  showErrorMessage,
} from '../../../utils/notifications/messages'

export const initialState = {
  firmwares: [],
  files: [],
  encryptedFiles: [],
  isFirmwaresLoading: false,
  isFirmwaresListLoading: false,
};

const filterFilesArrayFromOldOnes = (state, action) => {

  const files = state.files.filter((file) => file.id !== action.payload.id);

  return [
    ...files, 
    { 
      id: action.payload.id, 
      file: action.payload.file
    }
  ]
}

const FacesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_FIRMWARES':
      return {
        ...state,
        isFirmwaresListLoading: true,
      }

    case 'REQUEST_FIRMWARES_SUCCESS':
      return {
        ...state,
        firmwares: action.payload.firmwares,
        isFirmwaresListLoading: false,
      }

    case 'REQUEST_FIRMWARES_ERROR':
      return {
        ...state,
        isFirmwaresListLoading: false,
      }

    case 'REQUEST_FIRMWARES_FILES_SUCCESS':
      return {
        ...state,
        files: filterFilesArrayFromOldOnes(state, action)
      }

    case 'REQUEST_FIRMWARES_ENCRYPTED_FILES_SUCCESS':
      return {
        ...state,
        encryptedFiles: filterFilesArrayFromOldOnes(state, action)
      }

    case 'REQUEST_CREATE_FIRMWARE':
      return {
        ...state,
        isFirmwaresLoading: true,
      }

    case 'REQUEST_CREATE_FIRMWARE_SUCCESS':
      return {
        ...state,
        firmwares: [
          ...state.firmwares,
          action.payload.response,
        ],
        isFirmwaresLoading: false,
      }

    case 'REQUEST_CREATE_FIRMWARE_ERROR':

      showErrorMessage('Не удалось добавить прошивку, попробуйте еще раз')  

      return {
        ...state,
        isFirmwaresLoading: false,
      }

    case 'REQUEST_UPDATE_FIRMWARE':
      return {
        ...state,
        isFirmwaresLoading: true,
      }

    case 'REQUEST_UPDATE_FIRMWARE_SUCCESS':

      showSuccessMessage('Данные успешно обновлены!')

      return {
        ...state,
        firmwares: [
          ...state.firmwares.filter((firmware) => firmware.id !== action.payload.response.id),
          action.payload.response,
        ],
        isFirmwaresLoading: false,
      }

    case 'REQUEST_UPDATE_FIRMWARE_ERROR':

      showErrorMessage('Не удалось обновить прошивку, попробуйте еще раз')  

      return {
        ...state,
        isFirmwaresLoading: false,
      }

    case 'REQUEST_DELETE_FIRMWARE':
      return {
        ...state,
        isFirmwaresLoading: true,
      }

    case 'REQUEST_DELETE_FIRMWARE_SUCCESS':
      return {
        ...state,
        firmwares: state.firmwares.filter((firmware) => firmware.id !== action.payload.id),
        isFirmwaresLoading: false,
      }

    case 'REQUEST_DELETE_FIRMWARE_ERROR':

      showErrorMessage('Не удалось удалить прошивку, попробуйте еще раз')  

      return {
        ...state,
        isFirmwaresLoading: false,
      }

    default:
      return state
  }
}

export default FacesReducer;
