import axios from 'axios'
import { map, switchMap, catchError } from 'rxjs/operators'
import { from, of } from 'rxjs'
import { ofType } from 'redux-observable'

import {
  requestCompaniesSuccess,
  requestCompaniesError,
  requestCompanySuccess,
  requestCompanyError,
  requestCreateCompanySuccess,
  requestCreateCompanyError,
  requestUpdateCompanySuccess,
  requestUpdateCompanyError,
  requestDeleteCompanySuccess,
  requestDeleteCompanyError,
} from '../../actions/lists/Companies'

import config from '../../../config/Config'

const baseUrl = config.baseUrl;

export const requestCompaniesEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_COMPANIES'),
  switchMap(() => 
    from(
      axios.get(baseUrl + '/api/v1/service_companies', {
        headers: {
          'Authorization': `Bearer ${state$.value.auth.access_token}` 
        }
      })
    ).pipe(
      map((result) =>
        result.data
        ?
          requestCompaniesSuccess(result.data)
        :
          requestCompaniesError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestCompaniesError(error))
      }),
    ),
  ),
)

export const requestCompanyEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_COMPANY'),
  switchMap((action) => 
    from(
      axios.get(baseUrl + `/api/v1/service_companies/${action.payload.companyId}`, {
        headers: {
          'Authorization': `Bearer ${state$.value.auth.access_token}` 
        }
      })
    ).pipe(
      map((result) =>
        result.data
        ?
          requestCompanySuccess(result.data)
        :
          requestCompanyError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestCompanyError(error))
      }),
    ),
  ),
)

export const requestCreateCompanyEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_CREATE_COMPANY'),
  switchMap((action) => 
    from(
      axios.post(baseUrl + '/api/v1/service_companies/create', 
        {
          login: action.payload.login,
          password: action.payload.password,
          organization: action.payload.organization,
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
          requestCreateCompanySuccess(result.data)
        :
          requestCreateCompanyError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestCreateCompanyError(error))
      }),
    ),
  ),
)

export const requestUpdateCompanyEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_UPDATE_COMPANY'),
  switchMap((action) => 
    from(
      axios.patch(baseUrl + '/api/v1/service_companies/' + action.payload.id, 
        {
          password: action.payload.password,
          organization: action.payload.organization,
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
          requestUpdateCompanySuccess(result.data)
        :
          requestUpdateCompanyError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestUpdateCompanyError(error))
      }),
    ),
  ),
)

export const requestDeleteCompanyEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DELETE_COMPANY'),
  switchMap((action) => 
    from(
      axios.delete(baseUrl + '/api/v1/service_companies/' + action.payload.id, {
        headers: {
          'Authorization': `Bearer ${state$.value.auth.access_token}` 
        }
      })
    ).pipe(
      map((result) =>
        result.data
        ?
          requestDeleteCompanySuccess(result.data, action.payload.id)
        :
          requestDeleteCompanyError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestDeleteCompanyError(error))
      }),
    ),
  ),
)

export default [
  requestCompaniesEpic,
  requestCompanyEpic,
  requestCreateCompanyEpic,
  requestUpdateCompanyEpic,
  requestDeleteCompanyEpic,
]
