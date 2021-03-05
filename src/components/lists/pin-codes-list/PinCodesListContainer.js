import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../../redux/actions/lists/PinCodes'

import PinCodesList from './PinCodesList'

const mapStateToProps = (state) => {

  return {
    role: state.auth.me.role,
    pinCodes: state.pinCodes.pinCodes,
    isPinCodesListLoading: state.pinCodes.isPinCodesListLoading,
    intercoms: state.intercoms.intercoms,
    flats: state.flats.flats,
  }
}

const mapDispatchToProps = (dispatch) => {
  const { 
    requestPinCodes,
    requestCreatePinCode,
    requestDeletePinCode,
  } = bindActionCreators(actions, dispatch);

  return {
    requestPinCodes: (companyId) => requestPinCodes(companyId),
    requestCreatePinCode: (newPinCode) => requestCreatePinCode(newPinCode),
    requestDeletePinCode: (id) => requestDeletePinCode(id),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PinCodesList)
