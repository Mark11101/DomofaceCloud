import { useSelector } from 'react-redux'

/**
 * Receive device type from redux state
 */
function useDevice() {
  return useSelector((state) => state.ui.deviceType)
}

export default useDevice
