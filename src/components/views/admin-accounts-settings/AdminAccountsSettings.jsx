import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

import InputField from '../../subcomponents/input-field/InputField'
import ModalForm from '../../subcomponents/modal-form/ModalForm'
import AdminsList from '../../lists/admins-list/AdminsListContainer'
import Divider from '../../subcomponents/divider/Divider'
import useDevice from '../../../hooks/use-device/useDevice'
import DeviceTypes from '../../../constants/DeviceTypes'

import './AdminAccountsSettings.css'

const AdminAccountsSettings = (props) => {
  const {
    adminId,
    requestLogOut,
    requestUpdateAdmin,
  } = props;

  const deviceType = useDevice();

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const [editedAdmin, setEditedAdmin] = useState({
    id: adminId,
    password: '',
    confirmedPassword: '',
  });
  
  const isEditedPasswordsMatch = editedAdmin.confirmedPassword === '' || (editedAdmin.password === editedAdmin.confirmedPassword);

  const handleLogOutBtnClick = (event) => {
    event.preventDefault()
    
    requestLogOut()
  }

  const handleToggleChangePasswordModal = (event) => {
    event && event.preventDefault()

    setIsEditModalVisible(!isEditModalVisible)
  }

  const handleChangeEditedAdmin = (event) => {

    setEditedAdmin({
      ...editedAdmin,
      [event.target.name]: event.target.value,
    })
  }
  
  const handleEditedAdminSubmit = (event) => {
    event.preventDefault()
    
    requestUpdateAdmin(
      editedAdmin.id,
      editedAdmin.password,
    )

    setEditedAdmin({
      ...editedAdmin,
      password: '',
      confirmedPassword: '',
    })

    handleToggleChangePasswordModal()
  }

  return (
    <>
      <Container className='b-admin-accounts-settings'>
        {
          deviceType !== DeviceTypes.DESKTOP
          &&
            <>
              <h1 className='b-admin-accounts-settings__header'>
                Управление аккаунтами
              </h1>
              <Divider />
            </>
        }
        <div className='b-admin-accounts-settings__control-btns'> 
          <button 
            className='b-button b-admin-accounts-settings__change-password-btn'
            onClick={handleToggleChangePasswordModal}
          >
            {
              deviceType === DeviceTypes.MOBILE
              ?
                <VpnKeyIcon />
              :
                'Сменить пароль'
            }
          </button>
          <button 
            className='b-button'
            onClick={handleLogOutBtnClick}
          >
            {
              deviceType === DeviceTypes.MOBILE
              ?
                <ExitToAppIcon />
              :
                'Выйти'
            }
          </button>
        </div>
        <h2 className='b-admin-accounts-settings__header'>
          Администраторы
        </h2>
        <AdminsList />
      </Container>
      {
        isEditModalVisible
        &&
          <ModalForm
            title='Смена пароля'
            handleCloseModal={handleToggleChangePasswordModal}
          >
            <form onSubmit={handleEditedAdminSubmit}>
              <InputField
                innerLabel='Пароль'
                type='password'
                name='password'
                value={editedAdmin.password}
                onChange={handleChangeEditedAdmin}
              />
              <InputField
                innerLabel='Подтвердите пароль'
                type='password'
                name='confirmedPassword'
                value={editedAdmin.confirmedPassword}
                error={!isEditedPasswordsMatch}
                helperText={!isEditedPasswordsMatch && 'Пароли не совпадают'}
                onChange={handleChangeEditedAdmin}
              />  
              <button  
                type='submit'
                className='b-button b-modal__submit-btn'
                disabled={
                  editedAdmin.password.length < 4 ||
                  editedAdmin.confirmedPassword.length < 4 ||
                  !editedAdmin.password ||
                  !isEditedPasswordsMatch
                }
              >
                Сохранить
              </button>
            </form>
          </ModalForm>
      }
    </>
  )
}

export default AdminAccountsSettings
