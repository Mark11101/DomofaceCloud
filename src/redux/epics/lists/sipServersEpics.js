import axios from 'axios'
import { map, switchMap, catchError } from 'rxjs/operators'
import { from, of } from 'rxjs'
import { ofType } from 'redux-observable'

import {
  requestSipServersSuccess,
  requestSipServersError,
  requestCreateSipServerSuccess,
  requestCreateSipServerError,
  requestUpdateSipServerSuccess,
  requestUpdateSipServerError,
  requestDeleteSipServerSuccess,
  requestDeleteSipServerError,
} from '../../actions/lists/SipServers'

import config from '../../../config/Config'

const baseUrl = config.baseUrl;

export const requestSipServersEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_SIP_SERVERS'),
  switchMap((action) => 
    from(
      axios.get(baseUrl + '/api/v1/sip_servers', 
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
          requestSipServersSuccess(result.data)
        :
          requestSipServersError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestSipServersError(error))
      }),
    ),
  ),
)

export const requestCreateSipServerEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_CREATE_SIP_SERVER'),
  switchMap((action) => 
    from(
      axios.post(baseUrl + '/api/v1/sip_servers/create', 
        {
          ...action.payload.newSipServer
        },
        {
          headers: {
            'Authorization': `Bearer ${state$.value.auth.access_token}` 
          }
        },
      )
    ).pipe(
      map((result) =>
        result.data
        ?
          requestCreateSipServerSuccess(result.data)
        :
          requestCreateSipServerError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestCreateSipServerError(error))
      }),
    ),
  ),
)

export const requestUpdateSipServerEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_UPDATE_SIP_SERVER'),
  switchMap((action) => 
    from(
      axios.patch(baseUrl + '/api/v1/sip_servers/' + action.payload.id, 
        {
          ...action.payload.editedSipServer
        },
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
          requestUpdateSipServerSuccess(result.data)
        :
          requestUpdateSipServerError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestUpdateSipServerError(error))
      }),
    ),
  ),
)

export const requestDeleteSipServerEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DELETE_SIP_SERVER'),
  switchMap((action) => 
    from(
      axios.delete(baseUrl + '/api/v1/sip_servers/' + action.payload.id, {
        headers: {
          'Authorization': `Bearer ${state$.value.auth.access_token}` 
        }
      })
    ).pipe(
      map((result) =>
        result.data
        ?
          requestDeleteSipServerSuccess(result.data, action.payload.id)
        :
          requestDeleteSipServerError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestDeleteSipServerError(error))
      }),
    ),
  ),
)

export default [
  requestSipServersEpic,
  requestCreateSipServerEpic,
  requestUpdateSipServerEpic,
  requestDeleteSipServerEpic,
]
