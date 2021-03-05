import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../../redux/actions/IntercomUtils'
import { requestFirmwares } from '../../../redux/actions/lists/Firmwares'

import Intercom from './Intercom'

const mapStateToProps = (state) => {
  return {
    firmwares: state.firmwares.firmwares,
  }
}

const mapDispatchToProps = (dispatch) => {
  const {
    requestOpenDoor,
    requestRebootIntercom,
    requestUpdateIntercomFirmware,
  } = bindActionCreators(actions, dispatch)

  return {
    requestOpenDoor: (intercomId) => requestOpenDoor(intercomId),
    requestRebootIntercom: (intercomId) => requestRebootIntercom(intercomId),
    requestFirmwares: () => dispatch(requestFirmwares()),
    requestUpdateIntercomFirmware: (intercomId, firmwareId) => requestUpdateIntercomFirmware(intercomId, firmwareId),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Intercom)
