import axios from 'axios'
import { map, switchMap, catchError } from 'rxjs/operators'
import { from, of } from 'rxjs'
import { ofType } from 'redux-observable'

import {
  requestStunServersSuccess,
  requestStunServersError,
  requestCreateStunServerSuccess,
  requestCreateStunServerError,
  requestUpdateStunServerSuccess,
  requestUpdateStunServerError,
  requestDeleteStunServerSuccess,
  requestDeleteStunServerError,
} from '../../actions/lists/StunServers'

import config from '../../../config/Config'

const baseUrl = config.baseUrl;

export const requestStunServersEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_STUN_SERVERS'),
  switchMap((action) => 
    from(
      axios.get(baseUrl + '/api/v1/stun_servers', 
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
          requestStunServersSuccess(result.data)
        :
          requestStunServersError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestStunServersError(error))
      }),
    ),
  ),
)

export const requestCreateStunServerEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_CREATE_STUN_SERVER'),
  switchMap((action) => 
    from(
      axios.post(baseUrl + '/api/v1/stun_servers/create', 
        {
          ...action.payload.newStunServer
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
          requestCreateStunServerSuccess(result.data)
        :
          requestCreateStunServerError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestCreateStunServerError(error))
      }),
    ),
  ),
)

export const requestUpdateStunServerEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_UPDATE_STUN_SERVER'),
  switchMap((action) => 
    from(
      axios.patch(baseUrl + '/api/v1/stun_servers/' + action.payload.id, 
        {
          ...action.payload.editedStunServer
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
          requestUpdateStunServerSuccess(result.data)
        :
          requestUpdateStunServerError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestUpdateStunServerError(error))
      }),
    ),
  ),
)

export const requestDeleteStunServerEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DELETE_STUN_SERVER'),
  switchMap((action) => 
    from(
      axios.delete(baseUrl + '/api/v1/stun_servers/' + action.payload.id, {
        headers: {
          'Authorization': `Bearer ${state$.value.auth.access_token}` 
        }
      })
    ).pipe(
      map((result) =>
        result.data
        ?
          requestDeleteStunServerSuccess(result.data, action.payload.id)
        :
          requestDeleteStunServerError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestDeleteStunServerError(error))
      }),
    ),
  ),
)

export default [
  requestStunServersEpic,
  requestCreateStunServerEpic,
  requestUpdateStunServerEpic,
  requestDeleteStunServerEpic,
]
