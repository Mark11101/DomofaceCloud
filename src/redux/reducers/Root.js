import { combineReducers } from 'redux'

import Auth from './Auth'
import Ui from './Ui'
import IntercomUtils from './IntercomUtils'
import VideoArchive from './videoArchive'
import Intercoms from './lists/Intercoms'
import Houses from './lists/Houses'
import Entrances from './lists/Entrances'
import Admins from './lists/Admins'
import Companies from './lists/Companies'
import Residents from './lists/Residents'
import Flats from './lists/Flats'
import Faces from './lists/Faces'
import RfidKeys from './lists/RfidKeys'
import PinCodes from './lists/PinCodes'
import QrCodes from './lists/QrCodes'
import SipAccounts from './lists/SipAccounts'
import SipServers from './lists/SipServers'
import SipCredentials from './lists/SipCredentials'
import StunServers from './lists/StunServers'
import SyslogServers from './lists/SyslogServers'
import FtpServers from './lists/FtpServers'
import TurnServers from './lists/TurnServers'
import Firmwares from './lists/Firmwares'

const RootReducer = combineReducers({
  auth: Auth,
  ui: Ui,
  intercomUtils: IntercomUtils,
  videoArchive: VideoArchive,
  intercoms: Intercoms,
  houses: Houses,
  entrances: Entrances,
  admins: Admins,
  companies: Companies, 
  residents: Residents,
  flats: Flats,
  faces: Faces,
  rfidKeys: RfidKeys,
  pinCodes: PinCodes,
  qrCodes: QrCodes,
  sipAccounts: SipAccounts,
  sipServers: SipServers,
  sipCredentials: SipCredentials,
  stunServers: StunServers,
  syslogServers: SyslogServers,
  ftpServers: FtpServers,
  turnServers: TurnServers,
  firmwares: Firmwares,
})

export default RootReducer
