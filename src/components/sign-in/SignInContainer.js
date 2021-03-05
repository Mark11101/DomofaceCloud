import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import SignIn from './SignIn'
import * as actionsAut from '../../redux/actions/Auth'

const mapStateToProps = (state) => {
  return {
    isLogged: state.auth.isLogged,
  }
}

const mapDispatchToProps = (dispatch) => {
  const {
    requestSignIn
  } = bindActionCreators(actionsAut, dispatch)

  return {
    requestSignIn: (login, password) => requestSignIn(login, password),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignIn)
