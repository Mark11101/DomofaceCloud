import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import throttle from 'lodash/throttle'

import rootReducer from '../reducers/Root'
import { epicMiddleware, rootEpic } from '../epics'
import * as localStorage from './localStorage'
import rehydrate from '../rehydrate'
import { initialState } from './initialState'

const persistedState = rehydrate(localStorage.loadState(initialState))

export const store = createStore(rootReducer, persistedState, composeWithDevTools(
  applyMiddleware(epicMiddleware),
))

store.subscribe(throttle(() => {
  const state = store.getState()
  
  document.cookie='access_token=' + state.auth.access_token;
  
  localStorage.saveState(
    {
      auth: {
        isLogged: state.auth.isLogged,
        access_token: state.auth.access_token,
        refresh_token: state.auth.refresh_token,
        me: state.auth.me,
      },
      intercomUtils: state.intercomUtils,
      flats: state.flats,
      intercom: state.intercom,
      companies: state.companies,
    },
  )
}, 1000))


epicMiddleware.run(rootEpic)

store.dispatch({ 
  type: 'APP_INIT' 
})
