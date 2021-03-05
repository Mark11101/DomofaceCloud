import { showErrorMessage } from '../../utils/notifications/messages'

export const initialState = {
	isArchiveLoading: false,
};

const IntercomUtilsReducer = (state = initialState, action) => {
	switch(action.type) {  
		case 'REQUEST_GENERATE_VIDEO':
			return {
				...state,
				isArchiveLoading: true,
			}

		case 'REQUEST_GENERATE_VIDEO_SUCCESS':
			return {
				...state,
				isArchiveLoading: false,
			}

		case 'REQUEST_GENERATE_VIDEO_ERROR':

			showErrorMessage('Не удалось загрузить видео, попробуйте еще раз')

			return {
				...state,
				isArchiveLoading: false,
			}
		
		default:
			return state
	}
}

export default IntercomUtilsReducer
  