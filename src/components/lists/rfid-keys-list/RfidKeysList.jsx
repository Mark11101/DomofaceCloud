import React, { useState } from 'react'

import InputField from '../../subcomponents/input-field/InputField'
import ListForm from '../../subcomponents/list-form/ListForm'
import SelectField from '../../subcomponents/select-field/SelectField'

import './RfidKeysList.css'

const RfidKeysList = (props) => {
  const {
    companyId,
    intercomId,
    entranceId,
    flatId,
    intercoms,
    flats,
    rfidKeys,
    isRfidKeysListLoading,
    requestRfidKeys,
    requestDeleteRfidKey,
    requestCreateRfidKey,
  } = props;

  const filteredRfidKeys = rfidKeys.filter((rfidKey) => {

    return (
      flatId
      ?
        rfidKey.flat_id === flatId
      :
        rfidKey.intercom_id === intercomId
    )
  });
  
  const filteredIntercom = intercoms.find((intercom) => intercom.entrance_id === entranceId);
  const filteredFlats = flats.filter((flat) => flat.entrance_id === entranceId);

  const [newRfidKey, setNewRfidKey] = useState({
    flat_id: flatId || '',
    intercom_id: intercomId || (filteredIntercom && filteredIntercom.id) || '',
    key: '',
  });

  React.useEffect(() => {

    requestRfidKeys(companyId)
  }, [requestRfidKeys, companyId])

  const compare = (a, b) => {
    const firstItem  = a.number.toString().toUpperCase();
    const secondItem = b.number.toString().toUpperCase();

    return firstItem - secondItem
  }

  const sortedFlats = filteredFlats.sort(compare);
  
  let sortedFlatsNumbers = sortedFlats.map(flat => flat.number);
  sortedFlatsNumbers.unshift('')

  const filteredRfidKeysWithFlatNumber = filteredRfidKeys.map((filteredRfidKey) => {
    const findedFlat = filteredFlats.find((filteredFlat) => filteredFlat.id === filteredRfidKey.flat_id);

    return {
      ...filteredRfidKey,
      flatNumber: (findedFlat && findedFlat.number) || '',
    }
  });

  const isRfidKeyAlreadyExist = !!rfidKeys.find((rfidKey) => rfidKey.key === newRfidKey.key);

  const handleChangeNewRfidKey = (event) => {
    const name  = event.target.name;
    const value = event.target.value;

    if (name === 'key') {

      setNewRfidKey({
        ...newRfidKey,
        key: value,
      })
    } else {
      
      setNewRfidKey({
        ...newRfidKey,
        flat_id: filteredFlats.find((filteredFlat) => filteredFlat.number === value).id,
      })
    }
  }
  
  const handleNewRfidKeySubmit = () => {
    let newRfidKeyConstructor = {
      key: newRfidKey.key,
      intercom_id: newRfidKey.intercom_id,
    };

    if (newRfidKey.flat_id) {
      newRfidKeyConstructor = {
        ...newRfidKeyConstructor,
        flat_id: newRfidKey.flat_id,
      }
    }
    
    requestCreateRfidKey(newRfidKeyConstructor)
    
    setNewRfidKey({
      ...newRfidKey,
      key: '',
      flat_id: flatId || '',
    })
  }

  const handleDeleteRfidKey = (id) => {

    requestDeleteRfidKey(id)
  }

  return (
    <ListForm 
      values={filteredRfidKeysWithFlatNumber}
      valuesIndex='key'
      moreInfoIndexes={intercomId && ['key', 'flatNumber']}
      moreInfoNames={intercomId && ['RFID-ключ: ', 'Номер квартиры: ']}
      isListLoading={isRfidKeysListLoading}
      noValuesText='RFID-ключи отсутсвуют'
      addValueHeader='Добавление RFID-ключа'
      deleteValue={(id) => handleDeleteRfidKey(id)}
      onSubmitNewValues={handleNewRfidKeySubmit}
      renderAddForm={() => (
        <>  
          {
            filteredIntercom && filteredFlats.length !== 0
            ?
              <> 
                <InputField
                  innerLabel={'RFID-ключ' + (!!intercomId ? '*' : '')}
                  type='text'
                  name='key'
                  className='b-rfid-keys-list__input-field'
                  value={newRfidKey.key}
                  error={isRfidKeyAlreadyExist}
                  helperText={isRfidKeyAlreadyExist && 'Такой ключ уже есть'}
                  onChange={handleChangeNewRfidKey}
                />  
                {
                  !!intercomId
                  &&
                    <SelectField 
                      label='Номер квартиры: '
                      name='flat_id'
                      className='b-rfid-keys-list__select-field'
                      defaultValue={''}
                      values={sortedFlatsNumbers}
                      onChange={handleChangeNewRfidKey}          
                    />
                }
              </>
            :
              <div className='b-rfid-keys-list__no-values'>
                {
                  !filteredIntercom
                  &&
                    'Необходимо добавить домофон'
                } 
              </div>
          }
          <button
            type='submit'
            className='b-button b-modal__submit-btn'
            disabled={!newRfidKey.key || isRfidKeyAlreadyExist}
          >
            Добавить
          </button>
        </>
      )}
    />
  )
}

export default RfidKeysList
