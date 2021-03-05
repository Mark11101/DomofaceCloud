import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'

// import * as actions from '../../../redux/actions/lists/Intercoms'

import IntercomsList from './IntercomsList'

const mapStateToProps = (state) => {

  return {
    // intercoms: state.intercoms.intercoms,
  }
}

const mapDispatchToProps = (dispatch) => {
  // const { 
  //   requestIntercoms,
  //   requestCreateIntercom,
  //   requestUpdateIntercom,
  //   requestDeleteIntercom,
  // } = bindActionCreators(actions, dispatch);

  return {
    // requestIntercoms: (companyId) => requestIntercoms(companyId),
    // requestCreateIntercom: (values) => requestCreateIntercom(values),
    // requestUpdateIntercom: (values) => requestUpdateIntercom(values),
    // requestDeleteIntercom: (id) => requestDeleteIntercom(id),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IntercomsList)
