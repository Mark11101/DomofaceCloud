import axios from 'axios'
import { map, switchMap, catchError } from 'rxjs/operators'
import { from, of } from 'rxjs'
import { ofType } from 'redux-observable'

import {
  requestPinCodesSuccess,
  requestPinCodesError,
  requestCreatePinCodeSuccess,
  requestCreatePinCodeError,
  requestDeletePinCodeSuccess,
  requestDeletePinCodeError,
} from '../../actions/lists/PinCodes'

import config from '../../../config/Config'

const baseUrl = config.baseUrl;

export const requestPinCodesEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_PIN_CODES'),
  switchMap((action) => 
    from(
      axios.get(baseUrl + '/api/v1/pin_codes', 
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
          requestPinCodesSuccess(result.data)
        :
          requestPinCodesError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestPinCodesError(error))
      }),
    ),
  ),
)

export const requestCreatePinCodeEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_CREATE_PIN_CODE'),
  switchMap((action) => 
    from(
      axios.post(baseUrl + '/api/v1/pin_codes/create', 
        {
          ...action.payload.newPinCode
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
          requestCreatePinCodeSuccess(result.data)
        :
          requestCreatePinCodeError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestCreatePinCodeError(error))
      }),
    ),
  ),
)

export const requestDeletePinCodeEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DELETE_PIN_CODE'),
  switchMap((action) => 
    from(
      axios.delete(baseUrl + '/api/v1/pin_codes/' + action.payload.id, {
        headers: {
          'Authorization': `Bearer ${state$.value.auth.access_token}` 
        }
      })
    ).pipe(
      map((result) =>
        result.data
        ?
          requestDeletePinCodeSuccess(result.data, action.payload.id)
        :
          requestDeletePinCodeError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestDeletePinCodeError(error))
      }),
    ),
  ),
)

export default [
  requestPinCodesEpic,
  requestCreatePinCodeEpic,
  requestDeletePinCodeEpic,
]
