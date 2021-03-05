import {
  showSuccessMessage,
  showErrorMessage,
} from '../../utils/notifications/messages'

export const initialState = {
  info: {
    id: '',
    create_datetime: '',
    update_datetime: '',
    device_id: '',
    hardware_version: '',
    software_version: '',
    entrance_id: '',
    ftp_server_id: '',
    stun_server_id: '',
    syslog_server_id: '',
    flats_turn_server_id: '',
    emergency_turn_server_id: '',
    flat_sip_server_id: '',
    emergency_sip_server_id: '',
    flats_sip_credential_id: '',
    emergency_sip_credential_id: '',
    is_ssl: true,
    ssl_key: '',
    host: '',
    status: '',
    settings: {},
    sync: true
  },
  isIntercomUtilsLoading: false,
};

const IntercomUtilsReducer = (state = initialState, action) => {
  switch(action.type) {  
    case 'SET_INTERCOM_INFO':
      return {
        ...state,
        info: {
          ...state.info,
          ...action.payload.intercom,
        }
      }

    case 'REQUEST_OPEN_DOOR_SUCCESS': 
			action.payload.response.status === 'failure'
			?
				showErrorMessage('Не удалось открыть дверь, попробуйте еще раз')
			:
				showSuccessMessage('Дверь открыта!')

      return state

    case 'REQUEST_OPEN_DOOR_ERROR': 
      showErrorMessage('Не удалось открыть дверь, попробуйте еще раз')
      return state

    case 'REQUEST_REBOOT_INTERCOM':
      return {
        ...state,
        isIntercomUtilsLoading: true,
      }

    case 'REQUEST_REBOOT_INTERCOM_ERROR':

      showErrorMessage('Не удалось перезагрузить домофон, попробуйте еще раз')

      return {
        ...state,
        isIntercomUtilsLoading: false,
      }

    case 'REQUEST_REBOOT_INTERCOM_SUCCESS':
      return {
        ...state,
        isIntercomUtilsLoading: false,
      }

    case 'REQUEST_UPDATE_INTERCOM_FIRMWARE_ERROR':
      showErrorMessage('Не удалось обновить прошивку, попробуйте еще раз')
      return state

    case 'REQUEST_UPDATE_INTERCOM_FIRMWARE_SUCCESS':
      action.payload.response.status === 'failure'
			?
				showErrorMessage('Не удалось обновить прошивку, попробуйте еще раз')
			:
        showSuccessMessage('Прошивка обновлена!')

      return state
    
    default:
      return state
  }
}

export default IntercomUtilsReducer
