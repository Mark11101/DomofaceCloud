import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import AddIcon from '@material-ui/icons/Add'

import InputField from '../../subcomponents/input-field/InputField'
import ModalForm from '../../subcomponents/modal-form/ModalForm'
import SelectField from '../../subcomponents/select-field/SelectField'
import useDevice from '../../../hooks/use-device/useDevice'
import DeviceTypes from '../../../constants/DeviceTypes'
import Roles from '../../../constants/Roles'

import './QrCodesList.css'

const QRCode = require('qrcode.react');

const QrCodesList = (props) => {
  const {
    role,
    companyId,
    intercomId,
    entranceId,
    flatId,
    intercoms,
    flats,
    qrCodes,
    requestQrCodes,
    requestDeleteQrCode,
    requestCreateQrCode,
  } = props;

  const filteredQrCodes = qrCodes.filter((qrCode) => {

    return (
      flatId
      ?
        qrCode.flat_id === flatId
      :
        qrCode.intercom_id === intercomId
    )
  });

  const filteredIntercom = intercoms.find((intercom) => intercom.entrance_id === entranceId);
  const filteredFlats = flats.filter((flat) => flat.entrance_id === entranceId);

  const deviceType = useDevice();

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  const [newQrCode, setNewQrCode] = useState({
    flat_id: flatId || '',
    intercom_id: intercomId || (filteredIntercom && filteredIntercom.id) || '',
    qr: '',
  });

  React.useEffect(() => {

    companyId && requestQrCodes(companyId)
  }, [requestQrCodes, companyId])

  const compare = (a, b, index) => {
    const firstItem  = a[index].toString().toUpperCase();
    const secondItem = b[index].toString().toUpperCase();

    return firstItem - secondItem
  }

  const sortedFlats = filteredFlats.sort((a, b) => compare(a, b, 'number'));
  
  let sortedFlatsNumbers = sortedFlats.map(flat => flat.number);
  sortedFlatsNumbers.unshift('')

  const filteredQrCodesWithFlatNumber = filteredQrCodes.map((filteredQrCode) => {
    
    const findedFlat = filteredFlats.find((filteredFlat) => filteredFlat.id === filteredQrCode.flat_id);

    return {
      ...filteredQrCode,
      flatNumber: (findedFlat && findedFlat.number) || '',
    }
  });

  const sortedQrCodes = filteredQrCodesWithFlatNumber.sort((a, b) => compare(a, b, 'flatNumber'));

  const isQrCodeAlreadyExist = !!qrCodes.find((qrCode) => qrCode.qr === newQrCode.qr);

  const handleChangeNewQrCode = (event) => {
    const name  = event.target.name;
    const value = event.target.value;

    if (name === 'qr') {

      setNewQrCode({
        ...newQrCode,
        qr: value,
      })
    } else {

      setNewQrCode({
        ...newQrCode,
        flat_id: filteredFlats.find((filteredFlat) => filteredFlat.number === value).id,
      })
    }
  }

  const handleNewQrCodeSubmit = (event) => {
    event.preventDefault()

    let newQrCodeConstructor = {
      qr: newQrCode.qr,
    };

    if (newQrCode.flat_id) {
      newQrCodeConstructor = {
        ...newQrCodeConstructor,
        flat_id: newQrCode.flat_id,
      }
    }

    if (role !== Roles.TENANT) {

      newQrCodeConstructor = {
        ...newQrCode,
        intercom_id: newQrCode.intercom_id,
      }
    }
    
    requestCreateQrCode(newQrCodeConstructor)

    setNewQrCode({
      ...newQrCode,
      qr: '',
    })

    handleCloseAddModal()
  }

  const handleDeleteQrCode = (event, id) => {
    event.preventDefault()
    
    requestDeleteQrCode(id)
  }

  const handleOpenAddModal = () => {

    setIsAddModalVisible(true)
  }

  const handleCloseAddModal = () => {

    setIsAddModalVisible(false)
  }

  const handleRandomQrCodeClick = (event) => {
    event.preventDefault()

    const randomString = [...Array(16)].map(i=>(~~(Math.random()*36)).toString(36)).join('');
    
    setNewQrCode({
      ...newQrCode,
      qr: randomString,
      flat_id: flatId || '',
    })
  }

  const handleQrCodeDownload = (id) => {

    const dataURL = document.getElementById(id).toDataURL();

    const link = document.createElement('a');

    link.href = dataURL;
    link.target = '_blank';
    link.setAttribute('download', 'file');

    document.body.appendChild(link);

    link.click();
  }

  return (
    <>
      <div className='b-qr-codes-list'>
        <button
          onClick={handleOpenAddModal}
          className='b-button b-qr-codes-list__add-btn'
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
          filteredQrCodes.length !== 0
          ?
            <div className='b-qr-codes-list__cards'>
              <CardColumns>
                {
                  sortedQrCodes.map((qrCode) => 
                    <Card className='b-qr-codes-list__card' key={qrCode.id}>
                      <Card.Header>
                        <QRCode 
                          value={qrCode.qr} 
                          id={'qr-code-image-' + qrCode.id} 
                          size={
                            deviceType !== DeviceTypes.DESKTOP
                            ?
                              466
                            :
                              221
                          } 
                        />
                      </Card.Header>
                      <Card.Body>
                        <p>
                          <span>Код: </span>
                          <span>{qrCode.qr}</span>
                        </p>
                        {
                          intercomId
                          &&
                            <p className='b-qr-codes-list__resident'>
                              <span>Номер квартиры: </span>
                              <span>{qrCode.flatNumber}</span>
                            </p> 
                        }
                      </Card.Body>
                      <Card.Footer>
                        <button
                          className='b-button b-qr-codes-list__download-btn'
                          onClick={() => handleQrCodeDownload(`qr-code-image-${qrCode.id}`)}
                        >
                          Скачать
                        </button>
                        <button
                          className='b-button b-button--delete b-qr-codes-list__delete-btn'
                          onClick={(e) => handleDeleteQrCode(e, qrCode.id)}
                        >
                          Удалить
                        </button>
                      </Card.Footer>
                    </Card>
                  )
                }
              </CardColumns>
            </div>
          :
            <div>
              Qr-коды отсутствуют
            </div>
        }
      </div>
      {
        isAddModalVisible
        &&
          <ModalForm
            title='Добавление QR-кода'
            handleCloseModal={handleCloseAddModal}
          >
            <Form
              className='b-qr-codes-list__modal-form'
              onSubmit={handleNewQrCodeSubmit}
            >   
              {
                (filteredIntercom && filteredFlats.length !== 0) || role === Roles.TENANT
                ?
                  <>
                    <InputField
                      innerLabel={'QR-код' + (!!intercomId ? '*' : '')}
                      type='text'
                      name='qr'
                      className='b-qr-codes-list__input-field'
                      value={newQrCode.qr}
                      error={isQrCodeAlreadyExist}
                      helperText={isQrCodeAlreadyExist && 'Такой qr-код уже есть'}
                      onChange={(e) => handleChangeNewQrCode(e)} 
                    />
                    <button
                      className='b-button b-qr-codes-list__random-qr-btn'
                      onClick={handleRandomQrCodeClick}
                    >
                      Сгенерировать случайно
                    </button>
                    {
                      !!intercomId
                      &&
                        <SelectField 
                          label='Номер квартиры'
                          name='flat_id'
                          className='b-rfid-keys-list__select-field'
                          defaultValue={''}
                          values={sortedFlatsNumbers}
                          onChange={(e) => handleChangeNewQrCode(e)}          
                        />
                    }
                  </>
                :
                  <>
                    {
                      role !== Roles.TENANT
                      &&
                        <div className='b-qr-codes-list__no-values'>
                          Необходимо добавить домофон 
                        </div>
                    }
                  </>
              }  
              <button
                type='submit'
                className='b-button b-modal__submit-btn'
                disabled={!newQrCode.qr || isQrCodeAlreadyExist}
              >
                Добавить
              </button>
            </Form>
          </ModalForm>
      }
    </>
  )
}

export default QrCodesList
