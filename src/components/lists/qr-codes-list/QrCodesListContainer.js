import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../../redux/actions/lists/QrCodes'

import QrCodesList from './QrCodesList'

const mapStateToProps = (state) => {

  return {
    role: state.auth.me.role,
    qrCodes: state.qrCodes.qrCodes,
    intercoms: state.intercoms.intercoms,
    flats: state.flats.flats,
  }
}

const mapDispatchToProps = (dispatch) => {
  const { 
    requestQrCodes,
    requestCreateQrCode,
    requestDeleteQrCode,
  } = bindActionCreators(actions, dispatch);

  return {
    requestQrCodes: (companyId) => requestQrCodes(companyId),
    requestCreateQrCode: (newQrCode) => requestCreateQrCode(newQrCode),
    requestDeleteQrCode: (id) => requestDeleteQrCode(id),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QrCodesList)
