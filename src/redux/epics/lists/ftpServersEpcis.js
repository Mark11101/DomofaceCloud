import axios from 'axios'
import { map, switchMap, catchError } from 'rxjs/operators'
import { from, of } from 'rxjs'
import { ofType } from 'redux-observable'

import {
  requestFtpServersSuccess,
  requestFtpServersError,
  requestCreateFtpServerSuccess,
  requestCreateFtpServerError,
  requestUpdateFtpServerSuccess,
  requestUpdateFtpServerError,
  requestDeleteFtpServerSuccess,
  requestDeleteFtpServerError,
} from '../../actions/lists/FtpServers'

import config from '../../../config/Config'

const baseUrl = config.baseUrl;

export const requestFtpServersEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_FTP_SERVERS'),
  switchMap((action) => 
    from(
      axios.get(baseUrl + '/api/v1/ftp_servers', 
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
          requestFtpServersSuccess(result.data)
        :
          requestFtpServersError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestFtpServersError(error))
      }),
    ),
  ),
)

export const requestCreateFtpServerEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_CREATE_FTP_SERVER'),
  switchMap((action) => 
    from(
      axios.post(baseUrl + '/api/v1/ftp_servers/create', 
        {
          ...action.payload.newFtpServer,
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
          requestCreateFtpServerSuccess(result.data)
        :
          requestCreateFtpServerError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestCreateFtpServerError(error))
      }),
    ),
  ),
)

export const requestUpdateFtpServerEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_UPDATE_FTP_SERVER'),
  switchMap((action) => 
    from(
      axios.patch(baseUrl + '/api/v1/ftp_servers/' + action.payload.id, 
        {
          ...action.payload.editedFtpServer
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
          requestUpdateFtpServerSuccess(result.data)
        :
          requestUpdateFtpServerError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestUpdateFtpServerError(error))
      }),
    ),
  ),
)

export const requestDeleteFtpServerEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DELETE_FTP_SERVER'),
  switchMap((action) => 
    from(
      axios.delete(baseUrl + '/api/v1/ftp_servers/' + action.payload.id, {
        headers: {
          'Authorization': `Bearer ${state$.value.auth.access_token}` 
        }
      })
    ).pipe(
      map((result) =>
        result.data
        ?
          requestDeleteFtpServerSuccess(result.data, action.payload.id)
        :
          requestDeleteFtpServerError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestDeleteFtpServerError(error))
      }),
    ),
  ),
)

export default [
  requestFtpServersEpic,
  requestCreateFtpServerEpic,
  requestUpdateFtpServerEpic,
  requestDeleteFtpServerEpic,
]
