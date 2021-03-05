import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import HomeIcon from '@material-ui/icons/Home'

import Divider from '../../subcomponents/divider/Divider'
// import PhotoFromCamera from '../../../images/invalid-camera.png'
import ModalForm from '../../subcomponents/modal-form/ModalForm'
import SelectField from '../../subcomponents/select-field/SelectField'
import useDevice from '../../../hooks/use-device/useDevice'
import DeviceTypes from '../../../constants/DeviceTypes'

import './Intercom.css'

const Intercom = (props) => {
  const {
    intercomId,
    firmwares,
    requestFirmwares,
    requestOpenDoor,
    requestRebootIntercom,
    requestUpdateIntercomFirmware,
  } = props;

  const deviceType = useDevice();

  const [isUpdateFirmwareModalVisible, setIsUpdateFirmwareModalVisible] = useState(false);
  const [firmwareId, setFirmwareId] = useState('');

  React.useEffect(() => {

    requestFirmwares()
  }, [requestFirmwares])

  const handleOpenDoor = () => {

    requestOpenDoor(intercomId)
  }

  const handleToggleUpdateFirmwareModal = () => {

    setFirmwareId(firmwares[0] && firmwares[0].id)
    setIsUpdateFirmwareModalVisible(!isUpdateFirmwareModalVisible)
  }

  const handleRebootIntercom = () => {

    requestRebootIntercom(intercomId)
  }

  const handleChangeFirmware = (event) => {
    const findedFirmware = firmwares.find((firmware) => firmware.version === event.target.value);

    setFirmwareId((findedFirmware && findedFirmware.id) || '')
  }

  const handleUpdateFirmware = (event) => {
    event.preventDefault()

    requestUpdateIntercomFirmware(intercomId, firmwareId)
  }
  
  return (
    <>
      <Container className='b-intercom'>
        {
          deviceType !== DeviceTypes.DESKTOP
          &&
            <>
              <h1 className='b-intercom__title'>
                Домофон
              </h1>
              <Divider />
            </>
        }
        {/* <img 
          src={PhotoFromCamera}
          alt=''
          className='b-intercom__photo-from-camera'
        /> */}
        <Link 
          to='/'
          className='b-button b-intercom__home-link'
        >
          <HomeIcon />
        </Link>
        <button
          className='b-button b-intercom__open-door-btn'
          onClick={handleOpenDoor}
        >
          Открыть дверь
        </button>
        <button
          className='b-button b-intercom__update-firmware-btn'
          onClick={handleToggleUpdateFirmwareModal}
        >
          Обновить прошивку
        </button>
        <button
          className='b-button b-intercom__reload-btn'
          onClick={handleRebootIntercom}
        >
          Перезагрузить
        </button>
      </Container>
      {
        isUpdateFirmwareModalVisible
        &&
          <ModalForm            
            title='Обновление прошивки'
            handleCloseModal={handleToggleUpdateFirmwareModal}
          >
            {
              firmwares.length !== 0
              ?
                <form onSubmit={handleUpdateFirmware}>
                  <SelectField
                    label='Версия'
                    defaultValue={firmwares[0].version}
                    values={firmwares.map((firmware) => firmware.version)}
                    onChange={handleChangeFirmware}
                  />
                  <button
                    type='submit'
                    className='b-button b-intercom__save-btn'
                    disabled={!firmwareId}
                  >
                    Сохранить
                  </button>
                </form>
              :
                <div>
                  Необходимо добавить прошивку
                </div>
            }
          </ModalForm>
      }
    </>
  )
}

export default Intercom
