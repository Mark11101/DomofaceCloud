import React, { useState } from 'react'

import InputField from '../../subcomponents/input-field/InputField'
import ModalForm from '../../subcomponents/modal-form/ModalForm'
import HousesList from '../houses-list/HousesListContainer'
import ListForm from '../../subcomponents/list-form/ListForm'

import './CompaniesList.css'

const CompaniesList = (props) => {
  const {
    withHeader,
    innerModalDisabled,
    isCompaniesListLoading,
    residents,
    admins,
    companies,
    requestCompanies,
    requestUpdateCompany, 
    requestCreateCompany,
    requestDeleteCompany,
  } = props;

  const [isChooseHouseModalVisible, setIsChooseHouseModalVisible] = useState(false);
  const [companyIdToChoose, setCompanyIdToChoose] = useState('');
  
  const [editedCompany, setEditedCompany] = useState({
    id: '',
    password: '',
    confirmedPassword: '',
    organization: '',
  });

  const [newCompany, setNewCompany] = useState({
    login: '',
    password: '',
    confirmedPassword: '',
    organization: '',
  });

  const [initialEditedOrganization, setInitialEditedOrganization] = useState('');

  React.useEffect(() => {

    requestCompanies()
  }, [requestCompanies])

  const isNewOrganizationAlreadyExist    = !!companies.find((company) => company.organization === newCompany.organization);
  const isEditedOrganizationAlreadyExist = editedCompany.organization !== initialEditedOrganization && !!companies.find((company) => company.organization === editedCompany.organization);

  const isLoginAlreadyExist = 
    !!companies.find((company)  => company.login  === newCompany.login) ||
    !!residents.find((resident) => resident.login === newCompany.login) ||
    !!admins.find((admin)       => admin.login    === newCompany.login);
  const isNewPasswordsMatch = newCompany.confirmedPassword === '' || (newCompany.password === newCompany.confirmedPassword);
  const isEditedPasswordsMatch = editedCompany.confirmedPassword === '' || (editedCompany.password === editedCompany.confirmedPassword);
 
  const setInitialValues = (values) => {
    
    setEditedCompany({
      ...editedCompany,
      id: values.id,
      confirmedPassword: '',
      organization: values.organization,
    })
    setInitialEditedOrganization(values.organization)
  }

  const handleChangeEditedCompany = (event) => {

    setEditedCompany({
      ...editedCompany,
      [event.target.name]: event.target.value,
    })
  }
  
  const handleEditedCompanySubmit = () => {
    
    requestUpdateCompany(
      editedCompany.id,
      editedCompany.password,
      editedCompany.organization,
    )

    setEditedCompany({
      id: '',
      password: '',
      confirmedPassword: '',
      organization: '',
    })
  }

  const handleChangeNewCompany = (event) => {
    const value = event.target.value;
    const name  = event.target.name; 
    
    if (name === 'login') {
      
      setNewCompany({
        ...newCompany,
        login: value.replace(' ', ''),
      })
    } else {
      
      setNewCompany({
        ...newCompany,
        [name]: value,
      })
    }
  }

  const handleNewCompanySubmit = () => {
    
    requestCreateCompany(
      newCompany.login,
      newCompany.password,
      newCompany.organization,
    )

    setNewCompany({
      login: '',
      password: '',
      confirmedPassword: '',
      organization: '',
    })
  }

  const handleDeleteCompany = (id) => {

    requestDeleteCompany(id)
  }

  const handleSetCompanyId = (id) => {

    setCompanyIdToChoose(id)
    handleOpenChooseHouseModal()
  }

  const handleOpenChooseHouseModal = () => {
    
    setIsChooseHouseModalVisible(true)
  }

  const handleCloseChooseHouseModal = () => {

    setIsChooseHouseModalVisible(false)
  }

  return (
    <>
      <div className='b-companies'>
        <ListForm 
          header={withHeader && 'Сервисные компании'}
          values={companies}
          valuesIndex='organization'
          moreInfoIndexes={['organization', 'login']}
          moreInfoNames={['Название: ', 'Логин: ']}
          noValuesText='Компании отсутсвуют'
          addValueHeader='Добавление компании'
          innerModal
          innerModalDisabled={innerModalDisabled}
          isListLoading={isCompaniesListLoading}
          deleteValue={(id) => handleDeleteCompany(id)}
          openInnerModal={(id) => handleSetCompanyId(id)}
          setInitialValues={(values) => setInitialValues(values)}
          onSubmitNewValues={handleNewCompanySubmit}
          onSubmitEditedValues={handleEditedCompanySubmit}
          renderAddForm={() => (
            <>
              <InputField
                innerLabel='Название'
                type='text'
                name='organization'
                value={newCompany.organization}
                error={isNewOrganizationAlreadyExist}
                helperText={isNewOrganizationAlreadyExist && 'Такая компания уже есть'}
                onChange={handleChangeNewCompany}
              />
              <InputField
                innerLabel='Логин'
                type='text'
                name='login'
                value={newCompany.login}
                error={isLoginAlreadyExist}
                helperText={isLoginAlreadyExist && 'Логин уже занят'}
                onChange={handleChangeNewCompany}
              />
              <input type='password' className='b-input-field__empty-input' />
              <InputField
                innerLabel='Пароль'
                type='password'
                name='password'
                value={newCompany.password}
                onChange={handleChangeNewCompany}
              />
              <InputField
                innerLabel='Подтвердите пароль'
                type='password'
                name='confirmedPassword'
                value={newCompany.confirmedPassword}
                error={!isNewPasswordsMatch}
                helperText={!isNewPasswordsMatch && 'Пароли не совпадают'}
                onChange={handleChangeNewCompany}
              />
              <button
                type='submit'
                className='b-button b-modal__submit-btn'
                disabled={
                  /^\s+$/.test(newCompany.organization) ||
                  newCompany.password.length < 4 ||
                  newCompany.confirmedPassword.length < 4 ||
                  !newCompany.password ||
                  !newCompany.organization || 
                  !newCompany.login ||
                  isNewOrganizationAlreadyExist ||
                  isLoginAlreadyExist ||
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
                innerLabel='Название'
                name='organization'
                value={editedCompany.organization}
                error={isEditedOrganizationAlreadyExist}
                helperText={isEditedOrganizationAlreadyExist && 'Такая компания уже есть'}
                onChange={handleChangeEditedCompany}
              />    
              <input type='password' className='b-input-field__empty-input' />
              <InputField
                innerLabel='Пароль'
                type='password'
                name='password'
                value={editedCompany.password}
                onChange={handleChangeEditedCompany}
              />
              <InputField
                innerLabel='Подтвердите пароль'
                type='password'
                name='confirmedPassword'
                value={editedCompany.confirmedPassword}
                error={!isEditedPasswordsMatch}
                helperText={!isEditedPasswordsMatch && 'Пароли не совпадают'}
                onChange={handleChangeEditedCompany}
              />  
              <button  
                type='submit'
                className='b-button b-modal__submit-btn'
                disabled={
                  /^\s+$/.test(editedCompany.organization) ||
                  editedCompany.password.length < 4 ||
                  editedCompany.confirmedPassword.length < 4 ||
                  !editedCompany.organization || 
                  !editedCompany.password ||
                  !isEditedPasswordsMatch ||
                  isEditedOrganizationAlreadyExist
                }
              >
                Сохранить
              </button>
            </>
          )}
        />
      </div>
      {
        isChooseHouseModalVisible
        &&
          <ModalForm
            title='Дома'
            handleCloseModal={handleCloseChooseHouseModal}
          > 
            <HousesList companyId={companyIdToChoose} />
          </ModalForm>
      }
    </>
  )
}

export default CompaniesList
