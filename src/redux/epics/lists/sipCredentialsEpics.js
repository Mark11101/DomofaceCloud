import axios from 'axios'
import { map, switchMap, catchError } from 'rxjs/operators'
import { from, of } from 'rxjs'
import { ofType } from 'redux-observable'

import {
  requestSipCredentialsSuccess,
  requestSipCredentialsError,
  requestCreateSipCredentialSuccess,
  requestCreateSipCredentialError,
  requestUpdateSipCredentialSuccess,
  requestUpdateSipCredentialError,
  requestDeleteSipCredentialSuccess,
  requestDeleteSipCredentialError,
} from '../../actions/lists/SipCredentials'

import config from '../../../config/Config'

const baseUrl = config.baseUrl;

export const requestSipCredentialsEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_SIP_CREDENTIALS'),
  switchMap((action) => 
    from(
      axios.get(baseUrl + '/api/v1/sip_credentials', 
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
          requestSipCredentialsSuccess(result.data)
        :
          requestSipCredentialsError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestSipCredentialsError(error))
      }),
    ),
  ),
)

export const requestCreateSipCredentialEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_CREATE_SIP_CREDENTIAL'),
  switchMap((action) => 
    from(
      axios.post(baseUrl + '/api/v1/sip_credentials/create', 
        {
          sip_server_id: action.payload.sip_server_id,
          login: action.payload.login,
          password: action.payload.password,
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
          requestCreateSipCredentialSuccess(result.data)
        :
          requestCreateSipCredentialError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestCreateSipCredentialError(error))
      }),
    ),
  ),
)

export const requestUpdateSipCredentialEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_UPDATE_SIP_CREDENTIAL'),
  switchMap((action) => 
    from(
      axios.patch(baseUrl + '/api/v1/sip_credentials/' + action.payload.id, 
        {
          sip_server_id: action.payload.sip_server_id,
          login: action.payload.login,
          password: action.payload.password,
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
          requestUpdateSipCredentialSuccess(result.data)
        :
          requestUpdateSipCredentialError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestUpdateSipCredentialError(error))
      }),
    ),
  ),
)

export const requestDeleteSipCredentialEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DELETE_SIP_CREDENTIAL'),
  switchMap((action) => 
    from(
      axios.delete(baseUrl + '/api/v1/sip_credentials/' + action.payload.id, {
        headers: {
          'Authorization': `Bearer ${state$.value.auth.access_token}` 
        }
      })
    ).pipe(
      map((result) =>
        result.data
        ?
          requestDeleteSipCredentialSuccess(result.data, action.payload.id)
        :
          requestDeleteSipCredentialError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestDeleteSipCredentialError(error))
      }),
    ),
  ),
)

export default [
  requestSipCredentialsEpic,
  requestCreateSipCredentialEpic,
  requestUpdateSipCredentialEpic,
  requestDeleteSipCredentialEpic,
]
