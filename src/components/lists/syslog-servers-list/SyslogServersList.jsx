import React, { useState } from 'react'

import InputField from '../../subcomponents/input-field/InputField'
import ListForm from '../../subcomponents/list-form/ListForm'
import SelectField from '../../subcomponents/select-field/SelectField'
import ConnectionTypes from '../../../constants/ConnectionTypes'

import './SyslogServersList.css'

const SyslogServersList = (props) => {
  const {
    syslogServers,
    companies,
    isSyslogServerslistLoading,
    requestSyslogServers,
    requestUpdateSyslogServer,
    requestDeleteSyslogServer,
    requestCreateSyslogServer,
  } = props;

  const [editedSyslogServer, setEditedSyslogServer] = useState({
    id: '',
    service_company_id: '',
    host: '',
    connection_type: '',
    own: true,
  });

  const [companyToEdit, setCompanyToEdit] = useState({
    id: '',
    organization: '',
  });

  const [initialConnectionTypeForEdit, setInitialConnectionTypeForEdit] = useState('');

  const [newSyslogServer, setNewSyslogServer] = useState({
    service_company_id: '',
    host: '',
    connection_type: ConnectionTypes.UDP,
    own: true,
  });

  const [initialEditedHost, setInitialEditedHost] = useState('');

  React.useEffect(() => {

    requestSyslogServers()
  }, [requestSyslogServers])

  const syslogServersWithCompanyName = syslogServers.map((syslogServer) => {
    const findedCompany = companies.find((company) => company.id === syslogServer.service_company_id);
   
    return {
      ...syslogServer,
      companyName: (findedCompany && findedCompany.organization) || '',
    }
  });

  const isNewHostAlreadyExist    = !!syslogServers.find((syslogServer) => syslogServer.host === newSyslogServer.host);
  const isEditedHostAlreadyExist = editedSyslogServer.host !== initialEditedHost && !!syslogServers.find((syslogServer) => syslogServer.host === editedSyslogServer.host);

  const handleChangeEditedSyslogServer = (event, values) => {
    const value = event.target && event.target.value;
    const name  = event.target && event.target.name;

    if (values) {

      setEditedSyslogServer({
        ...editedSyslogServer,
        id: values.id,
        service_company_id: values.service_company_id,
        host: values.host,
        connection_type: values.connection_type,
        own: values.own,
      })

      const findedCompany = companies.find((company) => company.id === values.service_company_id);

      setCompanyToEdit({
        id: values.service_company_id,
        organization: (findedCompany && findedCompany.organization) || '',
      })

      setInitialEditedHost(values.host)
      setInitialConnectionTypeForEdit(values.connection_type)
    } else if (name === 'service_company_id') {
      const findedCompany = companies.find((company) => company.organization === value);
     
      setEditedSyslogServer({
        ...editedSyslogServer,
        service_company_id: (findedCompany && findedCompany.id) || '',
      })
    } else {

      setEditedSyslogServer({
        ...editedSyslogServer,
        [event.target.name]: event.target.value,
      })

    }
  }

  const handleEditedSyslogServerSubmit = () => {
    let editedSyslogServerConstructor = {
      id: editedSyslogServer.id,
      host: editedSyslogServer.host,
      connection_type: editedSyslogServer.connection_type,
      own: true,
    };

    if (editedSyslogServer.service_company_id) {
      editedSyslogServerConstructor = {
        ...editedSyslogServerConstructor,
        service_company_id: editedSyslogServer.service_company_id,
        own: false,
      }
    }
    
    requestUpdateSyslogServer(
      editedSyslogServerConstructor.id,
      editedSyslogServerConstructor
    )

    setEditedSyslogServer({
      ...editedSyslogServer,
      id: '',
      service_company_id: '',
      host: '',
      connection_type: '',
      own: true,
    })
  }

  const handleChangeNewSyslogServer = (event) => {
    const value = event.target.value;
    const name  = event.target.name;

    if (name === 'service_company_id') {
      const findedCompany = companies.find((company) => company.organization === value);

      setNewSyslogServer({
        ...newSyslogServer,
        service_company_id: (findedCompany && findedCompany.id) || '',
      })
    } else {

      setNewSyslogServer({
        ...newSyslogServer,
        [event.target.name]: event.target.value,
      })
    }
  }

  const handleNewSyslogServerSubmit = () => {
    let newSyslogServerConstructor = {
      host: newSyslogServer.host,
      connection_type: newSyslogServer.connection_type,
      own: true,
    };

    if (newSyslogServer.service_company_id) {
      newSyslogServerConstructor = {
        ...newSyslogServerConstructor,
        service_company_id: newSyslogServer.service_company_id,
        own: false,
      }
    }
    
    requestCreateSyslogServer(newSyslogServerConstructor)

    setNewSyslogServer({
      ...newSyslogServer,
      service_company_id: '',
      host: '',
      connection_type: ConnectionTypes.UDP,
      own: true,
    })
  }

  const handleDeleteSyslogServer = (id) => {

    requestDeleteSyslogServer(id)
  }
  
  return (
    <div className="b-syslog-servers">
      <ListForm 
        values={syslogServersWithCompanyName}
        valuesIndex='host'
        moreInfoIndexes={['host', 'connection_type', 'companyName']}
        moreInfoNames={['IP адрес: ', 'Тип подключения: ', 'Компания: ']}
        noValuesText='Серверы отсутсвуют'
        addValueHeader='Добавление сервера'
        isListLoading={isSyslogServerslistLoading}
        deleteValue={(id) => handleDeleteSyslogServer(id)}
        setInitialValues={(values) => handleChangeEditedSyslogServer({}, values)}
        onSubmitNewValues={handleNewSyslogServerSubmit}
        onSubmitEditedValues={handleEditedSyslogServerSubmit}
        renderAddForm={() => (
          <>             
            <InputField
              innerLabel='IP адрес*'
              type='text'
              name='host'
              className='b-syslog-servers-list__added-address'
              value={newSyslogServer.host}
              error={isNewHostAlreadyExist}
              helperText={isNewHostAlreadyExist && 'Такой адрес уже есть'}
              onChange={handleChangeNewSyslogServer}
            />
            <SelectField
              label='Тип подключения*'
              name='connection_type'
              defaultValue={ConnectionTypes.UDP}
              values={ConnectionTypes}
              onChange={handleChangeNewSyslogServer}
            />   
            <SelectField 
              label='Компания'
              name='service_company_id'
              defaultValue=''
              emptyField
              values={companies.map(company => company.organization)}
              onChange={handleChangeNewSyslogServer}          
            /> 
            <button
              type='submit'
              className='b-button b-modal__submit-btn'
              disabled={
                /^\s+$/.test(newSyslogServer.host) || 
                !newSyslogServer.host ||
                isNewHostAlreadyExist            
              }
            >
              Добавить
            </button>
          </>
        )}
        renderEditForm={() => (
          <>        
            <InputField
              innerLabel='IP адрес*'
              type='text'
              name='host'
              className='b-syslog-servers-list__edited-address'
              value={editedSyslogServer.host}
              error={isEditedHostAlreadyExist}
              helperText={isEditedHostAlreadyExist && 'Такой адрес уже есть'}
              onChange={handleChangeEditedSyslogServer}
            />
            <SelectField
              label='Тип подключения*'
              name='connection_type'
              defaultValue={initialConnectionTypeForEdit}
              values={ConnectionTypes}
              onChange={(e) => handleChangeEditedSyslogServer(e)}
            />  
            <SelectField 
              label='Компания'
              name='service_company_id'
              defaultValue={companyToEdit.organization}
              emptyField
              values={companies.map(company => company.organization)}
              onChange={(e) => handleChangeEditedSyslogServer(e)}          
            />  
            <button
              type='submit'
              className='b-button b-modal__submit-btn'
              disabled={
                /^\s+$/.test(editedSyslogServer.host) || 
                !editedSyslogServer.host ||
                isEditedHostAlreadyExist              
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

export default SyslogServersList
