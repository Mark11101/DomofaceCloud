import { combineEpics, createEpicMiddleware, } from 'redux-observable'

import uiEpics from './uiEpics'
import authEpics from './authEpics'

import intercomUtilsEpics from './intercomUtilsEpics'
import videoArchiveEpics from './videoArchive'

import intercomsEpics from './lists/intercomsEpics'
import companiesEpics from './lists/companiesEpics'
import residentsEpics from './lists/residentsEpics'
import housesEpics from './lists/housesEpics'
import entrancesEpics from './lists/entrancesEpics'
import adminsEpics from './lists/adminsEpics'
import flatsEpics from './lists/flatsEpics'
import facesEpics from './lists/facesEpics'
import rfidKeysEpics from './lists/rfidKeysEpics' 
import pinCodesEpics from './lists/pinCodesEpics'
import qrCodesEpics from './lists/qrCodesEpics'
import sipAccountsEpics from './lists/sipAccountsEpics'
import sipServersEpics from './lists/sipServersEpics'
import sipCredentialsEpics from './lists/sipCredentialsEpics'
import stunServersEpics from './lists/stunServersEpics'
import syslogServersEpics from './lists/syslogServersEpics'
import ftpServersEpics from './lists/ftpServersEpcis'
import turnServersEpics from './lists/turnServersEpics'
import firmwaresEpics from './lists/firmwaresEpics'

export const rootEpic = combineEpics(
  ...Object.values(authEpics),
  ...Object.values(uiEpics),
  
  ...Object.values(intercomUtilsEpics),
  ...Object.values(videoArchiveEpics),

  ...Object.values(intercomsEpics),
  ...Object.values(companiesEpics),
  ...Object.values(residentsEpics),
  ...Object.values(housesEpics),
  ...Object.values(entrancesEpics),
  ...Object.values(adminsEpics),
  ...Object.values(flatsEpics),
  ...Object.values(facesEpics),
  ...Object.values(rfidKeysEpics),
  ...Object.values(pinCodesEpics),
  ...Object.values(qrCodesEpics),
  ...Object.values(sipAccountsEpics),
  ...Object.values(sipServersEpics),
  ...Object.values(sipCredentialsEpics),
  ...Object.values(stunServersEpics),
  ...Object.values(syslogServersEpics),
  ...Object.values(ftpServersEpics),
  ...Object.values(turnServersEpics),
  ...Object.values(firmwaresEpics),
);

export const epicMiddleware = createEpicMiddleware();
