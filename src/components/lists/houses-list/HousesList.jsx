import React, { useState } from 'react'

import InputField from '../../subcomponents/input-field/InputField'
import ModalForm from '../../subcomponents/modal-form/ModalForm'
import EntrancesList from '../entrances-list/EntrancesListContainer'
import ListForm from '../../subcomponents/list-form/ListForm'

import './HousesList.css'

const HousesList = (props) => {
  const {
    companyId,
    header,
    isHousesListLoading,
    houses,
    requestHouses,
    requestCreateHouse,
    requestUpdateHouse,
    requestDeleteHouse,
  } = props;
  
  const [isChooseEntranceModalVisible, setIsChooseEntranceModalVisible] = useState(false);
  const [houseIdToChoose, setHouseIdToChoose] = useState('');

  const [newHouse, setNewHouse] = useState({
    service_company_id: companyId,
    address: '',
    lat: '',
    long: '',
  });

  const [editedHouse, setEditedHouse] = useState({
    id: '',
    service_company_id: companyId,
    address: '',
    lat: '',
    long: '',
  });

  const [initialEditedAddress, setInitialEditedAddress] = useState('');

  React.useEffect(() => {

    requestHouses(companyId)
  }, [requestHouses, companyId])

  const isNewAddressAlreadyExist    = !!houses.find((house) => house.address === newHouse.address);
  const isEditedAddressAlreadyExist = editedHouse.address !== initialEditedAddress && !!houses.find((house) => house.address === editedHouse.address);

  const setInitialValues = (values) => {

    setEditedHouse({
      ...editedHouse,
      id: values.id,
      address: values.address,
      lat: values.lat.toString(),
      long: values.long.toString(),
    })
    setInitialEditedAddress(values.address)
  }

  const handleChangeNewHouse = (event) => {

    setNewHouse({
      ...newHouse,
      [event.target.name]: event.target.value
    })
  }

  const handleChangeEditedHouse = (event) => {

    setEditedHouse({
      ...editedHouse,
      [event.target.name]: event.target.value
    })
  }
  
  const handleNewHouseSubmit = () => {

    requestCreateHouse(
      newHouse.service_company_id,
      newHouse.address,
      newHouse.lat,
      newHouse.long,
    )
    
    setNewHouse({
      ...newHouse,
      address: '',
      lat: '',
      long: '',
    })
  }

  const handleEditedHouseSubmit = () => {
    
    requestUpdateHouse(
      editedHouse.id,
      editedHouse.service_company_id,
      editedHouse.address,
      editedHouse.lat,
      editedHouse.long,
    )

    setEditedHouse({
      id: '',
      service_company_id: companyId,
      address: '',
      lat: '',
      long: '',
    })
  }

  const handleDeleteHouse = (id) => {

    requestDeleteHouse(id)
  }

  const handleOpenEntranceModal = (id) => {

    setHouseIdToChoose(id)
    setIsChooseEntranceModalVisible(true)
  }

  const handleCloseChooseEntranceModal = () => {

    setIsChooseEntranceModalVisible(false)
  }
  
  return (
    <div className='b-houses'>
      <ListForm 
        values={houses}
        valuesIndex='address'
        moreInfoIndexes={['address', 'lat', 'long']}
        moreInfoNames={['??????????: ', '????????????: ', '??????????????: ']}
        header={header}
        noValuesText='???????? ????????????????????'
        addValueHeader='???????????????????? ????????'
        innerModal
        isListLoading={isHousesListLoading}
        openInnerModal={(id) => handleOpenEntranceModal(id)}
        deleteValue={(id) => handleDeleteHouse(id)}
        setInitialValues={(values) => setInitialValues(values)}
        onSubmitNewValues={handleNewHouseSubmit}
        onSubmitEditedValues={handleEditedHouseSubmit}
        renderAddForm={() => (
          <>              
            <InputField 
              type='text'
              innerLabel='??????????'
              name='address'
              value={newHouse.address}
              error={isNewAddressAlreadyExist}
              helperText={isNewAddressAlreadyExist && '?????????? ?????????? ?????? ????????'}
              onChange={handleChangeNewHouse}
            />             
            <InputField 
              type='number'
              innerLabel='????????????'
              name='lat'
              value={newHouse.lat}
              onChange={handleChangeNewHouse}
            />           
            <InputField 
              type='number'
              innerLabel='??????????????'
              name='long'
              value={newHouse.long}
              onChange={handleChangeNewHouse}
            />
            <button  
              type='submit'
              className='b-button b-modal__submit-btn'
              disabled={
                /^\s+$/.test(newHouse.address) ||
                !newHouse.address ||
                !newHouse.lat ||
                !newHouse.long ||
                isNewAddressAlreadyExist
              }
            >
              ????????????????
            </button>
          </>
        )}
        renderEditForm={() => (
          <>            
            <InputField 
              type='text'
              innerLabel='??????????'
              name='address'
              value={editedHouse.address}
              error={isEditedAddressAlreadyExist}
              helperText={isEditedAddressAlreadyExist && '?????????? ?????????? ?????? ????????'}
              onChange={handleChangeEditedHouse}
            />             
            <InputField 
              type='number'
              innerLabel='????????????'
              name='lat'
              step='any'
              value={editedHouse.lat}
              onChange={handleChangeEditedHouse}
            />           
            <InputField 
              type='number'
              innerLabel='??????????????'
              name='long'
              value={editedHouse.long}
              onChange={handleChangeEditedHouse}
            />
            <button  
              type='submit'
              className='b-button b-modal__submit-btn'
              disabled={
                /^\s+$/.test(editedHouse.address) ||
                !editedHouse.address ||
                !editedHouse.lat ||
                !editedHouse.long ||
                isEditedAddressAlreadyExist
              }
            >
              ??????????????????
            </button>
          </>
        )}
      />
      {
        isChooseEntranceModalVisible
        &&
          <ModalForm
            title='????????????????'
            handleCloseModal={handleCloseChooseEntranceModal}
          > 
            <EntrancesList 
              companyId={companyId}
              houseId={houseIdToChoose} 
            />
          </ModalForm>
      }
    </div>
  )
}

export default HousesList
