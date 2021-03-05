import axios from 'axios'
import { map, switchMap, catchError } from 'rxjs/operators'
import { from, of } from 'rxjs'
import { ofType } from 'redux-observable'

import {
  requestEntrancesSuccess,
  requestEntrancesError,
  requestCreateEntranceSuccess,
  requestCreateEntranceError,
  requestUpdateEntranceSuccess,
  requestUpdateEntranceError,
  requestDeleteEntranceSuccess,
  requestDeleteEntranceError,
} from '../../actions/lists/Entrances'

import config from '../../../config/Config'

const baseUrl = config.baseUrl;

export const requestEntrancesEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_ENTRANCES'),
  switchMap((action) => 
    from(
      axios.get(baseUrl + '/api/v1/entrances', 
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
          requestEntrancesSuccess(result.data)
        :
          requestEntrancesError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestEntrancesError(error))
      }),
    ),
  ),
)

export const requestCreateEntranceEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_CREATE_ENTRANCE'),
  switchMap((action) => 
    from(
      axios.post(baseUrl + '/api/v1/entrances/create', 
        {
          house_id: action.payload.house_id,
          number: Number(action.payload.number),
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
          requestCreateEntranceSuccess(result.data)
        :
          requestCreateEntranceError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestCreateEntranceError(error))
      }),
    ),
  ),
)

export const requestUpdateEntranceEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_UPDATE_ENTRANCE'),
  switchMap((action) => 
    from(
      axios.patch(baseUrl + '/api/v1/entrances/' + action.payload.id, 
        {
          house_id: action.payload.house_id,
          number: Number(action.payload.number),
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
          requestUpdateEntranceSuccess(result.data)
        :
          requestUpdateEntranceError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestUpdateEntranceError(error))
      }),
    ),
  ),
)

export const requestDeleteEntranceEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DELETE_ENTRANCE'),
  switchMap((action) => 
    from(
      axios.delete(baseUrl + '/api/v1/entrances/' + action.payload.id, {
        headers: {
          'Authorization': `Bearer ${state$.value.auth.access_token}` 
        }
      })
    ).pipe(
      map((result) =>
        result.data
        ?
          requestDeleteEntranceSuccess(result.data, action.payload.id)
        :
          requestDeleteEntranceError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestDeleteEntranceError(error))
      }),
    ),
  ),
)

export default [
  requestEntrancesEpic,
  requestCreateEntranceEpic,
  requestUpdateEntranceEpic,
  requestDeleteEntranceEpic,
]
