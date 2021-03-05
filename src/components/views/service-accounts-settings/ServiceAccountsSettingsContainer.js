import { connect } from 'react-redux'

import { requestLogOut } from '../../../redux/actions/Auth'
import { requestUpdateCompany } from '../../../redux/actions/lists/Companies'

import ServiceAccountsSettings from './ServiceAccountsSettings'

const mapStateToProps = (state) => {
  return {
    company: state.companies.company,
  }
}

const mapDispatchToProps = (dispatch) => {
  
  return {
    requestLogOut: () => dispatch(requestLogOut()),
    requestUpdateCompany: (id, password, organization) => dispatch(requestUpdateCompany(id, password, organization)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ServiceAccountsSettings)
