import getMatchedDeviceType from '../../utils/responsive/getMatchedDeviceType'

export const resize = (width) => {
  
  return {
    type: 'RESIZE',
    matchDeviceMedia: getMatchedDeviceType(width),
  }
}

export const setDisplayedView = (viewType) => {

  return {
    type: 'SET_DISPLAYED_VIEW',
    viewType,
  }
}
