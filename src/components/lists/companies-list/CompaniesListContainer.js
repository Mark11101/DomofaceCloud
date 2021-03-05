import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../../redux/actions/lists/Companies'

import CompaniesList from './CompaniesList'

const mapStateToProps = (state) => {
  return {
    companies: state.companies.companies,
    admins: state.admins.admins,
    residents: state.residents.residents,
    isCompaniesListLoading: state.companies.isCompaniesListLoading,
  }
}

const mapDispatchToProps = (dispatch) => {
  const { 
    requestCompanies,
    requestUpdateCompany,
    requestDeleteCompany,
    requestCreateCompany,
  } = bindActionCreators(actions, dispatch);

  return {
    requestCompanies,
    requestUpdateCompany: (id, password, organization) => requestUpdateCompany(id, password, organization),
    requestDeleteCompany: (id) => requestDeleteCompany(id),
    requestCreateCompany: (login, password, organization) => requestCreateCompany(login, password, organization),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompaniesList)
