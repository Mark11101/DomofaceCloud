import { connect } from 'react-redux'

import { requestCompany } from '../../../redux/actions/lists/Companies'

import ServiceScreen from './ServiceScreen'

const mapStateToProps = (state) => {
  return {
    role: state.auth.me.role,
    isLogged: state.auth.isLogged,
    companyId: state.auth.me.id,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestCompany: (companyId) => dispatch(requestCompany(companyId)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ServiceScreen)
