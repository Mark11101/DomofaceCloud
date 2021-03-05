import axios from 'axios'
import { map, switchMap, catchError } from 'rxjs/operators'
import { from, of } from 'rxjs'
import { ofType } from 'redux-observable'

import {
  requestSyslogServersSuccess,
  requestSyslogServersError,
  requestCreateSyslogServerSuccess,
  requestCreateSyslogServerError,
  requestUpdateSyslogServerSuccess,
  requestUpdateSyslogServerError,
  requestDeleteSyslogServerSuccess,
  requestDeleteSyslogServerError,
} from '../../actions/lists/SyslogServers'

import config from '../../../config/Config'

const baseUrl = config.baseUrl;

export const requestSyslogServersEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_SYSLOG_SERVERS'),
  switchMap((action) => 
    from(
      axios.get(baseUrl + '/api/v1/syslog_servers', 
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
          requestSyslogServersSuccess(result.data)
        :
          requestSyslogServersError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestSyslogServersError(error))
      }),
    ),
  ),
)

export const requestCreateSyslogServerEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_CREATE_SYSLOG_SERVER'),
  switchMap((action) => 
    from(
      axios.post(baseUrl + '/api/v1/syslog_servers/create', 
        {
          ...action.payload.newSyslogServer
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
          requestCreateSyslogServerSuccess(result.data)
        :
          requestCreateSyslogServerError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestCreateSyslogServerError(error))
      }),
    ),
  ),
)

export const requestUpdateSyslogServerEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_UPDATE_SYSLOG_SERVER'),
  switchMap((action) => 
    from(
      axios.patch(baseUrl + '/api/v1/syslog_servers/' + action.payload.id, 
        {
          ...action.payload.editedSyslogServer
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
          requestUpdateSyslogServerSuccess(result.data)
        :
          requestUpdateSyslogServerError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestUpdateSyslogServerError(error))
      }),
    ),
  ),
)

export const requestDeleteSyslogServerEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DELETE_SYSLOG_SERVER'),
  switchMap((action) => 
    from(
      axios.delete(baseUrl + '/api/v1/syslog_servers/' + action.payload.id, {
        headers: {
          'Authorization': `Bearer ${state$.value.auth.access_token}` 
        }
      })
    ).pipe(
      map((result) =>
        result.data
        ?
          requestDeleteSyslogServerSuccess(result.data, action.payload.id)
        :
          requestDeleteSyslogServerError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestDeleteSyslogServerError(error))
      }),
    ),
  ),
)

export default [
  requestSyslogServersEpic,
  requestCreateSyslogServerEpic,
  requestUpdateSyslogServerEpic,
  requestDeleteSyslogServerEpic,
]
