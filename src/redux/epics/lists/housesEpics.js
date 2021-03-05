import axios from 'axios'
import { map, switchMap, catchError } from 'rxjs/operators'
import { from, of } from 'rxjs'
import { ofType } from 'redux-observable'

import {
  requestHousesSuccess,
  requestHousesError,
  requestCreateHouseSuccess,
  requestCreateHouseError,
  requestUpdateHouseSuccess,
  requestUpdateHouseError,
  requestDeleteHouseSuccess,
  requestDeleteHouseError,
} from '../../actions/lists/Houses'

import config from '../../../config/Config'

const baseUrl = config.baseUrl;

export const requestHousesEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_HOUSES'),
  switchMap((action) => 
    from(
      axios.get(baseUrl + '/api/v1/houses', 
        {
          headers: {
            'Authorization': `Bearer ${state$.value.auth.access_token}` 
          }
        },
        action.payload.companyId,
      )
    ).pipe(
      map((result) =>
        result.data
        ?
          requestHousesSuccess(result.data)
        :
          requestHousesError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestHousesError(error))
      }),
    ),
  ),
)

export const requestCreateHouseEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_CREATE_HOUSE'),
  switchMap((action) => 
    from(
      axios.post(baseUrl + '/api/v1/houses/create', 
        {
          service_company_id: action.payload.service_company_id,
          address: action.payload.address,
          lat: Number(action.payload.lat),
          long: Number(action.payload.long),
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
          requestCreateHouseSuccess(result.data)
        :
          requestCreateHouseError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestCreateHouseError(error))
      }),
    ),
  ),
)

export const requestUpdateHouseEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_UPDATE_HOUSE'),
  switchMap((action) => 
    from(
      axios.patch(baseUrl + '/api/v1/houses/' + action.payload.id, 
        {
          service_company_id: action.payload.service_company_id,
          address: action.payload.address,
          lat: Number(action.payload.lat),
          long: Number(action.payload.long),
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
          requestUpdateHouseSuccess(result.data)
        :
          requestUpdateHouseError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestUpdateHouseError(error))
      }),
    ),
  ),
)

export const requestDeleteHouseEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DELETE_HOUSE'),
  switchMap((action) => 
    from(
      axios.delete(baseUrl + '/api/v1/houses/' + action.payload.id, {
        headers: {
          'Authorization': `Bearer ${state$.value.auth.access_token}` 
        }
      })
    ).pipe(
      map((result) =>
        result.data
        ?
          requestDeleteHouseSuccess(result.data, action.payload.id)
        :
          requestDeleteHouseError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestDeleteHouseError(error))
      }),
    ),
  ),
)

export default [
  requestHousesEpic,
  requestCreateHouseEpic,
  requestUpdateHouseEpic,
  requestDeleteHouseEpic,
]
