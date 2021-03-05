import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../../redux/actions/lists/Firmwares'

import FirmwaresList from './FirmwaresList'

const mapStateToProps = (state) => {

  return {
    firmwares: state.firmwares.firmwares,
    isFirmwaresListLoading: state.firmwares.isFirmwaresListLoading,
    role: state.auth.me.role,
  }
}

const mapDispatchToProps = (dispatch) => {
  const { 
    requestFirmwares,
    requestCreateFirmware,
    requestUpdateFirmware,
    requestDeleteFirmware,
    requestDownloadFirmware,
    requestDownloadEncryptedFirmware,
  } = bindActionCreators(actions, dispatch);

  return {
    requestFirmwares: () => requestFirmwares(),
    requestCreateFirmware: (file) => requestCreateFirmware(file),
    requestUpdateFirmware: (id, file) => requestUpdateFirmware(id, file),
    requestDeleteFirmware: (id) => requestDeleteFirmware(id),
    requestDownloadFirmware: (id) => requestDownloadFirmware(id),
    requestDownloadEncryptedFirmware: (id) => requestDownloadEncryptedFirmware(id),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FirmwaresList)
