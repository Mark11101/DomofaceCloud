import merge from 'lodash/merge'
import cloneDeep from 'lodash/cloneDeep'

import migrate, { actualVersion } from './migrate'

export const loadState = (initialState) => {
  try {
    const serializedState = localStorage.getItem('spaS')

    if (serializedState === null) {
      return undefined
    }

    const { state, version } = JSON.parse(serializedState)
    const { state: actualState } = migrate(state, version)

    return merge(
      cloneDeep(initialState),
      actualState,
    )
  } catch (err) {
    return undefined
  }
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify({
      state,
      version: actualVersion,
    })
    localStorage.setItem('spaS', serializedState)
  } catch (error) {
    // ignore write errors
  }
}
