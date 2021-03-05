import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CreateIcon from '@material-ui/icons/Create'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import Collapsible from 'react-collapsible'
import moment from 'moment'

import ModalForm from '../subcomponents/modal-form/ModalForm'
import FacesList from '../lists/faces-list/FacesListContainer'
import RfidKeysList from '../lists/rfid-keys-list/RfidKeysListContainer'
import PinCodesList from '../lists/pin-codes-list/PinCodesListContainer'
import QrCodesList from '../lists/qr-codes-list/QrCodesListContainer'
import SipAccountsList from '../lists/sip-accounts-list/SipAccountsListContainer'
import useDevice from '../../hooks/use-device/useDevice'
import DeviceTypes from '../../constants/DeviceTypes'
import Roles from '../../constants/Roles'
import convertTimeZone from '../../utils/string/convertTimeZone'
import IntercomSettings from '../intercom-settings/IntercomSettingsContainer'
import IntercomStatuses from '../../constants/IntercomStatuses'

import './InrtercomInfo.css'

const InrtercomInfo = (props) => {
  const {
    role,
    intercom,
    companyId,
    intercoms,
    flats,
    residents,
    ftpServers,
    stunServers,
    syslogServers,
    turnServers,
    sipServers,
    sipCredentials,
    // isIntercomWasUpdated,
    closeInfoModal,
    requestUpdateIntercom,
    requestDeleteIntercom,
    setIntercomInfo,
    setIntercomWasUpdated,
    requestSipCredentials,
    requestRecreateSipCredentials,
    requestRecreateSipAccounts,
  } = props;

  const deviceType = useDevice();

  const [isFlatSipServersChanged, setIsFlatSipServersChanged] = useState(false);
  const [isEmergencySipServersChanged, setIsEmergencySipServersChanged] = useState(false);

  const [isFacesModalVisible, setIsFacesModalVisible] = useState(false);
  const [isRfidKeysModalVisible, setRfidKeysModalVisible] = useState(false);
  const [isPinCodesModalVisible, setPinCodesModalVisible] = useState(false);
  const [isQrCodesModalVisible, setQrCodesModalVisible] = useState(false);
  const [isSipAccountsModalVisible, setIsSipAccountsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  React.useEffect(() => {

    setIntercomInfo(intercom)
  }, [setIntercomInfo, intercom])

  React.useEffect(() => {
    
    // При добавлении домофона с пустыми sip_credential_id
    // они создаются автоматически, соответственно необходимо 
    // запрашивать SIP credentials при создании
    requestSipCredentials() 
  }, [requestSipCredentials])

  React.useEffect(() => {

    // isIntercomWasUpdated && setIsFlatSipServersChanged(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intercom.flat_sip_server_id])

  React.useEffect(() => {

    // isIntercomWasUpdated && setIsEmergencySipServersChanged(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intercom.emergency_sip_server_id])

  const getServerHost = (servers, property) => {
    const filteredServer = servers.find((server) => server.id === intercom[property]);

    return (filteredServer && filteredServer.host) || ''
  }

  const getCredentialLogin = (credentials, property) => {
    const filteredCredential = credentials.find((credential) => credential.id === intercom[property]);
    
    return (filteredCredential && filteredCredential.login) || ''
  }

  const convertStatusType = (statusType) => {

    switch (statusType) {
      case 'ONLINE':
        return 'Онлайн'
      
      case 'OFFLINE':
        return 'Оффлайн'

      case 'ERROR':
        return 'Ошибка'

      default:
        return '-'
    }
  }

  const handleDeleteIntercom = () => {

    requestDeleteIntercom(intercom.id)
    closeInfoModal()
  }

  const handleRecreateSipCredentials = () => {

    requestRecreateSipCredentials(intercom.id)
  }

  const handleRecreateSipAccounts = () => {

    requestRecreateSipAccounts(intercom.id)
  }

  const handleRecreateSipCredentialsAndAccounts = () => {

    requestRecreateSipCredentials(intercom.id)
    requestRecreateSipAccounts(intercom.id)
  }

  const handleCloseChangeSipEntitiesModal = () => {

    setIsFlatSipServersChanged(false)
    setIsEmergencySipServersChanged(false)
    setIntercomWasUpdated(false)
  }

  const handleOpenFacesModal = () => {

    setIsFacesModalVisible(true)
  }

  const handleCloseFacesModal = () => {

    setIsFacesModalVisible(false)
  }

  const handleOpenRfidKeysModal = () => {

    setRfidKeysModalVisible(true)
  }

  const handleCloseRfidKeysModal = () => {

    setRfidKeysModalVisible(false)
  }

  const handleOpenPinCodesModal = () => {

    setPinCodesModalVisible(true)
  }

  const handleClosePinCodesModal = () => {

    setPinCodesModalVisible(false)
  }

  const handleOpenQrCodesModal = () => {

    setQrCodesModalVisible(true)
  }

  const handleCloseQrCodesModal = () => {

    setQrCodesModalVisible(false)
  }

  const handleOpenSipAccountsModal = () => {

    setIsSipAccountsModalVisible(true)
  }

  const handleCloseSipAccountsModal = () => {

    setIsSipAccountsModalVisible(false)
  }

  const handleOpenEditModal = () => {

    setIsEditModalVisible(true)
  }

  const handleCloseEditModal = () => {

    setIsEditModalVisible(false)
  }

  const handleUpdateIntercom = (editedIntercom) => {

    requestUpdateIntercom(intercom.id, editedIntercom)
  } 
  
  return (
    <>
      <div className='b-intercom-info'>
        <Collapsible trigger="Основная информация">
          <p>
            <span>ID устройства</span>
            <span>{intercom.device_id || '-'}</span>
          </p>
          <p>
            <span>SSL ключ</span>
            <span>{intercom.ssl_key}</span>
          </p>
          <p>
            <span>IP адрес</span>
            <span>{intercom.host || '-'}</span>
          </p>
          <p>
            <span>Версия аппаратного обеспечения</span>
            <span>{intercom.hardware_version || '-'}</span>
          </p>
          <p>
            <span>Версия программного обеспечения</span>
            <span>{intercom.software_version || '-'}</span>
          </p>
          <p>
            <span>FTP сервер</span>
            <span>
              {
                intercom.ftp_server_id
                ?
                  getServerHost(ftpServers, 'ftp_server_id')
                :
                  '-'
              }
            </span>
          </p>
          <p>
            <span>STUN сервер</span>
            <span>
              {
                intercom.stun_server_id
                ?
                  getServerHost(stunServers, 'stun_server_id')
                :
                  '-'
              }
            </span>
          </p>
          <p>
            <span>Syslog сервер</span>
            <span>
              {
                intercom.syslog_server_id
                ?
                  getServerHost(syslogServers, 'syslog_server_id')
                :
                  '-'
              }
            </span>
          </p>
          <p>
            <span>TURN сервер квартир</span>
            <span>
              {
                intercom.flats_turn_server_id
                ?
                  getServerHost(turnServers, 'flats_turn_server_id')
                :
                  '-'
              }
            </span>
          </p>
          <p>
            <span>TURN сервер экстренной службы</span>
            <span>
              {
                intercom.emergency_turn_server_id
                ?
                  getServerHost(turnServers, 'emergency_turn_server_id')
                :
                  '-'
              }
            </span>
          </p>
          <p>
            <span>SIP сервер квартир</span>
            <span>
              {
                intercom.flat_sip_server_id
                ?
                  getServerHost(sipServers, 'flat_sip_server_id')
                :
                  '-'
              }
            </span>
          </p>
          <p>
            <span>SIP пользователь квартир</span>
            <span>
              {
                intercom.flats_sip_credential_id
                ?
                  getCredentialLogin(sipCredentials, 'flats_sip_credential_id')
                :
                  '-'
              }
            </span>
          </p>
          <p>
            <span>SIP сервер экстренной службы</span>
            <span>
              {
                intercom.emergency_sip_server_id
                ?
                  getServerHost(sipServers, 'emergency_sip_server_id')
                :
                  '-'
              }
            </span>
          </p>
          <p>
            <span>SIP пользователь экстренной службы</span>
            <span>
              {
                intercom.emergency_sip_credential_id
                ?
                  getCredentialLogin(sipCredentials, 'emergency_sip_credential_id')
                :
                  '-'
              }
            </span>
          </p>
          <p>
            <span>Протокол с шифрованием</span>
            <span>
              {
                intercom.is_ssl 
                ? 
                  'Да' 
                : 
                  'Нет'
              }
            </span>
          </p>
          <p>
            <span>Статус</span>
            <span className={
              intercom.status === IntercomStatuses.ONLINE
              ?
                'b-intercom-info__status--online'
              :
                'b-intercom-info__status--offline'
            }>
              {convertStatusType(intercom.status)}
            </span>
          </p>
        </Collapsible>
        {
          intercom.settings
          &&
            <>
              <Collapsible trigger="Основные настройки">
                <p>
                  <span>Тип коммутатора</span>
                  <span>{intercom.settings.commutatorType}</span>
                </p>
                <p>
                  <span>Порог распознавания лица</span>
                  <span>{intercom.settings.faceRecognitionThreshold}</span>
                </p>
                <p>
                  <span>Режим сбора ключей</span>
                  <span>
                    {
                      intercom.settings.collectKeysMode
                      ?
                        'Включен'
                      :
                        'Отключен'
                    }
                  </span>
                </p>
              </Collapsible>
              <Collapsible trigger="Настройки квартир">
                <p>
                  <span>Диапозон квартир</span>
                  <span>
                    {intercom.settings.flatsSettings.firstNumber} - {intercom.settings.flatsSettings.lastNumber}  
                  </span>
                </p>
                <p>
                  <span>Минимальный порог линейного сигнала</span>
                  <span>{intercom.settings.flatsSettings.lineThresholds.min}</span>
                </p>
                <p>
                  <span>Максимальный порог линейного сигнала</span>
                  <span>{intercom.settings.flatsSettings.lineThresholds.max}</span>
                </p>
              </Collapsible>
              <Collapsible trigger="Настройки времени">
                <p>
                  <span>Часовой пояс</span>
                  <span>{intercom.settings.timeSettings.timezone || '-'}</span>
                </p>
                <p>
                  <span>Дата и время</span>
                  <span>
                    {
                      intercom.settings.timeSettings.datetime 
                      ?
                        moment(convertTimeZone(intercom.settings.timeSettings.datetime)).format('DD/MM/YYYY HH:mm')
                      :
                        '-'
                    }
                  </span>
                </p>
                <p>
                  <span>Настройка времени через NTP сервер</span>
                  <span>
                    {
                      intercom.settings.timeSettings.ntpEnabled
                      ?
                        'Включена'
                      :
                        'Отключена'
                    }  
                  </span>
                </p>
                <p>
                  <span>NTP сервер</span>
                  <span>{intercom.settings.timeSettings.ntpServer || '-'}</span>
                </p>
              </Collapsible>
              <Collapsible trigger="Настройки длительностей">
                <p>
                  <span>Максимальная длительность звонка</span>
                  <span>{intercom.settings.durationSettings.ring / 1000} с.</span>
                </p>
                <p>
                  <span>Максимальная длительность разговора</span>
                  <span>{intercom.settings.durationSettings.call / 1000} с.</span>
                </p>
                <p>
                  <span>Максимальное время, через которое дверь закроется</span>
                  <span>{intercom.settings.durationSettings.doorOpen / 1000} с.</span>
                </p>
              </Collapsible>
              <Collapsible trigger="Настройки звука домофона">
                <p>
                  <span>Автоматическая настройка микрофона</span>
                  <span>
                    {
                      intercom.settings.audioSettings.intercomAudioDevice.microphone.agcMode
                      ?
                        'Включена'
                      :
                        'Отключена'
                    }
                  </span>
                </p>
                <p>
                  <span>Чувствительность микрофона</span>
                  <span>{intercom.settings.audioSettings.intercomAudioDevice.microphone.gain}</span>
                </p>
                <p>
                  <span>Максимальная чувствительность микрофона</span>
                  <span>{intercom.settings.audioSettings.intercomAudioDevice.microphone.agcModeMaxGain}</span>
                </p>
                <p>
                  <span>Требуемый уровень чувствительности микрофона</span>
                  <span>{intercom.settings.audioSettings.intercomAudioDevice.microphone.agcModeTargetLevel}</span>
                </p>
                <p>
                  <span>Громкость системных звуков</span>
                  <span>{intercom.settings.audioSettings.intercomAudioDevice.speaker.sfxGain}</span>
                </p>
                <p>
                  <span>Громкость звонка</span>
                  <span>{intercom.settings.audioSettings.intercomAudioDevice.speaker.flatGain}</span>
                </p>
                <p>
                  <span>Громкость SIP</span>
                  <span>{intercom.settings.audioSettings.intercomAudioDevice.speaker.sipGain}</span>
                </p>
              </Collapsible>
              <Collapsible trigger="Настройки звука в квартире">
                <p>
                  <span>Автоматическая настройка микрофона</span>
                  <span>
                    {
                      intercom.settings.audioSettings.flatAudioDevice.microphone.agcMode
                      ?
                        'Включена'
                      :
                        'Отключена'
                    }
                  </span>
                </p>
                <p>
                  <span>Чувствительность микрофона</span>
                  <span>{intercom.settings.audioSettings.flatAudioDevice.microphone.gain}</span>
                </p>
                <p>
                  <span>Максимальная чувствительность микрофона</span>
                  <span>{intercom.settings.audioSettings.flatAudioDevice.microphone.agcModeMaxGain}</span>
                </p>
                <p>
                  <span>Требуемый уровень чувствительности микрофона</span>
                  <span>{intercom.settings.audioSettings.flatAudioDevice.microphone.agcModeTargetLevel}</span>
                </p>
                <p>
                  <span>Громкость системных звуков</span>
                  <span>{intercom.settings.audioSettings.flatAudioDevice.speaker.sfxGain}</span>
                </p>
                <p>
                  <span>Громкость звонка</span>
                  <span>{intercom.settings.audioSettings.flatAudioDevice.speaker.intercomGain}</span>
                </p>
              </Collapsible>
              <Collapsible trigger="Настройки SIP звука">
                <p>
                  <span>Автоматическая настройка микрофона</span>
                  <span>
                    {
                      intercom.settings.audioSettings.sipAudioDevice.microphone.agcMode
                      ?
                        'Включена'
                      :
                        'Отключена'
                    }
                  </span>
                </p>
                <p>
                  <span>Чувствительность микрофона</span>
                  <span>{intercom.settings.audioSettings.sipAudioDevice.microphone.gain}</span>
                </p>
                <p>
                  <span>Максимальная чувствительность микрофона</span>
                  <span>{intercom.settings.audioSettings.sipAudioDevice.microphone.agcModeMaxGain}</span>
                </p>
                <p>
                  <span>Требуемый уровень чувствительности микрофона</span>
                  <span>{intercom.settings.audioSettings.sipAudioDevice.microphone.agcModeTargetLevel}</span>
                </p>
                <p>
                  <span>Громкость системных звуков</span>
                  <span>{intercom.settings.audioSettings.sipAudioDevice.speaker.sfxGain}</span>
                </p>
                <p>
                  <span>Громкость звонка</span>
                  <span>{intercom.settings.audioSettings.sipAudioDevice.speaker.intercomGain}</span>
                </p>
              </Collapsible>
              <Collapsible trigger="Настройки Syslog">
                <p>
                  <span>Сервер доступен</span>
                  <span>
                    {
                      intercom.settings.syslogSettings.enabled
                      ?
                        'Да'
                      :
                        'Нет'
                    }
                  </span>
                </p>
                <p>
                  <span>Сервер</span>
                  <span>{intercom.settings.syslogSettings.server || '-'}</span>
                </p>
                <p>
                  <span>Тип присоединения</span>
                  <span>{intercom.settings.syslogSettings.connectionType}</span>
                </p>
              </Collapsible>
            </>
        }
        <div className='b-intercom-info__control-btns'>
          <button
            className='b-button b-intercom-info__edit-btn'
            onClick={handleOpenEditModal}
          >
            {
              deviceType === DeviceTypes.MOBILE
              ?
                <CreateIcon />
              :
                'Изменить'
            }
          </button>
          <button
            className='b-button b-button--delete'
            onClick={handleDeleteIntercom}
          >
            {
              deviceType === DeviceTypes.MOBILE
              ?
                <DeleteForeverIcon />
              :
                'Удалить'
            }
          </button>
        </div>
        <button
          className='b-button'
          onClick={handleOpenFacesModal}
        >
          Лица
        </button> 
        <button
          className='b-button'
          onClick={handleOpenRfidKeysModal}
        >
          RFID-ключи
        </button>
        <button
          className='b-button'
          onClick={handleOpenPinCodesModal}
        >
          Пин-коды
        </button>
        <button
          className='b-button'
          onClick={handleOpenQrCodesModal}
        >
          QR-коды
        </button>
        <button
          className='b-button'
          onClick={handleOpenSipAccountsModal}
        >
          SIP аккаунты
        </button>
        <Link
          to={
            role === Roles.ADMINISTRATOR
            ?
              '/admin/intercom/' + intercom.id
            :
              '/company/intercom/' + intercom.id
          }              
          className='b-button'
        >
          Перейти к настройкам
        </Link>
      </div>
      {
        (isFlatSipServersChanged || isEmergencySipServersChanged)
        &&
          <ModalForm
            handleCloseModal={handleCloseChangeSipEntitiesModal}
            withoutHeader
          >
            <div className='b-intercom-info-change-sip__message'>
              Вы изменили SIP сервер 
              {
                isFlatSipServersChanged && isEmergencySipServersChanged
                ?
                  'ы'
                :
                  <>
                    {
                      isFlatSipServersChanged
                      ?
                        ' квартир'
                      :
                        ' экстренной службы'
                    }
                  </>
                }
                , хотите ли привязать предыдущих
            </div>
            <div className='b-intercom-info-change-sip__buttons'>
              <button 
                className='b-button'
                onClick={handleRecreateSipCredentials}
              >
                SIP пользователей
              </button>
              {
                ((isFlatSipServersChanged && isEmergencySipServersChanged) || !isEmergencySipServersChanged) 
                &&
                  <>
                    <button 
                      className='b-button'
                      onClick={handleRecreateSipAccounts}
                    >
                      SIP аккаунты
                    </button>
                    <button 
                      className='b-button'
                      onClick={handleRecreateSipCredentialsAndAccounts}
                    >
                      Все
                    </button>
                  </>
              }
            </div>
          </ModalForm>
      }
      {
        isFacesModalVisible
        &&
          <ModalForm            
            title='Лица'
            handleCloseModal={handleCloseFacesModal}
          >
            <FacesList
              companyId={companyId}
              intercomId={intercom.id}
              entranceId={intercom.entrance_id}
              intercoms={intercoms}
              flats={flats}
              residents={residents}
            />
          </ModalForm>
      }
      {
        isRfidKeysModalVisible
        &&
          <ModalForm            
            title='RFID-ключи'
            handleCloseModal={handleCloseRfidKeysModal}
          >
            <RfidKeysList 
              companyId={companyId}
              intercomId={intercom.id}
              entranceId={intercom.entrance_id}
              intercoms={intercoms}
              flats={flats}
              residents={residents}
            />
          </ModalForm>
      }
      {
        isPinCodesModalVisible
        &&
          <ModalForm            
            title='Пин-коды'
            handleCloseModal={handleClosePinCodesModal}
          >
            <PinCodesList 
              companyId={companyId}
              intercomId={intercom.id}
              entranceId={intercom.entrance_id}
              intercoms={intercoms}
              flats={flats}
              residents={residents}
            />
          </ModalForm>
      }
      {
        isQrCodesModalVisible
        &&
          <ModalForm            
            title='QR-коды'
            handleCloseModal={handleCloseQrCodesModal}
          >
            <QrCodesList 
              companyId={companyId}
              intercomId={intercom.id}
              entranceId={intercom.entrance_id}
              intercoms={intercoms}
              flats={flats}
              residents={residents}
            />
          </ModalForm>
      }
      {
        isSipAccountsModalVisible
        &&
          <ModalForm            
            title='SIP-аккаунты'
            handleCloseModal={handleCloseSipAccountsModal}
          >
            <SipAccountsList 
              companyId={companyId}
              entranceId={intercom.entrance_id}
              intercomId={intercom.id}
            />
          </ModalForm>
      }
      {
        isEditModalVisible
        &&
          <ModalForm            
            title='Изменение данных'
            handleCloseModal={handleCloseEditModal}
          >
            <IntercomSettings 
              intercomToEdit={intercom}
              entranceId={intercom.entrance_id}
              ftpServers={ftpServers}
              stunServers={stunServers}
              syslogServers={syslogServers}
              turnServers={turnServers}
              sipServers={sipServers}
              sipCredentials={sipCredentials}
              submitSettings={handleUpdateIntercom}
              closeModal={handleCloseEditModal}
            />
          </ModalForm>
      }
    </>
  )
}

export default InrtercomInfo
