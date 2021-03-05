import React, { useState } from 'react'

import InputField from '../../subcomponents/input-field/InputField'
import ListForm from '../../subcomponents/list-form/ListForm'

import './SipCredentialsList.css'

const SipCredentialsList = (props) => {
  const {
    companyId,
    sipServerId,
    // intercomId,
    sipCredentials,
    isSipCredentialsListLoading,
    requestSipCredentials,
    requestUpdateSipCredential,
    requestDeleteSipCredential,
    requestCreateSipCredential,
  } = props;

  const filteredSipCredentials = sipCredentials.filter((sipCredential) => sipCredential.sip_server_id === sipServerId);

  const [editedSipCredential, setEditedSipCredential] = useState({
    id: '',
    sip_server_id: sipServerId,
    login: '',
    password: '',
    confirmedPassword: '',
  });

  const [newSipCredential, setNewSipCredential] = useState({
    sip_server_id: sipServerId,
    login: '',
    password: '',
    confirmedPassword: '',
  });

  const [initialEditedLogin, setInitialEditedLogin] = useState('');

  React.useEffect(() => {

    requestSipCredentials(companyId)
  }, [requestSipCredentials, companyId])

  const isNewLoginAlreadyExist    = !!filteredSipCredentials.find((sipCredential) => sipCredential.login === newSipCredential.login);
  const isEditedLoginAlreadyExist = editedSipCredential.login !== initialEditedLogin && !!filteredSipCredentials.find((sipCredential) => sipCredential.login === editedSipCredential.login);

  const isNewPasswordsMatch = newSipCredential.confirmedPassword === '' || (newSipCredential.password === newSipCredential.confirmedPassword);
  const isEditedPasswordsMatch = editedSipCredential.confirmedPassword === '' || (editedSipCredential.password === editedSipCredential.confirmedPassword);

  const handleChangeEditedSipCredential = (event, values) => {
    const value = event.target && event.target.value;
    const name  = event.target && event.target.name; 

    if (values) {

      setEditedSipCredential({
        ...editedSipCredential,
        id: values.id,
        login: values.login,
        password: values.password,
      })
      setInitialEditedLogin(values.login)
    } else if (name === 'login') {
      
      setEditedSipCredential({
        ...editedSipCredential,
        login: value.replace(' ', ''),
      })
    } else {
      
      setEditedSipCredential({
        ...editedSipCredential,
        [name]: value,
      })
    }
  }

  const handleEditedSipCredentialSubmit = () => {
    
    requestUpdateSipCredential(
      editedSipCredential.id,
      editedSipCredential.sip_server_id,
      editedSipCredential.login,
      editedSipCredential.password,
    )

    setEditedSipCredential({
      id: '',
      login: '',
      password: '',
      confirmedPassword: '',
    })
  }

  const handleChangeNewSipCredential = (event) => {
    const value = event.target.value;
    const name  = event.target.name; 
    
    if (name === 'login') {
      
      setNewSipCredential({
        ...newSipCredential,
        login: value.replace(' ', ''),
      })
    } else {
      
      setNewSipCredential({
        ...newSipCredential,
        [name]: value,
      })
    }
  }

  const handleNewSipCredentialSubmit = () => {
    
    requestCreateSipCredential(
      newSipCredential.sip_server_id,
      newSipCredential.login,
      newSipCredential.password,
    )

    setNewSipCredential({
      login: '',
      password: '',
      confirmedPassword: '',
    })
  }

  const handleDeleteSipCredential = (id) => {

    requestDeleteSipCredential(id)
  }

  return (
    <ListForm 
      values={filteredSipCredentials}
      valuesIndex='login'
      noValuesText='Пользователи отсутсвуют'
      addValueHeader='Добавление пользователя'
      isListLoading={isSipCredentialsListLoading}
      deleteValue={(id) => handleDeleteSipCredential(id)}
      setInitialValues={(values) => handleChangeEditedSipCredential({}, values)}
      onSubmitNewValues={handleNewSipCredentialSubmit}
      onSubmitEditedValues={handleEditedSipCredentialSubmit}
      renderAddForm={() => (
        <>
          <InputField
            innerLabel='Логин'
            type='text'
            name='login'
            value={newSipCredential.login}
            error={isNewLoginAlreadyExist}
            helperText={isNewLoginAlreadyExist && 'Такой логин уже есть'}
            onChange={handleChangeNewSipCredential}
          />
          <input type='password' className='b-input-field__empty-input' />
          <InputField
            innerLabel='Пароль'
            type='password'
            name='password'
            value={newSipCredential.password}
            onChange={handleChangeNewSipCredential}
          />
          <InputField
            innerLabel='Подтвердите пароль'
            type='password'
            name='confirmedPassword'
            value={newSipCredential.confirmedPassword}
            error={!isNewPasswordsMatch}
            helperText={!isNewPasswordsMatch && 'Пароли не совпадают'}
            onChange={handleChangeNewSipCredential}
          />
          <button
            type='submit'
            className='b-button b-modal__submit-btn'
            disabled={
              /^\s+$/.test(newSipCredential.login) ||
              newSipCredential.password.length < 4 ||
              newSipCredential.confirmedPassword.length < 4 ||
              !newSipCredential.login || 
              !newSipCredential.password ||
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
            value={editedSipCredential.login}
            error={isEditedLoginAlreadyExist}
            helperText={isEditedLoginAlreadyExist && 'Такой логин уже есть'}
            onChange={handleChangeEditedSipCredential}
          />
          <input type='password' className='b-input-field__empty-input' />
          <InputField
            innerLabel='Пароль'
            type='password'
            name='password'
            value={editedSipCredential.password}
            onChange={handleChangeEditedSipCredential}
          />
          <InputField
            innerLabel='Подтвердите пароль'
            type='password'
            name='confirmedPassword'
            value={editedSipCredential.confirmedPassword}
            error={!isEditedPasswordsMatch}
            helperText={!isEditedPasswordsMatch && 'Пароли не совпадают'}
            onChange={handleChangeEditedSipCredential}
          />  
          <button
            type='submit'
            className='b-button b-modal__submit-btn'
            disabled={
              /^\s+$/.test(editedSipCredential.login) ||
              editedSipCredential.password.length < 4 ||
              editedSipCredential.confirmedPassword.length < 4 ||
              !editedSipCredential.login || 
              !editedSipCredential.password ||
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

export default SipCredentialsList
