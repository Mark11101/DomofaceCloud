import axios from 'axios'
import { map, switchMap, catchError } from 'rxjs/operators'
import { from, of } from 'rxjs'
import { ofType } from 'redux-observable'

import {
  requestRfidKeysSuccess,
  requestRfidKeysError,
  requestCreateRfidKeySuccess,
  requestCreateRfidKeyError,
  requestDeleteRfidKeySuccess,
  requestDeleteRfidKeyError,
} from '../../actions/lists/RfidKeys'

import config from '../../../config/Config'

const baseUrl = config.baseUrl;

export const requestRfidKeysEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_RFID_KEYS'),
  switchMap((action) => 
    from(
      axios.get(baseUrl + '/api/v1/rfid_keys', 
        {
          headers: {
            'Authorization': `Bearer ${state$.value.auth.access_token}` 
          }
        },
        action.payload.companyId
      )
    ).pipe(
      map((result) =>
        result.data
        ?
          requestRfidKeysSuccess(result.data)
        :
          requestRfidKeysError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestRfidKeysError(error))
      }),
    ),
  ),
)

export const requestCreateRfidKeyEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_CREATE_RFID_KEY'),
  switchMap((action) => 
    from(
      axios.post(baseUrl + '/api/v1/rfid_keys/create', action.payload.newRfidKey,
        {
          headers: {
            'Authorization': `Bearer ${state$.value.auth.access_token}` 
          }
        }
      )
    ).pipe(
      map((result) =>
        result.data
        ?
          requestCreateRfidKeySuccess(result.data)
        :
          requestCreateRfidKeyError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestCreateRfidKeyError(error))
      }),
    ),
  ),
)

export const requestDeleteRfidKeyEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DELETE_RFID_KEY'),
  switchMap((action) => 
    from(
      axios.delete(baseUrl + '/api/v1/rfid_keys/' + action.payload.id, {
        headers: {
          'Authorization': `Bearer ${state$.value.auth.access_token}` 
        }
      })
    ).pipe(
      map((result) =>
        result.data
        ?
          requestDeleteRfidKeySuccess(result.data, action.payload.id)
        :
          requestDeleteRfidKeyError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestDeleteRfidKeyError(error))
      }),
    ),
  ),
)

export default [
  requestRfidKeysEpic,
  requestCreateRfidKeyEpic,
  requestDeleteRfidKeyEpic,
]
