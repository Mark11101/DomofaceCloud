import { 
  showSuccessMessage,
  showErrorMessage,
} from '../../../utils/notifications/messages'

export const initialState = {
  ftpServers: [],
  isFtpServersLoading: false,
  isFtpServersListLoading: false,
}

const FacesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_FTP_SERVERS':
      return {
        ...state,
        isFtpServersListLoading: true,
      }

    case 'REQUEST_FTP_SERVERS_SUCCESS':
      return {
        ...state,
        ftpServers: action.payload.ftpServers,
        isFtpServersListLoading: false,
      }

    case 'REQUEST_FTP_SERVERS_ERROR':
      return {
        ...state,
        isFtpServersListLoading: false,
      }

    case 'REQUEST_CREATE_FTP_SERVER':
      return {
        ...state,
        isFtpServersLoading: true,
      }

    case 'REQUEST_CREATE_FTP_SERVER_SUCCESS':
      return {
        ...state,
        ftpServers: [
          ...state.ftpServers,
          action.payload.response,
        ],
        isFtpServersLoading: false,
      }

    case 'REQUEST_CREATE_FTP_SERVER_ERROR':

      showErrorMessage('Не удалось добавить сервер, попробуйте еще раз')  

      return {
        ...state,
        isFtpServersLoading: false,
      }

    case 'REQUEST_UPDATE_FTP_SERVER':
      return {
        ...state,
        isFtpServersLoading: true,
      }

    case 'REQUEST_UPDATE_FTP_SERVER_SUCCESS':

      showSuccessMessage('Данные успешно обновлены!')

      return {
        ...state,
        ftpServers: [
          ...state.ftpServers.filter((ftpServer) => ftpServer.id !== action.payload.response.id),
          action.payload.response,
        ],
        isFtpServersLoading: false,
      }

    case 'REQUEST_UPDATE_FTP_SERVER_ERROR':

      showErrorMessage('Не удалось обновить сервер, попробуйте еще раз')  

      return {
        ...state,
        isFtpServersLoading: false,
      }

    case 'REQUEST_DELETE_FTP_SERVER':
      return {
        ...state,
        isFtpServersLoading: true,
      }

    case 'REQUEST_DELETE_FTP_SERVER_SUCCESS':
      return {
        ...state,
        ftpServers: state.ftpServers.filter((ftpServer) => ftpServer.id !== action.payload.id),
        isFtpServersLoading: false,
      }

    case 'REQUEST_DELETE_FTP_SERVER_ERROR':

      showErrorMessage('Не удалось удалить сервер, попробуйте еще раз')  

      return {
        ...state,
        isFtpServersLoading: false,
      }

    default:
      return state
  }
}

export default FacesReducer;
