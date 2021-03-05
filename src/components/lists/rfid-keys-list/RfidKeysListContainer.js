import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../../redux/actions/lists/RfidKeys'

import RfidKeysList from './RfidKeysList'

const mapStateToProps = (state) => {

  return {
    rfidKeys: state.rfidKeys.rfidKeys,
    isRfidKeysListLoading: state.rfidKeys.isRfidKeysListLoading,
    intercoms: state.intercoms.intercoms,
    flats: state.flats.flats,
  }
}

const mapDispatchToProps = (dispatch) => {
  const { 
    requestRfidKeys,
    requestCreateRfidKey,
    requestDeleteRfidKey,
  } = bindActionCreators(actions, dispatch);

  return {
    requestRfidKeys: (companyId) => requestRfidKeys(companyId),
    requestCreateRfidKey: (newRfidKey) => requestCreateRfidKey(newRfidKey),
    requestDeleteRfidKey: (id) => requestDeleteRfidKey(id),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RfidKeysList)
