import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'

import ListForm from '../../subcomponents/list-form/ListForm'
import InputField from '../../subcomponents/input-field/InputField'
import ModalForm from '../../subcomponents/modal-form/ModalForm'
import Roles from '../../../constants/Roles'

import './FirmwaresList.css'

const FirmwaresList = (props) => {
  const {
    role,
    firmwares,
    isFirmwaresListLoading,
    requestFirmwares,
    requestCreateFirmware,
    requestUpdateFirmware,
    requestDeleteFirmware,
    requestDownloadFirmware,
    requestDownloadEncryptedFirmware,
  } = props;

  const [isMoreModalVisible, setIsMoreModalVisible] = useState(false);

  const [isFirmwareFileToAddValid, setIsFirmwareFileToAddValid] = useState(true);
  const [isEncryptedFirmwareFileToAddValid, setIsEncryptedFirmwareFileToAddValid] = useState(true);
  const [isFirmwareFileToEditValid, setIsFirmwareFileToEditValid] = useState(true);
  const [isEncryptedFirmwareFileToEditValid, setIsEncryptedFirmwareFileToEditValid] = useState(true);

  const [firmwareFileToAdd, setFirmwareFileToAdd] = useState({});
  const [firmwareFileToEdit, setFirmwareFileToEdit] = useState({});
  const [firmwareFileNameToAdd, setFirmwareFileNameToAdd] = useState('');
  const [firmwareFileNameToEdit, setFirmwareFileNameToEdit] = useState('');

  const [encryptedFirmwareFileToAdd, setEncryptedFirmwareFileToAdd] = useState({});
  const [encryptedFirmwareFileToEdit, setEncryptedFirmwareFileToEdit] = useState({});
  const [encryptedFirmwareFileNameToAdd, setEncryptedFirmwareFileNameToAdd] = useState('');
  const [encryptedFirmwareFileNameToEdit, setEncryptedFirmwareFileNameToEdit] = useState('');

  const [newFirmware, setNewFirmware] = useState({
    description: '',
    version: '',
  });

  const [editedFirmware, setEditedFirmware] = useState({
    id: '',
    description: '',
  });

  const [moreInfo, setMoreInfo] = useState({
    description: '',
    version: '',
  });

  const [firmwareIdForMoreInfo, setFirmwareIdForMoreInfo] = useState('');

  React.useEffect(() => {

    requestFirmwares()
  }, [requestFirmwares])

  const isNewVersionAlreadyExist = !!firmwares.find((firmware) => firmware.version === newFirmware.version);

  const handleSetEditedFirmwareWithInitials = (values) => {

    setEditedFirmware({
      ...editedFirmware,
      id: values.id,
      description: values.description,
    })
  }

  const handleLoadEncryptedFirmwareFile = (event) => {
    const file       = event.target.files[0];
    const formName   = event.target.name;
    const fileName   = file.name;
    const isAddInput = formName === 'addInput';

    isAddInput
    ?
      setEncryptedFirmwareFileNameToAdd(fileName)
    :
      setEncryptedFirmwareFileNameToEdit(fileName)

    if (fileName.split('.').pop() === 'dump') {

      if (isAddInput) {
        setEncryptedFirmwareFileToAdd(file)
        setIsEncryptedFirmwareFileToAddValid(true)
      } else {
        setEncryptedFirmwareFileToEdit(file)
        setIsEncryptedFirmwareFileToEditValid(true)
      }
    } else {

      if (isAddInput) {
        setIsEncryptedFirmwareFileToAddValid(false)
      } else {
        setIsEncryptedFirmwareFileToEditValid(false)
      }
    }
  }

  const handleLoadFirmwareFile = (event) => {
    const file       = event.target.files[0];
    const formName   = event.target.name;
    const fileName   = file.name;
    const isAddInput = formName === 'addInput';

    isAddInput
    ?
      setFirmwareFileNameToAdd(fileName)
    :
      setFirmwareFileNameToEdit(fileName)

    if (fileName.split('.').pop() === 'dump') {

      if (isAddInput) {
        setFirmwareFileToAdd(file)
        setIsFirmwareFileToAddValid(true)
      } else {
        setFirmwareFileToEdit(file)
        setIsFirmwareFileToEditValid(true)
      }
    } else {

      if (isAddInput) {
        setIsFirmwareFileToAddValid(false)
      } else {
        setIsFirmwareFileToEditValid(false)        
      }
    }
  }

  const handleChangeNewFirmware = (event) => {

    setNewFirmware({
      ...newFirmware,
      [event.target.name]: event.target.value,
    })
  }

  const handleNewFirmwareSubmit = () => {
    let formData = new FormData();

    formData.append('encrypted_firmware_file', encryptedFirmwareFileToAdd);
    formData.append('firmware_file', firmwareFileToAdd);
    formData.append('description', newFirmware.description);
    formData.append('version', newFirmware.version);
    
    requestCreateFirmware(formData);

    setNewFirmware({
      description: '',
      version: '',
    })
  }

  const handleChangeEditedFirmware = (event) => {

    setEditedFirmware({
      ...editedFirmware,
      [event.target.name]: event.target.value,
    })
  }

  const handleEditedFirmwareSubmit = () => {
    let formData = new FormData();

    formData.append('firmware_id', firmwareFileToEdit);
    formData.append('encrypted_firmware_file', encryptedFirmwareFileToEdit);
    formData.append('description', editedFirmware.description);
    
    requestUpdateFirmware(formData);

    setEditedFirmware({
      id: '',
      description: '',
    })
  }

  const handleDeleteFirmware = (id) => {

    requestDeleteFirmware(id)
  }

  const handleSetValuesForMoreInfo = (values) => {
    
    setMoreInfo({
      ...moreInfo,
      description: values.description,
      version: values.version,
    })
    setFirmwareIdForMoreInfo(values.id)
    setIsMoreModalVisible(true)
  }

  const handleCloseMoreModal = () => {

    setIsMoreModalVisible(false)
  }

  const handleDownloadFirmware = () => {

    requestDownloadFirmware(firmwareIdForMoreInfo)
  }

  const handleDownloadEncryptedFirmware = () => {

    requestDownloadEncryptedFirmware(firmwareIdForMoreInfo)
  }
  
  return (
    <div className='b-firmwares-list'>
      <ListForm 
        values={firmwares}
        valuesIndex='version'
        noValuesText='Прошивки отсутсвуют'
        addValueHeader='Добавление прошивки'
        isListLoading={isFirmwaresListLoading}
        withoutAdd={role !== Roles.ADMINISTRATOR}
        withoutEdit={role !== Roles.ADMINISTRATOR}
        withoutDelete={role !== Roles.ADMINISTRATOR}
        deleteValue={(id) => handleDeleteFirmware(id)}
        setInitialValues={(values) => handleSetEditedFirmwareWithInitials(values)}
        setValuesForMoreInfo={(values) => handleSetValuesForMoreInfo(values)}
        onSubmitNewValues={handleNewFirmwareSubmit}
        onSubmitEditedValues={handleEditedFirmwareSubmit}
        renderAddForm={() => (
          <> 
            <div className='b-firmwares-list__file-inputs'>
              <small>Прошивка*</small>
              <Form.File
                name='addInput'
                label={firmwareFileNameToAdd || 'Выбрать файл (.dump)'}
                data-browse='Обзор'
                className='b-firmwares-list__file-input'
                onChange={handleLoadFirmwareFile}
                isInvalid={!isFirmwareFileToAddValid}
                custom
              />  
              <small>Зашифрованная прошивка*</small>
              <Form.File
                name='addInput'
                label={encryptedFirmwareFileNameToAdd || 'Выбрать файл (.dump)'}
                data-browse='Обзор'
                className='b-firmwares-list__file-input'
                onChange={handleLoadEncryptedFirmwareFile}
                isInvalid={!isEncryptedFirmwareFileToAddValid}
                custom
              />  
            </div>
            <InputField
              innerLabel='Описание'
              type='text'
              name='description'
              value={newFirmware.description}
              onChange={handleChangeNewFirmware}
            />
            <InputField
              innerLabel='Версия*'
              type='text'
              name='version'
              value={newFirmware.version}
              error={isNewVersionAlreadyExist}
              helperText={isNewVersionAlreadyExist && 'Такая версия уже есть'}
              onChange={handleChangeNewFirmware}
            />
            <button
              type='submit'
              className='b-button b-modal__submit-btn'
              disabled={
                !newFirmware.version ||
                !firmwareFileToAdd.name ||
                !encryptedFirmwareFileToAdd.name ||
                isNewVersionAlreadyExist || 
                !isFirmwareFileToAddValid ||
                !isEncryptedFirmwareFileToAddValid
              }
            >
              Добавить
            </button>
          </>
        )}
        renderEditForm={() => (
          <>
            <div className='b-firmwares-list__file-inputs'>
              <small>Прошивка*</small>
              <Form.File
                name='editInput'
                label={firmwareFileNameToEdit || 'Выбрать файл (.dump)'}
                data-browse='Обзор'
                className='b-firmwares-list__file-input'
                onChange={handleLoadFirmwareFile}
                isInvalid={!isFirmwareFileToEditValid}
                custom
              />  
              <small>Зашифрованная прошивка*</small>
              <Form.File
                name='editInput'
                label={encryptedFirmwareFileNameToEdit || 'Выбрать файл (.dump)'}
                data-browse='Обзор'
                className='b-firmwares-list__file-input'
                onChange={handleLoadEncryptedFirmwareFile}
                isInvalid={!isEncryptedFirmwareFileToEditValid}
                custom
              />  
            </div>
            <InputField
              innerLabel='Описание'
              type='text'
              name='description'
              value={editedFirmware.description}
              onChange={handleChangeEditedFirmware}
            />
            <button
              type='submit'
              className='b-button b-modal__submit-btn'
              disabled={
                !editedFirmware.version || 
                !firmwareFileToEdit.name ||
                !encryptedFirmwareFileToEdit.name ||
                !isFirmwareFileToEditValid ||
                !isEncryptedFirmwareFileToEditValid
              }
            >
              Сохранить
            </button>
          </>
        )}
      />
      {
        isMoreModalVisible
        &&
          <ModalForm 
            handleCloseModal={handleCloseMoreModal}
            withoutHeader
          >
            <>
              <div className='b-firmwares-list__more-info'>
                <p>
                  <span>Описание: </span>
                  <span>{moreInfo.description || '-'}</span>
                </p>
                <p>
                  <span>Версия: </span>
                  <span>{moreInfo.version}</span>
                </p>
              </div>
              <div className='b-firmwares-list__download-btns'>
                {
                  role === Roles.ADMINISTRATOR
                  &&
                    <button
                      className='b-button'
                      onClick={handleDownloadFirmware}
                    >
                      Скачать прошивку
                    </button>
                }
                <button
                  className='b-button'
                  onClick={handleDownloadEncryptedFirmware}
                >
                  Скачать зашифрованную прошивку
                </button>
              </div>
            </>
          </ModalForm>
      }
    </div>
  )
}

export default FirmwaresList
