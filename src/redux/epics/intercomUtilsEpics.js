import axios from 'axios'
import { map, switchMap, catchError } from 'rxjs/operators'
import { from, of } from 'rxjs'
import { ofType } from 'redux-observable'

import {
  requestOpenDoorSuccess,
  requestOpenDoorError,
  requestRebootIntercomSuccess,
  requestRebootIntercomError,
  requestUpdateIntercomFirmwareSuccess,
  requestUpdateIntercomFirmwareError,
} from '../actions/IntercomUtils'

import { requestLogOut } from '../actions/Auth'

import config from '../../config/Config'

const baseUrl = config.baseUrl;

export const requestOpenDoorEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_OPEN_DOOR'),
  switchMap((action) => 
    from(
			axios.get(baseUrl + `/api/v1/intercoms/${action.payload.intercomId}/utils/open_door`, {
        headers: {
          'Authorization': `Bearer ${state$.value.auth.access_token}` 
        }
      })
    ).pipe(
      map((result) =>
        result.data
        ?
          requestOpenDoorSuccess(result.data)
        :
          requestOpenDoorError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestOpenDoorError(error))
      }),
    ),
  ),
)

export const requestRebootIntercomEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_REBOOT_INTERCOM'),
  switchMap((action) => 
    from(
      axios.get(baseUrl + `/api/v1/intercoms/${action.payload.intercomId}/utils/reboot`, {
        headers: {
          'Authorization': `Bearer ${state$.value.auth.access_token}` 
        }
      })
    ).pipe(
      map((result) =>
        result.data
        ?
          requestRebootIntercomSuccess(result.data)
        :
          requestRebootIntercomError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestRebootIntercomError(error))
      }),
    ),
  ),
)

export const requestRebootIntercomSuccessEpic = (action$) => action$.pipe(
  ofType('REQUEST_REBOOT_INTERCOM_SUCCESS'),
  switchMap(() => of(requestLogOut()))
)

export const requestUpdateIntercomFirmwareEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_UPDATE_INTERCOM_FIRMWARE'),
  switchMap((action) => 
    from(
			axios.post(baseUrl + `/api/v1/intercoms/${action.payload.intercomId}/utils/${action.payload.firmwareId}`, {
        headers: {
          'Authorization': `Bearer ${state$.value.auth.access_token}` 
        }
      })
    ).pipe(
      map((result) =>
        result.data
        ?
          requestUpdateIntercomFirmwareSuccess(result.data)
        :
          requestUpdateIntercomFirmwareError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestUpdateIntercomFirmwareError(error))
      }),
    ),
  ),
)

export default [
  requestOpenDoorEpic,
  requestRebootIntercomEpic,
  requestRebootIntercomSuccessEpic,
  requestUpdateIntercomFirmwareEpic,
]
