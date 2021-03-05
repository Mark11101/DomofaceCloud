import { connect } from 'react-redux'

import { requestCurrentUser } from '../../../redux/actions/Auth'
import { requestLogOut } from '../../../redux/actions/Auth'
import { requestUpdateResident } from '../../../redux/actions/lists/Residents'
import { requestOpenDoor } from '../../../redux/actions/IntercomUtils'

import ResidentAccountSettings from './ResidentAccountSettings'

const mapStateToProps = (state) => {
  
  return {
    me: state.auth.me,
  }
}

const mapDispatchToProps = (dispatch) => {
  
  return {
    requestOpenDoor: () => dispatch(requestOpenDoor()),
    requestCurrentUser: () => dispatch(requestCurrentUser()),
    requestLogOut: () => dispatch(requestLogOut()),
    requestUpdateResident: (
      id, flat_id, login, password, temporary, name
    ) => dispatch(requestUpdateResident(
      id, flat_id, login, password, temporary, name
    )),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResidentAccountSettings)
