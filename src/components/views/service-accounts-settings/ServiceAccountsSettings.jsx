import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import CreateIcon from '@material-ui/icons/Create'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

import ModalForm from '../../subcomponents/modal-form/ModalForm'
import InputField from '../../subcomponents/input-field/InputField'
import useDevice from '../../../hooks/use-device/useDevice'
import DeviceTypes from '../../../constants/DeviceTypes'
import Divider from '../../subcomponents/divider/Divider'

import './ServiceAccountsSettings.css'

const ServiceAccountsSettings = (props) => {
  const {
    company,
    requestLogOut,
    requestUpdateCompany,
  } = props;

  const deviceType = useDevice();

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const [editedServiceAccount, setEditedServiceAccount] = useState({
    id: company.id,
    password: '',
    confirmedPassword: '',
    organization: company.organization,
  });
  
  const isEditedPasswordsMatch = editedServiceAccount.confirmedPassword === '' || (editedServiceAccount.password === editedServiceAccount.confirmedPassword);

  React.useEffect(() => {

    // requestCurrentAdmin()
    // requestAdmins()
  })

  const handleLogOutBtnClick = (event) => {
    event.preventDefault()

    requestLogOut()
  }

  const handleToggleEditModal = () => {
   
    setIsEditModalVisible(!isEditModalVisible)
  }

  const handleChangeEditedServiceAccount = (event) => {

    setEditedServiceAccount({
      ...editedServiceAccount,
      [event.target.name]: event.target.value,
    })
  }

  const handleEditedServiceAccountSubmit = (event) => {
    event.preventDefault()

    requestUpdateCompany(
      editedServiceAccount.id,
      editedServiceAccount.password,
      editedServiceAccount.organization,
    )

    handleToggleEditModal()

    setEditedServiceAccount({
      ...editedServiceAccount,
      password: '',
      confirmedPassword: '',
    })
  }

  return (
    <>
      <Container className='b-service-accounts-settings'>
        {
          deviceType !== DeviceTypes.DESKTOP
          &&
            <h1 className='b-service-accounts-settings__header'>
              ???????????? ??????????????
            </h1>
        }
        <Divider className='b-service-accounts-settings__up-divider' />
        <div>
          <p>
            <span>????????????????: </span>
            <span>{company.organization}</span>
          </p>
          <p>
            <span>??????????: </span>
            <span>{company.login}</span>
          </p>
        </div>
        <Divider />
        <div className='b-service-accounts-settings__control-btns'> 
          <button
            className='b-button b-service-accounts-settings__edit-btn'
            onClick={handleToggleEditModal}
          >
            {
              deviceType === DeviceTypes.MOBILE
              ?
                <CreateIcon />
              :
                '???????????????? ??????????????'
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
                '??????????'
            }
          </button>
        </div>
      </Container>
      {
        isEditModalVisible
        &&
          <ModalForm
            title='?????????????????? ????????????'
            handleCloseModal={handleToggleEditModal}
          >
            <Form
              className=''
              onSubmit={handleEditedServiceAccountSubmit}
            >  
              <InputField
                innerLabel='????????????'
                type='password'
                name='password'
                value={editedServiceAccount.password}
                onChange={handleChangeEditedServiceAccount} 
              />
              <InputField
                innerLabel='?????????????????????? ????????????'
                type='password'
                name='confirmedPassword'
                value={editedServiceAccount.confirmedPassword}
                error={!isEditedPasswordsMatch}
                helperText={!isEditedPasswordsMatch && '???????????? ???? ??????????????????'}
                onChange={handleChangeEditedServiceAccount} 
              />
              <InputField
                innerLabel='????????????????'
                type='text'
                name='organization'
                value={editedServiceAccount.organization}
                onChange={handleChangeEditedServiceAccount} 
              />
              <button
                type='submit'
                className='b-button b-modal__submit-btn'
                disabled={
                  /^\s+$/.test(editedServiceAccount.organization) ||
                  editedServiceAccount.password.length < 4 ||
                  editedServiceAccount.confirmedPassword.length < 4 ||
                  !editedServiceAccount.organization || 
                  !editedServiceAccount.password ||
                  !isEditedPasswordsMatch
                }
              >
                ??????????????????
              </button>
            </Form>
          </ModalForm>
      }
    </>
  )
}

export default ServiceAccountsSettings
