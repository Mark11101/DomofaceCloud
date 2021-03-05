import React, { useState } from 'react'

import InputField from '../../subcomponents/input-field/InputField'
import ListForm from '../../subcomponents/list-form/ListForm'
import SelectField from '../../subcomponents/select-field/SelectField'

import './SipAccountsList.css'

const SipAccountsList = (props) => {
  const {
    companyId,
    sipServerId,
    intercomId,
    entranceId,
    flatId,
    sipServers,
    intercoms,
    flats,
    houses,
    entrances,
    sipAccounts,
    isSipAccountsListLoading,
    requestSipServers,
    requestSipAccounts,
    requestUpdateSipAccount,
    requestDeleteSipAccount,
    requestCreateSipAccount,
  } = props;

  const compare = (a, b, index) => {
    const firstItem  = a[index].toString().toUpperCase();
    const secondItem = b[index].toString().toUpperCase();
    
    if (index === 'number') {

      return firstItem - secondItem
    } else {

      let comparison = 0;
  
      if (firstItem > secondItem) {
        comparison = 1;
      } else if (firstItem < secondItem) {
        comparison = -1;
      }
  
      return comparison;
    }
  }

  const sortedHouses = houses.sort((a, b) => compare(a, b, 'address'));

  const filteredSipAccounts = sipAccounts.filter((sipAccount) => {
    
    if (!!flatId) {
      return sipAccount.flat_id === flatId

    } else if (!!intercomId) {
      return sipAccount.intercom_id === intercomId
    
    } else if (!!sipServerId) {
      return sipAccount.sip_server_id === sipServerId
    
    } else {
      return null
    }
  })

  const filteredIntercom  = entranceId ? intercoms.find((intercom) => intercom.entrance_id === entranceId) : null;
  const filteredFlats     = entranceId ? flats.filter((flat) => flat.entrance_id === entranceId) : null;

  const [selectedHouse, setSelectedHouse] = useState({
    id: (houses[0] && houses[0].id) || '',
    address: (houses[0] && houses[0].address) || '',
  });

  const [entrancesToSelect, setEntrancesToSelect] = useState(
    entrances.filter((entrance) => entrance.house_id === selectedHouse.id)
  );

  const sortedEntrancesToSelect = entrancesToSelect.sort((a, b) => compare(a, b, 'number'));

  const [selectedEntrance, setSelectedEntrance] = useState({
    id: (entrancesToSelect[0] && entrancesToSelect[0].id) || '',
    number: (entrancesToSelect[0] && entrancesToSelect[0].number) || '',
  });
  
  const [flatsToSelect, setFlatsToSelect] = useState(
    flats.filter((flat) => flat.entrance_id === selectedEntrance.id)
  );

  const sortedFlatsToSelect = flatsToSelect.sort((a, b) => compare(a, b, 'number'));
  
  const sortedFlatsToSelectWithEmptyItem = [
    ...sortedFlatsToSelect
  ];
  sortedFlatsToSelectWithEmptyItem.unshift('')

  React.useEffect(() => {

    requestSipAccounts(companyId)
    !sipServerId && requestSipServers(companyId)
  }, [requestSipAccounts, requestSipServers, companyId, sipServerId])
 
  const filteredSipAccountsWithSipServerHosts = filteredSipAccounts.map((filteredSipAccount) => {

    const findedSipServer = sipServers.find((sipServer) => sipServer.id === filteredSipAccount.sip_server_id);

    return {
      ...filteredSipAccount,
      sipServerHost: (findedSipServer && findedSipServer.host) || '',
    }
  })

  const filteredSipAccountsWithFlatNumbersAndSipServerHosts = intercomId && filteredSipAccounts.map((filteredSipAccount) => {

    const findedFlat = flats.find((flat) => flat.id === filteredSipAccount.flat_id);
    const findedSipServer = sipServers.find((sipServer) => sipServer.id === filteredSipAccount.sip_server_id);

    return {
      ...filteredSipAccount,
      flatNumber: (findedFlat && findedFlat.number) || '',
      sipServerHost: (findedSipServer && findedSipServer.host) || '',
    }
  })

  const filteredSipAccountsWithHouseAddressEntranceAndFlatNumber = sipServerId && filteredSipAccounts.map((filteredSipAccount) => {
    const filteredFlat     = flats.find((flat) => flat.id === filteredSipAccount.flat_id);
    const filteredIntercom = intercoms.find((intercom) => intercom.id === filteredSipAccount.intercom_id);
    const filteredEntrance = filteredIntercom && entrances.find((entrance) => entrance.id === filteredIntercom.entrance_id);
    const filteredHouse    = filteredEntrance && houses.find((house) => house.id === filteredEntrance.house_id); 
    
    return {

      ...filteredSipAccount,
      flatNumber: filteredFlat ? filteredFlat.number : '-',
      entranceNumber: filteredEntrance ? filteredEntrance.number : '-',
      houseAddress: filteredHouse ? filteredHouse.address : '-',
    }
  })

  const filteredIntercomByEntranceId = intercoms.find((intercom) => intercom.entrance_id === selectedEntrance.id);
 
  const initialEditedSipAccounts = {
    id: '',
    login: '',
    password: '',
    confirmedPassword: '',
    sip_server_id: sipServerId || '',
    flat_id: (flatId && flatId) || '', 
    intercom_id: 
      sipServerId
      ?
        filteredIntercomByEntranceId ? filteredIntercomByEntranceId.id : ''
      :
        intercomId || (filteredIntercom && filteredIntercom.id) || ''
  };
  
  const initialNewSipAccounts = {
    login: '',
    password: '',
    confirmedPassword: '',
    sip_server_id: sipServerId || (sipServers[0] && sipServers[0].id) || '',
    flat_id: (flatId && flatId) || '', 
    intercom_id: 
      sipServerId
      ?
        filteredIntercomByEntranceId ? filteredIntercomByEntranceId.id : ''
      :
        intercomId || (filteredIntercom && filteredIntercom.id) || ''
  }

  const [editedSipAccount, setEditedSipAccount] = useState(initialEditedSipAccounts);
  const [newSipAccount, setNewSipAccount] = useState(initialNewSipAccounts);
  
  const [initialEditedLogin, setInitialEditedLogin] = useState('');

  const isNewLoginAlreadyExist    = !!sipAccounts.find((sipAccount) => sipAccount.login === newSipAccount.login);
  const isEditedLoginAlreadyExist = editedSipAccount.login !== initialEditedLogin && !!filteredSipAccounts.find((sipAccount) => sipAccount.login === editedSipAccount.login);

  const isNewPasswordsMatch = newSipAccount.confirmedPassword === '' || (newSipAccount.password === newSipAccount.confirmedPassword);
  const isEditedPasswordsMatch = editedSipAccount.confirmedPassword === '' || (editedSipAccount.password === editedSipAccount.confirmedPassword);

  const setMoreInfoIndexes = () => {

    if (!!flatId) {
      return ['login', 'sipServerHost']

    } else if (!!intercomId) {
      return ['login', 'flatNumber', 'sipServerHost']
    
    } else if (!!sipServerId) {
      return ['login', 'houseAddress', 'entranceNumber', 'flatNumber']
    }
  }

  const setMoreInfoNames = () => {

    if (!!flatId) {
      return ['Логин: ', 'Адрес SIP сервера: ']

    } else if (!!intercomId) {
      return ['Логин: ', 'Номер квартиры: ', 'Адрес SIP сервера: ']
    
    } else if (!!sipServerId) {
      return ['Логин: ', 'Адрес дома: ', 'Подъезд: ', 'Квартира: ']
    }
  }

  const setListValues = () => {

    if (!!flatId) {
      return filteredSipAccountsWithSipServerHosts

    } else if (!!intercomId) {
      return filteredSipAccountsWithFlatNumbersAndSipServerHosts
    
    } else if (!!sipServerId) {
      return filteredSipAccountsWithHouseAddressEntranceAndFlatNumber
    }
  }

  const handleChangeEditedSipAccount = (event, values) => {
    const value = event.target && event.target.value;
    const name  = event.target && event.target.name; 

    if (values) {
      
      setEditedSipAccount({
        ...editedSipAccount,
        id: values.id,
        intercom_id: values.intercom_id,
        sip_server_id: values.sip_server_id,
        flat_id: values.flat_id,
        login: values.login,
        password: values.password,
      })

      setInitialEditedLogin(values.login)      
    } else if (name === 'login') {
      
      setEditedSipAccount({
        ...editedSipAccount,
        login: value.replace(' ', ''),
      })
    } else if (name === 'sip_server_id') {

      const filteredSipServer = sipServers.find((sipServer) => sipServer.host === value);
      
      setNewSipAccount({
        ...newSipAccount,
        sip_server_id: filteredSipServer.id,
      })
    } else {
      
      setEditedSipAccount({
        ...editedSipAccount,
        [name]: value,
      })
    }
  }

  const handleEditedSipAccountSubmit = () => {
    
    requestUpdateSipAccount(
      editedSipAccount.id,
      editedSipAccount.intercom_id,
      editedSipAccount.sip_server_id,
      editedSipAccount.flat_id,
      editedSipAccount.login,
      editedSipAccount.password,
    )

    setEditedSipAccount(initialEditedSipAccounts)
  }

  const handleChangeNewSipAccount = (event) => {
    const value = event.target.value;
    const name  = event.target.name; 
    
    if (name === 'login') {
      
      setNewSipAccount({
        ...newSipAccount,
        login: value.replace(' ', ''),
      })
    } else if (name === 'sip_server_id') {

      const filteredSipServer = sipServers.find((sipServer) => sipServer.host === value);
      
      setNewSipAccount({
        ...newSipAccount,
        sip_server_id: filteredSipServer.id,
      })
    } else if (name === 'flat_id') {

      const filteredFlat = filteredFlats.find((flat) => flat.number === value);

      setNewSipAccount({
        ...newSipAccount,
        flat_id: filteredFlat.id,
      })
    } else {

      setNewSipAccount({
        ...newSipAccount,
        [name]: value,
      })
    }
  }
  
  const handleNewSipAccountSubmit = () => {
    
    requestCreateSipAccount(
      newSipAccount.intercom_id,
      newSipAccount.sip_server_id,
      newSipAccount.flat_id || null,
      newSipAccount.login,
      newSipAccount.password,
    )

    setNewSipAccount(initialNewSipAccounts)
  }
  
  const handleDeleteSipAccount = (id) => {

    requestDeleteSipAccount(id)
  }

  const handleChangeSelectedHouseToAdd = (event, address) => {
    const value = address || event.target.value;

    const houseId = houses.find((house) => house.address === value).id;
    
    setSelectedHouse({
      id: houseId,
      address: value,
    })
    
    const filteredEntrances = entrances.filter((entrance) => entrance.house_id === houseId).sort((a, b) => compare(a, b, 'number'));
   
    if (filteredEntrances.length !== 0) {

      setSelectedEntrance({
        id: filteredEntrances[0].id,
        number: filteredEntrances[0].number,
      })
      setEntrancesToSelect(filteredEntrances)
      
      const filteredFlats = flats.filter((flat) => flat.entrance_id === filteredEntrances[0].id).sort((a, b) => compare(a, b, 'number'));

      if (filteredFlats.length !== 0) {
        setFlatsToSelect(filteredFlats)

        const filteredIntercom = intercoms.find((intercom) => intercom.entrance_id === filteredEntrances[0].id);
        
        setNewSipAccount({
          ...newSipAccount,
          flat_id: filteredFlats[0].id,
          intercom_id: filteredIntercom ? filteredIntercom.id : '',
        })

      } else {
        setFlatsToSelect([])

        setNewSipAccount({
          ...newSipAccount,
          flat_id: '',
        })
      }
    } else {
      setEntrancesToSelect([])
      setSelectedEntrance({
        id: '',
        number: '',
      })
      setFlatsToSelect([])

      setNewSipAccount({
        ...newSipAccount,
        intercom_id: '',
        flat_id: '',
      })
    }
  }

  const handleChangeSelectedEntranceToAdd = (event) => {
    const value = event.target.value;

    const entranceId = entrancesToSelect.find((entrance) => entrance.number === value).id;
    const filteredIntercom = intercoms.find((intercom) => intercom.entrance_id === entranceId);
  
    setSelectedEntrance({
      id: entranceId,
      number: value,
    })
    
    setNewSipAccount({
      ...newSipAccount,
      intercom_id: filteredIntercom ? filteredIntercom.id : '',
    })
    
    const filteredFlats = flats.filter((flat) => flat.entrance_id === entranceId).sort((a, b) => compare(a, b, 'number'));
  
    if (filteredFlats.length !== 0) {
      setFlatsToSelect(filteredFlats)
      
      setNewSipAccount({
        ...newSipAccount,
        flat_id: filteredFlats[0].id,
        intercom_id: filteredIntercom ? filteredIntercom.id : '',
      })
    } else {
      setFlatsToSelect([])
      
      setNewSipAccount({
        ...newSipAccount,
        flat_id: '',
        intercom_id: filteredIntercom ? filteredIntercom.id : '',
      })
    }
  }
  
  const handleChangeSelectedFlatToAdd = (event) => {
    const value = event.target.value;

    const filteredFlat = flatsToSelect.find((flat) => flat.number === value);
    
    setNewSipAccount({
      ...newSipAccount,
      flat_id: (filteredFlat && filteredFlat.id) || '',
    })
  }

  const handleCloseAddModal = () => {

    houses.length !== 0 
    && 
      handleChangeSelectedHouseToAdd({}, houses[0].address)
  }

  const handleCloseEditModal = () => {

    houses.length !== 0 
    && 
      handleChangeSelectedHouseToAdd({}, houses[0].address)
  }
  
  return (
    <ListForm 
      values={setListValues()}
      valuesIndex='login'
      moreInfoIndexes={setMoreInfoIndexes()}
      moreInfoNames={setMoreInfoNames()}
      noValuesText='Аккаунты отсутсвуют'
      addValueHeader='Добавление аккаунта'
      isListLoading={isSipAccountsListLoading}
      deleteValue={(id) => handleDeleteSipAccount(id)}
      setInitialValues={(values) => handleChangeEditedSipAccount({}, values)}
      onCloseAddModal={handleCloseAddModal}
      onCloseEditModal={handleCloseEditModal}
      onSubmitNewValues={handleNewSipAccountSubmit}
      onSubmitEditedValues={handleEditedSipAccountSubmit}
      renderAddForm={() => (
        <>
          {
            !!flatId
            &&
              <>
                {
                  sipServers.length !== 0 && filteredIntercom
                  ?
                    <SelectField 
                      label='SIP сервер'
                      name='sip_server_id'
                      className='b-rfid-keys-list__select-field'
                      defaultValue={sipServers[0].host}
                      values={sipServers.map(sipServer => sipServer.host)}
                      onChange={handleChangeNewSipAccount}          
                    />
                  :
                    <div className='b-sip-accounts-list__no-values'>
                      <p>Необходимо добавить:</p>
                      {
                        sipServers && sipServers.length === 0
                        &&
                          <p>- SIP сервер</p>
                      } 
                      {
                        !filteredIntercom
                        &&
                          <p>- Домофон</p>
                      } 
                    </div>
                }
              </>
          } 
          {
            !!intercomId
            &&
              <>
                {
                  sipServers.length !== 0 && filteredFlats.length !== 0
                  ?
                    <>
                      <SelectField 
                        label='Номер квартиры'
                        name='flat_id'
                        className='b-rfid-keys-list__select-field'
                        defaultValue={''}
                        values={sortedFlatsToSelectWithEmptyItem.map(flat => flat.number)}
                        onChange={handleChangeNewSipAccount}          
                      />
                      <SelectField 
                        label='SIP сервер*'
                        name='sip_server_id'
                        className='b-rfid-keys-list__select-field'
                        defaultValue={sipServers[0].host}
                        values={sipServers.map(sipServer => sipServer.host)}
                        onChange={handleChangeNewSipAccount}          
                      />
                    </>
                  :
                    <div className='b-sip-accounts-list__no-values'>
                      <p>Необходимо добавить:</p>
                      {
                        sipServers && sipServers.length === 0
                        &&
                          <p>- SIP сервер</p>
                      } 
                      {
                        filteredFlats && filteredFlats.length === 0
                        &&
                          <p>- Квартиру</p>
                      } 
                    </div>
                }
              </>
          }    
          {
            !!sipServerId
            &&
              <>
                {
                  houses.length !== 0
                  &&
                    <SelectField 
                      label='Адрес дома*'
                      className='b-rfid-keys-list__select-field'
                      defaultValue={sortedHouses[0].address}
                      values={sortedHouses.map(house => house.address)}
                      onChange={(e) => handleChangeSelectedHouseToAdd(e)}          
                    />
                }
                {
                  entrancesToSelect.length !== 0
                  &&
                    <SelectField 
                      label='Номер подъезда*'
                      className='b-rfid-keys-list__select-field'
                      defaultValue={sortedEntrancesToSelect[0].number}
                      selectedValue={selectedEntrance.number}
                      values={sortedEntrancesToSelect.map(entrance => entrance.number)}
                      onChange={handleChangeSelectedEntranceToAdd}          
                    />
                }
                {
                  flatsToSelect.length !== 0
                  &&
                    <SelectField 
                      label='Номер квартиры'
                      className='b-rfid-keys-list__select-field'
                      defaultValue={''}
                      values={sortedFlatsToSelectWithEmptyItem.map(flat => flat.number)}
                      onChange={handleChangeSelectedFlatToAdd}          
                    />
                }
                {
                  (flatsToSelect.length === 0 || !filteredIntercomByEntranceId)
                  &&
                    <div className='b-sip-accounts-list__no-values'>
                      <p>Необходимо добавить:</p>
                      {
                        houses.length === 0
                        &&
                          <p>- Дом</p>
                      } 
                      {
                        entrancesToSelect.length === 0
                        &&
                          <p>- Подъезд</p>
                      } 
                      {
                        !filteredIntercomByEntranceId
                        &&
                          <p>- Домофон</p>
                      } 
                    </div>
                }
              </>
          }  
          {
            sipServers.length !== 0 && flatsToSelect.length !== 0 && filteredIntercomByEntranceId
            &&
              <>
                <InputField
                  innerLabel={'Логин' + (!flatId ? '*' : '')}
                  type='text'
                  name='login'
                  value={newSipAccount.login}
                  error={isNewLoginAlreadyExist}
                  helperText={isNewLoginAlreadyExist && 'Такой логин уже есть'}
                  onChange={handleChangeNewSipAccount}
                />      
                <input type='password' className='b-input-field__empty-input' />
                <InputField
                  innerLabel={'Пароль' + (!flatId ? '*' : '')}
                  type='password'
                  name='password'
                  value={newSipAccount.password}
                  onChange={handleChangeNewSipAccount}
                />     
                <InputField
                  innerLabel={'Подтвердите пароль' + (!flatId ? '*' : '')}
                  type='password'
                  name='confirmedPassword'
                  value={newSipAccount.confirmedPassword}
                  error={!isNewPasswordsMatch}
                  helperText={!isNewPasswordsMatch && 'Пароли не совпадают'}
                  onChange={handleChangeNewSipAccount}
                />
              </>
          }
          <button
            type='submit'
            className='b-button b-modal__submit-btn'
            disabled={
              newSipAccount.password.length < 4 ||
              newSipAccount.confirmedPassword.length < 4 ||
              !newSipAccount.login ||
              !newSipAccount.sip_server_id ||
              !newSipAccount.intercom_id ||
              !newSipAccount.password ||
              !isNewPasswordsMatch ||
              isNewLoginAlreadyExist
            }
          >
            Добавить
          </button>
        </>
      )}
      renderEditForm={() => (
        <>
          <InputField
            innerLabel='Логин'
            type='text'
            name='login'
            value={editedSipAccount.login}
            error={isEditedLoginAlreadyExist}
            helperText={isEditedLoginAlreadyExist && 'Такой логин уже есть'}
            onChange={(e) => handleChangeEditedSipAccount(e)}
          />   
          <input type='password' className='b-input-field__empty-input' />
          <InputField
            innerLabel='Пароль'
            type='password'
            name='password'
            value={editedSipAccount.password}
            onChange={(e) => handleChangeEditedSipAccount(e)}
          />     
          <InputField
            innerLabel='Подтвердите пароль'
            type='password'
            name='confirmedPassword'
            value={editedSipAccount.confirmedPassword}
            error={!isEditedPasswordsMatch}
            helperText={!isEditedPasswordsMatch && 'Пароли не совпадают'}
            onChange={(e) => handleChangeEditedSipAccount(e)}
          />
          <button
            type='submit'
            className='b-button b-modal__submit-btn'
            disabled={
              editedSipAccount.password.length < 4 ||
              editedSipAccount.confirmedPassword.length < 4 ||
              !editedSipAccount.login ||
              !editedSipAccount.password ||
              !isEditedPasswordsMatch ||
              isEditedLoginAlreadyExist
            }
          >
            Сохранить
          </button>
        </>
      )}
    />
  )
}

export default SipAccountsList
