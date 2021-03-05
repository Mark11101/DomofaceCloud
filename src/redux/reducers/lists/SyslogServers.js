import { 
  showSuccessMessage,
  showErrorMessage,
} from '../../../utils/notifications/messages'

export const initialState = {
  syslogServers: [],
  isSyslogServersLoading: false,
  isSyslogServerslistLoading: false,
}

const FacesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_SYSLOG_SERVERS':
      return {
        ...state,
        isSyslogServerslistLoading: true,
      }

    case 'REQUEST_SYSLOG_SERVERS_SUCCESS':
      return {
        ...state,
        syslogServers: action.payload.syslogServers,
        isSyslogServerslistLoading: false,
      }

    case 'REQUEST_SYSLOG_SERVERS_ERROR':
      return {
        ...state,
        isSyslogServerslistLoading: false,
      }

    case 'REQUEST_CREATE_SYSLOG_SERVER':
      return {
        ...state,
        isSyslogServersLoading: true,
      }

    case 'REQUEST_CREATE_SYSLOG_SERVER_SUCCESS':
      return {
        ...state,
        syslogServers: [
          ...state.syslogServers,
          action.payload.response,
        ],
        isSyslogServersLoading: false,
      }

    case 'REQUEST_CREATE_SYSLOG_SERVER_ERROR':

      showErrorMessage('Не удалось добавить сервер, попробуйте еще раз')  

      return {
        ...state,
        isSyslogServersLoading: false,
      }

    case 'REQUEST_UPDATE_SYSLOG_SERVER':
      return {
        ...state,
        isSyslogServersLoading: true,
      }

    case 'REQUEST_UPDATE_SYSLOG_SERVER_SUCCESS':

      showSuccessMessage('Данные успешно обновлены!')

      return {
        ...state,
        syslogServers: [
          ...state.syslogServers.filter((syslogServer) => syslogServer.id !== action.payload.response.id),
          action.payload.response,
        ],
        isSyslogServersLoading: false,
      }

    case 'REQUEST_UPDATE_SYSLOG_SERVER_ERROR':

      showErrorMessage('Не удалось обновить сервер, попробуйте еще раз')  

      return {
        ...state,
        isSyslogServersLoading: false,
      }

    case 'REQUEST_DELETE_SYSLOG_SERVER':
      return {
        ...state,
        isSyslogServersLoading: true,
      }

    case 'REQUEST_DELETE_SYSLOG_SERVER_SUCCESS':
      return {
        ...state,
        syslogServers: state.syslogServers.filter((syslogServer) => syslogServer.id !== action.payload.id),
        isSyslogServersLoading: false,
      }

    case 'REQUEST_DELETE_SYSLOG_SERVER_ERROR':

      showErrorMessage('Не удалось удалить сервер, попробуйте еще раз')  

      return {
        ...state,
        isSyslogServersLoading: false,
      }

    default:
      return state
  }
}

export default FacesReducer;
