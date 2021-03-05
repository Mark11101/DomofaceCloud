import DeviceTypes from '../../constants/DeviceTypes'

const getMatchedDeviceType = (width) => {
  switch (true) {
    case width < 768:
      return  DeviceTypes.MOBILE

    case width >= 768 && width < 1200:
      return DeviceTypes.TABLET

    default:
      return DeviceTypes.DESKTOP
  }
}

export default getMatchedDeviceType
