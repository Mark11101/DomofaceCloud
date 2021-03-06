import React, { useState } from 'react'
import Collapsible from 'react-collapsible'

import ListForm from '../../subcomponents/list-form/ListForm'
import ModalForm from '../../subcomponents/modal-form/ModalForm'
import ResidentsList from '../residents-list/ResidentsListContainer'
import FacesList from '../faces-list/FacesListContainer'
import RfidKeysList from '../rfid-keys-list/RfidKeysListContainer'
import PinCodesList from '../pin-codes-list/PinCodesListContainer'
import QrCodesList from '../qr-codes-list/QrCodesListContainer'
import SipAccountsList from '../sip-accounts-list/SipAccountsListContainer'
import AudioSettings from '../../audio-settings/AudioSettings'
import InputField from '../../subcomponents/input-field/InputField'
import testRegex from '../../../utils/string/testRegex'
import TooltipWrapper from '../../subcomponents/tooltip/Tooltip'

import './FlatsList.css'

const FlatsList = (props) => {
  const {
    companyId,
    entranceId,
    flats,
    isFlatsListLoading,
    requestUpdateFlat,
    requestDeleteFlat,
    requestCreateFlat,
    requestSipServers,
  } = props;

  const initialValues = {
    mainSettings: {
      id: '',
      entrance_id: entranceId,
      number: '',
      useCustomSettings: true,
      blockCalls: true,
      lineThresholds: {
        min: '',
        max: '',
      },
    },
    audioSettings: {
      intercomAudioDevice: {
        microphone: {
          gain: '',
          agcMode: true,
          agcModeMaxGain: '',
          agcModeTargetLevel: '',
        },
        speaker: {
          flatGain: '',
          sipGain: '',
        }
      },
      flatAudioDevice: {
        microphone: {
          gain: '',
          agcMode: true,
          agcModeMaxGain: '',
          agcModeTargetLevel: '',
        },
        speaker: {
          sfxGain: '',
          intercomGain: '',
        }
      },
      sipAudioDevice: {
        microphone: {
          gain: '',
          agcMode: true,
          agcModeMaxGain: '',
          agcModeTargetLevel: '',
        },
        speaker: {
          intercomGain: '',
        }
      },
    }
  };

  const [mainSettings, setMainSettings] = useState(initialValues.mainSettings);
 
  const initialIntercomMicrophone = initialValues.audioSettings.intercomAudioDevice.microphone;
  const initialIntercomSpeaker    = initialValues.audioSettings.intercomAudioDevice.speaker;
  const initialFlatMicrophone     = initialValues.audioSettings.flatAudioDevice.microphone;
  const initialFlatSpeaker        = initialValues.audioSettings.flatAudioDevice.speaker;
  const initialSipMicrophone      = initialValues.audioSettings.sipAudioDevice.microphone;
  const initialSipSpeaker         = initialValues.audioSettings.sipAudioDevice.speaker;

  const [intercomGain, setIntercomGain]                             = useState(initialIntercomMicrophone.gain);
  const [intercomAgcMode, setIntercomAgcMode]                       = useState(initialIntercomMicrophone.agcMode);
  const [intercomAgcModeMaxGain, setIntercomAgcModeMaxGain]         = useState(initialIntercomMicrophone.agcModeMaxGain);
  const [intercomAgcModeTargetLevel, setIntercomAgcModeTargetLevel] = useState(initialIntercomMicrophone.agcModeTargetLevel);
  const [intercomFlatGain, setIntercomFlatGain]                     = useState(initialIntercomSpeaker.flatGain);
  const [intercomSipGain, setIntercomSipGain]                       = useState(initialIntercomSpeaker.sipGain);

  const [flatGain, setFlatGain]                             = useState(initialFlatMicrophone.gain);
  const [flatAgcMode, setFlatAgcMode]                       = useState(initialFlatMicrophone.agcMode);
  const [flatAgcModeMaxGain, setFlatAgcModeMaxGain]         = useState(initialFlatMicrophone.agcModeMaxGain);
  const [flatAgcModeTargetLevel, setFlatAgcModeTargetLevel] = useState(initialFlatMicrophone.agcModeTargetLevel);
  const [flatSfxGain, setFlatSfxGain]                       = useState(initialFlatSpeaker.sfxGain);
  const [flatIntercomGain, setFlatIntercomGain]             = useState(initialFlatSpeaker.intercomGain);
  
  const [sipGain, setSipGain]                             = useState(initialSipMicrophone.gain);
  const [sipAgcMode, setSipAgcMode]                       = useState(initialSipMicrophone.agcMode);
  const [sipAgcModeMaxGain, setSipAgcModeMaxGain]         = useState(initialSipMicrophone.agcModeMaxGain);
  const [sipAgcModeTargetLevel, setSipAgcModeTargetLevel] = useState(initialSipMicrophone.agcModeTargetLevel);
  const [sipIntercomGain, setSipIntercomGain]             = useState(initialSipSpeaker.intercomGain);

  const minLineThreshold = mainSettings.lineThresholds.min;
  const maxLineThreshold = mainSettings.lineThresholds.max;
  
  const numberForCounting = (maxLineThreshold - minLineThreshold) / 2;
  
  const [staticVoltage, setStaticVoltage]             = useState('');
  const [buttonPushedVoltage, setButtonPushedVoltage] = useState('');
  const [tubeLiftedVoltage, setTubeLiftedVoltage]     = useState('');

  const [isOneOfVoltagesChanged, setIsOneOfVoltagesChanged] = useState(false);

  const filteredFlats = flats.filter((flat) => flat.entrance_id === entranceId);
  
  const [choosenFlatId, setChoosenFlatId] = useState('');

  const [isEntityModalVisible, setIsEntityModalVisible] = useState(false);
  const [isResidentsModalVisible, setIsResidentModalVisible] = useState(false);
  const [isFacesModalVisible, setIsFacesModalVisible] = useState(false);
  const [isRfidKeysModalVisible, setRfidKeysModalVisible] = useState(false);
  const [isPinCodesModalVisible, setPinCodesModalVisible] = useState(false);
  const [isQrCodesModalVisible, setQrCodesModalVisible] = useState(false);
  const [isSipAccountsModalVisible, setIsSipAccountsModalVisible] = useState(false);

  const [initialEditedNumber, setInitialEditedNumber] = useState('');

  const isNewNumberAlreadyExist    = !!filteredFlats.find((flat) => flat.number.toString() === mainSettings.number);
  const isEditedNumberAlreadyExist = mainSettings.number !== initialEditedNumber && !!filteredFlats.find((flat) => flat.number.toString() === mainSettings.number);
  
  const [isMoreModalVisible, setIsMoreModalVisible] = useState(false);

  React.useEffect(() => {
    
    if (!isOneOfVoltagesChanged) {
      
      setStaticVoltage(minLineThreshold === 0 ? '0' : minLineThreshold - numberForCounting)
      setButtonPushedVoltage(minLineThreshold + numberForCounting)
      setTubeLiftedVoltage(maxLineThreshold + numberForCounting)
    }
  }, [
    isOneOfVoltagesChanged,  
    minLineThreshold, 
    maxLineThreshold, 
    numberForCounting,
  ])

  const setInitials = () => {
    setMainSettings(initialValues.mainSettings)

    setStaticVoltage('')
    setButtonPushedVoltage('')
    setTubeLiftedVoltage('')

    setIntercomGain(initialIntercomMicrophone.gain)
    setIntercomAgcMode(initialIntercomMicrophone.agcMode)
    setIntercomAgcModeMaxGain(initialIntercomMicrophone.agcModeMaxGain)
    setIntercomAgcModeTargetLevel(initialIntercomMicrophone.agcModeTargetLevel)
    setIntercomFlatGain(initialIntercomSpeaker.flatGain)
    setIntercomSipGain(initialIntercomSpeaker.sipGain)

    setFlatGain(initialFlatMicrophone.gain)
    setFlatAgcMode(initialFlatMicrophone.agcMode)
    setFlatAgcModeMaxGain(initialFlatMicrophone.agcModeMaxGain)
    setFlatAgcModeTargetLevel(initialFlatMicrophone.agcModeTargetLevel)
    setFlatSfxGain(initialFlatSpeaker.sfxGain)
    setFlatIntercomGain(initialFlatSpeaker.intercomGain)

    setSipGain(initialSipMicrophone.gain)
    setSipAgcMode(initialSipMicrophone.agcMode)
    setSipAgcModeMaxGain(initialSipMicrophone.agcModeMaxGain)
    setSipAgcModeTargetLevel(initialSipMicrophone.agcModeTargetLevel)
    setSipIntercomGain(initialSipSpeaker.intercomGain)
  }

  const handleOpenMoreModal = () => {

    setIsMoreModalVisible(true)
  }

  const handleCloseMoreModal = () => {

    setIsMoreModalVisible(false)
    setInitials()
  }

  const handleSetValuesForMoreInfo = (values) => {
    
    handleChangeFlatSettings({}, values)
    handleOpenMoreModal()
  }

  const checkIfZeroWithNumber = (value) => {
    const splitedValue = value.split('');
    
    return splitedValue[1] && splitedValue[0] && splitedValue[0] === '0'
  }

  const checkIfVoltageCorrect = (value) => {
    
    if (
      testRegex(value, /^[0-9.]+$/) && 
      value <= 65535 && 
      !checkIfZeroWithNumber(value)
    ) {
      setIsOneOfVoltagesChanged(true)
      return true
    } else {
      return false
    }
  }

  const setLineThresholdsNumbers = (sortedVoltages) => {

    const minLineThreshold = (sortedVoltages[0] + sortedVoltages[1]) / 2;
    const maxLineThreshold = (sortedVoltages[1] + sortedVoltages[2]) / 2; 

    setMainSettings({
      ...mainSettings,
      lineThresholds: {
        ...mainSettings.lineThresholds,
        min: Math.ceil(minLineThreshold),
        max: Math.ceil(maxLineThreshold),
      }
    })
  }

  const handleStaticVoltageChange = (event) => {
    const value = event.target.value;

    if (checkIfVoltageCorrect(value)) {
      setStaticVoltage(value)
  
      const sortedVoltages = [
        Number(value),
        Number(buttonPushedVoltage),
        Number(tubeLiftedVoltage),
      ].sort((a, b) => a - b);

      setLineThresholdsNumbers(sortedVoltages)
    }
  }

  const handleButtonPushedVoltageChange = (event) => {
    const value = event.target.value;

    if (checkIfVoltageCorrect(value)) {
      setButtonPushedVoltage(value)
  
      const sortedVoltages = [
        Number(staticVoltage),
        Number(value),
        Number(tubeLiftedVoltage),
      ].sort((a, b) => a - b);

      setLineThresholdsNumbers(sortedVoltages)
    }
  }

  const handleTubeLiftedVoltageChange = (event) => {
    const value = event.target.value;

    if (checkIfVoltageCorrect(value)) {
      setTubeLiftedVoltage(value)
  
      const sortedVoltages = [
        Number(staticVoltage),
        Number(buttonPushedVoltage),
        Number(value),
      ].sort((a, b) => a - b);

      setLineThresholdsNumbers(sortedVoltages)
    }
  }
  
  const handleChangeFlatSettings = (event, values) => {
    
    if (values) {
      setMainSettings({
        ...mainSettings,
        id: values.id,
        number: values.number.toString(),
      })

      if (Object.keys(values.settings).length !== 0 && values.settings.constructor === Object) {
        setMainSettings({
          ...mainSettings,
          id: values.id,
          number: values.number.toString(),
          useCustomSettings: values.settings.useCustomSettings,
          blockCalls: values.settings.blockCalls,
          lineThresholds: values.settings.lineThresholds,
        })
        
        const intercomMicrophone = values.settings.audioSettings.intercomAudioDevice.microphone;
        const intercomSpeaker    = values.settings.audioSettings.intercomAudioDevice.speaker;
        const flatMicrophone     = values.settings.audioSettings.flatAudioDevice.microphone;
        const flatSpeaker        = values.settings.audioSettings.flatAudioDevice.speaker;
        const sipMicrophone      = values.settings.audioSettings.sipAudioDevice.microphone;
        const sipSpeaker         = values.settings.audioSettings.sipAudioDevice.speaker;
  
        setIntercomGain(intercomMicrophone.gain)
        setIntercomAgcMode(intercomMicrophone.agcMode)
        setIntercomAgcModeMaxGain(intercomMicrophone.agcModeMaxGain)
        setIntercomAgcModeTargetLevel(intercomMicrophone.agcModeTargetLevel)
        setIntercomFlatGain(intercomSpeaker.flatGain)
        setIntercomSipGain(intercomSpeaker.sipGain)
    
        setFlatGain(flatMicrophone.gain)
        setFlatAgcMode(flatMicrophone.agcMode)
        setFlatAgcModeMaxGain(flatMicrophone.agcModeMaxGain)
        setFlatAgcModeTargetLevel(flatMicrophone.agcModeTargetLevel)
        setFlatSfxGain(flatSpeaker.sfxGain)
        setFlatIntercomGain(flatSpeaker.intercomGain)
    
        setSipGain(sipMicrophone.gain)
        setSipAgcMode(sipMicrophone.agcMode)
        setSipAgcModeMaxGain(sipMicrophone.agcModeMaxGain)
        setSipAgcModeTargetLevel(sipMicrophone.agcModeTargetLevel)
        setSipIntercomGain(sipSpeaker.intercomGain)
      }
    
      setInitialEditedNumber(values.number.toString())
    }
  }

  const handleChangeNumber = (event) => {
    const value = event.target.value;

    if (
      testRegex(value, /^[0-9.]+$/) && 
      value <= 65535 && 
      !checkIfZeroWithNumber(value)
    ) {

      setMainSettings({
        ...mainSettings,
        [event.target.name]: value,
      })
    }
  }

  const handleIntercomAgcModeChange = () => {
    
    setIntercomAgcMode(!intercomAgcMode)
  }

  const handleIntercomGainChange = (value) => {
    
    setIntercomGain(value)
  }

  const handleIntercomAgcModeMaxGainChange = (value) => {
    
    setIntercomAgcModeMaxGain(value)
  }

  const handleIntercomAgcModeTargetLevelChange = (value) => {
    
    setIntercomAgcModeTargetLevel(value)
  }

  const handleIntercomFlatGainChange = (value) => {
    
    setIntercomFlatGain(value)
  }
  
  const handleIntercomSipGainChange = (value) => {
    
    setIntercomSipGain(value)
  }

  const handleFlatAgcModeChange = () => {
    
    setFlatAgcMode(!flatAgcMode)
  }

  const handleFlatGainChange = (value) => {
    
    setFlatGain(value)
  }

  const handleFlatAgcModeMaxGainChange = (value) => {
    
    setFlatAgcModeMaxGain(value)
  }

  const handleFlatAgcModeTargetLevelChange = (value) => {
    
    setFlatAgcModeTargetLevel(value)
  }

  const handleFlatSfxGainChange = (value) => {
    
    setFlatSfxGain(value)
  }
  
  const handleFlatIntercomGainChange = (value) => {
    
    setFlatIntercomGain(value)
  }

  const handleSipAgcModeChange = () => {
    
    setSipAgcMode(!sipAgcMode)
  }

  const handleSipGainChange = (value) => {
    
    setSipGain(value)
  }

  const handleSipAgcModeMaxGainChange = (value) => {
    
    setSipAgcModeMaxGain(value)
  }

  const handleSipAgcModeTargetLevelChange = (value) => {
    
    setSipAgcModeTargetLevel(value)
  }
  
  const handleSipIntercomGainChange = (value) => {
    
    setSipIntercomGain(value)
  }

  const handleNewFlatSubmit = () => {

    requestCreateFlat({
      entrance_id: mainSettings.entrance_id,
      number: Number(mainSettings.number),
      settings: {
        useCustomSettings: mainSettings.useCustomSettings,
        blockCalls: mainSettings.blockCalls,
        lineThresholds: mainSettings.lineThresholds,
        audioSettings: {
          intercomAudioDevice: {
            microphone: {
              gain: intercomGain,
              agcMode: intercomAgcMode,
              agcModeMaxGain: intercomAgcModeMaxGain,
              agcModeTargetLevel: intercomAgcModeTargetLevel,
            },
            speaker: {
              flatGain: intercomFlatGain,
              sipGain: intercomSipGain,
            }
          },
          flatAudioDevice: {
            microphone: {
              gain: flatGain,
              agcMode: flatAgcMode,
              agcModeMaxGain: flatAgcModeMaxGain,
              agcModeTargetLevel: flatAgcModeTargetLevel,
            },
            speaker: {
              sfxGain: flatSfxGain,
              intercomGain: flatIntercomGain,
            }
          },
          sipAudioDevice: {
            microphone: {
              gain: sipGain,
              agcMode: sipAgcMode,
              agcModeMaxGain: sipAgcModeMaxGain,
              agcModeTargetLevel: sipAgcModeTargetLevel,
            },
            speaker: {
              intercomGain: sipIntercomGain,
            }
          },
        }
      },
    })

    setInitials()
  }

  const handleEditedFlatSubmit = () => {

    requestUpdateFlat(mainSettings.id, {
      number: Number(mainSettings.number),
      settings: {
        useCustomSettings: mainSettings.useCustomSettings,
        blockCalls: mainSettings.blockCalls,
        lineThresholds: mainSettings.lineThresholds,
        audioSettings: {
          intercomAudioDevice: {
            microphone: {
              gain: intercomGain,
              agcMode: intercomAgcMode,
              agcModeMaxGain: intercomAgcModeMaxGain,
              agcModeTargetLevel: intercomAgcModeTargetLevel,
            },
            speaker: {
              flatGain: intercomFlatGain,
              sipGain: intercomSipGain,
            }
          },
          flatAudioDevice: {
            microphone: {
              gain: flatGain,
              agcMode: flatAgcMode,
              agcModeMaxGain: flatAgcModeMaxGain,
              agcModeTargetLevel: flatAgcModeTargetLevel,
            },
            speaker: {
              sfxGain: flatSfxGain,
              intercomGain: flatIntercomGain,
            }
          },
          sipAudioDevice: {
            microphone: {
              gain: sipGain,
              agcMode: sipAgcMode,
              agcModeMaxGain: sipAgcModeMaxGain,
              agcModeTargetLevel: sipAgcModeTargetLevel,
            },
            speaker: {
              intercomGain: sipIntercomGain,
            }
          },
        }
      },
    })

    setInitials()
  }

  const handleDeleteFlat = (id) => {

    requestDeleteFlat(id)
  }

  const handleOpenChooseEntityModal = (id) => {
    requestSipServers(companyId)

    setChoosenFlatId(id)
    setIsEntityModalVisible(true)
  }

  const handleCloseChooseEntityModal = () => {

    setIsEntityModalVisible(false)
  }

  const handleOpenResidentsModal = () => {

    setIsResidentModalVisible(true)
  }

  const handleCloseResidentsModal = () => {

    setIsResidentModalVisible(false)
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
  
  return (
    <div className='b-flats-list'>      
      <ListForm 
        values={filteredFlats}
        valuesIndex='number'
        moreInfoIndexes={['pin', 'flatNumber']}
        moreInfoNames={['??????-??????: ', '?????????? ????????????????: ']}
        noValuesText='???????????????? ????????????????????'
        addValueHeader='???????????????????? ????????????????'
        innerModal
        isListLoading={isFlatsListLoading}
        deleteValue={(id) => handleDeleteFlat(id)}
        openInnerModal={(id) => handleOpenChooseEntityModal(id)}
        setInitialValues={(values) => handleChangeFlatSettings({}, values)}
        setValuesForMoreInfo={(values) => handleSetValuesForMoreInfo(values)}
        onSubmitNewValues={handleNewFlatSubmit}
        onSubmitEditedValues={handleEditedFlatSubmit}
        onCloseAddModal={setInitials}
        onCloseEditModal={setInitials}
        renderAddForm={() => (
          <>
            <InputField 
              type='number'
              innerLabel='??????????*'
              name='number'
              className='b-flats-list__number-input'
              value={mainSettings.number}
              error={isNewNumberAlreadyExist}
              helperText={isNewNumberAlreadyExist && '?????????? ?????????? ?????? ????????'}
              onChange={handleChangeNumber}
            />
            <div className='b-flats-list-voltage-settings'>
              <div className='b-flats-list-voltage-settings__header'>
                <h3>
                  ???????????????????? (0 - 65535)
                </h3>
                <TooltipWrapper 
                  title='
                    ???????????? ?????????????????? ???????????????????? ?????? ?????????????? ???????????????????????? ?? ??????????????????????????
                    ???????????????? ???????????? ?????????????????? ?????????????? ????????????????. ?????????????????????? ???????????????? ???????? ??????????????
                    ???????????????????????????? ?????????? ?????????????????????? ?? ?????????????? ?????????????????????? ????????????????????, 
                    ???????????????????????? - ?????????? ?????????????? ?? ???????????????????????? ??????????????????????. ??????????, ???? ????????????
                    ???????????????????? ???????????????? ?????????????? ?????????????????????? ???????????????????? ???? ??????????, ?????????? ??????????????????
                    ?????????????? ???? ?????? ???? 186.
                  ' 
                />
              </div>
              <InputField 
                label='???????????????????? ????????????:'
                type='number'
                value={staticVoltage}
                onChange={handleStaticVoltageChange}
              />
              <InputField 
                label='??????????????:'
                type='number'
                value={buttonPushedVoltage}
                onChange={handleButtonPushedVoltageChange}
              />
              <InputField 
                label='???????????????? ??????????:'
                type='number'
                value={tubeLiftedVoltage}
                onChange={handleTubeLiftedVoltageChange}
              />
            </div>
            <div className='b-flats-list__audio-settings-inputs'>
              <AudioSettings 
                forFlat
                isIntercomAudioSettings
                header='?????????????????? ?????????? ????????????????'
                gain={intercomGain}
                agcMode={intercomAgcMode}
                agcModeMaxGain={intercomAgcModeMaxGain}
                agcModeTargetLevel={intercomAgcModeTargetLevel}
                flatGain={intercomFlatGain}
                sipGain={intercomSipGain}
                changeAgcMode={handleIntercomAgcModeChange}
                changeGain={handleIntercomGainChange}
                changeAgcModeMaxGain={handleIntercomAgcModeMaxGainChange}
                changeAgcModeTargetLevel={handleIntercomAgcModeTargetLevelChange} 
                changeFlatGain={handleIntercomFlatGainChange}
                changeSipGain={handleIntercomSipGainChange}
              />
              <AudioSettings
                forFlat
                isFlatAudioSettings
                header='?????????????????? ?????????? ?? ????????????????'
                gain={flatGain}
                agcMode={flatAgcMode}
                agcModeMaxGain={flatAgcModeMaxGain}
                agcModeTargetLevel={flatAgcModeTargetLevel}
                sfxGain={flatSfxGain}
                intercomGain={flatIntercomGain}
                changeAgcMode={handleFlatAgcModeChange}
                changeGain={handleFlatGainChange}
                changeAgcModeMaxGain={handleFlatAgcModeMaxGainChange}
                changeAgcModeTargetLevel={handleFlatAgcModeTargetLevelChange}
                changeSfxGain={handleFlatSfxGainChange}
                changeIntercomGain={handleFlatIntercomGainChange}     
              />
              <AudioSettings 
                forFlat
                isSipAudioSettings
                header='?????????????????? SIP ??????????'
                gain={sipGain}
                agcMode={sipAgcMode}
                agcModeMaxGain={sipAgcModeMaxGain}
                agcModeTargetLevel={sipAgcModeTargetLevel}
                intercomGain={sipIntercomGain}
                changeAgcMode={handleSipAgcModeChange}
                changeGain={handleSipGainChange}
                changeAgcModeMaxGain={handleSipAgcModeMaxGainChange}
                changeAgcModeTargetLevel={handleSipAgcModeTargetLevelChange}
                changeIntercomGain={handleSipIntercomGainChange} 
              />
            </div>
            <button  
              type='submit'
              className='b-button b-modal__submit-btn'
              disabled={!mainSettings.number}
            >
              ????????????????
            </button>
          </>
        )}
        renderEditForm={() => (
          <>
            <InputField 
              type='number'
              innerLabel='??????????*'
              name='number'
              className='b-flat-settings__number'
              value={mainSettings.number}
              error={isEditedNumberAlreadyExist}
              helperText={isEditedNumberAlreadyExist && '?????????? ?????????? ?????? ????????'}
              onChange={handleChangeNumber}
            />
            <div className='b-flats-list-voltage-settings'>
              <div className='b-flats-list-voltage-settings__header'>
                <h3>
                  ???????????????????? (0 - 65535)
                </h3>
                <TooltipWrapper 
                  title='
                    ???????????? ?????????????????? ???????????????????? ?????? ?????????????? ???????????????????????? ?? ??????????????????????????
                    ???????????????? ???????????? ?????????????????? ?????????????? ????????????????. ?????????????????????? ???????????????? ???????? ??????????????
                    ???????????????????????????? ?????????? ?????????????????????? ?? ?????????????? ?????????????????????? ????????????????????, 
                    ???????????????????????? - ?????????? ?????????????? ?? ???????????????????????? ??????????????????????. ??????????, ???? ????????????
                    ???????????????????? ???????????????? ?????????????? ?????????????????????? ???????????????????? ???? ??????????, ?????????? ??????????????????
                    ?????????????? ???? ?????? ???? 186.
                  ' 
                />
              </div>
              <InputField 
                label='???????????????????? ????????????:'
                type='number'
                value={staticVoltage}
                onChange={handleStaticVoltageChange}
              />
              <InputField 
                label='??????????????:'
                type='number'
                value={buttonPushedVoltage}
                onChange={handleButtonPushedVoltageChange}
              />
              <InputField 
                label='???????????????? ??????????:'
                type='number'
                value={tubeLiftedVoltage}
                onChange={handleTubeLiftedVoltageChange}
              />
            </div>
            <div className='b-flat-settings__audio-settings'>
              <AudioSettings 
                forFlat
                isIntercomAudioSettings
                header='?????????????????? ?????????? ????????????????'
                gain={intercomGain}
                agcMode={intercomAgcMode}
                agcModeMaxGain={intercomAgcModeMaxGain}
                agcModeTargetLevel={intercomAgcModeTargetLevel}
                flatGain={intercomFlatGain}
                sipGain={intercomSipGain}
                changeAgcMode={handleIntercomAgcModeChange}
                changeGain={handleIntercomGainChange}
                changeAgcModeMaxGain={handleIntercomAgcModeMaxGainChange}
                changeAgcModeTargetLevel={handleIntercomAgcModeTargetLevelChange} 
                changeFlatGain={handleIntercomFlatGainChange}
                changeSipGain={handleIntercomSipGainChange}
              />
              <AudioSettings
                forFlat
                isFlatAudioSettings
                header='?????????????????? ?????????? ?? ????????????????'
                gain={flatGain}
                agcMode={flatAgcMode}
                agcModeMaxGain={flatAgcModeMaxGain}
                agcModeTargetLevel={flatAgcModeTargetLevel}
                sfxGain={flatSfxGain}
                intercomGain={flatIntercomGain}
                changeAgcMode={handleFlatAgcModeChange}
                changeGain={handleFlatGainChange}
                changeAgcModeMaxGain={handleFlatAgcModeMaxGainChange}
                changeAgcModeTargetLevel={handleFlatAgcModeTargetLevelChange}
                changeSfxGain={handleFlatSfxGainChange}
                changeIntercomGain={handleFlatIntercomGainChange}     
              />
              <AudioSettings 
                forFlat
                isSipAudioSettings
                header='?????????????????? SIP ??????????'
                gain={sipGain}
                agcMode={sipAgcMode}
                agcModeMaxGain={sipAgcModeMaxGain}
                agcModeTargetLevel={sipAgcModeTargetLevel}
                intercomGain={sipIntercomGain}
                changeAgcMode={handleSipAgcModeChange}
                changeGain={handleSipGainChange}
                changeAgcModeMaxGain={handleSipAgcModeMaxGainChange}
                changeAgcModeTargetLevel={handleSipAgcModeTargetLevelChange}
                changeIntercomGain={handleSipIntercomGainChange} 
              />
            </div>
            <button  
              type='submit'
              className='b-button b-modal__submit-btn'
              disabled={!mainSettings.number}
            >
              ????????????????
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
            <div className='b-flats-list-info'>
              <Collapsible trigger="???????????????? ??????????????????">
                <p>
                  <span>??????????: </span>
                  <span>{mainSettings.number}</span>
                </p>
                <p>
                  <span>???????????????????????????????? ??????????????????: </span>
                  <span>
                    {
                      mainSettings.useCustomSettings
                      ?
                        '????'
                      :
                        '??????'
                    }
                  </span>
                </p>
                <p>
                  <span>?????????????????????? ????????????: </span>
                  <span>
                    {
                      mainSettings.blockCalls
                      ?
                        '????'
                      :
                        '??????'
                    }
                  </span>
                </p>
                <p>
                  <span>?????????????????????? ?????????? ?????????????????? ??????????????: </span>
                  <span>{mainSettings.lineThresholds.min || '-'}</span>
                </p>
                <p>
                  <span>???????????????????????? ?????????? ?????????????????? ??????????????: </span>
                  <span>{mainSettings.lineThresholds.max || '-'}</span>
                </p>
              </Collapsible>
              <Collapsible trigger="?????????????????? ?????????? ????????????????">
                <p>
                  <span>???????????????????????????? ?????????????????? ??????????????????</span>
                  <span>
                    {
                      intercomAgcMode
                      ?
                        '????????????????'
                      :
                        '??????????????????'
                    }
                  </span>
                </p>
                <p>
                  <span>???????????????????????????????? ??????????????????</span>
                  <span>{Number(intercomGain)}</span>
                </p>
                <p>
                  <span>???????????????????????? ???????????????????????????????? ??????????????????</span>
                  <span>{Number(intercomAgcModeMaxGain)}</span>
                </p>
                <p>
                  <span>?????????????????? ?????????????? ???????????????????????????????? ??????????????????</span>
                  <span>{Number(intercomAgcModeTargetLevel)}</span>
                </p>
                <p>
                  <span>?????????????????? ????????????</span>
                  <span>{Number(intercomFlatGain)}</span>
                </p>
                <p>
                  <span>?????????????????? SIP</span>
                  <span>{Number(intercomSipGain)}</span>
                </p>
              </Collapsible>
              <Collapsible trigger="?????????????????? ?????????? ?? ????????????????">
                <p>
                  <span>???????????????????????????? ?????????????????? ??????????????????</span>
                  <span>
                    {
                      flatAgcMode
                      ?
                        '????????????????'
                      :
                        '??????????????????'
                    }
                  </span>
                </p>
                <p>
                  <span>???????????????????????????????? ??????????????????</span>
                  <span>{Number(flatGain)}</span>
                </p>
                <p>
                  <span>???????????????????????? ???????????????????????????????? ??????????????????</span>
                  <span>{Number(flatAgcModeMaxGain)}</span>
                </p>
                <p>
                  <span>?????????????????? ?????????????? ???????????????????????????????? ??????????????????</span>
                  <span>{Number(flatAgcModeTargetLevel)}</span>
                </p>
                <p>
                  <span>?????????????????? ?????????????????? ????????????</span>
                  <span>{Number(flatSfxGain)}</span>
                </p>
                <p>
                  <span>?????????????????? ????????????</span>
                  <span>{Number(flatIntercomGain)}</span>
                </p>
              </Collapsible>
              <Collapsible trigger="?????????????????? SIP ??????????">
                <p>
                  <span>???????????????????????????? ?????????????????? ??????????????????</span>
                  <span>
                    {
                      sipAgcMode
                      ?
                        '????????????????'
                      :
                        '??????????????????'
                    }
                  </span>
                </p>
                <p>
                  <span>???????????????????????????????? ??????????????????</span>
                  <span>{Number(sipGain)}</span>
                </p>
                <p>
                  <span>???????????????????????? ???????????????????????????????? ??????????????????</span>
                  <span>{Number(sipAgcModeMaxGain)}</span>
                </p>
                <p>
                  <span>?????????????????? ?????????????? ???????????????????????????????? ??????????????????</span>
                  <span>{Number(sipAgcModeTargetLevel)}</span>
                </p>
                <p>
                  <span>?????????????????? ????????????</span>
                  <span>{Number(sipIntercomGain)}</span>
                </p>
              </Collapsible>
            </div>
          </ModalForm>
      }
      {
        isEntityModalVisible
        &&
          <ModalForm            
            handleCloseModal={handleCloseChooseEntityModal}
            withoutHeader
          >
            <div className='b-companies-list__choose-entity-modal'>  
              <button
                className='b-button'
                onClick={handleOpenResidentsModal}
              >
                ????????????
              </button> 
              <button
                className='b-button'
                onClick={handleOpenFacesModal}
              >
                ????????
              </button> 
              <button
                className='b-button'
                onClick={handleOpenRfidKeysModal}
              >
                RFID-??????????
              </button>
              <button
                className='b-button'
                onClick={handleOpenPinCodesModal}
              >
                ??????-????????
              </button>
              <button
                className='b-button'
                onClick={handleOpenQrCodesModal}
              >
                QR-????????
              </button>
              <button
                className='b-button'
                onClick={handleOpenSipAccountsModal}
              >
                SIP ????????????????
              </button>
            </div>
          </ModalForm>
      }    
      {
        isResidentsModalVisible
        &&
          <ModalForm            
            title='????????????'
            handleCloseModal={handleCloseResidentsModal}
          >
            <ResidentsList 
              companyId={companyId}
              flatId={choosenFlatId}
              entranceId={entranceId}
            />
          </ModalForm>
      }  
      {
        isFacesModalVisible
        &&
          <ModalForm            
            title='????????'
            handleCloseModal={handleCloseFacesModal}
          >
            <FacesList
              companyId={companyId}
              entranceId={entranceId}
              flatId={choosenFlatId}
            />
          </ModalForm>
      }
      {
        isRfidKeysModalVisible
        &&
          <ModalForm            
            title='RFID-??????????'
            handleCloseModal={handleCloseRfidKeysModal}
          >
            <RfidKeysList 
              companyId={companyId}
              entranceId={entranceId}
              flatId={choosenFlatId}
            />
          </ModalForm>
      }
      {
        isPinCodesModalVisible
        &&
          <ModalForm            
            title='??????-????????'
            handleCloseModal={handleClosePinCodesModal}
          >
            <PinCodesList 
              companyId={companyId}
              entranceId={entranceId}
              flatId={choosenFlatId}
            />
          </ModalForm>
      }
      {
        isQrCodesModalVisible
        &&
          <ModalForm            
            title='QR-????????'
            handleCloseModal={handleCloseQrCodesModal}
          >
            <QrCodesList 
              companyId={companyId}
              entranceId={entranceId}
              flatId={choosenFlatId}
            />
          </ModalForm>
      }
      {
        isSipAccountsModalVisible
        &&
          <ModalForm            
            title='SIP ????????????????'
            handleCloseModal={handleCloseSipAccountsModal}
          >
            <SipAccountsList 
              companyId={companyId}
              entranceId={entranceId}
              flatId={choosenFlatId} 
            />
          </ModalForm>
      }
    </div>
  )
}

export default FlatsList
