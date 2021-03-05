export const requestFaces = (companyId) => {

  return {
    type: 'REQUEST_FACES',
    payload: {
      companyId
    }
  }
}

export const requestFacesSuccess = (faces) => {

  return {
    type: 'REQUEST_FACES_SUCCESS',
    payload: {
      faces
    }
  }
}

export const requestFacesError = (error) => {

  return {
    type: 'REQUEST_FACES_ERROR',
    error,
  }
}

export const requestFacesImages = (faces) => {

  return {
    type: 'REQUEST_FACES_IMAGES',
    payload: {
      faces
    }
  }
}

export const requestFacesImagesSuccess = (image, id) => {

  return {
    type: 'REQUEST_FACES_IMAGES_SUCCESS',
    payload: {
      image,
      id,
    }
  }
}

export const requestFacesImagesError = (error) => {

  return {
    type: 'REQUEST_FACES_IMAGES_ERROR',
    error,
  }
}

export const requestCreateFace = (newFace) => {
  
  return {
    type: 'REQUEST_CREATE_FACE',
    payload: {
      newFace
    }
  }
}

export const requestCreateFaceSuccess = () => {

  return {
    type: 'REQUEST_CREATE_FACE_SUCCESS'
  }
}

export const requestCreateFaceError = (error) => {

  return {
    type: 'REQUEST_CREATE_FACE_ERROR',
    error,
  }
}

export const requestUpdateFace = (id, description) => {

  return {
    type: 'REQUEST_UPDATE_FACE',
    payload: {
      id,
      description,
    }
  }
}

export const requestUpdateFaceSuccess = () => {

  return {
    type: 'REQUEST_UPDATE_FACE_SUCCESS'
  }
}

export const requestUpdateFaceError = (error) => {

  return {
    type: 'REQUEST_UPDATE_FACE_ERROR',
    error,
  }
}

export const requestDeleteFace = (id) => {

  return {
    type: 'REQUEST_DELETE_FACE',
    payload: {
      id
    }
  }
}

export const requestDeleteFaceSuccess = () => {

  return {
    type: 'REQUEST_DELETE_FACE_SUCCESS'
  }
}

export const requestDeleteFaceError = (error) => {

  return {
    type: 'REQUEST_DELETE_FACE_ERROR',
    error,
  }
}
