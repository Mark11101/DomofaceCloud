import React, { useState } from 'react'

import InputField from '../../subcomponents/input-field/InputField'
import ListForm from '../../subcomponents/list-form/ListForm'
import ModalForm from '../../subcomponents/modal-form/ModalForm'
import SipAccountsList from '../sip-accounts-list/SipAccountsListContainer'
import SipCredentialsList from '../sip-credentials-list/SipCredentialsListContainer'
import SelectField from '../../subcomponents/select-field/SelectField'

import './SipServersList.css'

const SipServersList = (props) => {
  const {
    sipServers,
    companies,
    isSipServersListLoading,
    requestSipServers,
    requestUpdateSipServer,
    requestDeleteSipServer,
    requestCreateSipServer,
    requestIntercoms,
    requestFlats,
    requestHouses,
    requestEntrances,
  } = props;

  const [isChooseEntityModalVisible, setIsChooseEntityModalVisible] = useState(false);
  const [isSipCredentialsModalVisible, setIsSipCredentialsModalVisible] = useState(false);
  const [isSipAccountsModalVisible, setIsSipAccountsModalVisible] = useState(false);
  
  const [choosenSipServer, setChoosenSipServer] = useState({
    id: '',
    service_company_id: '',
  });
  
  const [editedSipServer, setEditedSipServer] = useState({
    id: '',
    service_company_id: '',
    host: '',
    post: '',
    password: '',
    confirmedPassword: '',
    own: true,
  });

  const [companyToEdit, setCompanyToEdit] = useState({
    id: '',
    organization: '',
  })

  const [newSipServer, setNewSipServer] = useState({
    service_company_id: '',
    host: '',
    port: '',
    password: '',
    confirmedPassword: '',
    own: true,
  });

  React.useEffect(() => {

    requestSipServers()
  }, [requestSipServers])

  const sipServersWithCompanyName = sipServers.map((sipServer) => {
    const findedCompany = companies.find((company) => company.id === sipServer.service_company_id);
   
    return {
      ...sipServer,
      companyName: (findedCompany && findedCompany.organization) || '',
    }
  });
  
  const [initialEditedHost, setInitialEditedHost] = useState('');

  const isNewHostAlreadyExist    = !!sipServers.find((sipServer) => sipServer.host === newSipServer.host);
  const isEditedHostAlreadyExist = editedSipServer.host !== initialEditedHost && !!sipServers.find((sipServer) => sipServer.host === editedSipServer.host);

  const isNewPasswordsMatch = newSipServer.confirmedPassword === '' || (newSipServer.password === newSipServer.confirmedPassword);
  const isEditedPasswordsMatch = editedSipServer.confirmedPassword === '' || (editedSipServer.password === editedSipServer.confirmedPassword);

  const handleSetSipServerId = (id) => {
    const findedSipServer = sipServers.find((sipServer) => sipServer.id === id);

    setChoosenSipServer({
      id: findedSipServer.id,
      service_company_id: findedSipServer.service_company_id,
    })

    handleOpenChooseEntityModal(id)
  }

  const handleChangeEditedSipServer = (event, values) => {
    const value = event.target && event.target.value;
    const name  = event.target && event.target.name;

    if (values) {

      setEditedSipServer({
        ...editedSipServer,
        id: values.id,
        service_company_id: values.service_company_id,
        host: values.host,
        port: values.port,
        password: values.password,
        own: values.own,
      })

      const findedCompany = companies.find((company) => company.id === values.service_company_id);

      setCompanyToEdit({
        id: values.service_company_id,
        organization: (findedCompany && findedCompany.organization) || '',
      })

      setInitialEditedHost(values.host)
    } else if (name === 'service_company_id') {
      const findedCompany = companies.find((company) => company.organization === value);
     
      setEditedSipServer({
        ...editedSipServer,
        service_company_id: (findedCompany && findedCompany.id) || '',
      })
    } else if (name === 'port') {
      const port = Number(value);

      ((port >= 0 && Number.isInteger(port)) || value === '')
      &&
        setEditedSipServer({
          ...editedSipServer,
          port: value,
        })
    } else {

      setEditedSipServer({
        ...editedSipServer,
        [name]: value,
      })
    }
  }

  const handleEditedSipServerSubmit = () => {
    let editedSipServerConstructor = {
      host: editedSipServer.host,
      port: Number(editedSipServer.port),
      password: editedSipServer.password,
      own: true,
    };

    if (editedSipServer.service_company_id) {
      editedSipServerConstructor = {
        ...editedSipServerConstructor,
        service_company_id: editedSipServer.service_company_id,
        own: false,
      }
    }
    
    requestUpdateSipServer(
      editedSipServer.id,
      editedSipServerConstructor
    )

    setEditedSipServer({
      id: '',
      service_company_id: '',
      host: '',
      post: '',
      password: '',
      confirmedPassword: '',
      own: true,
    })
  }

  const handleChangeNewSipServer = (event) => {
    const value = event.target.value;
    const name  = event.target.name;

    if (name === 'service_company_id') {
      const findedCompany = companies.find((company) => company.organization === value);

      setNewSipServer({
        ...newSipServer,
        service_company_id: (findedCompany && findedCompany.id) || '',
      })
    } else if (name === 'port') {
      const port = Number(value);

      ((port >= 0 && Number.isInteger(port)) || value === '')
      &&
        setNewSipServer({
          ...newSipServer,
          port: value,
        })
    } else {

      setNewSipServer({
        ...newSipServer,
        [name]: value,
      })
    }
  }

  const handleNewSipServerSubmit = () => {
    let newSipServerConstructor = {
      host: newSipServer.host,
      port: Number(newSipServer.port),
      password: newSipServer.password,
      own: true,
    };

    if (newSipServer.service_company_id) {
      newSipServerConstructor = {
        ...newSipServerConstructor,
        service_company_id: newSipServer.service_company_id,
        own: false,
      }
    }
    
    requestCreateSipServer(newSipServerConstructor)

    setNewSipServer({
      service_company_id: '',
      host: '',
      port: '',
      password: '',
      confirmedPassword: '',
      own: true,
    })
  }

  const handleDeleteSipServer = (id) => {

    requestDeleteSipServer(id)
  }

  const handleOpenChooseEntityModal = (companyId) => {    
    // for SipAccounts
    requestIntercoms(companyId)
    requestHouses(companyId)
    requestEntrances(companyId)
    requestFlats(companyId)

    setIsChooseEntityModalVisible(true)
  }

  const handleCloseChooseEntityModal = () => {

    setIsChooseEntityModalVisible(false)
  }

  const handleOpenSipCredentialsModal = () => {

    setIsSipCredentialsModalVisible(true)
  }

  const handleCloseSipCredentialsModal = () => {

    setIsSipCredentialsModalVisible(false)
  }

  const handleOpenSipAccountsModal = () => {

    setIsSipAccountsModalVisible(true)
  }

  const handleCloseSipAccountsModal = () => {

    setIsSipAccountsModalVisible(false)
  }
  
  return (
    <div className='b-sip-servers'>
      <ListForm 
        values={sipServersWithCompanyName}
        valuesIndex='host'
        moreInfoIndexes={['host', 'port', 'companyName']}
        moreInfoNames={['IP адрес: ', 'Порт: ', 'Компания: ']}
        noValuesText='Серверы отсутсвуют'
        addValueHeader='Добавление сервера'
        innerModal
        isListLoading={isSipServersListLoading}
        deleteValue={(id) => handleDeleteSipServer(id)}
        openInnerModal={(id) => handleSetSipServerId(id)}
        setInitialValues={(values) => handleChangeEditedSipServer({}, values)}
        onSubmitNewValues={handleNewSipServerSubmit}
        onSubmitEditedValues={handleEditedSipServerSubmit}
        renderAddForm={() => (
          <>                    
            <SelectField 
              label='Компания'
              name='service_company_id'
              defaultValue=''
              emptyField
              values={companies.map(company => company.organization)}
              onChange={handleChangeNewSipServer}          
            />
            <InputField
              innerLabel='IP адрес*'
              type='text'
              name='host'
              value={newSipServer.host}
              error={isNewHostAlreadyExist}
              helperText={isNewHostAlreadyExist && 'Такой адрес уже есть'}
              onChange={handleChangeNewSipServer}
            />  
            <InputField
              innerLabel='Порт*'
              type='text'
              name='port'
              value={newSipServer.port}
              onChange={handleChangeNewSipServer}
            />     
            <input type='password' className='b-input-field__empty-input' />
            <InputField
              innerLabel='Пароль*'
              type='password'
              name='password'
              value={newSipServer.password}
              onChange={handleChangeNewSipServer}
            />      
            <InputField
              innerLabel='Подтвердите пароль*'
              type='password'
              name='confirmedPassword'
              value={newSipServer.confirmedPassword}
              error={!isNewPasswordsMatch}
              helperText={!isNewPasswordsMatch && 'Пароли не совпадают'}
              onChange={handleChangeNewSipServer}
            />   
            <button
              type='submit'
              className='b-button b-modal__submit-btn'
              disabled={
                /^\s+$/.test(newSipServer.host) ||
                /^\s+$/.test(newSipServer.port) ||
                newSipServer.password.length < 4 ||
                newSipServer.confirmedPassword.length < 4 ||
                !newSipServer.host ||
                !newSipServer.port ||
                !newSipServer.password ||
                !isNewPasswordsMatch ||
                isNewHostAlreadyExist
              }
            >
              Добавить
            </button>
          </>
        )}
        renderEditForm={() => (
          <>                 
            <SelectField 
              label='Компания'
              name='service_company_id'
              defaultValue={companyToEdit.organization}
              emptyField
              values={companies.map(company => company.organization)}
              onChange={(e) => handleChangeEditedSipServer(e)}          
            />
            <InputField
              innerLabel='IP адрес*'
              type='text'
              name='host'
              value={editedSipServer.host}
              error={isEditedHostAlreadyExist}
              helperText={isEditedHostAlreadyExist && 'Такой адрес уже есть'}
              onChange={handleChangeEditedSipServer}
            />     
            <InputField
              innerLabel='Порт*'
              type='number'
              name='port'
              value={editedSipServer.port}
              onChange={handleChangeEditedSipServer}
            />   
            <input type='password' className='b-input-field__empty-input' />  
            <InputField
              innerLabel='Пароль*'
              type='password'
              name='password'
              value={editedSipServer.password}
              onChange={handleChangeEditedSipServer}
            />      
            <InputField
              innerLabel='Подтвердите пароль*'
              type='password'
              name='confirmedPassword'
              value={editedSipServer.confirmedPassword}
              error={!isEditedPasswordsMatch}
              helperText={!isEditedPasswordsMatch && 'Пароли не совпадают'}
              onChange={handleChangeEditedSipServer}
            />   
            <button
              type='submit'
              className='b-button b-modal__submit-btn'
              disabled={
                /^\s+$/.test(editedSipServer.host) ||
                /^\s+$/.test(editedSipServer.port) ||
                editedSipServer.password.length < 4 ||
                editedSipServer.confirmedPassword.length < 4 ||
                !editedSipServer.host ||
                !editedSipServer.port ||
                !editedSipServer.password ||
                !isEditedPasswordsMatch ||
                isEditedHostAlreadyExist
              }
            >
              Сохранить
            </button>
          </>
        )}
      />
      {
        isChooseEntityModalVisible
        &&
          <ModalForm            
            handleCloseModal={handleCloseChooseEntityModal}
            withoutHeader
          >
            <div className='b-modal-form__choose-entity-modal'>  
              <button
                className='b-button'
                onClick={handleOpenSipCredentialsModal}
              >
                SIP пользователи
              </button>
              <button
                className='b-button'
                onClick={handleOpenSipAccountsModal}
              >
                SIP аккаунты
              </button>
            </div>
          </ModalForm>
      }
      {
        isSipCredentialsModalVisible
        &&
          <ModalForm            
            title='SIP пользователи'
            handleCloseModal={handleCloseSipCredentialsModal}
          >
            <SipCredentialsList 
              companyId={choosenSipServer.service_company_id}
              sipServerId={choosenSipServer.id} 
            />
          </ModalForm>
      }
      {
        isSipAccountsModalVisible
        &&
          <ModalForm            
            title='SIP аккаунты'
            handleCloseModal={handleCloseSipAccountsModal}
          >
            <SipAccountsList 
              companyId={choosenSipServer.service_company_id}
              sipServerId={choosenSipServer.id} 
              sipServers={sipServers}
            />
          </ModalForm>
      }
    </div>
  )
}

export default SipServersList
