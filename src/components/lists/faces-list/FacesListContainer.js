import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../../redux/actions/lists/Faces'
import { requestResidents } from '../../../redux/actions/lists/Residents'

import Faces from './FacesList'

const mapStateToProps = (state) => {

  return {
    role: state.auth.me.role,
    faces: state.faces.faces,
    images: state.faces.images,
    intercoms: state.intercoms.intercoms,
    flats: state.flats.flats,
  }
}

const mapDispatchToProps = (dispatch) => {
  const { 
    requestFaces,
    requestCreateFace,
    requestUpdateFace,
    requestDeleteFace,
  } = bindActionCreators(actions, dispatch);

  return {
    requestFaces: (companyId) => requestFaces(companyId),
    requestCreateFace: (newFace) => requestCreateFace(newFace),
    requestUpdateFace: (id, description) => requestUpdateFace(id, description),
    requestDeleteFace: (id) => requestDeleteFace(id),
    requestResidents: (companyId) => dispatch(requestResidents(companyId)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Faces)
