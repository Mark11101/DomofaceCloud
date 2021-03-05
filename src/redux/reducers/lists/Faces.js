import { 
  showSuccessMessage,
  showErrorMessage,
} from '../../../utils/notifications/messages'

export const initialState = {
  faces: [],
  images: [],
  isFacesLoading: false,
};

const filterImagesArrayFromOldOnes = (state, action) => {

  const images = state.images.filter((image) => image.id !== action.payload.id);

  return [
    ...images, 
    { 
      id: action.payload.id, 
      image: action.payload.image
    }
  ]
}

const FacesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_FACES_SUCCESS':
      return {
        ...state,
        faces: action.payload.faces,
      }

    case 'REQUEST_FACES_IMAGES_SUCCESS':
      return {
        ...state,
        images: filterImagesArrayFromOldOnes(state, action)
      }

    case 'REQUEST_CREATE_FACE':
      return {
        ...state,
        isFacesLoading: true,
      }

    case 'REQUEST_CREATE_FACE_SUCCESS':
      return {
        ...state,
        isFacesLoading: false,
      }

    case 'REQUEST_CREATE_FACE_ERROR':

      showErrorMessage('Не удалось добавить лицо, попробуйте еще раз')  

      return {
        ...state,
        isFacesLoading: false,
      }

    case 'REQUEST_UPDATE_FACE':
      return {
        ...state,
        isFacesLoading: true,
      }

    case 'REQUEST_UPDATE_FACE_SUCCESS':

      showSuccessMessage('Данные успешно обновлены!')

      return {
        ...state,
        isFacesLoading: false,
      }

    case 'REQUEST_UPDATE_FACE_ERROR':

      showErrorMessage('Не удалось обновить лицо, попробуйте еще раз')  

      return {
        ...state,
        isFacesLoading: false,
      }

    case 'REQUEST_DELETE_FACE':
      return {
        ...state,
        isFacesLoading: true,
      }

    case 'REQUEST_DELETE_FACE_SUCCESS':
      return {
        ...state,
        isFacesLoading: false,
      }

    case 'REQUEST_DELETE_FACE_ERROR':

      showErrorMessage('Не удалось удалить лицо, попробуйте еще раз')  

      return {
        ...state,
        isFacesLoading: false,
      }

    default:
      return state
  }
}

export default FacesReducer;
