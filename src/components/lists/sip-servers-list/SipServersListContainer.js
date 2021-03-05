import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../../redux/actions/lists/SipServers'
import { requestIntercoms } from '../../../redux/actions/lists/Intercoms'
import { requestFlats } from '../../../redux/actions/lists/Flats'
import { requestHouses } from '../../../redux/actions/lists/Houses'
import { requestEntrances } from '../../../redux/actions/lists/Entrances'

import SipServersList from './SipServersList'

const mapStateToProps = (state) => {

  return {
    sipServers: state.sipServers.sipServers,
    companies: state.companies.companies,
    isSipServersListLoading: state.sipServers.isSipServersListLoading,
  }
}

const mapDispatchToProps = (dispatch) => {
  const { 
    requestSipServers,
    requestCreateSipServer,
    requestUpdateSipServer,
    requestDeleteSipServer,
  } = bindActionCreators(actions, dispatch);

  return {
    requestSipServers: () => requestSipServers(),
    requestCreateSipServer: (newSipServer) => requestCreateSipServer(newSipServer),
    requestUpdateSipServer: (id, editedSipServer) => requestUpdateSipServer(id, editedSipServer),
    requestDeleteSipServer: (id) => requestDeleteSipServer(id),
    requestIntercoms: (companyId) => dispatch(requestIntercoms(companyId)),
    requestFlats: (companyId) => dispatch(requestFlats(companyId)),
    requestHouses: (companyId) => dispatch(requestHouses(companyId)),
    requestEntrances: (companyId) => dispatch(requestEntrances(companyId)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SipServersList)
