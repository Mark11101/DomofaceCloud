import axios from 'axios'
import { map, switchMap, catchError } from 'rxjs/operators'
import { from, of } from 'rxjs'
import { ofType } from 'redux-observable'

import {
  requestQrCodes,
  requestQrCodesSuccess,
  requestQrCodesError,
  requestCreateQrCodeSuccess,
  requestCreateQrCodeError,
  requestDeleteQrCodeSuccess,
  requestDeleteQrCodeError,
} from '../../actions/lists/QrCodes'

import config from '../../../config/Config'

const baseUrl = config.baseUrl;

export const requestQrCodesEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_QR_CODES'),
  switchMap((action) => 
    from(
      axios.get(baseUrl + '/api/v1/qr_codes', 
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
          requestQrCodesSuccess(result.data)
        :
          requestQrCodesError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestQrCodesError(error))
      }),
    ),
  ),
)

export const requestCreateQrCodeEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_CREATE_QR_CODE'),
  switchMap((action) => 
    from(
      axios.post(baseUrl + '/api/v1/qr_codes/create', 
        {
          ...action.payload.newQrCode
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
          requestCreateQrCodeSuccess(result.data)
        :
          requestCreateQrCodeError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestCreateQrCodeError(error))
      }),
    ),
  ),
)

export const requestCreateQrCodeSuccessEpic = (action$) => action$.pipe(
  ofType('REQUEST_CREATE_QR_CODE_SUCCESS'),
  switchMap(() => of(requestQrCodes()))
)

export const requestDeleteQrCodeEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DELETE_QR_CODE'),
  switchMap((action) => 
    from(
      axios.delete(baseUrl + '/api/v1/qr_codes/' + action.payload.id, {
        headers: {
          'Authorization': `Bearer ${state$.value.auth.access_token}` 
        }
      })
    ).pipe(
      map((result) =>
        result.data
        ?
          requestDeleteQrCodeSuccess(result.data)
        :
          requestDeleteQrCodeError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestDeleteQrCodeError(error))
      }),
    ),
  ),
)

export const requestDeleteQrCodeSuccessEpic = (action$) => action$.pipe(
  ofType('REQUEST_DELETE_QR_CODE_SUCCESS'),
  switchMap(() => of(requestQrCodes()))
)

export default [
  requestQrCodesEpic,
  requestCreateQrCodeEpic,
  requestCreateQrCodeSuccessEpic,
  requestDeleteQrCodeEpic,
  requestDeleteQrCodeSuccessEpic,
]
