import { connect } from 'react-redux'

import { requestUpdateAdmin } from '../../../redux/actions/lists/Admins'
import { requestLogOut } from '../../../redux/actions/Auth'

import AdminAccountsSettings from './AdminAccountsSettings'

const mapStateToProps = (state) => {
  
  return {
    adminId: state.auth.me.id,
  }
}

const mapDispatchToProps = (dispatch) => {
  
  return {
    requestUpdateAdmin: (id, password) => dispatch(requestUpdateAdmin(id, password)), 
    requestLogOut: () => dispatch(requestLogOut()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminAccountsSettings)
