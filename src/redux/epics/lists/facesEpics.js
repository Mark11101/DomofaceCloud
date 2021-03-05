import axios from 'axios'
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators'
import { from, of } from 'rxjs'
import { ofType } from 'redux-observable'

import {
  requestFaces,
  requestFacesSuccess,
  requestFacesError,
  requestFacesImages,
  requestFacesImagesSuccess,
  requestFacesImagesError,
  requestCreateFaceSuccess,
  requestCreateFaceError,
  requestUpdateFaceSuccess,
  requestUpdateFaceError,
  requestDeleteFaceSuccess,
  requestDeleteFaceError,
} from '../../actions/lists/Faces'

import config from '../../../config/Config'

const baseUrl = config.baseUrl;

export const requestFacesEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_FACES'),
  switchMap((action) => 
    from(
      axios.get(baseUrl + '/api/v1/faces', 
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
          requestFacesSuccess(result.data)
        :
          requestFacesError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestFacesError(error))
      }),
    ),
  ),
)

export const requestFacesSuccessEpic = (action$) => action$.pipe(
  ofType('REQUEST_FACES_SUCCESS'),
  switchMap((action) => of(requestFacesImages(action.payload.faces)))
)

export const requestFacesImagesEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_FACES_IMAGES'),
  switchMap((action) =>
    of(...action.payload.faces).pipe(
      mergeMap((face) =>
        from(
          axios.get(baseUrl + `/api/v1/faces/${face.id}/image`, {
            responseType: 'arraybuffer',
            headers: {
              'Authorization': `Bearer ${state$.value.auth.access_token}` 
            }
          })
        ).pipe(
          map((result) => {
            if (result.data) {
              let image = btoa(
                new Uint8Array(result.data)
                  .reduce((data, byte) => data + String.fromCharCode(byte), '')
              );
              const base64Image = `data:${result.headers['content-type'].toLowerCase()};base64,${image}`;
              return requestFacesImagesSuccess(base64Image, face.id)
            } else {
              return requestFacesImagesError(result.error)
            }
          }
          ),
          catchError((error) => {
            console.log(error);
            return of(requestFacesImagesError(error))
          })
        )
      )
    )
  )
)

export const requestCreateFaceEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_CREATE_FACE'),
  switchMap((action) => {
    
    let formData = new FormData();
    
    formData.append('face_image', action.payload.newFace.fileToAdd);
    formData.append('description', action.payload.newFace.description);
    action.payload.newFace.flat_id 
    && 
      formData.append('flat_id', action.payload.newFace.flat_id);
    action.payload.newFace.intercom_id 
    && 
      formData.append('intercom_id', action.payload.newFace.intercom_id);

    return from(
      axios.post(baseUrl + '/api/v1/faces/create', formData,        
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
          requestCreateFaceSuccess(result.data)
        :
          requestCreateFaceError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestCreateFaceError(error))
      }),
    )
  }),
)

export const requestCreateFaceSuccessEpic = (action$) => action$.pipe(
  ofType('REQUEST_CREATE_FACE_SUCCESS'),
  switchMap(() => of(requestFaces()))
)

export const requestUpdateFaceEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_UPDATE_FACE'),
  switchMap((action) => 
    from(
      axios.patch(baseUrl + '/api/v1/faces/' + action.payload.id, 
        {
          description: action.payload.description
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
          requestUpdateFaceSuccess(result.data)
        :
          requestUpdateFaceError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestUpdateFaceError(error))
      }),
    )
  ),
)

export const requestUpdateFaceSuccessEpic = (action$) => action$.pipe(
  ofType('REQUEST_UPDATE_FACE_SUCCESS'),
  switchMap(() => of(requestFaces()))
)

export const requestDeleteFaceEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DELETE_FACE'),
  switchMap((action) => 
    from(
      axios.delete(baseUrl + '/api/v1/faces/' + action.payload.id, {
        headers: {
          'Authorization': `Bearer ${state$.value.auth.access_token}` 
        }
      })
    ).pipe(
      map((result) =>
        result.data
        ?
          requestDeleteFaceSuccess(result.data)
        :
          requestDeleteFaceError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestDeleteFaceError(error))
      }),
    ),
  ),
)

export const requestDeleteFaceSuccessEpic = (action$) => action$.pipe(
  ofType('REQUEST_DELETE_FACE_SUCCESS'),
  switchMap(() => of(requestFaces()))
)

export default [
  requestFacesEpic,
  requestFacesSuccessEpic,
  requestFacesImagesEpic,
  requestCreateFaceEpic,
  requestCreateFaceSuccessEpic,
  requestUpdateFaceEpic,
  requestUpdateFaceSuccessEpic,
  requestDeleteFaceEpic,
  requestDeleteFaceSuccessEpic,
]
