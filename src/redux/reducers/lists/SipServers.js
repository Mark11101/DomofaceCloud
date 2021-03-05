import { 
  showSuccessMessage,
  showErrorMessage,
} from '../../../utils/notifications/messages'

export const initialState = {
  sipServers: [],
  isSipServersLoading: false,
  isSipServersListLoading: false,
}

const FacesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_SIP_SERVERS':
      return {
        ...state,
        isSipServersListLoading: true,
      }

    case 'REQUEST_SIP_SERVERS_SUCCESS':
      return {
        ...state,
        sipServers: action.payload.sipServers,
        isSipServersListLoading: false,
      }

    case 'REQUEST_SIP_SERVERS_ERROR':
      return {
        ...state,
        isSipServersListLoading: false,
      }

    case 'REQUEST_CREATE_SIP_SERVER':
      return {
        ...state,
        isSipServersLoading: true,
      }

    case 'REQUEST_CREATE_SIP_SERVER_SUCCESS':
      return {
        ...state,
        sipServers: [
          ...state.sipServers,
          action.payload.response,
        ],
        isSipServersLoading: false,
      }

    case 'REQUEST_CREATE_SIP_SERVER_ERROR':

      showErrorMessage('Не удалось добавить сервер, попробуйте еще раз')  

      return {
        ...state,
        isSipServersLoading: false,
      }

    case 'REQUEST_UPDATE_SIP_SERVER':
      return {
        ...state,
        isSipServersLoading: true,
      }

    case 'REQUEST_UPDATE_SIP_SERVER_SUCCESS':

      showSuccessMessage('Данные успешно обновлены!')

      return {
        ...state,
        sipServers: [
          ...state.sipServers.filter((sipServer) => sipServer.id !== action.payload.response.id),
          action.payload.response,
        ],
        isSipServersLoading: false,
      }

    case 'REQUEST_UPDATE_SIP_SERVER_ERROR':

      showErrorMessage('Не удалось обновить сервер, попробуйте еще раз')  

      return {
        ...state,
        isSipServersLoading: false,
      }

    case 'REQUEST_DELETE_SIP_SERVER':
      return {
        ...state,
        isSipServersLoading: true,
      }

    case 'REQUEST_DELETE_SIP_SERVER_SUCCESS':
      return {
        ...state,
        sipServers: state.sipServers.filter((sipServer) => sipServer.id !== action.payload.id),
        isSipServersLoading: false,
      }

    case 'REQUEST_DELETE_SIP_SERVER_ERROR':

      showErrorMessage('Не удалось удалить сервер, попробуйте еще раз')  

      return {
        ...state,
        isSipServersLoading: false,
      }

    default:
      return state
  }
}

export default FacesReducer;
