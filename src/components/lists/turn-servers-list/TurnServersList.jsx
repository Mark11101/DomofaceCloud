import React, { useState } from 'react'

import InputField from '../../subcomponents/input-field/InputField'
import ListForm from '../../subcomponents/list-form/ListForm'
import SelectField from '../../subcomponents/select-field/SelectField'
import ConnectionTypes from '../../../constants/ConnectionTypes'

import './TurnServersList.css'

const TurnServersList = (props) => {
  const {
    turnServers,
    companies,
    isTurnServersListLoading,
    requestTurnServers,
    requestUpdateTurnServer,
    requestDeleteTurnServer,
    requestCreateTurnServer,
  } = props;

  const [editedTurnServer, setEditedTurnServer] = useState({
    id: '',
    service_company_id: '',
    host: '',
    login: '',
    password: '',
    confirmedPassword: '',
    connection_type: '',
    own: true,
  });

  const [companyToEdit, setCompanyToEdit] = useState({
    id: '',
    organization: '',
  });

  const [initialConnectionTypeForEdit, setInitialConnectionTypeForEdit] = useState('');

  const [newTurnServer, setNewTurnServer] = useState({
    service_company_id: '',
    host: '',
    login: '',
    password: '',
    confirmedPassword: '',
    connection_type: ConnectionTypes.UDP,
    own: true,
  });

  const [initialEditedLogin, setInitialEditedLogin] = useState('');

  React.useEffect(() => {

    requestTurnServers()
  }, [requestTurnServers])

  const turnServersWithCompanyName = turnServers.map((turnServer) => {
    const findedCompany = companies.find((company) => company.id === turnServer.service_company_id);
   
    return {
      ...turnServer,
      companyName: (findedCompany && findedCompany.organization) || '',
    }
  });

  const isNewHostAlreadyExist  = !!turnServers.find((turnServer) => turnServer.host === newTurnServer.host);

  const isNewLoginAlreadyExist    = !!turnServers.find((turnServer) => turnServer.login === newTurnServer.login);
  const isEditedLoginAlreadyExist = editedTurnServer.login !== initialEditedLogin && !!turnServers.find((turnServer) => turnServer.login === editedTurnServer.login);

  const isNewPasswordsMatch    = newTurnServer.confirmedPassword === '' || (newTurnServer.password === newTurnServer.confirmedPassword);
  const isEditedPasswordsMatch = editedTurnServer.confirmedPassword === '' || (editedTurnServer.password === editedTurnServer.confirmedPassword);

  const handleChangeEditedTurnServer = (event, values) => {
    const value = event.target && event.target.value;
    const name  = event.target && event.target.name; 

    if (values) {

      setEditedTurnServer({
        ...editedTurnServer,
        id: values.id,
        service_company_id: values.service_company_id,
        host: values.host,
        login: values.login,
        password: values.password,
        connection_type: values.connection_type,
        own: values.own,
      })

      const findedCompany = companies.find((company) => company.id === values.service_company_id);

      setCompanyToEdit({
        id: values.service_company_id,
        organization: (findedCompany && findedCompany.organization) || '',
      })

      setInitialEditedLogin(values.login)
      setInitialConnectionTypeForEdit(values.connection_type)
    } else if (name === 'service_company_id') {
      const findedCompany = companies.find((company) => company.organization === value);
     
      setEditedTurnServer({
        ...editedTurnServer,
        service_company_id: (findedCompany && findedCompany.id) || '',
      })
    }  else if (name === 'login') {
      
      setEditedTurnServer({
        ...editedTurnServer,
        login: value.replace(' ', ''),
      })
    } else {
      
      setEditedTurnServer({
        ...editedTurnServer,
        [name]: value,
      })
    }
  }

  const handleEditedTurnServerSubmit = () => {
    let editedTurnServerConstructor = {
      id: editedTurnServer.id,
      host: editedTurnServer.host,
      login: editedTurnServer.login,
      password: editedTurnServer.password,
      connection_type: editedTurnServer.connection_type,
      own: true,
    };

    if (editedTurnServer.service_company_id) {
      editedTurnServerConstructor = {
        ...editedTurnServerConstructor,
        service_company_id: editedTurnServer.service_company_id,
        own: false,
      }
    }
    
    requestUpdateTurnServer(
      editedTurnServerConstructor.id,
      editedTurnServerConstructor,
    )

    setEditedTurnServer({
      ...editedTurnServer,
      id: '',
      service_company_id: '',
      host: '',
      login: '',
      password: '',
      confirmedPassword: '',
      connection_type: '',
      own: true,
    })
  }

  const handleChangeNewTurnServer = (event) => {
    const value = event.target.value;
    const name  = event.target.name; 
    
    if (name === 'service_company_id') {
      const findedCompany = companies.find((company) => company.organization === value);

      setNewTurnServer({
        ...newTurnServer,
        service_company_id: (findedCompany && findedCompany.id) || '',
      })
    } else if (name === 'login') {
      
      setNewTurnServer({
        ...newTurnServer,
        login: value.replace(' ', ''),
      })
    } else {
      
      setNewTurnServer({
        ...newTurnServer,
        [name]: value,
      })
    }
  }

  const handleNewTurnServerSubmit = () => {
    let newTurnServerConstructor = {
      host: newTurnServer.host,
      login: newTurnServer.login,
      password: newTurnServer.password,
      connection_type: newTurnServer.connection_type,
      own: true,
    };

    if (newTurnServer.service_company_id) {
      newTurnServerConstructor = {
        ...newTurnServerConstructor,
        service_company_id: newTurnServer.service_company_id,
        own: false,
      }
    }
    
    requestCreateTurnServer(newTurnServerConstructor)

    setNewTurnServer({
      ...newTurnServer,
      service_company_id: '',
      host: '',
      login: '',
      password: '',
      confirmedPassword: '',
      connection_type: ConnectionTypes.UDP,
      own: true,
    })
  }

  const handleDeleteTurnServer = (id) => {

    requestDeleteTurnServer(id)
  }

  return (
    <div className="b-turn-servers">
      <ListForm 
        values={turnServersWithCompanyName}
        valuesIndex='host'
        moreInfoIndexes={['host', 'login', 'connection_type', 'companyName']}
        moreInfoNames={['IP адрес: ', 'Логин: ', 'Тип подключения: ', 'Компания: ']}
        noValuesText='Серверы отсутсвуют'
        addValueHeader='Добавление сервера'
        isListLoading={isTurnServersListLoading}
        deleteValue={(id) => handleDeleteTurnServer(id)}
        setInitialValues={(values) => handleChangeEditedTurnServer({}, values)}
        onSubmitNewValues={handleNewTurnServerSubmit}
        onSubmitEditedValues={handleEditedTurnServerSubmit}
        renderAddForm={() => (
          <>
            <InputField
              innerLabel='IP адрес*'
              type='text'
              name='host'
              value={newTurnServer.host}
              error={isNewHostAlreadyExist}
              helperText={isNewHostAlreadyExist && 'Такой адрес уже есть'}
              onChange={handleChangeNewTurnServer}
            />
            <InputField
              innerLabel='Логин*'
              type='text'
              name='login'
              value={newTurnServer.login}
              error={isNewLoginAlreadyExist}
              helperText={isNewLoginAlreadyExist && 'Такой логин уже есть'}
              onChange={handleChangeNewTurnServer}
            />
            <InputField
              innerLabel='Пароль*'
              type='password'
              name='password'
              value={newTurnServer.password}
              onChange={handleChangeNewTurnServer}
            />
            <InputField
              innerLabel='Подтвердите пароль*'
              type='password'
              name='confirmedPassword'
              value={newTurnServer.confirmedPassword}
              error={!isNewPasswordsMatch}
              helperText={!isNewPasswordsMatch && 'Пароли не совпадают'}
              onChange={handleChangeNewTurnServer}
            />
            <SelectField
              label='Тип подключения*'
              name='connection_type'
              defaultValue={ConnectionTypes.UDP}
              values={ConnectionTypes}
              onChange={handleChangeNewTurnServer}
            /> 
            <SelectField 
              label='Компания'
              name='service_company_id'
              defaultValue=''
              emptyField
              values={companies.map(company => company.organization)}
              onChange={handleChangeNewTurnServer}          
            /> 
            <button
              type='submit'
              className='b-button b-modal__submit-btn'
              disabled={
                /^\s+$/.test(newTurnServer.host) ||
                /^\s+$/.test(newTurnServer.login) ||
                newTurnServer.password.length < 4 ||
                newTurnServer.confirmedPassword.length < 4 ||
                !newTurnServer.host || 
                !newTurnServer.login ||
                !newTurnServer.password || 
                !isNewPasswordsMatch ||
                isNewHostAlreadyExist ||
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
              innerLabel='Логин*'
              type='text'
              name='login'
              value={editedTurnServer.login}
              error={isEditedLoginAlreadyExist}
              helperText={isEditedLoginAlreadyExist && 'Такой логин уже есть'}
              onChange={handleChangeEditedTurnServer}
            />
            <InputField
              innerLabel='Пароль*'
              type='password'
              name='password'
              value={editedTurnServer.password}
              onChange={handleChangeEditedTurnServer}
            />
            <InputField
              innerLabel='Подтвердите пароль*'
              type='password'
              name='confirmedPassword'
              value={editedTurnServer.confirmedPassword}
              error={!isEditedPasswordsMatch}
              helperText={!isEditedPasswordsMatch && 'Пароли не совпадают'}
              onChange={handleChangeEditedTurnServer}
            /> 
            <SelectField
              label='Тип подключения*'
              name='connection_type'
              defaultValue={initialConnectionTypeForEdit}
              values={ConnectionTypes}
              onChange={(e) => handleChangeEditedTurnServer(e)}
            />  
            <SelectField 
              label='Компания'
              name='service_company_id'
              defaultValue={companyToEdit.organization}
              emptyField
              values={companies.map(company => company.organization)}
              onChange={(e) => handleChangeEditedTurnServer(e)}          
            />
            <button
              type='submit'
              className='b-button b-modal__submit-btn'
              disabled={
                /^\s+$/.test(editedTurnServer.login) ||
                editedTurnServer.password.length < 4 ||
                editedTurnServer.confirmedPassword.length < 4 ||
                !editedTurnServer.host || 
                !editedTurnServer.login ||
                !editedTurnServer.password ||
                !isEditedPasswordsMatch ||
                isEditedLoginAlreadyExist
              }
            >
              Сохранить
            </button>
          </>
        )}
      />
    </div>
  )
}

export default TurnServersList
