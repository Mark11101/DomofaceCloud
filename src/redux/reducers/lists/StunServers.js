import { 
  showSuccessMessage,
  showErrorMessage,
} from '../../../utils/notifications/messages'

export const initialState = {
  stunServers: [],
  isStunServersLoading: false,
  isStunServersListLoading: false,
}

const FacesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_STUN_SERVERS':
      return {
        ...state,
        isStunServersListLoading: true,
      }

    case 'REQUEST_STUN_SERVERS_SUCCESS':
      return {
        ...state,
        stunServers: action.payload.stunServers,
        isStunServersListLoading: false,
      }

    case 'REQUEST_STUN_SERVERS_ERROR':
      return {
        ...state,
        isStunServersListLoading: false,
      }

    case 'REQUEST_CREATE_STUN_SERVER':
      return {
        ...state,
        isStunServersLoading: true,
      }

    case 'REQUEST_CREATE_STUN_SERVER_SUCCESS':
      return {
        ...state,
        stunServers: [
          ...state.stunServers,
          action.payload.response,
        ],
        isStunServersLoading: false,
      }

    case 'REQUEST_CREATE_STUN_SERVER_ERROR':

      showErrorMessage('Не удалось добавить сервер, попробуйте еще раз')  

      return {
        ...state,
        isStunServersLoading: false,
      }

    case 'REQUEST_UPDATE_STUN_SERVER':
      return {
        ...state,
        isStunServersLoading: true,
      }

    case 'REQUEST_UPDATE_STUN_SERVER_SUCCESS':

      showSuccessMessage('Данные успешно обновлены!')

      return {
        ...state,
        stunServers: [
          ...state.stunServers.filter((stunServer) => stunServer.id !== action.payload.response.id),
          action.payload.response,
        ],
        isStunServersLoading: false,
      }

    case 'REQUEST_UPDATE_STUN_SERVER_ERROR':

      showErrorMessage('Не удалось обновить сервер, попробуйте еще раз')  

      return {
        ...state,
        isStunServersLoading: false,
      }

    case 'REQUEST_DELETE_STUN_SERVER':
      return {
        ...state,
        isStunServersLoading: true,
      }

    case 'REQUEST_DELETE_STUN_SERVER_SUCCESS':
      return {
        ...state,
        stunServers: state.stunServers.filter((stunServer) => stunServer.id !== action.payload.id),
        isStunServersLoading: false,
      }

    case 'REQUEST_DELETE_STUN_SERVER_ERROR':

      showErrorMessage('Не удалось удалить сервер, попробуйте еще раз')  

      return {
        ...state,
        isStunServersLoading: false,
      }

    default:
      return state
  }
}

export default FacesReducer;
