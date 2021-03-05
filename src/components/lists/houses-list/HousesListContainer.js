import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../../redux/actions/lists/Houses'

import HousesList from './HousesList'

const mapStateToProps = (state) => {
  return {
    houses: state.houses.houses,
    isHousesListLoading: state.houses.isHousesListLoading,
  }
}

const mapDispatchToProps = (dispatch) => {
  const { 
    requestHouses,
    requestCreateHouse,
    requestUpdateHouse,
    requestDeleteHouse,
  } = bindActionCreators(actions, dispatch);

  return {
    requestHouses: (companyId) => requestHouses(companyId),
    requestCreateHouse: (
      service_company_id, address, lat, long
    ) => requestCreateHouse(
      service_company_id, address, lat, long
    ),
    requestUpdateHouse: (
      id, service_company_id, address, lat, long
    ) => requestUpdateHouse(
      id, service_company_id, address, lat, long
    ),
    requestDeleteHouse: (id) => requestDeleteHouse(id),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HousesList)
