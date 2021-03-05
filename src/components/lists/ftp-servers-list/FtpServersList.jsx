import React, { useState } from 'react'

import InputField from '../../subcomponents/input-field/InputField'
import ListForm from '../../subcomponents/list-form/ListForm'
import SelectField from '../../subcomponents/select-field/SelectField'

import './FtpServersList.css'

const FtpServersList = (props) => {
  const {
    ftpServers,
    companies,
    isFtpServersListLoading,
    requestFtpServers,
    requestUpdateFtpServer,
    requestDeleteFtpServer,
    requestCreateFtpServer,
  } = props;

  const [editedFtpServer, setEditedFtpServer] = useState({
    id: '',
    service_company_id: '',
    host: '',
    login: '',
    password: '',
    confirmedPassword: '',
    archive_path: '',
    own: true,
  });

  const [companyToEdit, setCompanyToEdit] = useState({
    id: '',
    organization: '',
  });

  const [newFtpServer, setNewFtpServer] = useState({
    service_company_id: '',
    host: '',
    login: '',
    password: '',
    confirmedPassword: '',
    archive_path: '',
    own: true,
  });

  const [initialEditedHost, setInitialEditedHost] = useState('');
  const [initialEditedLogin, setInitialEditedLogin] = useState('');

  React.useEffect(() => {

    requestFtpServers()
  }, [requestFtpServers])

  const ftpServersWithCompanyName = ftpServers.map((ftpServer) => {
    const findedCompany = companies.find((company) => company.id === ftpServer.service_company_id);
   
    return {
      ...ftpServer,
      companyName: (findedCompany && findedCompany.organization) || '',
    }
  });

  const isNewHostAlreadyExist    = !!ftpServers.find((ftpServer) => ftpServer.host === newFtpServer.host);
  const isEditedHostAlreadyExist = editedFtpServer.host !== initialEditedHost && !!ftpServers.find((ftpServer) => ftpServer.host === editedFtpServer.host);

  const isNewLoginAlreadyExist    = !!ftpServers.find((ftpServer) => ftpServer.login === newFtpServer.login);
  const isEditedLoginAlreadyExist = editedFtpServer.login !== initialEditedLogin && !!ftpServers.find((ftpServer) => ftpServer.login === editedFtpServer.login);
  
  const isNewPasswordsMatch = newFtpServer.confirmedPassword === '' || (newFtpServer.password === newFtpServer.confirmedPassword);
  const isEditedPasswordsMatch = editedFtpServer.confirmedPassword === '' || (editedFtpServer.password === editedFtpServer.confirmedPassword);

  const handleChangeEditedFtpServer = (event, values) => {
    const value = event.target && event.target.value;
    const name  = event.target && event.target.name; 

    if (values) {

      setEditedFtpServer({
        ...editedFtpServer,
        id: values.id,
        service_company_id: values.service_company_id,
        host: values.host,
        login: values.login,
        password: values.password,
        archive_path: values.archive_path,
        own: values.own,
      })

      const findedCompany = companies.find((company) => company.id === values.service_company_id);

      setCompanyToEdit({
        id: values.service_company_id,
        organization: (findedCompany && findedCompany.organization) || '',
      })

      setInitialEditedHost(values.host)
      setInitialEditedLogin(values.login)
    } else if (name === 'service_company_id') {
      const findedCompany = companies.find((company) => company.organization === value);
     
      setEditedFtpServer({
        ...editedFtpServer,
        service_company_id: (findedCompany && findedCompany.id) || '',
      })
    } else if (name === 'login') {
      
      setEditedFtpServer({
        ...editedFtpServer,
        login: value.replace(' ', ''),
      })
    } else {
      
      setEditedFtpServer({
        ...editedFtpServer,
        [name]: value,
      })
    }
  }

  const handleEditedFtpServerSubmit = () => {
    let editedFtpServerConstructor = {
      id: editedFtpServer.id,
      host: editedFtpServer.host,
      login: editedFtpServer.login,
      password: editedFtpServer.password,
      archive_path: editedFtpServer.archive_path,
      own: true,
    };

    if (editedFtpServer.service_company_id) {
      editedFtpServerConstructor = {
        ...editedFtpServerConstructor,
        service_company_id: editedFtpServer.service_company_id,
        own: false,
      }
    }
    
    requestUpdateFtpServer(
      editedFtpServerConstructor.id,
      editedFtpServerConstructor
    )

    setEditedFtpServer({
      ...editedFtpServer,
      id: '',
      service_company_id: '',
      host: '',
      login: '',
      password: '',
      confirmedPassword: '',
      archive_path: '',
      own: true,
    })
  }

  const handleChangeNewFtpServer = (event) => {
    const value = event.target.value;
    const name  = event.target.name; 
    
    if (name === 'service_company_id') {
      const findedCompany = companies.find((company) => company.organization === value);

      setNewFtpServer({
        ...newFtpServer,
        service_company_id: (findedCompany && findedCompany.id) || '',
      })
    } else if (name === 'login') {
      
      setNewFtpServer({
        ...newFtpServer,
        login: value.replace(' ', ''),
      })
    } else {
      
      setNewFtpServer({
        ...newFtpServer,
        [name]: value,
      })
    }
  }

  const handleNewFtpServerSubmit = () => {
    let newFtpServerConstructor = {
      host: newFtpServer.host,
      login: newFtpServer.login,
      password: newFtpServer.password,
      archive_path: newFtpServer.archive_path,
      own: true,
    };

    if (newFtpServer.service_company_id) {
      newFtpServerConstructor = {
        ...newFtpServerConstructor,
        service_company_id: newFtpServer.service_company_id,
        own: false,
      }
    }
    
    requestCreateFtpServer(newFtpServerConstructor)

    setNewFtpServer({
      ...newFtpServer,
      service_company_id: '',
      host: '',
      login: '',
      password: '',
      confirmedPassword: '',
      archive_path: '',
      own: true,
    })
  }

  const handleDeleteFtpServer = (id) => {

    requestDeleteFtpServer(id)
  }

  return (
    <div className="b-ftp-servers">
      <ListForm 
        values={ftpServersWithCompanyName}
        valuesIndex='host'
        moreInfoIndexes={['host', 'login', 'archive_path', 'companyName']}
        moreInfoNames={['IP адрес: ', 'Логин: ', 'Путь архива к видео: ', 'Компания: ']}
        noValuesText='Серверы отсутсвуют'
        addValueHeader='Добавление сервера'
        isListLoading={isFtpServersListLoading}
        deleteValue={(id) => handleDeleteFtpServer(id)}
        setInitialValues={(values) => handleChangeEditedFtpServer({}, values)}
        onSubmitNewValues={handleNewFtpServerSubmit}
        onSubmitEditedValues={handleEditedFtpServerSubmit}
        renderAddForm={() => (
          <>
            <SelectField 
              label='Компания'
              name='service_company_id'
              defaultValue=''
              emptyField
              values={companies.map(company => company.organization)}
              onChange={handleChangeNewFtpServer}          
            /> 
            <InputField
              innerLabel='IP адрес'
              type='text'
              name='host'
              value={newFtpServer.host}
              error={isNewHostAlreadyExist}
              helperText={isNewHostAlreadyExist && 'Такой адрес уже есть'}
              onChange={handleChangeNewFtpServer}
            />
            <InputField
              innerLabel='Логин'
              type='text'
              name='login'
              value={newFtpServer.login}
              error={isNewLoginAlreadyExist}
              helperText={isNewLoginAlreadyExist && 'Такой логин уже есть'}
              onChange={handleChangeNewFtpServer}
            />
            <InputField
              innerLabel='Пароль'
              type='password'
              name='password'
              value={newFtpServer.password}
              onChange={handleChangeNewFtpServer}
            />
            <InputField
              innerLabel='Подтвердите пароль'
              type='password'
              name='confirmedPassword'
              value={newFtpServer.confirmedPassword}
              error={!isNewPasswordsMatch}
              helperText={!isNewPasswordsMatch && 'Пароли не совпадают'}
              onChange={handleChangeNewFtpServer}
            />
            <InputField
              innerLabel='Путь архива к видео'
              type='text'
              name='archive_path'
              value={newFtpServer.archive_path}
              onChange={handleChangeNewFtpServer}
            />  
            <button
              type='submit'
              className='b-button b-modal__submit-btn'
              disabled={
                /^\s+$/.test(newFtpServer.host) ||
                /^\s+$/.test(newFtpServer.login) ||
                newFtpServer.password.length < 4 ||
                newFtpServer.confirmedPassword.length < 4 ||
                !newFtpServer.host || 
                !newFtpServer.login ||
                !newFtpServer.password || 
                !newFtpServer.archive_path ||
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
            <SelectField 
              label='Компания'
              name='service_company_id'
              defaultValue={companyToEdit.organization}
              emptyField
              values={companies.map(company => company.organization)}
              onChange={(e) => handleChangeEditedFtpServer(e)}          
            />
            <InputField
              innerLabel='IP адрес'
              type='text'
              name='host'
              value={editedFtpServer.host}
              error={isEditedHostAlreadyExist}
              helperText={isEditedHostAlreadyExist && 'Такой адрес уже есть'}
              onChange={handleChangeEditedFtpServer}
            />
            <InputField
              innerLabel='Логин'
              type='text'
              name='login'
              value={editedFtpServer.login}
              error={isEditedLoginAlreadyExist}
              helperText={isEditedLoginAlreadyExist && 'Такой логин уже есть'}
              onChange={handleChangeEditedFtpServer}
            />
            <input type='password' className='b-input-field__empty-input' />
            <InputField
              innerLabel='Пароль'
              type='password'
              name='password'
              value={editedFtpServer.password}
              onChange={handleChangeEditedFtpServer}
            />
            <InputField
              innerLabel='Подтвердите пароль'
              type='password'
              name='confirmedPassword'
              value={editedFtpServer.confirmedPassword}
              error={!isEditedPasswordsMatch}
              helperText={!isEditedPasswordsMatch && 'Пароли не совпадают'}
              onChange={handleChangeEditedFtpServer}
            />
            <InputField
              innerLabel='Путь архива к видео'
              type='text'
              name='archive_path'
              value={editedFtpServer.archive_path}
              onChange={handleChangeEditedFtpServer}
            />  
            <button
              type='submit'
              className='b-button b-modal__submit-btn'
              disabled={
                /^\s+$/.test(editedFtpServer.host) ||
                /^\s+$/.test(editedFtpServer.login) ||
                editedFtpServer.password.length < 4 ||
                editedFtpServer.confirmedPassword.length < 4 ||
                !editedFtpServer.host || 
                !editedFtpServer.login ||
                !editedFtpServer.password || 
                !editedFtpServer.archive_path ||
                !isEditedPasswordsMatch ||
                isEditedHostAlreadyExist || 
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

export default FtpServersList
