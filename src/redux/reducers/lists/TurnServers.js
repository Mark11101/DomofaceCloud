import { 
  showSuccessMessage,
  showErrorMessage,
} from '../../../utils/notifications/messages'

export const initialState = {
  turnServers: [],
  isTurnServersLoading: false,
  isTurnServersListLoading: false,
}

const FacesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_TURN_SERVERS':
      return {
        ...state,
        isTurnServersListLoading: true,
      }

    case 'REQUEST_TURN_SERVERS_SUCCESS':
      return {
        ...state,
        turnServers: action.payload.turnServers,
        isTurnServersListLoading: false,
      }

    case 'REQUEST_TURN_SERVERS_ERROR':
      return {
        ...state,
        isTurnServersListLoading: false,
      }

    case 'REQUEST_CREATE_TURN_SERVER':
      return {
        ...state,
        isTurnServersLoading: true,
      }

    case 'REQUEST_CREATE_TURN_SERVER_SUCCESS':
      return {
        ...state,
        turnServers: [
          ...state.turnServers,
          action.payload.response,
        ],
        isTurnServersLoading: false,
      }

    case 'REQUEST_CREATE_TURN_SERVER_ERROR':

      showErrorMessage('Не удалось добавить сервер, попробуйте еще раз')  

      return {
        ...state,
        isTurnServersLoading: false,
      }

    case 'REQUEST_UPDATE_TURN_SERVER':
      return {
        ...state,
        isTurnServersLoading: true,
      }

    case 'REQUEST_UPDATE_TURN_SERVER_SUCCESS':

      showSuccessMessage('Данные успешно обновлены!')

      return {
        ...state,
        turnServers: [
          ...state.turnServers.filter((turnServer) => turnServer.id !== action.payload.response.id),
          action.payload.response,
        ],
        isTurnServersLoading: false,
      }

    case 'REQUEST_UPDATE_TURN_SERVER_ERROR':

      showErrorMessage('Не удалось обновить сервер, попробуйте еще раз')  

      return {
        ...state,
        isTurnServersLoading: false,
      }

    case 'REQUEST_DELETE_TURN_SERVER':
      return {
        ...state,
        isTurnServersLoading: true,
      }

    case 'REQUEST_DELETE_TURN_SERVER_SUCCESS':
      return {
        ...state,
        turnServers: state.turnServers.filter((turnServer) => turnServer.id !== action.payload.id),
        isTurnServersLoading: false,
      }

    case 'REQUEST_DELETE_TURN_SERVER_ERROR':

      showErrorMessage('Не удалось удалить сервер, попробуйте еще раз')  

      return {
        ...state,
        isTurnServersLoading: false,
      }

    default:
      return state
  }
}

export default FacesReducer;
