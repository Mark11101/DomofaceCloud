import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../../redux/actions/lists/FtpServers'

import FtpServersList from './FtpServersList'

const mapStateToProps = (state) => {

  return {
    ftpServers: state.ftpServers.ftpServers,
    companies: state.companies.companies,
    isFtpServersListLoading: state.ftpServers.isFtpServersListLoading,
  }
}

const mapDispatchToProps = (dispatch) => {
  const { 
    requestFtpServers,
    requestCreateFtpServer,
    requestUpdateFtpServer,
    requestDeleteFtpServer,
  } = bindActionCreators(actions, dispatch);

  return {
    requestFtpServers: (companyId) => requestFtpServers(companyId),
    requestCreateFtpServer: (newFtpServer) => requestCreateFtpServer(newFtpServer),
    requestUpdateFtpServer: (id, editedFtpServer) => requestUpdateFtpServer(id, editedFtpServer),
    requestDeleteFtpServer: (id) => requestDeleteFtpServer(id),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FtpServersList)
