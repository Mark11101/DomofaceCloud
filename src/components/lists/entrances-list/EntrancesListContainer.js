import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../../redux/actions/lists/Entrances'
import { requestFlats } from '../../../redux/actions/lists/Flats'
import { requestFtpServers } from '../../../redux/actions/lists/FtpServers'
import { requestStunServers } from '../../../redux/actions/lists/StunServers'
import { requestSyslogServers } from '../../../redux/actions/lists/SyslogServers'
import { requestTurnServers } from '../../../redux/actions/lists/TurnServers'
import { requestSipServers } from '../../../redux/actions/lists/SipServers'
import { requestSipCredentials } from '../../../redux/actions/lists/SipCredentials'
import { 
  requestIntercoms,
  requestCreateIntercom
} from '../../../redux/actions/lists/Intercoms'

import EntrancesList from './EntrancesList'

const mapStateToProps = (state) => {

  return {
    role: state.auth.me.role,
    ftpServers: state.ftpServers.ftpServers,
    stunServers: state.stunServers.stunServers,
    syslogServers: state.syslogServers.syslogServers,
    turnServers: state.turnServers.turnServers,
    sipServers: state.sipServers.sipServers,
    sipCredentials: state.sipCredentials.sipCredentials,
    intercoms: state.intercoms.intercoms,
    entrances: state.entrances.entrances,
    isIntercomsListLoading: state.intercoms.isIntercomsListLoading,
    isEntrancesListLoading: state.entrances.isEntrancesListLoading,
  }
}

const mapDispatchToProps = (dispatch) => {
  const { 
    requestEntrances,
    requestCreateEntrance,
    requestUpdateEntrance,
    requestDeleteEntrance,
  } = bindActionCreators(actions, dispatch);

  return {
    requestEntrances: (companyId) => requestEntrances(companyId),
    requestCreateEntrance: (house_id, number) => requestCreateEntrance(house_id, number),
    requestUpdateEntrance: (id, house_id, number) => requestUpdateEntrance(id, house_id, number),
    requestDeleteEntrance: (id) => requestDeleteEntrance(id),
    requestIntercoms: (companyId) => dispatch(requestIntercoms(companyId)),
    requestFlats: (companyId) => dispatch(requestFlats(companyId)),
    requestFtpServers: (companyId) => dispatch(requestFtpServers(companyId)),
    requestStunServers: (companyId) => dispatch(requestStunServers(companyId)),
    requestSyslogServers: (companyId) => dispatch(requestSyslogServers(companyId)),
    requestTurnServers: (companyId) => dispatch(requestTurnServers(companyId)),
    requestSipServers: (companyId) => dispatch(requestSipServers(companyId)),
    requestSipCredentials: (companyId) => dispatch(requestSipCredentials(companyId)),
    requestCreateIntercom: (intercom) => dispatch(requestCreateIntercom(intercom)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EntrancesList)
