import { map, auditTime, } from 'rxjs/operators'
import { fromEvent } from 'rxjs'

import config from '../../config/Config'
import {
  resize,
} from '../actions/Ui'

/**
 * Handle resize viewport
 */
export const resizeViewportEpic = () => 
  fromEvent(window, 'resize')
  .pipe(
    auditTime(config.windowResizeDebounceTime),
    map(() => resize(window.innerWidth)),
  )

export default [
  resizeViewportEpic,
]
