import React, { useState } from 'react'

import ListForm from '../../subcomponents/list-form/ListForm'
import InputField from '../../subcomponents/input-field/InputField'

import './AdminsList.css'

const AdminsList = (props) => {
  const {
    companies,
    residents,
    admins,
    isAdminslistLoading,
    isLogged,
    requestAdmins,
    requestCreateAdmin,
    requestDeleteAdmin,
  } = props;

  const [newAdmin, setNewAdmin] = useState({
    login: '',
    password: '',
    confirmedPassword: '',
  });

  const isLoginAlreadyExist = 
    !!companies.find((company)  => company.login  === newAdmin.login) ||
    !!residents.find((resident) => resident.login === newAdmin.login) ||
    !!admins.find((admin)       => admin.login    === newAdmin.login);
  const isNewPasswordsMatch = newAdmin.confirmedPassword === '' || (newAdmin.password === newAdmin.confirmedPassword);

  React.useEffect(() => {
    
    isLogged && requestAdmins()
  }, [isLogged, requestAdmins])

  const handleChangeNewAdmin = (event) => {
    const value = event.target.value;
    const name  = event.target.name; 
    
    if (name === 'login') {
      
      setNewAdmin({
        ...newAdmin,
        login: value.replace(' ', ''),
      })
    } else {
      
      setNewAdmin({
        ...newAdmin,
        [name]: value,
      })
    }
  }

  const handleNewAdminSubmit = () => {
    
    requestCreateAdmin(
      newAdmin.login,
      newAdmin.password,
    )

    setNewAdmin({
      login: '',
      password: '',
      confirmedPassword: '',
    })
  }

  const handleDeleteAdmin = (id) => {

    requestDeleteAdmin(id)
  }

  return (
    <div className='b-admins'>
      <ListForm 
        values={admins}
        valuesIndex='login'
        noValuesText='Администраторы отсутсвуют'
        addValueHeader='Добавление аккаунта'
        isListLoading={isAdminslistLoading}
        deleteValue={(id) => handleDeleteAdmin(id)}
        onSubmitNewValues={handleNewAdminSubmit}
        renderAddForm={() => (
          <>
            <InputField
              innerLabel='Логин'
              type='text'
              name='login'
              value={newAdmin.login}
              error={isLoginAlreadyExist}
              helperText={isLoginAlreadyExist && 'Логин уже занят'}
              onChange={handleChangeNewAdmin}
            />
            <input type='password' className='b-input-field__empty-input' />
            <InputField
              innerLabel='Пароль'
              type='password'
              name='password'
              value={newAdmin.password}
              onChange={handleChangeNewAdmin}
            />
            <InputField
              innerLabel='Подтвердите пароль'
              type='password'
              name='confirmedPassword'
              value={newAdmin.confirmedPassword}
              error={!isNewPasswordsMatch}
              helperText={!isNewPasswordsMatch && 'Пароли не совпадают'}
              onChange={handleChangeNewAdmin}
            />
            <button
              type='submit'
              className='b-button b-modal__submit-btn'
              disabled={
                newAdmin.password.length < 4 ||
                newAdmin.confirmedPassword.length < 4 ||
                !newAdmin.password ||
                !newAdmin.login ||
                isLoginAlreadyExist ||
                !isNewPasswordsMatch
              }
            >
              Добавить
            </button>
          </>
        )}
      />
    </div>
  )
}

export default AdminsList
