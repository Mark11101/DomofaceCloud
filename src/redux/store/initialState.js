import { initialState as AuthInitialState } from '../reducers/Auth'
import { initialState as UiInitialState } from '../reducers/Ui'
import { initialState as IntercomUtilsInitialState } from '../reducers/IntercomUtils'
import { initialState as VideoArchiveInitialState } from '../reducers/videoArchive'
import { initialState as IntercomsInitialState } from '../reducers/lists/Intercoms'
import { initialState as CompaniesInitialState } from '../reducers/lists/Companies'
import { initialState as ResidentsInitialState } from '../reducers/lists/Residents'
import { initialState as HousesInitialState } from '../reducers/lists/Houses'
import { initialState as EntrancesInitialState } from '../reducers/lists/Entrances'
import { initialState as AdminsInitialState } from '../reducers/lists/Admins'
import { initialState as FlatsInitialState } from '../reducers/lists/Flats'
import { initialState as FacesInitialState } from '../reducers/lists/Faces'
import { initialState as RfidKeysInitialState } from '../reducers/lists/RfidKeys'
import { initialState as PinCodesInitialState } from '../reducers/lists/PinCodes'
import { initialState as QrCodesInitialState } from '../reducers/lists/QrCodes'
import { initialState as SipAccountsInitialState } from '../reducers/lists/SipAccounts'
import { initialState as SipServersInitialState } from '../reducers/lists/SipServers'
import { initialState as SipCredentialsInitialState } from '../reducers/lists/SipCredentials'
import { initialState as StunServersInitialState } from '../reducers/lists/StunServers'
import { initialState as SyslogServersInitialState } from '../reducers/lists/SyslogServers'
import { initialState as FtpServersInitialState } from '../reducers/lists/FtpServers'
import { initialState as TurnServersInitialState } from '../reducers/lists/TurnServers'
import { initialState as FirmwaresInitialState } from '../reducers/lists/Firmwares'

export const initialState = {
  auth: AuthInitialState,
  ui: UiInitialState,
  intercomUtils: IntercomUtilsInitialState,
  videoArchive: VideoArchiveInitialState,
  intercoms: IntercomsInitialState,
  companies: CompaniesInitialState,
  residents: ResidentsInitialState,
  houses: HousesInitialState,
  entrances: EntrancesInitialState,
  admins: AdminsInitialState,
  flats: FlatsInitialState,
  faces: FacesInitialState,
  rfidKeys: RfidKeysInitialState,
  pinCodes: PinCodesInitialState,
  qrCodes: QrCodesInitialState,
  sipAccounts: SipAccountsInitialState,
  sipServers: SipServersInitialState,
  sipCredentials: SipCredentialsInitialState,
  stunServers: StunServersInitialState,
  syslogServers: SyslogServersInitialState,
  ftpServers: FtpServersInitialState,
  turnServers: TurnServersInitialState,
  firmwares: FirmwaresInitialState,
};
