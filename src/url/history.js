import { createBrowserHistory } from 'history'

const history = createBrowserHistory()

history.listen((location) => {
  const {
    pathname,
  } = location

  window.dispatchEvent(new CustomEvent('location.change', { 
    detail: { 
      pathname 
    } 
  }))
})

export default history
