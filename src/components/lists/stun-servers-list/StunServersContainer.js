import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../../redux/actions/lists/StunServers'

import StunServersList from './StunServersList'

const mapStateToProps = (state) => {

  return {
    stunServers: state.stunServers.stunServers,
    companies: state.companies.companies,
    isStunServersListLoading: state.stunServers.isStunServersListLoading,
  }
}

const mapDispatchToProps = (dispatch) => {
  const { 
    requestStunServers,
    requestCreateStunServer,
    requestUpdateStunServer,
    requestDeleteStunServer,
  } = bindActionCreators(actions, dispatch);

  return {
    requestStunServers: () => requestStunServers(),
    requestCreateStunServer: (newStunServer) => requestCreateStunServer(newStunServer),
    requestUpdateStunServer: (id, editedStunServer) => requestUpdateStunServer(id, editedStunServer),
    requestDeleteStunServer: (id) => requestDeleteStunServer(id),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StunServersList)
