import axios from 'axios'
import { map, catchError, switchMap} from 'rxjs/operators'
import { from, of } from 'rxjs'
import { ofType } from 'redux-observable'

import { 
	requestSignInSuccess,
	requestSignInError,
	requestCurrentUser,
	requestCurrentUserSuccess,
	requestCurrentUserError,
	requestUpdateTokenSuccess,
  requestUpdateTokenError,
  requestLogOut,
	requestLogOutSuccess,
	requestLogOutError,
	requestIntercomHealthCheckSuccess,
  requestIntercomHealthCheckError,
  requestCheckAuthSuccess,
  requestCheckAuthError,
 } from '../actions/Auth'

import config from '../../config/Config'

const baseUrl = config.baseUrl;

export const requestSignInEpic = (action$) => action$.pipe(
	ofType('REQUEST_SIGN_IN'),
	switchMap((action) => 
		from(
			axios.post(baseUrl + '/api/v1/auth', {
        login: action.payload.login,
        password: action.payload.password,
      })
		).pipe(
			map((result) =>
				result.data
				?
					requestSignInSuccess(result.data)
				:
					requestSignInError(result.error)
			),
			catchError((error) => {
				console.error(error)
				return of(requestSignInError(error))
			}),
		),
	),
)

export const requestSignInSuccessEpic = (action$) => action$.pipe(
  ofType('REQUEST_SIGN_IN_SUCCESS'),
  switchMap(() => of(requestCurrentUser()))
)

export const requestCurrentUserEpic = (action$, state$) => action$.pipe(
	ofType('REQUEST_CURRENT_USER'),
	switchMap(() => 
		from(
			axios.get(baseUrl + '/api/v1/auth/me', {
        headers: {
          'Authorization': `Bearer ${state$.value.auth.access_token}` 
        }
      })
		).pipe(
			map((result) =>
				result.data
				?
					requestCurrentUserSuccess(result.data)
				:
					requestCurrentUserError(result.error)
			),
			catchError((error) => {
				console.error(error)
				return of(requestCurrentUserError(error))
			}),
		),
	),
)

// export const requestCurrentUserSuccessEpic = (action$) => action$.pipe(
//   ofType('REQUEST_CURRENT_USER_SUCCESS'),  
//   switchMap(() => of(requestVerificationOfAuth()))
// )

export const requestUpdateTokenEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_UPDATE_TOKEN'),
  switchMap((action) =>
    from(
      axios.post(baseUrl + '/api/v1/auth/refresh', 
        {
          headers: {
            'Authorization': `Bearer ${state$.value.auth.access_token}` 
          }
        },
        action.payload.refresh_token
      )
    ).pipe(
      map((result) =>
        result.data
        ?
          requestUpdateTokenSuccess(result.data)
        :
          requestUpdateTokenError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestUpdateTokenError(error))
      }),
    ),
  ),
)

export const requestUpdateTokenSuccessEpic = (action$) => action$.pipe(
  ofType('REQUEST_UPDATE_TOKEN_SUCCESS'),  
  switchMap(() => of(requestCurrentUser()))
)

export const requestLogOutEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_LOG_OUT'),
  switchMap(() =>
    from(
      axios.post(baseUrl + '/api/v1/auth/logout', {
        headers: {
          'Authorization': `Bearer ${state$.value.auth.access_token}` 
        }
      })
    ).pipe(
      map((result) =>
        result.data
        ?
					requestLogOutSuccess(result.data)
        :
					requestLogOutError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestLogOutError(error))
      }),
    ),
  ),
)

export const requestIntercomHealthCheckEpic = (action$, state$) => action$.pipe(
	ofType('REQUEST_INTERCOM_HEALTH_CHECK'),
	switchMap(() => 
    from(
    	axios.get(baseUrl + '/api/v1/healthcheck', {
        headers: {
          'Authorization': `Bearer ${state$.value.auth.access_token}` 
        }
      })
    ).pipe(
			map((result) =>
				result.data
				?
					requestIntercomHealthCheckSuccess(result.data)
				:
					requestIntercomHealthCheckError(result.error)
			),
			catchError((error) => {
				console.error(error)
				return of(requestIntercomHealthCheckError(error))
			}),
    ),
	),
)

export const requestCheckAuthEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_CHECK_AUTH'),
  switchMap(() =>
    from(
      axios.get(baseUrl + '/api/v1/auth/verify', {
        headers: {
          'Authorization': `Bearer ${state$.value.auth.access_token}` 
        }
      })
    ).pipe(
      map((result) =>
        result.data
        ?
					requestCheckAuthSuccess(result.data)
        :
					requestCheckAuthError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestCheckAuthError(error))
      }),
    ),
  ),
)

export const requestCheckAuthErrorEpic = (action$) => action$.pipe(
  ofType('REQUEST_CHECK_AUTH_ERROR'),  
  switchMap(() => of(requestLogOut()))
)

export default [
	requestSignInEpic,
	requestSignInSuccessEpic,
	requestCurrentUserEpic,
	// requestCurrentUserSuccessEpic,
	requestUpdateTokenEpic,
	requestLogOutEpic,
  requestIntercomHealthCheckEpic,
  requestUpdateTokenSuccessEpic,
  requestCheckAuthEpic,
  requestCheckAuthErrorEpic,
]
