import axios from 'axios'
import { map, switchMap, catchError } from 'rxjs/operators'
import { from, of } from 'rxjs'
import { ofType } from 'redux-observable'

import {
  requestAdminsSuccess,
  requestAdminsError,
  requestCreateAdminSuccess,
  requestCreateAdminError,
  requestUpdateAdminSuccess,
  requestUpdateAdminError,
  requestDeleteAdminSuccess,
  requestDeleteAdminError,
} from '../../actions/lists/Admins'

import config from '../../../config/Config'

const baseUrl = config.baseUrl;

export const requestAdminsEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_ADMINS'),
  switchMap(() => 
    from(
      axios.get(baseUrl + '/api/v1/admin', {
        headers: {
          'Authorization': `Bearer ${state$.value.auth.access_token}` 
        }
      })
    ).pipe(
      map((result) =>
        result.data
        ?
          requestAdminsSuccess(result.data)
        :
          requestAdminsError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestAdminsError(error))
      }),
    ),
  ),
)

export const requestCreateAdminEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_CREATE_ADMIN'),
  switchMap((action) => 
    from(
      axios.post(baseUrl + '/api/v1/admin/create', 
        {
          login: action.payload.login,
          password: action.payload.password,
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
          requestCreateAdminSuccess(result.data)
        :
          requestCreateAdminError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestCreateAdminError(error))
      }),
    ),
  ),
)

export const requestUpdateAdminEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_UPDATE_ADMIN'),
  switchMap((action) => 
    from(
      axios.patch(baseUrl + '/api/v1/admin/' + action.payload.id,
        {
          password: action.payload.password,
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
          requestUpdateAdminSuccess(result.data)
        :
          requestUpdateAdminError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestUpdateAdminError(error))
      }),
    ),
  ),
)

export const requestDeleteAdminEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DELETE_ADMIN'),
  switchMap((action) => 
    from(
      axios.delete(baseUrl + '/api/v1/admin/' + action.payload.id, {
        headers: {
          'Authorization': `Bearer ${state$.value.auth.access_token}` 
        }
      })
    ).pipe(
      map((result) =>
        result.data
        ?
          requestDeleteAdminSuccess(result.data, action.payload.id)
        :
          requestDeleteAdminError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestDeleteAdminError(error))
      }),
    ),
  ),
)

export default [
  requestAdminsEpic,
  requestCreateAdminEpic,
  requestUpdateAdminEpic,
  requestDeleteAdminEpic,
]
