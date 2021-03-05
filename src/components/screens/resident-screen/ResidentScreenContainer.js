import { connect } from 'react-redux'

import { requestFaces } from '../../../redux/actions/lists/Faces'
import { requestPinCodes } from '../../../redux/actions/lists/PinCodes'
import { requestQrCodes } from '../../../redux/actions/lists/QrCodes'

import ResidentScreen from './ResidentScreen'

const mapStateToProps = (state) => {
  
  return {
    me: state.auth.me,
    role: state.auth.me.role,
    isLogged: state.auth.isLogged,
  }
}

const mapDispatchToProps = (dispatch) => {
  
  return {
    requestFaces: (flatId) => dispatch(requestFaces(flatId)),
    requestPinCodes: (flatId) => dispatch(requestPinCodes(flatId)),
    requestQrCodes: (flatId) => dispatch(requestQrCodes(flatId)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResidentScreen)
