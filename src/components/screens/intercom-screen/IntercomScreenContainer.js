import { connect } from 'react-redux'

import IntercomScreen from './IntercomScreen'

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
)(IntercomScreen)
