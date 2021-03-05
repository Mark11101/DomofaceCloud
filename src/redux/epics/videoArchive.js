import axios from 'axios'
import { map, switchMap, catchError } from 'rxjs/operators'
import { from, of } from 'rxjs'
import { ofType } from 'redux-observable'
// import Hls from 'hls.js'

import {
  requestGenerateVideoSuccess,
  requestGenerateVideoError,
} from '../actions/VideoArchive'

import config from '../../config/Config'

const baseUrl = config.baseUrl;

export const requestGenerateVideoEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_GENERATE_VIDEO'),
  switchMap((action) => 
    from(
      axios.get(baseUrl + `/api/v1/archive/${action.payload.intercom_id}/video.m3u8`, 
      {
        headers: {
          'Authorization': `Bearer ${state$.value.auth.access_token}` 
        }
      })
    ).pipe(
      map((result) => {
        if (result.data) {

        //   var video = document.getElementById('video');
        //   var hls = new Hls();
        //   window.hls = hls;

        //   hls.on(Hls.Events.ERROR, function (event, data) {
        //     if (data.fatal) {
        //       switch(data.type) {
        //       case Hls.ErrorTypes.NETWORK_ERROR:
        //       // try to recover network error
        //         console.log("fatal network error encountered, try to recover");
        //         setTimeout(() => hls.startLoad(), 1000);
        //         break;
        //       case Hls.ErrorTypes.MEDIA_ERROR:
        //         console.log("fatal media error encountered, try to recover");
        //         hls.recoverMediaError();
        //         break;
        //       default:
        //       // cannot recover
        //         hls.destroy();
        //         break;
        //       }
        //     }
        //   });
        
        // hls.config = {
        //   debug: true,
        //   xhrSetup: function(xhr, url) {
          
        //     let login = 'admin'
        //     let password = 'aiYuuFiekaesee0doh2eif8tei7Voo1G'
        //     xhr.withCredentials = true;
        //     xhr.open("GET", url, true, login, password);
        //   }
        // }
        // hls.config.xhrSetup(new XMLHttpRequest(), 'https://domoface.ru/api/v1/archive/fb2da24b-acf4-4a9b-ab7c-15a3860f11c0/video.m3u8')
        // hls.loadSource('https://domoface.ru/api/v1/archive/fb2da24b-acf4-4a9b-ab7c-15a3860f11c0/video.m3u8');
        // hls.attachMedia(video);
        // hls.on(Hls.Events.MANIFEST_PARSED, function () {
        //   video.play();
        // });

          
          

          const link = document.createElement('a');
          link.target = '_blank';
          link.href = baseUrl + `/api/v1/archive/${action.payload.intercom_id}/video.m3u8`;
          document.body.appendChild(link);
          link.click();

          return requestGenerateVideoSuccess(result.data, action.payload.intercom_id)
        } else {
          return requestGenerateVideoError(result.error)
        }
      }),
      catchError((error) => {
        console.error(error)
        return of(requestGenerateVideoError(error))
      }),
    ),
  ),
)

export default [
  requestGenerateVideoEpic,
]
