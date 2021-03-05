import axios from 'axios'
import { map, switchMap, catchError } from 'rxjs/operators'
import { from, of } from 'rxjs'
import { ofType } from 'redux-observable'

import {
  requestIntercomSuccess,
  requestIntercomError,
  requestIntercomsSuccess,
  requestIntercomsError,
  requestCreateIntercomSuccess,
  requestCreateIntercomError,
  requestUpdateIntercomSuccess,
  requestUpdateIntercomError,
  requestDeleteIntercomSuccess,
  requestDeleteIntercomError,
  requestRecreateSipCredentialsSuccess,
  requestRecreateSipCredentialsError,
  requestRecreateSipAccountsSuccess,
  requestRecreateSipAccountsError,  
} from '../../actions/lists/Intercoms'

import config from '../../../config/Config'

const baseUrl = config.baseUrl;

export const requestIntercomEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_INTERCOM'),
  switchMap((action) => 
    from(
      axios.get(baseUrl + '/api/v1/intercoms/' + action.payload.id, {
        headers: {
          'Authorization': `Bearer ${state$.value.auth.access_token}` 
        }
      })
    ).pipe(
      map((result) =>
        result.data
        ?
          requestIntercomSuccess(result.data)
        :
          requestIntercomError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestIntercomError(error))
      }),
    ),
  ),
)

export const requestIntercomsEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_INTERCOMS'),
  switchMap(() => 
    from(
      axios.get(baseUrl + '/api/v1/intercoms', {
        headers: {
          'Authorization': `Bearer ${state$.value.auth.access_token}` 
        }
      })
    ).pipe(
      map((result) =>
        result.data
        ?
          requestIntercomsSuccess(result.data)
        :
          requestIntercomsError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestIntercomsError(error))
      }),
    ),
  ),
)

export const requestCreateIntercomEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_CREATE_INTERCOM'),
  switchMap((action) => 
    from(
      axios.post(baseUrl + '/api/v1/intercoms/create', 
        {
          ...action.payload.intercom
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
          requestCreateIntercomSuccess(result.data)
        :
          requestCreateIntercomError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestCreateIntercomError(error))
      }),
    ),
  ),
)

export const requestUpdateIntercomEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_UPDATE_INTERCOM'),
  switchMap((action) => 
    from(
      axios.patch(baseUrl + '/api/v1/intercoms/' + action.payload.id, 
        {
          ...action.payload.intercom
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
          requestUpdateIntercomSuccess(result.data)
        :
          requestUpdateIntercomError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestUpdateIntercomError(error))
      }),
    ),
  ),
)

export const requestDeleteIntercomEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DELETE_INTERCOM'),
  switchMap((action) => 
    from(
      axios.delete(baseUrl + '/api/v1/intercoms/' + action.payload.id, {
        headers: {
          'Authorization': `Bearer ${state$.value.auth.access_token}` 
        }
      })
    ).pipe(
      map((result) =>
        result.data
        ?
          requestDeleteIntercomSuccess(result.data, action.payload.id)
        :
          requestDeleteIntercomError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestDeleteIntercomError(error))
      }),
    ),
  ),
)

export const requestRecreateSipCredentialsEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_RECREATE_SIP_CREDENTIALS'),
  switchMap((action) => 
    from(
      axios.post(baseUrl + `/api/v1/intercoms/${action.payload.intercom_id}/sip_credentials`, 
        {
          intercom_id: action.payload.intercom_id
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
          requestRecreateSipCredentialsSuccess(result.data)
        :
          requestRecreateSipCredentialsError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestRecreateSipCredentialsError(error))
      }),
    ),
  ),
)

export const requestRecreateSipAccountsEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_RECREATE_SIP_ACCOUNTS'),
  switchMap((action) => 
    from(
      axios.post(baseUrl + `/api/v1/intercoms/${action.payload.intercom_id}/sip_accounts`, 
        {
          intercom_id: action.payload.intercom_id
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
          requestRecreateSipAccountsSuccess(result.data)
        :
          requestRecreateSipAccountsError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestRecreateSipAccountsError(error))
      }),
    ),
  ),
)

export default [
  requestIntercomEpic,
  requestIntercomsEpic,
  requestCreateIntercomEpic,
  requestUpdateIntercomEpic,
  requestDeleteIntercomEpic,
  requestRecreateSipCredentialsEpic,
  requestRecreateSipAccountsEpic,
]
