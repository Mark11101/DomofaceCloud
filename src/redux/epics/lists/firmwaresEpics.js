import axios from 'axios'
import { map, switchMap, catchError } from 'rxjs/operators'
import { from, of } from 'rxjs'
import { ofType } from 'redux-observable'

import {
  requestFirmwaresSuccess,
  requestFirmwaresError,
  requestCreateFirmwareSuccess,
  requestCreateFirmwareError,
  requestUpdateFirmwareSuccess,
  requestUpdateFirmwareError,
  requestDeleteFirmwareSuccess,
  requestDeleteFirmwareError,
  requestDownloadFirmwareSuccess,
  requestDownloadFirmwareError,
  requestDownloadEncryptedFirmwareSuccess,
  requestDownloadEncryptedFirmwareError,
  // requestFirmwaresFiles,
  // requestFirmwaresFilesSuccess,
  // requestFirmwaresFilesError,
  // requestFirmwaresFilesError,
  // requestFirmwaresEncryptedFilesSuccess,
  // requestFirmwaresEncryptedFilesError,
} from '../../actions/lists/Firmwares'

import config from '../../../config/Config'

const baseUrl = config.baseUrl;

export const requestFirmwaresEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_FIRMWARES'),
  switchMap(() => 
    from(
      axios.get(baseUrl + '/api/v1/firmwares', {
        headers: {
          'Authorization': `Bearer ${state$.value.auth.access_token}` 
        }
      })
    ).pipe(
      map((result) =>
        result.data
        ?
          requestFirmwaresSuccess(result.data)
        :
          requestFirmwaresError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestFirmwaresError(error))
      }),
    ),
  ),
)

// export const requestFirmwaresSuccessEpic = (action$) => action$.pipe(
//   ofType('REQUEST_FIRMWARES_SUCCESS'),
//   switchMap((action) => of(requestFirmwaresFiles(action.payload.firmwares)))
// )

// export const requestFirmwaresFilesEpic = (action$, state$) => action$.pipe(
//   ofType('REQUEST_FIRMWARES_FILES'),
//   switchMap((action) =>
//     of(...action.payload.firmwares).pipe(
//       mergeMap((firmware) =>
//         from(
//           axios.get(baseUrl + `/api/v1/firmwares/${firmware.id}/file`, {
//             responseType: 'blob',
//             headers: {
//               'Authorization': `Bearer ${state$.value.auth.access_token}` 
//             }
//           })
//         ).pipe(
//           map((result) =>
//             result.data
//             ?
//               requestFirmwaresFilesSuccess(new Blob([result.data]), firmware.id, action.payload.firmwares)
//             :
//               requestFirmwaresFilesError(result.error)
//           ),
//           catchError((error) => {
//             console.log(error);
//             return of(requestFirmwaresFilesError(error))
//           })
//         )
//       )
//     )
//   )
// )

// // export const requestFirmwaresFilesSuccessEpic = (action$) => action$.pipe(
// //   ofType('REQUEST_FIRMWARES_FILES_SUCCESS'),
// //   switchMap((action) => of(requestFirmwaresEncryptedFiles(action.payload.firmwares))
// // ))

// // export const requestFirmwaresEncryptedFilesEpic = (action$, state$) => action$.pipe(
// //   ofType('REQUEST_FIRMWARES_ENCRYPTED_FILES'),
// //   switchMap((action) =>
// //     of(...action.payload.firmwares).pipe(
// //       mergeMap((firmware) =>
// //         from(
// //           axios.get(baseUrl + `/api/v1/firmwares/${firmware.id}/encrypted`, {
// //             responseType: 'blob',
// //             headers: {
// //               'Authorization': `Bearer ${state$.value.auth.access_token}` 
// //             }
// //           })
// //         ).pipe(
// //           map((result) => {
// //             result.data
// //             ?
// //               requestFirmwaresEncryptedFilesSuccess(result.data, firmware.id)
// //             :
// //               requestFirmwaresEncryptedFilesError(result.error)
// //           }
// //           ),
// //           catchError((error) => {
// //             console.log(error);
// //             return of(requestFirmwaresEncryptedFilesError(error))
// //           })
// //         )
// //       )
// //     )
// //   )
// // )

