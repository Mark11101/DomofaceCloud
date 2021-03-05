import axios from 'axios'
import { map, switchMap, catchError } from 'rxjs/operators'
import { from, of } from 'rxjs'
import { ofType } from 'redux-observable'

import {
  requestResidentsSuccess,
  requestResidentsError,
  requestResidentSuccess,
  requestResidentError,
  requestCreateResidentSuccess,
  requestCreateResidentError,
  requestUpdateResidentSuccess,
  requestUpdateResidentError,
  requestDeleteResidentSuccess,
  requestDeleteResidentError,
} from '../../actions/lists/Residents'

import config from '../../../config/Config'

const baseUrl = config.baseUrl;

export const requestResidentsEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_RESIDENTS'),
  switchMap((action) => 
    from(
      axios.get(baseUrl + '/api/v1/tenants', 
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
          requestResidentsSuccess(result.data)
        :
          requestResidentsError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestResidentsError(error))
      }),
    ),
  ),
)

export const requestResidentEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_RESIDENT'),
  switchMap((action) => 
    from(
      axios.get(baseUrl + `/api/v1/tenants/${action.payload.id}`, 
      {
        tenant_id: action.payload.id
      },
      {
        headers: {
          'Authorization': `Bearer ${state$.value.auth.access_token}` 
        }
      })
    ).pipe(
      map((result) =>
        result.data
        ?
          requestResidentSuccess(result.data)
        :
          requestResidentError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestResidentError(error))
      }),
    ),
  ),
)

export const requestCreateResidentEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_CREATE_RESIDENT'),
  switchMap((action) => 
    from(
      axios.post(baseUrl + '/api/v1/tenants/create', 
        {
          flat_id: action.payload.flat_id,
          login: action.payload.login,
          password: action.payload.password,
          temporary: action.payload.temporary,
          name: action.payload.name,
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
          requestCreateResidentSuccess(result.data)
        :
          requestCreateResidentError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestCreateResidentError(error))
      }),
    ),
  ),
)

export const requestUpdateResidentEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_UPDATE_RESIDENT'),
  switchMap((action) => 
    from(
      axios.patch(baseUrl + '/api/v1/tenants/' + action.payload.id, 
        {
          flat_id: action.payload.flat_id,
          login: action.payload.login,
          password: action.payload.password,
          temporary: action.payload.temporary,
          name: action.payload.name,
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
          requestUpdateResidentSuccess(result.data)
        :
          requestUpdateResidentError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestUpdateResidentError(error))
      }),
    ),
  ),
)

export const requestDeleteResidentEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DELETE_RESIDENT'),
  switchMap((action) => 
    from(
      axios.delete(baseUrl + '/api/v1/tenants/' + action.payload.id, {
        headers: {
          'Authorization': `Bearer ${state$.value.auth.access_token}` 
        }
      })
    ).pipe(
      map((result) =>
        result.data
        ?
          requestDeleteResidentSuccess(result.data, action.payload.id)
        :
          requestDeleteResidentError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestDeleteResidentError(error))
      }),
    ),
  ),
)

export default [
  requestResidentsEpic,
  requestResidentEpic,
  requestCreateResidentEpic,
  requestUpdateResidentEpic,
  requestDeleteResidentEpic,
]
