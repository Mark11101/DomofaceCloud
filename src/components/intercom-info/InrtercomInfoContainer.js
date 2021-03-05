import { connect } from 'react-redux'

import {
  requestUpdateIntercom,
  requestDeleteIntercom,
  requestRecreateSipCredentials,
  requestRecreateSipAccounts,
  setIntercomWasUpdated,
} from '../../redux/actions/lists/Intercoms'
import { requestSipCredentials } from '../../redux/actions/lists/SipCredentials' 

import { setIntercomInfo } from '../../redux/actions/IntercomUtils'

import InrtercomInfo from './InrtercomInfo'

const mapStateToProps = (state) => {
  return {
    role: state.auth.me.role,
    ftpServers: state.ftpServers.ftpServers,
    stunServers: state.stunServers.stunServers,
    syslogServers: state.syslogServers.syslogServers,
    turnServers: state.turnServers.turnServers,
    sipServers: state.sipServers.sipServers,
    sipCredentials: state.sipCredentials.sipCredentials,
    isIntercomWasUpdated: state.intercoms.isIntercomWasUpdated,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setIntercomInfo: (intercom) => dispatch(setIntercomInfo(intercom)),
    setIntercomWasUpdated: (condition) => dispatch(setIntercomWasUpdated(condition)),
    requestUpdateIntercom: (id, intercom) => dispatch(requestUpdateIntercom(id, intercom)),
    requestDeleteIntercom: (id) => dispatch(requestDeleteIntercom(id)),
    requestRecreateSipCredentials: (intercom_id) => dispatch(requestRecreateSipCredentials(intercom_id)),
    requestRecreateSipAccounts: (intercom_id) => dispatch(requestRecreateSipAccounts(intercom_id)),
    requestSipCredentials: () => dispatch(requestSipCredentials()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InrtercomInfo)
