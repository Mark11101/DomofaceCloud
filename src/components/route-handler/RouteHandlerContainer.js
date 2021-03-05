import { connect } from 'react-redux'

import { 
  requestCurrentUser,
  requestIntercomHealthCheck, 
} from '../../redux/actions/Auth'

import RouteHandler from './RouteHandler'

const mapStateToProps = (state) => {
  
  return {
    isLogged: state.auth.isLogged,
    role: state.auth.me.role,
    intercomHealth: state.auth.intercomHealth,
  }
}

const mapDispatchToProps = (dispatch) => {
  
  return {
    requestCurrentUser: () => dispatch(requestCurrentUser()),
    requestIntercomHealthCheck: () => dispatch(requestIntercomHealthCheck()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RouteHandler)
