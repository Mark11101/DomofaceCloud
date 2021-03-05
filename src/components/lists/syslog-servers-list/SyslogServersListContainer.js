import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../../redux/actions/lists/SyslogServers'

import SyslogServersList from './SyslogServersList'

const mapStateToProps = (state) => {

  return {
    syslogServers: state.syslogServers.syslogServers,
    companies: state.companies.companies,
    isSyslogServerslistLoading: state.syslogServers.isSyslogServerslistLoading,
  }
}

const mapDispatchToProps = (dispatch) => {
  const { 
    requestSyslogServers,
    requestCreateSyslogServer,
    requestUpdateSyslogServer,
    requestDeleteSyslogServer,
  } = bindActionCreators(actions, dispatch);

  return {
    requestSyslogServers: (companyId) => requestSyslogServers(companyId),
    requestCreateSyslogServer: (newSyslogServer) => requestCreateSyslogServer(newSyslogServer),
    requestUpdateSyslogServer: (id, editedSyslogServer) => requestUpdateSyslogServer(id, editedSyslogServer),
    requestDeleteSyslogServer: (id) => requestDeleteSyslogServer(id),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SyslogServersList)
