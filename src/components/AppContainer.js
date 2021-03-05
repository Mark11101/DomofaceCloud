import { connect } from 'react-redux'

import { 
  requestLogOut,
  requestCheckAuth, 
} from '../redux/actions/Auth'

import App from './App'

const mapStateToProps = (state) => {
  return {
    role: state.auth.me.role,
    isLogged: state.auth.isLogged,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestLogOut: () => dispatch(requestLogOut()),
    requestCheckAuth: () => dispatch(requestCheckAuth()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