export const requestCreateFirmwareEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_CREATE_FIRMWARE'),
  switchMap((action) => 
    from(
      axios.post(baseUrl + '/api/v1/firmwares/create', 
        action.payload.file,
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
          requestCreateFirmwareSuccess(result.data)
        :
          requestCreateFirmwareError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestCreateFirmwareError(error))
      }),
    ),
  ),
)

export const requestUpdateFirmwareEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_UPDATE_FIRMWARE'),
  switchMap((action) => 
    from(
      axios.patch(baseUrl + '/api/v1/firmwares/' + action.payload.id, 
        {
          headers: {
            'Authorization': `Bearer ${state$.value.auth.access_token}` 
          }
        },
        action.payload.file
      )
    ).pipe(
      map((result) =>
        result.data
        ?
          requestUpdateFirmwareSuccess(result.data)
        :
          requestUpdateFirmwareError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestUpdateFirmwareError(error))
      }),
    ),
  ),
)

export const requestDeleteFirmwareEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DELETE_FIRMWARE'),
  switchMap((action) => 
    from(
      axios.delete(baseUrl + '/api/v1/firmwares/' + action.payload.id, {
        headers: {
          'Authorization': `Bearer ${state$.value.auth.access_token}` 
        }
      })
    ).pipe(
      map((result) =>
        result.data
        ?
          requestDeleteFirmwareSuccess(result.data, action.payload.id)
        :
          requestDeleteFirmwareError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestDeleteFirmwareError(error))
      }),
    ),
  ),
)

export const requestDownloadFirmwareEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DOWNLOAD_FIRMWARE'),
  switchMap((action) => 
    from(
      axios.get(baseUrl + `/api/v1/firmwares/${action.payload.id}/file`, {
        responseType: 'blob',
        headers: {
          'Authorization': `Bearer ${state$.value.auth.access_token}` 
        },
      })
    ).pipe(
      map((result) => {
        if (result.data) {    
          const url = window.URL.createObjectURL(new Blob([result.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'firmware.dump');
          document.body.appendChild(link);
          link.click();

          return requestDownloadFirmwareSuccess(result.data)
        } else {
          return requestDownloadFirmwareError(result.error)
        }
      }),
      catchError((error) => {
        console.error(error)
        return of(requestDownloadFirmwareError(error))
      }),
    ),
  ),
)

export const requestDownloadEncryptedFirmwareEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DOWNLOAD_ENCRYPTED_FIRMWARE'),
  switchMap((action) => 
    from(
      axios.get(baseUrl + `/api/v1/firmwares/${action.payload.id}/encrypted`, 
        {
          headers: {
            'Authorization': `Bearer ${state$.value.auth.access_token}` 
          },
          responseType: 'blob',
        }
      )
    ).pipe(
      map((result) => {
        if (result.data) {    
          const url = window.URL.createObjectURL(new Blob([result.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'encrypted-firmware.dump');
          document.body.appendChild(link);
          link.click();

          return requestDownloadEncryptedFirmwareSuccess(result.data)
        } else {
          return requestDownloadEncryptedFirmwareError(result.error)
        }
      }),
      catchError((error) => {
        console.error(error)
        return of(requestDownloadEncryptedFirmwareError(error))
      }),
    ),
  ),
)

export default [
  requestFirmwaresEpic,
  // requestFirmwaresSuccessEpic,
  // requestFirmwaresFilesEpic,
  // requestFirmwaresFilesSuccessEpic,
  // requestFirmwaresEncryptedFilesEpic,
  requestCreateFirmwareEpic,
  requestUpdateFirmwareEpic,
  requestDeleteFirmwareEpic,
  requestDownloadFirmwareEpic,
  requestDownloadEncryptedFirmwareEpic,
]
