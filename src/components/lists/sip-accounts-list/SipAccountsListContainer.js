import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../../redux/actions/lists/SipAccounts'
import { requestSipServers } from '../../../redux/actions/lists/SipServers'

import SipAccountsList from './SipAccountsList'

const mapStateToProps = (state) => {

  return {
    sipAccounts: state.sipAccounts.sipAccounts,
    isSipAccountsListLoading: state.sipAccounts.isSipAccountsListLoading,
    intercoms: state.intercoms.intercoms,
    flats: state.flats.flats,
    houses: state.houses.houses,
    entrances: state.entrances.entrances,
    sipServers: state.sipServers.sipServers,
  }
}

const mapDispatchToProps = (dispatch) => {
  const { 
    requestSipAccounts,
    requestCreateSipAccount,
    requestUpdateSipAccount,
    requestDeleteSipAccount,
  } = bindActionCreators(actions, dispatch);

  return {
    requestSipServers: (companyId) => dispatch(requestSipServers(companyId)),
    requestSipAccounts: (companyId) => requestSipAccounts(companyId),
    requestCreateSipAccount: (
      intercom_id,
      sip_server_id,
      flat_id,
      login,
      password,
    ) => requestCreateSipAccount(
      intercom_id,
      sip_server_id,
      flat_id,
      login,
      password,
    ),
    requestUpdateSipAccount: (
      id,
      intercom_id,
      sip_server_id,
      flat_id,
      login,
      password,
    ) => requestUpdateSipAccount(
      id,
      intercom_id,
      sip_server_id,
      flat_id,
      login,
      password,
    ),
    requestDeleteSipAccount: (id) => requestDeleteSipAccount(id),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SipAccountsList)
