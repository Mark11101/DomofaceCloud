import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import CardColumns from 'react-bootstrap/CardColumns'
import AddIcon from '@material-ui/icons/Add'

import NoPhoto from '../../../images/no-photo.jpg'
import ModalForm from '../../subcomponents/modal-form/ModalForm'
import { showErrorMessage } from '../../../utils/notifications/messages'
import InputField from '../../subcomponents/input-field/InputField'
import SelectField from '../../subcomponents/select-field/SelectField'
import useDevice from '../../../hooks/use-device/useDevice'
import DeviceTypes from '../../../constants/DeviceTypes'
import Roles from '../../../constants/Roles'

import './FacesList.css'

const Faces = (props) => {
  const {
    role,
    companyId,
    intercomId,
    entranceId,
    flatId,
    images,
    intercoms,
    flats,
    faces,
    requestFaces,
    requestDeleteFace,
    requestUpdateFace,
    requestCreateFace,
  } = props;

  const deviceType = useDevice();
  
  const filteredFaces = faces.filter((face) => {
    
    return (
      flatId
      ?
        face.flat_id === flatId
      : 
        face.intercom_id === intercomId
      )
    });
  
  const filteredIntercom = intercoms.find((intercom) => intercom.entrance_id === entranceId);
  const filteredFlats = flats.filter((flat) => flat.entrance_id === entranceId);
  
  const [isInputValid, setIsInputValid] = useState(true);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const [fileToAdd, setFileToAdd] = useState({});
  const [fileToEdit, setFileToEdit] = useState({});
  const [fileName, setFileName] = useState('');
  
  const [newFace, setNewFace] = useState({
    intercom_id: intercomId || (filteredIntercom && filteredIntercom.id) || '',
    description: '',
    flat_id: flatId || '',
  });
  
  const [editedFace, setEditedFace] = useState({
    id: '',
    description: '',
    flat_id: '',
  });

  React.useEffect(() => {

    companyId && requestFaces(companyId)
  }, [requestFaces, companyId])

  const compare = (a, b, index) => {
    const firstItem  = a[index].toString().toUpperCase();
    const secondItem = b[index].toString().toUpperCase();

    return firstItem - secondItem
  }

  const sortedFlats = filteredFlats.sort((a, b) => compare(a, b, 'number'));
  
  let sortedFlatsNumbers = sortedFlats.map(flat => flat.number);
  sortedFlatsNumbers.unshift('')

  const filteredFacesWithFlatNumber = filteredFaces.map((filteredFace) => {
    const findedFlat = filteredFlats.find((filteredFlat) => filteredFlat.id === filteredFace.flat_id);

    return {
      ...filteredFace,
      flatNumber: (findedFlat && findedFlat.number) || '',
    }
  });

  const sortedFaces = filteredFacesWithFlatNumber.sort((a, b) => compare(a, b, 'flatNumber'));

  const handleGetImage = (images, faceId) => {

    if (images.length > 0) {
      
      const currentItem = images.find(item => item.id === faceId);
      
      if (currentItem) {
        return currentItem.image.replace(/\s/g, '');
      }
    }
  }

  const handleLoadImage = (event) => {
    event.preventDefault()
    
    const file = event.target.files[0];

    if (file.type.split('/')[0] !== 'image') {
      
      setIsInputValid(false)
      showErrorMessage('Выберите изображение')
    
    } else if (file.size > 4096000) {

      setIsInputValid(false)
      showErrorMessage('Размер файла не должен превышать 4MB')
    
    } else {

      setIsInputValid(true)
      setFileName(file.name)

      event.target.name === 'addInput'
      ?
        setFileToAdd(file)
      :
        setFileToEdit(file)
    } 
  }

  const handleNewFaceChange = (event) => {
    const name  = event.target.name;
    const value = event.target.value;

    if (name === 'description') {

      setNewFace({
        ...newFace,
        description: value,
      })
    } else {
      
      setNewFace({
        ...newFace,
        flat_id: filteredFlats.find((filteredFlat) => filteredFlat.number === value).id,
      })
    }
  }

  const handleCreateFaceSubmit = (event) => {
    event.preventDefault()

    let newFaceConstructor = {
      fileToAdd,
      description: newFace.description,
    };

    if (newFace.flat_id) {
      newFaceConstructor = {
        ...newFaceConstructor,
        flat_id: newFace.flat_id,
      }
    }

    if (role !== Roles.TENANT) {

      newFaceConstructor = {
        ...newFaceConstructor,
        intercom_id: newFace.intercom_id,
      }
    }
    
    requestCreateFace(newFaceConstructor)

    setNewFace({
      ...newFace,
      description: '',
    })

    handleCloseAddModal()
  }

  const handleEditedFaceChange = (event) => {

    setEditedFace({
      ...editedFace,
      description: event.target.value,
    })
  }
  
  const handleUpdateFaceSubmit = (event) => {
    event.preventDefault()
    
    requestUpdateFace(
      editedFace.id, 
      editedFace.description,
    );

    handleCloseEditModal()
  }

  const handleDeleteFace = (event, id) => {
    event.preventDefault()

    requestDeleteFace(id)
  }

  const handleOpenAddModal = () => {
    setNewFace({
      ...newFace,
      flat_id: flatId || '',
    })
    
    setIsAddModalVisible(true)
  }

  const handleCloseAddModal = () => {

    setIsAddModalVisible(false)
    setFileName('')
  }

  const handleOpenEditModal = (face) => {
    const filteredImage = images.find((image) => image.id === face.id);

    filteredImage
    &&
      setFileToEdit(filteredImage.image)

    setEditedFace({
      id: face.id,
      description: face.description || '',
      flat_id: face.flat_id
    })

    setIsEditModalVisible(true)
  }

  const handleCloseEditModal = () => {

    setIsEditModalVisible(false)
    setFileName('')
    setEditedFace({
      id: '',
      description: '',
      flat_id: flatId || (filteredFlats[0] && filteredFlats[0].id) || '',
    })
  } 
  
  return (
    <>
      <div className='b-faces-list'>
        <button
          onClick={handleOpenAddModal}
          className='b-button b-faces-list__add-btn'
        >
          {
            deviceType === DeviceTypes.DESKTOP
            ?
              'Добавить'
            :
              <AddIcon />
          }
        </button>
        {
          filteredFacesWithFlatNumber.length !== 0 
          ?
            <div className='b-faces-list__cards'>
              <CardColumns>
                {
                  sortedFaces.map((face) => 
                    <Card className='b-faces-list__card' key={face.id}>
                      <Card.Header>
                        <Card.Img
                          variant="top"
                          src={handleGetImage(images, face.id) || NoPhoto}
                          className='b-faces-list__image'
                        />
                        <div className='b-faces-list__card-buttons'>
                          <button
                            className='b-button'
                            onClick={() => handleOpenEditModal(face)}
                          >
                            Изменить
                          </button>
                          <button
                            className='b-button b-button--delete b-faces-list__delete-btn'
                            onClick={(e) => handleDeleteFace(e, face.id)}
                          >
                            Удалить
                          </button>
                        </div>
                      </Card.Header>
                      {
                        (face.description || (intercomId && face.flatNumber))
                        &&
                          <Card.Body>
                            {
                              <div className='b-faces-list__card-data'>
                                {
                                  face.description
                                  &&
                                    <p>
                                      <span>Описание: </span>
                                      <span>{face.description}</span>
                                    </p>
                                }
                                {
                                  intercomId && face.flatNumber 
                                  &&
                                    <p>
                                      <span>Номер квартиры: </span>
                                      <span>{face.flatNumber}</span>
                                    </p>
                                }
                              </div>
                            }
                          </Card.Body>
                      }
                    </Card>
                  )
                }
              </CardColumns>
            </div>
          :
            <div className='b-faces-list__no-values'>
              Лица отсутствуют
            </div>
        }
      </div>
      {
        isAddModalVisible
        &&
          <ModalForm
            title='Добавление лица'
            handleCloseModal={handleCloseAddModal}
          >
            <Form 
              className='b-faces-list__modal-form'
              onSubmit={handleCreateFaceSubmit}
            >
              {
                (filteredIntercom && filteredFlats.length !== 0) || role === Roles.TENANT
                ?
                  <>
                    <Form.File
                      id="custom-file"
                      name='addInput'
                      label={fileName || 'Выбрать фото'}
                      data-browse='Обзор'
                      className='b-faces-list__modal-file-input'
                      onChange={handleLoadImage}
                      isInvalid={!isInputValid}
                      custom
                    />  
                    {
                      intercomId
                      &&
                        <SelectField 
                          label='Номер квартиры: '
                          name='flat_id'
                          className='b-faces__select-resident'
                          defaultValue={''}
                          values={sortedFlatsNumbers}
                          onChange={handleNewFaceChange}          
                        />
                    }      
                    <InputField
                      innerLabel='Описание'
                      type='text'
                      name='description'
                      className='b-faces__modal-text-input'
                      value={newFace.description}
                      onChange={handleNewFaceChange}
                    />
                  </>
                :
                  <>
                    {
                      role !== Roles.TENANT
                      &&
                        <div className='b-faces-list__values-to-add'>
                          <p>Необходимо добавить:</p>
                          {
                            !filteredIntercom
                            &&
                              <p>- Домофон</p>
                          } 
                        </div>
                    }
                  </>
              }
              <button
                type='submit'
                disabled={!isInputValid || !fileName}
                className='b-button b-modal__submit-btn'
              >
                Добавить
              </button>
            </Form>
          </ModalForm>
      }
      {
        isEditModalVisible
        &&
          <ModalForm
            title='Обновление данных'
            handleCloseModal={handleCloseEditModal}
          >
            <Form 
              className='b-faces-list__edit-modal-form'
              onSubmit={handleUpdateFaceSubmit}
            > 
              <InputField
                innerLabel='Описание'
                type='text'
                name='description'
                className='b-faces__modal-text-input'
                value={editedFace.description}
                onChange={handleEditedFaceChange}
              />
              <button
                type='submit'
                disabled={!isInputValid || !fileToEdit}
                className='b-button b-modal__submit-btn'
              >
                Отправить
              </button>
            </Form>
          </ModalForm>
      }
    </>
  )
}

export default Faces
