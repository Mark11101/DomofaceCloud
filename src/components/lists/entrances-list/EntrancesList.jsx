import React, { useState } from 'react'

import InputField from '../../subcomponents/input-field/InputField'
import ListForm from '../../subcomponents/list-form/ListForm'
import ModalForm from '../../subcomponents/modal-form/ModalForm'
import IntercomInfo from '../../intercom-info/InrtercomInfoContainer'
import FlatsList from '../flats-list/FlatsListContainer'
import Roles from '../../../constants/Roles'
import IntercomSettings from '../../intercom-settings/IntercomSettingsContainer'

import './EntrancesList.css'

const EntrancesList = (props) => {
  const {
    role,
    companyId,
    houseId,
    ftpServers,
    stunServers,
    syslogServers,
    turnServers,
    sipServers,
    sipCredentials,
    intercoms,
    entrances,
    isIntercomsListLoading,
    isEntrancesListLoading,
    requestEntrances,
    requestCreateEntrance,
    requestUpdateEntrance,
    requestDeleteEntrance,
    requestIntercoms,
    requestFlats,
    requestFtpServers,
    requestStunServers,
    requestSyslogServers,
    requestTurnServers,
    requestSipServers,
    requestSipCredentials,
    requestCreateIntercom,
  } = props;

  const [entranceIdToChoose, setEntranceIdToChoose] = useState('');
  const [isChooseEntityModalVisible, setIsChooseEntityModalVisible] = useState(false);
  const [isChooseFlatModalVisible, setIsChooseFlatModalVisible] = useState(false);
  const [isIntercomModalVisible, setIsIntercomModalVisible] = useState(false);
  const [isAddIntercomModalVisible, setIsAddIntercomModalVisible] = useState(false);

  const filteredEntrances = entrances.filter((entrance) => entrance.house_id === houseId);
  const filteredIntercom  = intercoms.find((intercom) => intercom.entrance_id === entranceIdToChoose);

  const [newEntrance, setNewEntrance] = useState({
    house_id: houseId,
    number: '',
  });

  const [editedEntrance, setEditedEntrance] = useState({
    id: '',
    house_id: houseId,
    number: '',
  });

  const [initialEditedNumber, setInitialEditedNumber] = useState('');

  const isNewNumberAlreadyExist    = !!filteredEntrances.find((entrance) => entrance.number.toString() === newEntrance.number);
  const isEditedNumberAlreadyExist = editedEntrance.number !== initialEditedNumber && !!filteredEntrances.find((entrance) => entrance.number.toString() === editedEntrance.number);

  React.useEffect(() => {
    requestEntrances(companyId)
    requestIntercoms(companyId)
    requestFlats(companyId)
    requestFtpServers(companyId)
    requestStunServers(companyId)
    requestSyslogServers(companyId)
    requestTurnServers(companyId)
    requestSipServers(companyId)
    requestSipCredentials(companyId)
  }, [
    requestEntrances,
    requestIntercoms, 
    requestFlats,
    requestFtpServers,
    requestStunServers,
    requestSyslogServers,
    requestTurnServers,
    requestSipServers,
    requestSipCredentials,
    companyId,
  ])
  
  const handleChangeNewEntrance = (event) => {
    const value = Number(event.target.value);
    
    value >= 0 && Number.isInteger(value) 
    &&
      setNewEntrance({
        ...newEntrance,
        number: event.target.value,
      })
  }

  const handleChangeEditedEntranceId = (values) => {
    setEditedEntrance({
      ...editedEntrance,
      id: values.id,
      number: values.number.toString(),
    })

    setInitialEditedNumber(values.number.toString())
  }

  const handleChangeEditedEntranceNumber = (event, number) => {
    if (number) {

      setEditedEntrance({
        ...editedEntrance,
        number: number,
      })
    } else {
      const value = Number(event.target.value);
      
      value >= 0 && Number.isInteger(value) 
      &&
        setEditedEntrance({
          ...editedEntrance,
          number: event.target.value,
        })
    }
  }

  const handleNewEntranceSubmit = () => {
    requestCreateEntrance(
      newEntrance.house_id,
      newEntrance.number,
    )

    setNewEntrance({
      ...newEntrance,
      number: '',
    })
  }

  const handleEditedEntranceSubmit = () => {
    requestUpdateEntrance(
      editedEntrance.id,
      editedEntrance.house_id,
      editedEntrance.number,
    )

    setEditedEntrance({
      ...editedEntrance,
      id: '',
      number: '',
    })
  }

  const handleDeleteEntrance = (id) => {

    requestDeleteEntrance(id)
  }

  const handleChooseEntrance = (id) => {
    
    handleSetEntranceId(id)
  }
  
  const handleSetEntranceId = (id) => {
    setEntranceIdToChoose(id)
    
    const isIntercomExist = intercoms.find((intercom) => intercom.entrance_id === id);
    
    !isIntercomExist && role !== Roles.ADMINISTRATOR
    ?
      handleOpenChooseFlatModal()
    :
      handleOpenChooseEntityModal()
  }

  const handleOpenChooseEntityModal = () => {
    
    setIsChooseEntityModalVisible(true)
  }

  const handleCloseChooseEntityModal = () => {
    
    setIsChooseEntityModalVisible(false)
  }

  const handleOpenChooseFlatModal = () => {

    setIsChooseFlatModalVisible(true)
  }

  const handleCloseChooseFlatModal = () => {

    setIsChooseFlatModalVisible(false)
  }

  const handleOpenIntercomModal = () => {

    setIsIntercomModalVisible(true)
  }

  const handleCloseIntercomModal = () => {

    setIsIntercomModalVisible(false)
  }

  const handleOpenAddIntercomModal = () => {

    setIsAddIntercomModalVisible(true)
  }

  const handleCloseAddIntercomModal = () => {

    setIsAddIntercomModalVisible(false)
  }

  const handleCreateIntercom = (intercom) => {

    requestCreateIntercom(intercom)
  }
  
  return (
    <>
      <ListForm 
        values={filteredEntrances}
        valuesIndex='number'
        noValuesText='Подъезды отсутсвуют'
        addValueHeader='Добавление подъезда'
        innerModal
        isListLoading={isEntrancesListLoading}
        deleteValue={(id) => handleDeleteEntrance(id)}
        openInnerModal={(id) => handleChooseEntrance(id)}
        setInitialValues={(values) => handleChangeEditedEntranceId(values)}
        onSubmitNewValues={handleNewEntranceSubmit}
        onSubmitEditedValues={handleEditedEntranceSubmit}
        renderAddForm={() => (
          <>              
            <InputField 
              type='number'
              innerLabel='Номер'
              value={newEntrance.number}
              error={isNewNumberAlreadyExist}
              helperText={isNewNumberAlreadyExist && 'Такой номер уже есть'}
              onChange={handleChangeNewEntrance}
            />
            <button  
              type='submit'
              className='b-button b-modal__submit-btn'
              disabled={!newEntrance.number || isNewNumberAlreadyExist}
            >
              Добавить
            </button>
          </>
        )}
        renderEditForm={() => (
          <>              
            <InputField 
              type='number'
              innerLabel='Номер'
              value={editedEntrance.number}
              error={isEditedNumberAlreadyExist}
              helperText={isEditedNumberAlreadyExist && 'Такой номер уже есть'}
              onChange={handleChangeEditedEntranceNumber}
            />
            <button  
              type='submit'
              className='b-button b-modal__submit-btn'
              disabled={!editedEntrance.number || isEditedNumberAlreadyExist}
            >
              Сохранить
            </button>
          </>
        )}
      />
      {
        isChooseEntityModalVisible && !isIntercomsListLoading
        &&
          <ModalForm            
            handleCloseModal={handleCloseChooseEntityModal}
            withoutHeader
          >
            <div className='b-modal-form__choose-entity-modal'>  
              <button
                className='b-button'
                onClick={handleOpenChooseFlatModal}
              >
                Квартиры
              </button>
              {
                filteredIntercom
                ?
                  <button
                    className='b-button'
                    onClick={handleOpenIntercomModal}
                  >
                    Домофон
                  </button>
                :
                  <>
                    {
                      role === Roles.ADMINISTRATOR
                      &&
                        <button
                          className='b-button'
                          onClick={handleOpenAddIntercomModal}
                        >
                          Добавить домофон
                        </button>
                    }
                  </>
              }
            </div>
          </ModalForm>
      }
      {
        isChooseFlatModalVisible
        &&
          <ModalForm            
            title='Квартиры'
            handleCloseModal={handleCloseChooseFlatModal}
          >
            <FlatsList 
              companyId={companyId} 
              entranceId={entranceIdToChoose}
              intercoms={intercoms}

            />
          </ModalForm>
      }
      {
        isIntercomModalVisible
        &&
          <ModalForm            
            handleCloseModal={handleCloseIntercomModal}
            withoutHeader
          >
            <IntercomInfo 
              intercom={filteredIntercom} 
              companyId={companyId}
              intercoms={intercoms}
              entrances={entrances}
              closeInfoModal={handleCloseIntercomModal}
            />
          </ModalForm>
      }
      {
        isAddIntercomModalVisible
        &&
          <ModalForm            
            title='Добавление домофона'
            handleCloseModal={handleCloseAddIntercomModal}
          >
            <IntercomSettings 
              entranceId={entranceIdToChoose}
              ftpServers={ftpServers}
              stunServers={stunServers}
              syslogServers={syslogServers}
              turnServers={turnServers}
              sipServers={sipServers}
              sipCredentials={sipCredentials}
              submitSettings={handleCreateIntercom}
              closeModal={handleCloseAddIntercomModal}
            />
          </ModalForm>
      }
    </>
  )
}

export default EntrancesList
