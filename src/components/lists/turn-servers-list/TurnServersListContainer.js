import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../../redux/actions/lists/TurnServers'

import TurnServersList from './TurnServersList'

const mapStateToProps = (state) => {

  return {
    turnServers: state.turnServers.turnServers,
    companies: state.companies.companies,
    isTurnServersListLoading: state.turnServers.isTurnServersListLoading,
  }
}

const mapDispatchToProps = (dispatch) => {
  const { 
    requestTurnServers,
    requestCreateTurnServer,
    requestUpdateTurnServer,
    requestDeleteTurnServer,
  } = bindActionCreators(actions, dispatch);

  return {
    requestTurnServers: (companyId) => requestTurnServers(companyId),
    requestCreateTurnServer: (newTurnServer) => requestCreateTurnServer(newTurnServer),
    requestUpdateTurnServer: (id, editedTurnServer) => requestUpdateTurnServer(id, editedTurnServer),
    requestDeleteTurnServer: (id) => requestDeleteTurnServer(id),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TurnServersList)
