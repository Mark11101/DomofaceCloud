import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'

import InputField from '../../subcomponents/input-field/InputField'
import ListForm from '../../subcomponents/list-form/ListForm'
import ModalForm from '../../subcomponents/modal-form/ModalForm'
import IntercomInfo from '../../intercom-info/InrtercomInfoContainer'

import './IntercomsList'

const IntercomsList = (props) => {
  // const {
  //   companyId,
  //   intercoms,
  //   entrance,
  //   requestIntercoms,
  //   requestCreateIntercom,
  //   requestUpdateIntercom,
  //   requestDeleteIntercom,
  //   requestEntrances,
  // } = props;

  const intercoms = [
    {
      id: '1',
      create_datetime: '1',
      update_datetime: '1',
      device_id: '1',
      hardware_version: '1',
      software_version: '1',
      entrance_id: '1',
      ftp_server_id: '1',
      flats_turn_server_id: '1',
      emergency_turn_server_id: '1',
      stun_server_id: '1',
      syslog_server_id: '1',
      flats_sip_credential_id: '1',
      emergency_sip_credential_id: '1',
      is_ssl: true,
      ssl_key: '1',
      host: 'pizda',
      status: 'jopa',
      settings: {},
      sync: true,
    }
  ];

  const [choosenIntercom, setChoosenIntercom] = useState({});
  const [isIntercomInfoModalVisible, setIsIntercomInfoModalVisible] = useState(false);

  const [newIntercom, setNewIntercom] = useState({
    device_id: '',
    hardware_version: '',
    software_version: '',
    entrance_id: '',
    ftp_server_id: '',
    flats_turn_server_id: '',
    emergency_turn_server_id: '',
    stun_server_id: '',
    syslog_server_id: '',
    flats_sip_credential_id: '',
    emergency_sip_credential_id: '',
    is_ssl: true,
    ssl_key: '',
    host: '',
    status: '',
    settings: {},
  })

  React.useEffect(() => {

    // requestIntercoms()
  }, [])

  const handleChangeNewIntercom = (event) => {

    setNewIntercom({
      ...newIntercom,
      [event.target.name]: event.target.value,
    })
  }

  const handleNewIntercomSubmit = (event) => {
    event.preventDefault()

    // req
  }

  const handleOpenIntercomInfoModal = (values) => {
    
    setChoosenIntercom(values)
    setIsIntercomInfoModalVisible(true)
  }

  const handleCloseIntercomInfoModal = () => {
    
    setIsIntercomInfoModalVisible(false)
  }

  return (
    <>
      <ListForm 
        values={intercoms}
        valuesIndex='device_id'
        noValuesText='Домофоны отсутсвуют'
        addValueHeader='Добавление домофона'
        links
        openMoreInfoModal={(values) => handleOpenIntercomInfoModal(values)}
        renderAddForm={() => (
          <Form onSubmit={handleNewIntercomSubmit}>              
            <InputField 
              type='text'
              innerLabel='ID устройства'
              name='device_id'
              value={newIntercom.device_id}
              onChange={handleChangeNewIntercom}
            />          
            <InputField 
              type='text'
              innerLabel='Версия аппаратного обеспечения'
              name='hardware_version'
              value={newIntercom.hardware_version}
              onChange={handleChangeNewIntercom}
            />        
            <InputField 
              type='text'
              innerLabel='Версия программного обеспечения'
              name='software_version'
              value={newIntercom.software_version}
              onChange={handleChangeNewIntercom}
            />
            <button  
              type='submit'
              className='b-button b-modal__submit-btn'
              disabled={
                !newIntercom.device_id
              }
            >
              Добавить
            </button>
          </Form>
        )}
      />
      {
        isIntercomInfoModalVisible
        &&
          <ModalForm            
            handleCloseModal={handleCloseIntercomInfoModal}
            withoutHeader
          >
            <IntercomInfo intercom={choosenIntercom} />
          </ModalForm>
      }
    </>
  )
}

export default IntercomsList
