import getMatchedDeviceType from '../../utils/responsive/getMatchedDeviceType'

export const initialState = {
  deviceType: getMatchedDeviceType(window.innerWidth),
  displayedView: 'intercom-view',
  host: '192.168.1.95',
}

const UiReducer = (state = initialState, action) => {
  if (action.type === 'RESIZE') {

    return {
      ...state,
      deviceType: action.matchDeviceMedia,
    }

  } else if (action.type === 'SET_DISPLAYED_VIEW') {

    return {
      ...state,
      displayedView: action.viewType,
    }
  } else {
    return state
  }
}

export default UiReducer
