import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../../redux/actions/lists/Flats'
import { requestSipServers } from '../../../redux/actions/lists/SipServers'

import FlatsList from './FlatsList'

const mapStateToProps = (state) => {

  return {
    flats: state.flats.flats,
    isFlatsListLoading: state.flats.isFlatsListLoading,
  }
}

const mapDispatchToProps = (dispatch) => {
  const { 
    requestCreateFlat,
    requestUpdateFlat,
    requestDeleteFlat,
  } = bindActionCreators(actions, dispatch);

  return {
    requestCreateFlat: (newFlat) => requestCreateFlat(newFlat),
    requestUpdateFlat: (id, editedFlat) => requestUpdateFlat(id, editedFlat),
    requestDeleteFlat: (id) => requestDeleteFlat(id),
    requestSipServers: (companyId) => dispatch(requestSipServers(companyId)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FlatsList)
