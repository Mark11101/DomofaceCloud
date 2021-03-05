import { 
  showSuccessMessage,
  showErrorMessage,
} from '../../../utils/notifications/messages'

export const initialState = {
  companies: [],
  company: {
    id: '',
    login: '',
    organization: '',
    role: '',
  },
  isCompaniesLoading: false,
  isCompaniesListLoading: false,
}

const FacesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_COMPANIES':
      return {
        ...state,
        isCompaniesListLoading: true,
      }

    case 'REQUEST_COMPANIES_SUCCESS':
      return {
        ...state,
        companies: action.payload.companies,
        isCompaniesListLoading: false,
      }

    case 'REQUEST_COMPANIES_ERROR':
      return {
        ...state,
        isCompaniesListLoading: false,
      }

    case 'REQUEST_COMPANY_SUCCESS':
      return {
        ...state,
        company: action.payload.response,
      }

    case 'REQUEST_CREATE_COMPANY':
      return {
        ...state,
        isCompaniesLoading: true,
      }

    case 'REQUEST_CREATE_COMPANY_SUCCESS':
      return {
        ...state,
        companies: [
          ...state.companies,
          action.payload.response,
        ],
        isCompaniesLoading: false,
      }

    case 'REQUEST_CREATE_COMPANY_ERROR':

      showErrorMessage('Не удалось добавить компанию, попробуйте еще раз')  

      return {
        ...state,
        isCompaniesLoading: false,
      }

    case 'REQUEST_UPDATE_COMPANY':
      return {
        ...state,
        isCompaniesLoading: true,
      }

    case 'REQUEST_UPDATE_COMPANY_SUCCESS':

      showSuccessMessage('Данные успешно обновлены!')

      return {
        ...state,
        companies: [
          ...state.companies.filter((company) => company.id !== action.payload.response.id),
          action.payload.response,
        ],
        company: action.payload.response,
        isCompaniesLoading: false,
      }

    case 'REQUEST_UPDATE_COMPANY_ERROR':

      showErrorMessage('Не удалось обновить компанию, попробуйте еще раз')  

      return {
        ...state,
        isCompaniesLoading: false,
      }

    case 'REQUEST_DELETE_COMPANY':
      return {
        ...state,
        isCompaniesLoading: true,
      }

    case 'REQUEST_DELETE_COMPANY_SUCCESS':
      return {
        ...state,
        companies: state.companies.filter((company) => company.id !== action.payload.id),
        isCompaniesLoading: false,
      }

    case 'REQUEST_DELETE_COMPANY_ERROR':

      showErrorMessage('Не удалось удалить компанию, попробуйте еще раз')  

      return {
        ...state,
        isCompaniesLoading: false,
      }

    default:
      return state
  }
}

export default FacesReducer;
