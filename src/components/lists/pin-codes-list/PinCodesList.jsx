import React, { useState } from 'react'

import InputField from '../../subcomponents/input-field/InputField'
import ListForm from '../../subcomponents/list-form/ListForm'
import SelectField from '../../subcomponents/select-field/SelectField'
import Roles from '../../../constants/Roles'

import './PinCodesList.css'

const PinCodesList = (props) => {
  const {
    role,
    companyId,
    intercomId,
    entranceId,
    flatId,
    intercoms,
    flats,
    pinCodes,
    isPinCodesListLoading,
    requestPinCodes,
    requestDeletePinCode,
    requestCreatePinCode,
  } = props;
  
  const filteredPinCodes = pinCodes.filter((pinCode) => {

    return (
      flatId
      ?
        pinCode.flat_id === flatId
      :
        pinCode.intercom_id === intercomId
    )
  });

  const filteredIntercom = intercoms.find((intercom) => intercom.entrance_id === entranceId);
  const filteredFlats = flats.filter((flat) => flat.entrance_id === entranceId);

  const [newPinCode, setNewPinCode] = useState({
    flat_id: flatId || '',
    intercom_id: intercomId || (filteredIntercom && filteredIntercom.id) || '',
    pin: '',
  });

  React.useEffect(() => {

    companyId && requestPinCodes(companyId)
  }, [requestPinCodes, companyId])

  const compare = (a, b) => {
    const firstItem  = a.number.toString().toUpperCase();
    const secondItem = b.number.toString().toUpperCase();

    return firstItem - secondItem
  }

  const sortedFlats = filteredFlats.sort(compare);
  
  let sortedFlatsNumbers = sortedFlats.map(flat => flat.number);
  sortedFlatsNumbers.unshift('')

  const filteredPinCodesWithFlatNumber = filteredPinCodes.map((filteredPinCode) => {
   
    const findedFlat = filteredFlats.find((filteredFlat) => filteredFlat.id === filteredPinCode.flat_id);

    return {
      ...filteredPinCode,
      flatNumber: (findedFlat && findedFlat.number) || '',
    }
  });

  const isPinCodeAlreadyExist = !!pinCodes.find((pinCode) => pinCode.pin === newPinCode.pin);

  const handleChangeNewPinCode = (event) => {
    const name  = event.target.name;
    const value = event.target.value;

    if (name === 'pin') {

      setNewPinCode({
        ...newPinCode,
        pin: value,
      })
    } else {

      setNewPinCode({
        ...newPinCode,
        flat_id: filteredFlats.find((filteredFlat) => filteredFlat.number === value).id,
      })
    }
  }

  const handleNewPinCodeSubmit = () => {
    let newPinCodeConstructor = {
      pin: newPinCode.pin,
    };

    if (newPinCode.flat_id) {
      newPinCodeConstructor = {
        ...newPinCodeConstructor,
        flat_id: newPinCode.flat_id,
      }
    }

    if (role !== Roles.TENANT) {

      newPinCodeConstructor = {
        ...newPinCodeConstructor,
        intercom_id: newPinCode.intercom_id,
      }
    }
    
    requestCreatePinCode(newPinCodeConstructor)
    
    setNewPinCode({
      ...newPinCode,
      pin: '',
      flat_id: flatId || '',
    })
  }

  const handleDeletePinCode = (id) => {

    requestDeletePinCode(id)
  }

  return (
    <ListForm 
      values={filteredPinCodesWithFlatNumber}
      valuesIndex='pin'
      role={role}
      moreInfoIndexes={intercomId && ['pin', 'flatNumber']}
      moreInfoNames={intercomId && ['ПИН-код: ', 'Номер квартиры: ']}
      isListLoading={isPinCodesListLoading}
      noValuesText='Пин-коды отсутсвуют'
      addValueHeader='Добавление пин-кода'
      deleteValue={(id) => handleDeletePinCode(id)}
      onSubmitNewValues={handleNewPinCodeSubmit}
      renderAddForm={() => (
        <> 
          {
            (filteredIntercom && filteredFlats.length !== 0) || role === Roles.TENANT
            ?
              <>
                <InputField
                  innerLabel={'Пин-код' + (!!intercomId ? '*' : '')}
                  type='text'
                  name='pin'
                  className='b-pin-codes-list__input-field'
                  value={newPinCode.pin}
                  error={isPinCodeAlreadyExist}
                  helperText={isPinCodeAlreadyExist && 'Такой пин-код уже есть'}
                  onChange={handleChangeNewPinCode}
                />
                {
                  !!intercomId
                  &&
                    <SelectField 
                      label='Номер квартиры'
                      name='flat_id'
                      className='b-rfid-keys-list__select-field'
                      defaultValue={''}
                      values={sortedFlatsNumbers}
                      onChange={handleChangeNewPinCode}          
                    />
                }
              </>
            :
              <>
                {
                  role !== Roles.TENANT
                  &&
                    <div className='b-pin-codes-list__no-values'>
                      Необходимо добавить домофон 
                    </div>
                }
              </>
          }
          <button
            type='submit'
            className='b-button b-modal__submit-btn'
            disabled={!newPinCode.pin || isPinCodeAlreadyExist}
          >
            Добавить
          </button>
        </>
      )}
    />
  )
}

export default PinCodesList
