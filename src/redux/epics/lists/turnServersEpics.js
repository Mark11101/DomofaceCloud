import axios from 'axios'
import { map, switchMap, catchError } from 'rxjs/operators'
import { from, of } from 'rxjs'
import { ofType } from 'redux-observable'

import {
  requestTurnServersSuccess,
  requestTurnServersError,
  requestCreateTurnServerSuccess,
  requestCreateTurnServerError,
  requestUpdateTurnServerSuccess,
  requestUpdateTurnServerError,
  requestDeleteTurnServerSuccess,
  requestDeleteTurnServerError,
} from '../../actions/lists/TurnServers'

import config from '../../../config/Config'

const baseUrl = config.baseUrl;

export const requestTurnServersEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_TURN_SERVERS'),
  switchMap((action) => 
    from(
      axios.get(baseUrl + '/api/v1/turn_servers', 
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
          requestTurnServersSuccess(result.data)
        :
          requestTurnServersError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestTurnServersError(error))
      }),
    ),
  ),
)

export const requestCreateTurnServerEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_CREATE_TURN_SERVER'),
  switchMap((action) => 
    from(
      axios.post(baseUrl + '/api/v1/turn_servers/create', 
        {
          ...action.payload.newTurnServer
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
          requestCreateTurnServerSuccess(result.data)
        :
          requestCreateTurnServerError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestCreateTurnServerError(error))
      }),
    ),
  ),
)

export const requestUpdateTurnServerEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_UPDATE_TURN_SERVER'),
  switchMap((action) => 
    from(
      axios.patch(baseUrl + '/api/v1/turn_servers/' + action.payload.id, 
        {
          ...action.payload.editedTurnServer
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
          requestUpdateTurnServerSuccess(result.data)
        :
          requestUpdateTurnServerError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestUpdateTurnServerError(error))
      }),
    ),
  ),
)

export const requestDeleteTurnServerEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DELETE_TURN_SERVER'),
  switchMap((action) => 
    from(
      axios.delete(baseUrl + '/api/v1/turn_servers/' + action.payload.id, {
        headers: {
          'Authorization': `Bearer ${state$.value.auth.access_token}` 
        }
      })
    ).pipe(
      map((result) =>
        result.data
        ?
          requestDeleteTurnServerSuccess(result.data, action.payload.id)
        :
          requestDeleteTurnServerError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestDeleteTurnServerError(error))
      }),
    ),
  ),
)

export default [
  requestTurnServersEpic,
  requestCreateTurnServerEpic,
  requestUpdateTurnServerEpic,
  requestDeleteTurnServerEpic,
]
