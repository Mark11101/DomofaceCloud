import { showErrorMessage, showInformationMessage } from '../../utils/notifications/messages'

export const initialState = {
  isLogged: false,
  intercomHealth: false,
  isAuthLoading: false,
  access_token: '',
  refresh_token: '',
  me: {
    id: '',
    create_datetime: '',
    update_datetime: '',
    login: '',
    name: '',
    flat_id: '',
    role: '',
  }
}

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_SIGN_IN':
      return {
        ...state, 
        isAuthLoading: true,
      } 
      
    case 'REQUEST_SIGN_IN_SUCCESS':
      return {
        ...state,
        access_token: action.payload.tokens.access_token,
        refresh_token: action.payload.tokens.refresh_token,
        isLogged: true,
        isAuthLoading: false
      }

    case 'REQUEST_SIGN_IN_ERROR':  

      showErrorMessage('Неправильный логин или пароль, попробуйте еще раз')

      return {
        ...state,
        isLogged: false,
        isAuthLoading: false,
      } 

    case 'REQUEST_CURRENT_USER_SUCCESS': 
      return {
        ...state,
        me: {
          id: action.payload.userData.me.id,
          create_datetime: action.payload.userData.me.create_datetime,
          update_datetime: action.payload.userData.me.update_datetime,
          login: action.payload.userData.me.login,
          role: action.payload.userData.me.role,
          flat_id: action.payload.userData.me.flat_id,
          name: action.payload.userData.me.name,
        }
      }

    case 'REQUEST_UPDATE_TOKEN_SUCCESS':
      return {
        ...state,
        access_token: action.payload.access_token,
      }  

    case 'REQUEST_UPDATE_RESIDENT_SUCCESS':
      return (
        state.me.role === 'tenant'
        ?
          {
            ...state,
            me: {
              ...state.me,
              ...action.payload.response,
            }
          }
        :
          state
      )

    case 'REQUEST_LOG_OUT':
      return {
        ...state,
        isAuthLoading: true,
        isLogged: false,
      }

    case 'REQUEST_LOG_OUT_SUCCESS':
      return initialState

    case 'REQUEST_LOG_OUT_ERROR':
      return {
        ...state,
        isAuthLoading: false,
      }

    case 'REQUEST_INTERCOM_HEALTH_CHECK_SUCCESS':
      return {
        ...state,
        intercomHealth: true,
      }

    case 'REQUEST_INTERCOM_HEALTH_CHECK_ERROR':

      showErrorMessage('Ввведен неправильный логин или пароль, либо домофон не работает')  

      return {
        ...state,
        intercomHealth: false,
      }

    case 'REQUEST_CHECK_AUTH_ERROR':
      showInformationMessage('Время сессии истекло, пожалуйста авторизуйтесь снова')
      return state

    default:
      return state
  }
}

export default AuthReducer
