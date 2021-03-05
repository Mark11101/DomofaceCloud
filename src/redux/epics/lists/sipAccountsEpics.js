import axios from 'axios'
import { map, switchMap, catchError } from 'rxjs/operators'
import { from, of } from 'rxjs'
import { ofType } from 'redux-observable'

import {
  requestSipAccountsSuccess,
  requestSipAccountsError,
  requestCreateSipAccountSuccess,
  requestCreateSipAccountError,
  requestUpdateSipAccountSuccess,
  requestUpdateSipAccountError,
  requestDeleteSipAccountSuccess,
  requestDeleteSipAccountError,
} from '../../actions/lists/SipAccounts'

import config from '../../../config/Config'

const baseUrl = config.baseUrl;

export const requestSipAccountsEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_SIP_ACCOUNTS'),
  switchMap((action) => 
    from(
      axios.get(baseUrl + '/api/v1/sip_accounts', 
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
          requestSipAccountsSuccess(result.data)
        :
          requestSipAccountsError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestSipAccountsError(error))
      }),
    ),
  ),
)

export const requestCreateSipAccountEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_CREATE_SIP_ACCOUNT'),
  switchMap((action) => 
    from(
      axios.post(baseUrl + '/api/v1/sip_accounts/create', 
        {
          intercom_id: action.payload.intercom_id,
          sip_server_id: action.payload.sip_server_id,
          flat_id: action.payload.flat_id,
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
          requestCreateSipAccountSuccess(result.data)
        :
          requestCreateSipAccountError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestCreateSipAccountError(error))
      }),
    ),
  ),
)

export const requestUpdateSipAccountEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_UPDATE_SIP_ACCOUNT'),
  switchMap((action) => 
    from(
      axios.patch(baseUrl + '/api/v1/sip_accounts/' + action.payload.id, 
        {
          intercom_id: action.payload.intercom_id,
          sip_server_id: action.payload.sip_server_id,
          flat_id: action.payload.flat_id,
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
          requestUpdateSipAccountSuccess(result.data)
        :
          requestUpdateSipAccountError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestUpdateSipAccountError(error))
      }),
    ),
  ),
)

export const requestDeleteSipAccountEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DELETE_SIP_ACCOUNT'),
  switchMap((action) => 
    from(
      axios.delete(baseUrl + '/api/v1/sip_accounts/' + action.payload.id, {
        headers: {
          'Authorization': `Bearer ${state$.value.auth.access_token}` 
        }
      })
    ).pipe(
      map((result) =>
        result.data
        ?
          requestDeleteSipAccountSuccess(result.data, action.payload.id)
        :
          requestDeleteSipAccountError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestDeleteSipAccountError(error))
      }),
    ),
  ),
)

export default [
  requestSipAccountsEpic,
  requestCreateSipAccountEpic,
  requestUpdateSipAccountEpic,
  requestDeleteSipAccountEpic,
]
