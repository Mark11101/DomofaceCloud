import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import CreateIcon from '@material-ui/icons/Create'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

import InputField from '../../subcomponents/input-field/InputField'
import ModalForm from '../../subcomponents/modal-form/ModalForm'
import useDevice from '../../../hooks/use-device/useDevice'
import DeviceTypes from '../../../constants/DeviceTypes'
import Divider from '../../subcomponents/divider/Divider'

import './ResidentAccountSettings.css'

const ResidentAccountSettings = (props) => {
  const {
    me,
    requestCurrentUser,
    requestLogOut,
    requestUpdateResident,
    requestOpenDoor
  } = props;

  React.useEffect(() => {

    requestCurrentUser()
  }, [requestCurrentUser])

  const deviceType = useDevice();

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const [valuesForEdit, setValuesForEdit] = useState({
    id: me.id,
    flat_id: me.flat_id,
    login: me.login,
    password: '',
    confirmedPassword: '',
    temporary: me.temporary,
    name: me.name,
  });

  const isEditedPasswordsMatch = valuesForEdit.confirmedPassword === '' || (valuesForEdit.password === valuesForEdit.confirmedPassword);
 
  const toggleEditModal = () => {

    setIsEditModalVisible(!isEditModalVisible)
  }

  const handleLogOutBtnClick = (event) => {
    event.preventDefault()

    requestLogOut()
  }

  const handleChangeValueForEdit = (event) => {
    const value = event.target.value;
    const name  = event.target.name; 
    
    if (name === 'login') {
      
      setValuesForEdit({
        ...valuesForEdit,
        login: value.replace(' ', ''),
      })
    } else {
      
      setValuesForEdit({
        ...valuesForEdit,
        [name]: value,
      })
    }
  }

  const handleEditedValuesSubmit = (event) => {
    event.preventDefault()

    requestUpdateResident(
      valuesForEdit.id,
      valuesForEdit.flat_id,
      valuesForEdit.login,
      valuesForEdit.password,
      valuesForEdit.temporary,
      valuesForEdit.name,
    )

    setValuesForEdit({
      ...valuesForEdit,
      password: '',
      confirmedPassword: '',
    })

    toggleEditModal()
  }

  const handleOpenDoor = (event) => {
    event.preventDefault()

    requestOpenDoor()
  }

  return (
    <>
      <Container className='b-resident-accounts-settings'>
        {
          deviceType !== DeviceTypes.DESKTOP
          &&
            <h1 className='b-resident-accounts-settings__header'>
              Личный кабинет
            </h1>
        }
        <Divider className='b-resident-accounts-settings__up-divider' />
        <div>
          <p>
            <span>Имя: </span>
            <span>{me.name}</span>
          </p>
          <p>
            <span>Логин: </span>
            <span>{me.login}</span>
          </p>
        </div>
        <Divider />
        <div className='b-resident-accounts-settings__control-btns'> 
          <button 
            className='b-button b-resident-accounts-settings__edit-btn'
            onClick={toggleEditModal}
          >
            {
              deviceType === DeviceTypes.MOBILE
              ?
                <CreateIcon />
              :
                'Обновить аккаунт'
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
        <button
          className='b-button b-resident-accounts-settings__open-door-btn'
          onClick={handleOpenDoor}
        >
          Открыть дверь
        </button>
      </Container>
      {
        isEditModalVisible
        &&
          <ModalForm
            title='Обновление данных'
            handleCloseModal={toggleEditModal}
          >
            <Form onSubmit={handleEditedValuesSubmit}>
              <InputField 
                type='text'
                name='name'
                innerLabel='Имя'
                value={valuesForEdit.name}
                onChange={handleChangeValueForEdit}
              />  
              <InputField 
                type='text'
                name='login'
                innerLabel='Логин'
                value={valuesForEdit.login}
                onChange={handleChangeValueForEdit}
              />        
              <InputField 
                type='password'
                name='password'
                innerLabel='Пароль'
                value={valuesForEdit.password}
                onChange={handleChangeValueForEdit}
              />     
              <InputField 
                type='password'
                name='confirmedPassword'
                innerLabel='Подтвердите пароль'
                value={valuesForEdit.confirmedPassword}
                error={!isEditedPasswordsMatch}
                helperText={!isEditedPasswordsMatch && 'Пароли не совпадают'}
                onChange={handleChangeValueForEdit}
              />
              <button  
                type='submit'
                className='b-button b-modal__submit-btn'
                disabled={
                  valuesForEdit.password.length < 4 ||
                  valuesForEdit.confirmedPassword.length < 4 ||
                  !valuesForEdit.name || 
                  !valuesForEdit.password ||
                  !isEditedPasswordsMatch
                }
              >
                Сохранить
              </button>
            </Form>
          </ModalForm>
      }
    </>
  )
}

export default ResidentAccountSettings
