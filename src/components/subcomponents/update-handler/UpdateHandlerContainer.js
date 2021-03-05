import { connect } from 'react-redux'

import UpdateHandler from './UpdateHandler'

const mapStateToProps = (state) => {
  return {
    isIntercomUtilsLoading: state.intercomUtils.isIntercomUtilsLoading,
    isArchiveLoading: state.videoArchive.isArchiveLoading,
    isAdminsLoading: state.admins.isAdminsLoading,
    isAuthLoading: state.auth.isAuthLoading,
    isCompaniesLoading: state.companies.isCompaniesLoading,
    isHousesLoading: state.houses.isHousesLoading,
    isEntrancesLoading: state.entrances.isEntrancesLoading,
    isFlatsLoading: state.flats.isFlatsLoading,
    isIntercomsLoading: state.intercoms.isIntercomsLoading,
    isResidentsLoading: state.residents.isResidentsLoading,
    isFacesLoading: state.faces.isFacesLoading,
    isRfidKeysLoading: state.rfidKeys.isRfidKeysLoading,
    isPinCodesLoading: state.pinCodes.isPinCodesLoading,
    isQrCodesLoading: state.qrCodes.isQrCodesLoading,
    isSipAccountsLoading: state.sipAccounts.isSipAccountsLoading,
    isSipServersLoading: state.sipServers.isSipServersLoading,
    isSipCredentialsLoading: state.sipCredentials.isSipCredentialsLoading,
    isStunServersLoading: state.stunServers.isStunServersLoading,
    isSyslogServersLoading: state.syslogServers.isSyslogServersLoading,
    isFtpServersLoading: state.ftpServers.isFtpServersLoading,
    isTurnServersLoading: state.turnServers.isTurnServersLoading,
    isFirmwaresLoading: state.firmwares.isFirmwaresLoading,
  }
}

const mapDispatchToProps = () => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateHandler)
