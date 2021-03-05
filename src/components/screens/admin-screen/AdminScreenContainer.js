import { connect } from 'react-redux'

import AdminScreen from './AdminScreen'

const mapStateToProps = (state) => {
  return {
    isLogged: state.auth.isLogged,
    role: state.auth.me.role,
  }
}

const mapDispatchToProps = () => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminScreen)
