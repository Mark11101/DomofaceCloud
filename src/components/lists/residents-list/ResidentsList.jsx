import React, { useState } from 'react'

import InputField from '../../subcomponents/input-field/InputField'
import ListForm from '../../subcomponents/list-form/ListForm'
import RadioButton from '../../subcomponents/radio-button/RadioButton'

import './ResidentsList.css'

const ResidentsList = (props) => {
  const {
    companyId,
    flatId,
    companies,
    admins,
    residents,
    isResidentsListLoading,
    requestResidents,
    requestCreateResident,
    requestUpdateResident,
    requestDeleteResident,
  } = props;

  const filteredResidents = residents.filter((resident) => resident.flat_id === flatId);

  const [editedResidentLogin, setEditedResidentLogin] = useState('');

  const [editedResident, setEditedResident] = useState({
    id: '',
    flat_id: flatId,
    login: '',
    password: '',
    confirmedPassword: '',
    temporary: true,
    name: '',
  });

  const [newResident, setNewResident] = useState({
    flat_id: flatId,
    login: '',
    password: '',
    confirmedPassword: '',
    temporary: true,
    name: '',
  });

  React.useEffect(() => {

    requestResidents(companyId)
  }, [requestResidents, companyId])

  const isNewLoginAlreadyExist = 
    !!companies.find((company)  => company.login  === newResident.login) ||
    !!residents.find((resident) => resident.login === newResident.login) ||
    !!admins.find((admin)       => admin.login    === newResident.login);
  const isEditedLoginAlreadyExist = 
    editedResident.login !== editedResidentLogin &&
    (!!companies.find((company) => company.login  === editedResident.login) ||
    !!residents.find((resident) => resident.login === editedResident.login) ||
    !!admins.find((admin)       => admin.login    === editedResident.login));
    
  const isNewPasswordsMatch    = newResident.confirmedPassword === '' || (newResident.password === newResident.confirmedPassword);
  const isEditedPasswordsMatch = editedResident.confirmedPassword === '' || (editedResident.password === editedResident.confirmedPassword);

  const handleChangeEditedResident = (event, values) => {
    const name  = event.target && event.target.name;
    const value = event.target && event.target.value;

    if (values) {

      setEditedResident({
        ...editedResident,
        id: values.id,
        name: values.name,
        login: values.login,
        temporary: values.temporary,
      })

      setEditedResidentLogin(values.login)
    } else {

      name === 'temporary'
      ?
        setEditedResident({
          ...editedResident,
          temporary: !editedResident.temporary,
        })
      :
        setEditedResident({
          ...editedResident,
          [name]: value,
        })
    }
  }
  
  const handleEditedResidentSubmit = () => {

    requestUpdateResident(
      editedResident.id,
      editedResident.flat_id,
      editedResident.login,
      editedResident.password,
      editedResident.temporary,
      editedResident.name,
    )

    setEditedResident({
      ...editedResident,
      id: '',
      login: '',
      password: '',
      confirmedPassword: '',
      temporary: true,
      name: '',
    })
  }

  const handleChangeNewResident = (event) => {
    const name  = event.target.name;
    const value = event.target.value;

    if (name === 'login') {
      
      setNewResident({
        ...newResident,
        login: value.replace(' ', ''),
      })
    } else if (name === 'temporary') {

      setNewResident({
        ...newResident,
        temporary: !newResident.temporary,
      })
    } else {

      setNewResident({
        ...newResident,
        [name]: value,
      })
    }
  }

  const handleNewResidentSubmit = () => {

    requestCreateResident(
      newResident.flat_id,
      newResident.login,
      newResident.password,
      newResident.temporary,
      newResident.name,
    )

    setNewResident({
      flat_id: flatId,
      login: '',
      password: '',
      confirmedPassword: '',
      temporary: true,
      name: '',
    })
  }

  const handleDeleteResident = (id) => {

    requestDeleteResident(id)
  }

  return (
    <>      
      <ListForm 
        values={filteredResidents}
        valuesIndex='name'
        moreInfoIndexes={['name', 'login', 'temporary']}
        moreInfoNames={['Имя: ', 'Логин: ', 'Временный пароль: ']}
        noValuesText='Жители отсутсвуют'
        addValueHeader='Добавление жителя'
        isListLoading={isResidentsListLoading}
        deleteValue={(id) => handleDeleteResident(id)}
        setInitialValues={(values) => handleChangeEditedResident({}, values)}
        onSubmitNewValues={handleNewResidentSubmit}
        onSubmitEditedValues={handleEditedResidentSubmit}
        renderAddForm={() => (
          <>          
            <InputField 
              type='text'
              innerLabel='Имя'
              name='name'
              value={newResident.name}
              onChange={handleChangeNewResident}
            />          
            <InputField 
              type='text'
              innerLabel='Логин'
              name='login'
              value={newResident.login}
              error={isNewLoginAlreadyExist}
              helperText={isNewLoginAlreadyExist && 'Логин уже занят'}
              onChange={handleChangeNewResident}
            />           
            <InputField 
              type='password'
              innerLabel='Пароль'
              name='password'
              value={newResident.password}
              onChange={handleChangeNewResident}
            />           
            <InputField 
              type='password'
              innerLabel='Подтвердите пароль'
              name='confirmedPassword'
              value={newResident.confirmedPassword}
              error={!isNewPasswordsMatch}
              helperText={!isNewPasswordsMatch && 'Пароли не совпадают'}
              onChange={handleChangeNewResident}
            />  
            <RadioButton 
              label='Временный логин и пароль'
              name='temporary'
              value={newResident.temporary}
              onChange={handleChangeNewResident}
            />     
            <button  
              type='submit'
              className='b-button b-modal__submit-btn'
              disabled={
                /^\s+$/.test(newResident.name) ||
                newResident.password.length < 4 ||
                newResident.confirmedPassword.length < 4 ||
                !newResident.login    ||
                !newResident.name     ||
                !newResident.password ||
                isNewLoginAlreadyExist ||
                !isNewPasswordsMatch
              }
            >
              Добавить
            </button>
          </>
        )}
        renderEditForm={() => (
          <>              
            <InputField 
              type='text'
              innerLabel='Имя'
              name='name'
              value={editedResident.name}
              onChange={handleChangeEditedResident}
            />          
            <InputField 
              type='text'
              innerLabel='Логин'
              name='login'
              value={editedResident.login}
              error={isEditedLoginAlreadyExist}
              helperText={isEditedLoginAlreadyExist && 'Логин уже занят'}
              onChange={handleChangeEditedResident}
            />           
            <input type='password' className='b-input-field__empty-input' />
            <InputField 
              type='password'
              innerLabel='Пароль'
              name='password'
              value={editedResident.password}
              onChange={handleChangeEditedResident}
            />           
            <InputField 
              type='password'
              innerLabel='Подтвердите пароль'
              name='confirmedPassword'
              value={editedResident.confirmedPassword}
              error={!isEditedPasswordsMatch}
              helperText={!isEditedPasswordsMatch && 'Пароли не совпадают'}
              onChange={handleChangeEditedResident}
            />  
            <RadioButton 
              label='Временный логин и пароль'
              name='temporary'
              value={editedResident.temporary}
              onChange={handleChangeEditedResident}
            />    
            <button  
              type='submit'
              className='b-button b-modal__submit-btn'
              disabled={
                /^\s+$/.test(editedResident.name) ||
                editedResident.password.length < 4 ||
                editedResident.confirmedPassword.length < 4 ||
                !editedResident.login    ||
                !editedResident.name     ||
                !editedResident.password ||
                isEditedLoginAlreadyExist ||
                !isEditedPasswordsMatch
              }
            >
              Сохранить
            </button>
          </>
        )}
      />  
    </>
  )
}

export default ResidentsList
