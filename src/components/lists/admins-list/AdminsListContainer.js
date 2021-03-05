import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../../redux/actions/lists/Admins'

import AdminsList from './AdminsList'

const mapStateToProps = (state) => {
  return {
    admins: state.admins.admins,
    isAdminslistLoading: state.admins.isAdminslistLoading,
    isLogged: state.auth.isLogged,
    companies: state.companies.companies,
    residents: state.residents.residents,
  }
}

const mapDispatchToProps = (dispatch) => {
  const { 
    requestAdmins,
    requestCreateAdmin,
    requestDeleteAdmin,
  } = bindActionCreators(actions, dispatch);

  return {
    requestAdmins,
    requestCreateAdmin: (login, password) => requestCreateAdmin(login, password),
    requestDeleteAdmin: (id) => requestDeleteAdmin(id),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminsList)
