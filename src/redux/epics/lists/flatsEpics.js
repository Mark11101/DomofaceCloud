import axios from 'axios'
import { map, switchMap, catchError } from 'rxjs/operators'
import { from, of } from 'rxjs'
import { ofType } from 'redux-observable'

import {
  requestFlatsSuccess,
  requestFlatsError,
  requestCreateFlatSuccess,
  requestCreateFlatError,
  requestUpdateFlatSuccess,
  requestUpdateFlatError,
  requestDeleteFlatSuccess,
  requestDeleteFlatError,
} from '../../actions/lists/Flats'

import config from '../../../config/Config'

const baseUrl = config.baseUrl;

export const requestFlatsEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_FLATS'),
  switchMap((action) => 
    from(
      axios.get(baseUrl + '/api/v1/flats', 
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
          requestFlatsSuccess(result.data)
        :
          requestFlatsError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestFlatsError(error))
      }),
    ),
  ),
)

export const requestCreateFlatEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_CREATE_FLAT'),
  switchMap((action) => 
    from(
      axios.post(baseUrl + '/api/v1/flats/create', action.payload.newFlat,
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
          requestCreateFlatSuccess(result.data)
        :
          requestCreateFlatError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestCreateFlatError(error))
      }),
    ),
  ),
)

export const requestUpdateFlatEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_UPDATE_FLAT'),
  switchMap((action) => 
    from(
      axios.patch(baseUrl + '/api/v1/flats/' + action.payload.id, action.payload.editedFlat,
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
          requestUpdateFlatSuccess(result.data)
        :
          requestUpdateFlatError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestUpdateFlatError(error))
      }),
    ),
  ),
)

export const requestDeleteFlatEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DELETE_FLAT'),
  switchMap((action) => 
    from(
      axios.delete(baseUrl + '/api/v1/flats/' + action.payload.id, {
        headers: {
          'Authorization': `Bearer ${state$.value.auth.access_token}` 
        }
      })
    ).pipe(
      map((result) =>
        result.data
        ?
          requestDeleteFlatSuccess(result.data, action.payload.id)
        :
          requestDeleteFlatError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestDeleteFlatError(error))
      }),
    ),
  ),
)

export default [
  requestFlatsEpic,
  requestCreateFlatEpic,
  requestUpdateFlatEpic,
  requestDeleteFlatEpic,
]
