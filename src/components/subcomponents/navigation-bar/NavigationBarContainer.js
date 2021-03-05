import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actionsUi from '../../../redux/actions/Ui'
import { requestLogOut } from '../../../redux/actions/Auth'

import NavigationBar from './NavigationBar'

const mapStateToProps = (state) => {
  return {
    login: state.auth.login,
  }
}

const mapDispatchToProps = (dispatch) => {
  const {
    setDisplayedView
  } = bindActionCreators(actionsUi, dispatch)

  return {
    setDisplayedView: (type) => setDisplayedView(type),
    requestrequestLogOut: () => dispatch(requestLogOut()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavigationBar)
