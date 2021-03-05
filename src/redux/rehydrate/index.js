import rehydrateAuth from './Auth'
import rehydrateUi from './Ui'
import rehydrateIntercomUtils from './IntercomUtils'
import rehydrateVideoArchive from './VideoArchive'
import rehydrateIntercoms from './lists/Intercoms'
import rehydrateCompanies from './lists/Companies'
import rehydrateResidents from './lists/Residents'
import rehydrateHouses from './lists/Houses'
import rehydrateEntrances from './lists/Entrances'
import rehydrateAdmins from './lists/Admins'
import rehydrateFlats from './lists/Flats'
import rehydrateFaces from './lists/Faces'
import rehydrateRfidKeys from './lists/RfidKeys'
import rehydratePinCodes from './lists/PinCodes'
import rehydrateQrCodes from './lists/QrCodes'
import rehydrateSipAccounts from './lists/SipAccounts'
import rehydrateSipServers from './lists/SipServers'
import rehydrateSipCredentials from './lists/SipCredentials'
import rehydrateStunServers from './lists/StunServers'
import rehydrateSyslogServers from './lists/SyslogServers'
import rehydrateFtpServers from './lists/FtpServers'
import rehydrateTurnServers from './lists/TurnServers'
import rehydrateFirmwares from './lists/Firmwares'

const rehydrate = (state) => {
  if (!state) {
    return state
  }

  return {
    ...state,
    auth: rehydrateAuth({ ...state.auth }),
    ui: rehydrateUi({ ...state.ui }),
    intercomUtils: rehydrateIntercomUtils({ ...state.intercomUtils }),
    videoArchive: rehydrateVideoArchive({ ...state.videoArchive }),
    intercoms: rehydrateIntercoms({ ...state.intercoms }),
    companies: rehydrateCompanies({ ...state.companies }),
    residents: rehydrateResidents({ ...state.residents}),
    houses: rehydrateHouses({ ...state.houses }),
    entrances: rehydrateEntrances({ ...state.entrances }),
    admins: rehydrateAdmins({ ...state.admins }),
    flats: rehydrateFlats({ ...state.flats }),
    faces: rehydrateFaces({ ...state.faces }),
    rfidKeys: rehydrateRfidKeys({ ...state.rfidKeys }),
    pinCodes: rehydratePinCodes({ ...state.pinCodes }),
    qrCodes: rehydrateQrCodes({ ...state.qrCodes }),
    sipAccounts: rehydrateSipAccounts({ ...state.sipAccounts }),
    sipServers: rehydrateSipServers({ ...state.sipServers }),
    sipCredentials: rehydrateSipCredentials({ ...state.sipCredentials }),
    stunServers: rehydrateStunServers({ ...state.stunServers }), 
    syslogServers: rehydrateSyslogServers({ ...state.syslogServers }),
    ftpServers: rehydrateFtpServers({ ...state.ftpServers }),
    turnServers: rehydrateTurnServers({ ...state.turnServers }),
    firmwares: rehydrateFirmwares({ ...state.firmwares }),
  }
}

export default rehydrate
