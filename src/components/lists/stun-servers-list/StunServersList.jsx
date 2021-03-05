import React, { useState } from 'react'

import InputField from '../../subcomponents/input-field/InputField'
import ListForm from '../../subcomponents/list-form/ListForm'
import SelectField from '../../subcomponents/select-field/SelectField'

import './StunServersList.css'

const StunServersList = (props) => {
  const {
    stunServers,
    companies,
    isStunServersListLoading,
    requestStunServers,
    requestUpdateStunServer,
    requestDeleteStunServer,
    requestCreateStunServer,
  } = props;

  const [editedStunServer, setEditedStunServer] = useState({
    id: '',
    service_company_id: '',
    host: '',
    own: true,
  });

  const [companyToEdit, setCompanyToEdit] = useState({
    id: '',
    organization: '',
  });

  const [newStunServer, setNewStunServer] = useState({
    service_company_id: '',
    host: '',
    own: true,
  });

  const [initialEditedHost, setInitialEditedHost] = useState('');

  const isNewHostAlreadyExist    = !!stunServers.find((stunServer) => stunServer.host === newStunServer.host);
  const isEditedHostAlreadyExist = editedStunServer.host !== initialEditedHost && !!stunServers.find((stunServer) => stunServer.host === editedStunServer.host);

  React.useEffect(() => {

    requestStunServers()
  }, [requestStunServers])

  const stunServersWithCompanyName = stunServers.map((stunServer) => {
    const findedCompany = companies.find((company) => company.id === stunServer.service_company_id);
   
    return {
      ...stunServer,
      companyName: (findedCompany && findedCompany.organization) || '',
    }
  });

  const handleChangeEditedStunServer = (event, values) => {
    const value = event.target && event.target.value;
    const name  = event.target && event.target.name;

    if (values) {

      setEditedStunServer({
        ...editedStunServer,
        id: values.id,
        service_company_id: values.service_company_id,
        host: values.host,
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
     
      setEditedStunServer({
        ...editedStunServer,
        service_company_id: (findedCompany && findedCompany.id) || '',
      })
    } else {

      setEditedStunServer({
        ...editedStunServer,
        host: event.target.value,
      })
    }
  }

  const handleEditedStunServerSubmit = () => {
    let editedStunServerConstructor = {
      id: editedStunServer.id,
      host: editedStunServer.host,
      own: true,
    };

    if (editedStunServer.service_company_id) {
      editedStunServerConstructor = {
        ...editedStunServerConstructor,
        service_company_id: editedStunServer.service_company_id,
        own: false,
      }
    }
    
    requestUpdateStunServer(
      editedStunServerConstructor.id,
      editedStunServerConstructor
    )

    setEditedStunServer({
      id: '',
      service_company_id: '',
      host: '',
      own: true,
    })
  }

  const handleChangeNewStunServer = (event) => {
    const value = event.target.value;
    const name  = event.target.name;

    if (name === 'service_company_id') {
      const findedCompany = companies.find((company) => company.organization === value);

      setNewStunServer({
        ...newStunServer,
        service_company_id: (findedCompany && findedCompany.id) || '',
      })
    } else {

      setNewStunServer({
        ...newStunServer,
        host: event.target.value,
      })
    }

  }

  const handleNewStunServerSubmit = () => {
    let newStunServerConstructor = {
      host: newStunServer.host,
      own: true,
    };

    if (newStunServer.service_company_id) {
      newStunServerConstructor = {
        ...newStunServerConstructor,
        service_company_id: newStunServer.service_company_id,
        own: false,
      }
    }
    
    requestCreateStunServer(newStunServerConstructor)

    setNewStunServer({
      service_company_id: '',
      host: '',
      own: true,
    })
  }

  const handleDeleteStunServer = (id) => {

    requestDeleteStunServer(id)
  }

  return (
    <div className="b-stun-servers">
      <ListForm 
        values={stunServersWithCompanyName}
        valuesIndex='host'
        moreInfoIndexes={['host', 'companyName']}
        moreInfoNames={['IP адрес: ', 'Компания: ']}
        noValuesText='Серверы отсутсвуют'
        addValueHeader='Добавление сервера'
        isListLoading={isStunServersListLoading}
        deleteValue={(id) => handleDeleteStunServer(id)}
        setInitialValues={(values) => handleChangeEditedStunServer({}, values)}
        onSubmitNewValues={handleNewStunServerSubmit}
        onSubmitEditedValues={handleEditedStunServerSubmit}
        renderAddForm={() => (
          <>                 
            <SelectField 
              label='Компания'
              name='service_company_id'
              defaultValue=''
              emptyField
              values={companies.map(company => company.organization)}
              onChange={handleChangeNewStunServer}          
            />
            <InputField
              innerLabel='IP адрес*'
              type='text'
              value={newStunServer.host}
              error={isNewHostAlreadyExist}
              helperText={isNewHostAlreadyExist && 'Такой адрес уже есть'}
              onChange={handleChangeNewStunServer}
            />    
            <button
              type='submit'
              className='b-button b-modal__submit-btn'
              disabled={
                /^\s+$/.test(newStunServer.host) || 
                !newStunServer.host || 
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
              onChange={(e) => handleChangeEditedStunServer(e)}          
            />
            <InputField
              innerLabel='IP адрес*'
              type='text'
              value={editedStunServer.host}
              error={isEditedHostAlreadyExist}
              helperText={isEditedHostAlreadyExist && 'Такой адрес уже есть'}
              onChange={handleChangeEditedStunServer}
            />   
            <button
              type='submit'
              className='b-button b-modal__submit-btn'
              disabled={
                /^\s+$/.test(editedStunServer.host) || 
                !editedStunServer.host ||
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

export default StunServersList
