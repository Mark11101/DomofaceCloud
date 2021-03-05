import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../../redux/actions/lists/Residents'

import ResidentsList from './ResidentsList'

const mapStateToProps = (state) => {

  return {
    residents: state.residents.residents,
    isResidentsListLoading: state.residents.isResidentsListLoading,
    companies: state.companies.companies,
    admins: state.admins.admins,
  }
}

const mapDispatchToProps = (dispatch) => {
  const { 
    requestResidents,
    requestCreateResident,
    requestUpdateResident,
    requestDeleteResident,
  } = bindActionCreators(actions, dispatch);

  return {
    requestResidents: (companyId) => requestResidents(companyId),
    requestCreateResident: (
      flat_id, login, password, temporary, name
    ) => requestCreateResident(
      flat_id, login, password, temporary, name
    ),
    requestUpdateResident: (
      id, flat_id, login, password, temporary, name
    ) => requestUpdateResident(
      id, flat_id, login, password, temporary, name
    ),
    requestDeleteResident: (id) => requestDeleteResident(id),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResidentsList)
