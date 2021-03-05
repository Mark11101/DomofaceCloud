import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../../redux/actions/lists/SipCredentials'

import SipCredentialsList from './SipCredentialsList'

const mapStateToProps = (state) => {

  return {
    sipCredentials: state.sipCredentials.sipCredentials,
    isSipCredentialsListLoading: state.sipCredentials.isSipCredentialsListLoading,
  }
}

const mapDispatchToProps = (dispatch) => {
  const { 
    requestSipCredentials,
    requestCreateSipCredential,
    requestUpdateSipCredential,
    requestDeleteSipCredential,
  } = bindActionCreators(actions, dispatch);

  return {
    requestSipCredentials: (companyId) => requestSipCredentials(companyId),
    requestCreateSipCredential: (sip_server_id, login, password) => requestCreateSipCredential(sip_server_id, login, password),
    requestUpdateSipCredential: (id, sip_server_id, login, password) => requestUpdateSipCredential(id, sip_server_id, login, password),
    requestDeleteSipCredential: (id) => requestDeleteSipCredential(id),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SipCredentialsList)
