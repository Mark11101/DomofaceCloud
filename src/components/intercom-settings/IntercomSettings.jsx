import React, { useState } from 'react'
import 'date-fns'
import MomentUtils from '@date-io/moment'
import moment from 'moment'
import { 
  MuiPickersUtilsProvider, 
  DateTimePicker 
} from "@material-ui/pickers"
import Form from 'react-bootstrap/Form'

import CommutatorTypes from '../../constants/CommutatorTypes'
import ConnectionTypes from '../../constants/ConnectionTypes'
import IntercomStatuses from '../../constants/IntercomStatuses'
import convertTimeZone from '../../utils/string/convertTimeZone'
import testRegex from '../../utils/string/testRegex'
import SelectField from '../subcomponents/select-field/SelectField'
import RadioButton from '../subcomponents/radio-button/RadioButton'
import RangeField from '../subcomponents/range-field/RangeField'
import InputField from '../subcomponents/input-field/InputField'
import TooltipWrapper from '../subcomponents/tooltip/Tooltip'
import AudioSettings from '../audio-settings/AudioSettings'

import './IntercomSettings.css'

const momentTimezone = require('moment-timezone');

const IntercomSettings = (props) => {
  const {
    entranceId,
    intercomToEdit,
    ftpServers,
    stunServers,
    syslogServers,
    turnServers,
    sipServers,
    sipCredentials,
    closeModal,
    submitSettings,
  } = props;

  const findedSipCredential = sipServers && sipCredentials.find((sipCredential) => sipCredential.sip_server_id === sipServers[0].id);

  const initialValues = {
    mainInfo: {
      device_id: '',
      hardware_version: (intercomToEdit && intercomToEdit.hardware_version) || '',
      software_version: (intercomToEdit && intercomToEdit.software_version) || '',
      entrance_id: entranceId,
      ftp_server_id: (intercomToEdit && intercomToEdit.ftp_server_id) || '',
      stun_server_id: (intercomToEdit && intercomToEdit.stun_server_id) || '',
      syslog_server_id: (intercomToEdit && intercomToEdit.syslog_server_id) || '',
      flats_turn_server_id: (intercomToEdit && intercomToEdit.flats_turn_server_id) || '',
      emergency_turn_server_id: (intercomToEdit && intercomToEdit.emergency_turn_server_id) || '',
      flat_sip_server_id: (
        intercomToEdit 
        ? 
          intercomToEdit.flat_sip_server_id
        :
          sipServers && sipServers[0].id
      ) || '',
      emergency_sip_server_id: (
        intercomToEdit 
        ?
          intercomToEdit.emergency_sip_server_id
        :
          sipServers && sipServers[0].id
      ) || '',
      flats_sip_credential_id: (
        intercomToEdit
        ?
          intercomToEdit.flats_sip_credential_id
        :
          (findedSipCredential && findedSipCredential.id) || ''
      ),
      emergency_sip_credential_id: (
        intercomToEdit 
        ? 
          intercomToEdit.emergency_sip_credential_id
        :
          (findedSipCredential && findedSipCredential.id) || ''
      ),
      is_ssl: intercomToEdit ? intercomToEdit.is_ssl : false,
      ssl_key: (intercomToEdit && intercomToEdit.ssl_key) || '',
      host: (intercomToEdit && intercomToEdit.host) || '',
      status: (intercomToEdit && intercomToEdit.status) || IntercomStatuses.ONLINE,
    },
    timeSettings: {
      datetime: (intercomToEdit && intercomToEdit.settings && intercomToEdit.settings.timeSettings.datetime) || '',
      timezone: (intercomToEdit && intercomToEdit.settings && intercomToEdit.settings.timeSettings.timezone) || '',
      ntpEnabled: intercomToEdit && intercomToEdit.settings ? intercomToEdit.settings.timeSettings.ntpEnabled : true,
      ntpServer: (intercomToEdit && intercomToEdit.settings && intercomToEdit.settings.timeSettings.ntpServer) || '',
    },
    flatsSettings: {
      firstNumber: intercomToEdit && intercomToEdit.settings ? intercomToEdit.settings.flatsSettings.firstNumber : 0,
      lastNumber: intercomToEdit && intercomToEdit.settings ? intercomToEdit.settings.flatsSettings.lastNumber : 0,
      lineThresholds: {
        min: intercomToEdit && intercomToEdit.settings ? intercomToEdit.settings.flatsSettings.lineThresholds.min : 0,
        max: intercomToEdit && intercomToEdit.settings ? intercomToEdit.settings.flatsSettings.lineThresholds.max : 0
      }
    },
    durationSettings: {
      ring: intercomToEdit && intercomToEdit.settings ? intercomToEdit.settings.durationSettings.ring : 0,
      call: intercomToEdit && intercomToEdit.settings ? intercomToEdit.settings.durationSettings.call : 0,
      doorOpen: intercomToEdit && intercomToEdit.settings ? intercomToEdit.settings.durationSettings.doorOpen : 0
    },
    intercomAudioDevice: {
      microphone: {
        gain: (intercomToEdit && intercomToEdit.settings && intercomToEdit.settings.audioSettings.intercomAudioDevice.microphone.gain) || 0,
        agcMode: (intercomToEdit && intercomToEdit.settings && intercomToEdit.settings.audioSettings.intercomAudioDevice.microphone.agcMode) || true,
        agcModeMaxGain: (intercomToEdit && intercomToEdit.settings && intercomToEdit.settings.audioSettings.intercomAudioDevice.microphone.agcModeMaxGain) || 0,
        agcModeTargetLevel: (intercomToEdit && intercomToEdit.settings && intercomToEdit.settings.audioSettings.intercomAudioDevice.microphone.agcModeTargetLevel) || 0
      },
      speaker: {
        sfxGain: (intercomToEdit && intercomToEdit.settings && intercomToEdit.settings.audioSettings.intercomAudioDevice.speaker.sfxGain) || 0,
        flatGain: (intercomToEdit && intercomToEdit.settings && intercomToEdit.settings.audioSettings.intercomAudioDevice.speaker.flatGain) || 0,
        sipGain: (intercomToEdit && intercomToEdit.settings && intercomToEdit.settings.audioSettings.intercomAudioDevice.speaker.sipGain) || 0
      }
    },
    flatAudioDevice: {
      microphone: {
        gain: (intercomToEdit && intercomToEdit.settings && intercomToEdit.settings.audioSettings.flatAudioDevice.microphone.gain) || 0,
        agcMode: (intercomToEdit && intercomToEdit.settings && intercomToEdit.settings.audioSettings.flatAudioDevice.microphone.agcMode) || true,
        agcModeMaxGain: (intercomToEdit && intercomToEdit.settings && intercomToEdit.settings.audioSettings.flatAudioDevice.microphone.agcModeMaxGain) || 0,
        agcModeTargetLevel: (intercomToEdit && intercomToEdit.settings && intercomToEdit.settings.audioSettings.flatAudioDevice.microphone.agcModeTargetLevel) || 0
      },
      speaker: {
        sfxGain: (intercomToEdit && intercomToEdit.settings && intercomToEdit.settings.audioSettings.flatAudioDevice.speaker.sfxGain) || 0,
        intercomGain: (intercomToEdit && intercomToEdit.settings && intercomToEdit.settings.audioSettings.flatAudioDevice.speaker.intercomGain) || 0
      }
    },
    sipAudioDevice: {
      microphone: {
        gain: (intercomToEdit && intercomToEdit.settings && intercomToEdit.settings.audioSettings.sipAudioDevice.microphone.gain) || 0,
        agcMode: (intercomToEdit && intercomToEdit.settings && intercomToEdit.settings.audioSettings.sipAudioDevice.microphone.agcMode) || true,
        agcModeMaxGain: (intercomToEdit && intercomToEdit.settings && intercomToEdit.settings.audioSettings.sipAudioDevice.microphone.agcModeMaxGain) || 0,
        agcModeTargetLevel: (intercomToEdit && intercomToEdit.settings && intercomToEdit.settings.audioSettings.sipAudioDevice.microphone.agcModeTargetLevel) || 0
      },
      speaker: {
        sfxGain: (intercomToEdit && intercomToEdit.settings && intercomToEdit.settings.audioSettings.sipAudioDevice.speaker.sfxGain) || 0,
        intercomGain: (intercomToEdit && intercomToEdit.settings && intercomToEdit.settings.audioSettings.sipAudioDevice.speaker.intercomGain) || 0
      }
    },
    syslogSettings: {
      enabled: intercomToEdit && intercomToEdit.settings ? intercomToEdit.settings.syslogSettings.enabled : true,
      server: (intercomToEdit && intercomToEdit.settings && intercomToEdit.settings.syslogSettings.server) || '',
      connectionType: intercomToEdit && intercomToEdit.settings ? intercomToEdit.settings.syslogSettings.connectionType : ConnectionTypes.UDP,
    },
    otherSettings: {
      commutatorType: intercomToEdit && intercomToEdit.settings ? intercomToEdit.settings.commutatorType : CommutatorTypes.METAKOM,
      collectKeysMode: intercomToEdit && intercomToEdit.settings ? intercomToEdit.settings.collectKeysMode : true,
      faceRecognitionThreshold: intercomToEdit && intercomToEdit.settings ? intercomToEdit.settings.faceRecognitionThreshold : 0,
    }
  }

  const [mainInfo, setMainInfo] = useState(initialValues.mainInfo);
  const [timeSettings, setTimeSettings] = useState(initialValues.timeSettings);
  const [flatsSettings, setFlatsSettings] = useState(initialValues.flatsSettings);
  const [durationSettings, setDurationSettings] = useState(initialValues.durationSettings);
  const [syslogSettings, setSyslogSettings] = useState(initialValues.syslogSettings);
  const [otherSettings, setOtherSettings] = useState(initialValues.otherSettings);
 
  const initialIntercomMicrophone = initialValues.intercomAudioDevice.microphone;
  const initialIntercomSpeaker    = initialValues.intercomAudioDevice.speaker;
  const initialFlatMicrophone     = initialValues.flatAudioDevice.microphone;
  const initialFlatSpeaker        = initialValues.flatAudioDevice.speaker;
  const initialSipMicrophone      = initialValues.sipAudioDevice.microphone;
  const initialSipSpeaker         = initialValues.sipAudioDevice.speaker;

  const [intercomGain, setIntercomGain]                             = useState(initialIntercomMicrophone.gain);
  const [intercomAgcMode, setIntercomAgcMode]                       = useState(initialIntercomMicrophone.agcMode);
  const [intercomAgcModeMaxGain, setIntercomAgcModeMaxGain]         = useState(initialIntercomMicrophone.agcModeMaxGain);
  const [intercomAgcModeTargetLevel, setIntercomAgcModeTargetLevel] = useState(initialIntercomMicrophone.agcModeTargetLevel);
  const [intercomSfxGain, setIntercomSfxGain]                       = useState(initialIntercomSpeaker.sfxGain);
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
  const [sipSfxGain, setSipSfxGain]                       = useState(initialSipSpeaker.sfxGain);
  const [sipIntercomGain, setSipIntercomGain]             = useState(initialSipSpeaker.intercomGain);
  
  const [isDateChanged, setIsDateChanged] = useState(false);
  const [dateForPicker, setDateForPicker] = useState('');

  const ringDuration = durationSettings.ring;
  const callDuration = durationSettings.call;
  const doorOpenDuration = durationSettings.doorOpen;

  const minLineThreshold = flatsSettings.lineThresholds.min;
  const maxLineThreshold = flatsSettings.lineThresholds.max;
  
  const numberForCounting = (maxLineThreshold - minLineThreshold) / 2;
  
  const [staticVoltage, setStaticVoltage]             = useState('');
  const [buttonPushedVoltage, setButtonPushedVoltage] = useState('');
  const [tubeLiftedVoltage, setTubeLiftedVoltage]     = useState('');

  const [isOneOfVoltagesChanged, setIsOneOfVoltagesChanged] = useState(false);
  
  const [durationsForCheck, setDurationsForCheck] = useState({
    ring: '',
    call: '',
    doorOpen: '',
  });

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

  React.useEffect(() => {

    !isDateChanged && setDateForPicker(convertTimeZone(timeSettings.datetime))
  }, [isDateChanged, timeSettings.datetime])

  const defaultFtpServer = ftpServers.find((ftpServer) => ftpServer.id === mainInfo.ftp_server_id);
  const defaultStunServer = stunServers.find((stunServer) => stunServer.id === mainInfo.stun_server_id);
  const defaultSyslogServer = syslogServers.find((syslogServer) => syslogServer.id === mainInfo.syslog_server_id);
  const defaultFlatsTurnServer = turnServers.find((turnServer) => turnServer.id === mainInfo.flats_turn_server_id);
  const defaultEmergencyTurnServer = turnServers.find((turnServer) => turnServer.id === mainInfo.emergency_turn_server_id);
  const defaultFlatsSipServer = sipServers.find((sipServer) => sipServer.id === mainInfo.flat_sip_server_id);
  const defaultEmergencySipServer = sipServers.find((sipServer) => sipServer.id === mainInfo.emergency_sip_server_id);
  const defaultFlatsSipCredential = sipCredentials.find((sipCredential) => sipCredential.id === mainInfo.flats_sip_credential_id);
  const defaultEmergencySipCredential = sipCredentials.find((sipCredential) => sipCredential.id === mainInfo.emergency_sip_credential_id);

  let ftpServersHosts = ftpServers.map(ftpServer => ftpServer.host);
  ftpServersHosts.unshift('')

  let stunServersHosts = stunServers.map(stunServer => stunServer.host);
  stunServersHosts.unshift('')

  let syslogServersHosts = syslogServers.map(syslogServer => syslogServer.host);
  syslogServersHosts.unshift('')

  let flatsTurnServersHosts = turnServers.filter(
    turnServer => turnServer.id !== mainInfo.emergency_turn_server_id
  ).map(
    turnServer => turnServer.host
  );

  flatsTurnServersHosts.unshift('')

  let emergencyTurnServersHosts = turnServers.filter(
    turnServer => turnServer.id !== mainInfo.flats_turn_server_id
  ).map(
    turnServer => turnServer.host
  );

  emergencyTurnServersHosts.unshift('')

  let flatsSipServersHosts = sipServers.map(sipServer => sipServer.host);
  intercomToEdit && flatsSipServersHosts.unshift('')

  let emergencySipServersHosts = sipServers.map(sipServer => sipServer.host);
  intercomToEdit && emergencySipServersHosts.unshift('')

  let flatsSipCredentialsLogins = sipCredentials.filter(
    sipCredential => sipCredential.sip_server_id === mainInfo.flat_sip_server_id
  ).map(
    sipCredential => sipCredential.login
  );

  let emergencySipCredentialsLogins = sipCredentials.filter(
    sipCredential => sipCredential.sip_server_id === mainInfo.emergency_sip_server_id
  ).map(
    sipCredential => sipCredential.login
  );

  const handleChangeMainInfo = (event) => {
    const value = event.target.value;
    const name  = event.target.name;

    if (name === 'ftp_server_id') {
      const findedFtpServer = ftpServers.find((ftpServer) => ftpServer.host === value);

      setMainInfo({
        ...mainInfo,
        ftp_server_id: (findedFtpServer && findedFtpServer.id) || '',
      })
    } else if (name === 'stun_server_id') {
      const findedStunServer = stunServers.find((stunServer) => stunServer.host === value);

      setMainInfo({
        ...mainInfo,
        stun_server_id: (findedStunServer && findedStunServer.id) || '',
      })
    } else if (name === 'syslog_server_id') {
      const findedSyslogServer = syslogServers.find((syslogServer) => syslogServer.host === value);

      setMainInfo({
        ...mainInfo,
        syslog_server_id: (findedSyslogServer && findedSyslogServer.id) || '',
      })
    } else if (name === 'flats_turn_server_id') {
      const findedTurnServer = turnServers.find((turnServer) => turnServer.host === value);

      setMainInfo({
        ...mainInfo,
        flats_turn_server_id: (findedTurnServer && findedTurnServer.id) || '',
      })
    } else if (name === 'emergency_turn_server_id') {
      const findedTurnServer = turnServers.find((turnServer) => turnServer.host === value);

      setMainInfo({
        ...mainInfo,
        emergency_turn_server_id: (findedTurnServer && findedTurnServer.id) || '',
      })
    } else if (name === 'flat_sip_server_id') {
      const findedSipServer = sipServers.find((sipServer) => sipServer.host === value);
      const findedSipCredential = findedSipServer && sipCredentials.find((sipCredential) => sipCredential.sip_server_id === findedSipServer.id);

      setMainInfo({
        ...mainInfo,
        flat_sip_server_id: (findedSipServer && findedSipServer.id) || '',
        flats_sip_credential_id: (findedSipCredential && findedSipCredential.id) || '',
      })
    } else if (name === 'emergency_sip_server_id') {
      const findedSipServer = sipServers.find((sipServer) => sipServer.host === value);
      const findedSipCredential = findedSipServer && sipCredentials.find((sipCredential) => sipCredential.sip_server_id === findedSipServer.id);

      setMainInfo({
        ...mainInfo,
        emergency_sip_server_id: (findedSipServer && findedSipServer.id) || '',
        emergency_sip_credential_id: (findedSipCredential && findedSipCredential.id) || '',
      })
    } else if (name === 'flats_sip_credential_id') {
      const findedSipCredential = sipCredentials.find((sipCredential) => sipCredential.login === value);

      setMainInfo({
        ...mainInfo,
        flats_sip_credential_id: (findedSipCredential && findedSipCredential.id) || '',
      })
    } else if (name === 'emergency_sip_credential_id') {
      const findedSipCredential = sipCredentials.find((sipCredential) => sipCredential.login === value);

      setMainInfo({
        ...mainInfo,
        emergency_sip_credential_id: (findedSipCredential && findedSipCredential.id) || '',
      })
    } else {

      setMainInfo({
        ...mainInfo,
        [name]: value,
      })
    }
  }
  
  const handleChangeMainInfoIsSsl = () => {

    setMainInfo({
      ...mainInfo,
      is_ssl: !mainInfo.is_ssl,
    })
  }

  const handleOtherSettingChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === 'faceRecognitionThreshold') {
      
      if (
        testRegex(value, /^[0-9]+$/) && 
        value <= 65535 && 
        !checkIfZeroWithNumber(value)
      ) {

        setOtherSettings({
          ...otherSettings,
          faceRecognitionThreshold: value,
        })
      }
    } else if (name === 'collectKeysMode') {

      setOtherSettings({
        ...otherSettings,
        collectKeysMode: !otherSettings.collectKeysMode,
      })
    } else {

      setOtherSettings({
        ...otherSettings,
        [name]: event.target.value,
      })
    }
  }

  const convertIsoDateWithoutTimeZone = (date) => {
    
    return (
      date.indexOf('+') !== -1
      ?
        date.substring(0, date.indexOf('+'))
      :
        date.substring(0, date.indexOf('-'))
    )
  }

  const handleChangeTimeSettingsNtpEnabled = () => {

    let date = moment().format();
    
    date = convertIsoDateWithoutTimeZone(date);

    setTimeSettings({
      ...timeSettings,
      ntpEnabled: !timeSettings.ntpEnabled,
      datetime: date + '+00:00'
    })
  }
  
  const handleDateChange = (dateTime) => {
    setIsDateChanged(true)
    setDateForPicker(dateTime)

    let date = moment(dateTime).format();

    date = convertIsoDateWithoutTimeZone(date);

    setTimeSettings({
      ...timeSettings,
      datetime: date + '+00:00'
    })
  }

  const handleSetTimeFromDevice = (event) => {
    event.preventDefault()
    
    handleDateChange(new Date())
  }

  const handleNtpServerChange = (event) => {

    setTimeSettings({
      ...timeSettings,
      ntpServer: event.target.value
    })
  }

  const checkIfZeroWithNumber = (value) => {
    const splitedValue = value.split('');
    
    return splitedValue[1] && splitedValue[0] && splitedValue[0] === '0'
  }
  
  const handleChangeFlatsSettingsNumbers = (event) => {
    const value = event.target.value;
    const name  = event.target.name;

    if (
      testRegex(value, /^[0-9]+$/) && 
      value <= 65535 && 
      !checkIfZeroWithNumber(value)
    ) {

      if (name === 'firstNumber') {

        setFlatsSettings({
          ...flatsSettings,
          firstNumber: value
        })
      } else if (name === 'lastNumber') {

        setFlatsSettings({
          ...flatsSettings,
          lastNumber: value
        })
      }    
    }
  }

  const handleTimeZoneChange = (event) => {
    
    setTimeSettings({
      ...timeSettings,
      timezone: event.target.value,
    })
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

    setFlatsSettings({
      ...flatsSettings,
      lineThresholds: {
        ...flatsSettings.lineThresholds,
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

  const checkIfDurationCorrect = (value) => {

    return (
      testRegex(value, /^[0-9]+$/) && 
      value <= 429496 && 
      !checkIfZeroWithNumber(value)
    ) 
  }

  const handleRingDurationChange = (event) => {
    const value = event.target.value;

    setDurationsForCheck({
      ...durationsForCheck,
      ring: value,
    })
    
    checkIfDurationCorrect(value)
    &&
      setDurationSettings({
        ...durationSettings,
        ring: value === '' ? '' : (value * 1000)
      })
  }

  const handleCallDurationChange = (event) => {
    const value = event.target.value;

    setDurationsForCheck({
      ...durationsForCheck,
      call: value,
    })

    checkIfDurationCorrect(value)
    &&
      setDurationSettings({
        ...durationSettings,
        call: value === '' ? '' : (value * 1000)
      }) 
  }

  const handleDoorOpenDurationChange = (event) => {
    const value = event.target.value;

    setDurationsForCheck({
      ...durationsForCheck,
      doorOpen: value,
    })

    checkIfDurationCorrect(value)
    &&
      setDurationSettings({
        ...durationSettings,
        doorOpen: value === '' ? '' : (value * 1000)
      })
  }

  const setDuration = (duration, durationForCheck) => {    
    
    if (duration === '') {
      return ''
    } else if (durationForCheck === '00') {
      return '0'
    } else {
      return Math.floor(duration / 1000)
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

  const handleIntercomSfxGainChange = (value) => {
    
    setIntercomSfxGain(value)
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

  const handleSipSfxGainChange = (value) => {
    
    setSipSfxGain(value)
  }
  
  const handleSipIntercomGainChange = (value) => {
    
    setSipIntercomGain(value)
  }

  const handleSyslogServerEnabledChange = () => {

    setSyslogSettings({
      ...syslogSettings,
      enabled: !syslogSettings.enabled,
    })
  }

  const handleSysServerChange = (event) => {

    setSyslogSettings({
      ...syslogSettings,
      server: event.target.value,
    })
  }

  const handleSysConnectionTypeChange = (event) => {

    setSyslogSettings({
      ...syslogSettings,
      connectionType: event.target.value,
    })
	}
  
  const handleSubmit = (event) => {
    event.preventDefault()
    
    let formatedNewIntercom = {
      hardware_version: mainInfo.hardware_version || null,
      software_version: mainInfo.software_version || null,
      ftp_server_id: mainInfo.ftp_server_id || null,
      stun_server_id: mainInfo.stun_server_id || null,
      syslog_server_id: mainInfo.syslog_server_id || null,
      flats_turn_server_id: mainInfo.flats_turn_server_id || null,
      emergency_turn_server_id: mainInfo.emergency_turn_server_id || null,
      flat_sip_server_id: mainInfo.flat_sip_server_id || null,
      emergency_sip_server_id: mainInfo.emergency_sip_server_id || null,
      flats_sip_credential_id: (mainInfo.flat_sip_server_id && mainInfo.flats_sip_credential_id) || null,
      emergency_sip_credential_id: (mainInfo.emergency_sip_server_id && mainInfo.emergency_sip_credential_id) || null,
      entrance_id: mainInfo.entrance_id,
      is_ssl: mainInfo.is_ssl,
      ssl_key: mainInfo.ssl_key,
      host: mainInfo.host,
      status: mainInfo.status,
      settings: {
        timeSettings: {
          ...timeSettings,
          datetime: timeSettings.datetime || null,
          timezone: timeSettings.timezone || null,
          ntpServer: timeSettings.ntpServer || null,
        },
        flatsSettings,
        durationSettings,
        audioSettings: {
          intercomAudioDevice: {
            microphone: {
              gain: intercomGain,
              agcMode: intercomAgcMode,
              agcModeMaxGain: intercomAgcModeMaxGain,
              agcModeTargetLevel: intercomAgcModeTargetLevel,
            },
            speaker: {
              sfxGain: intercomSfxGain,
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
              sfxGain: sipSfxGain,
              intercomGain: sipIntercomGain,
            }
          },
        },
        syslogSettings: {
          ...syslogSettings,
          server: syslogSettings.server || null,
        },
        ...otherSettings,
      }
    };    

    !intercomToEdit && (formatedNewIntercom = {
      ...formatedNewIntercom,
      device_id: mainInfo.device_id
    }) 

    submitSettings(formatedNewIntercom)

    closeModal()
  
    setMainInfo(initialValues.mainInfo)
    setTimeSettings(initialValues.timeSettings)
    setFlatsSettings(initialValues.flatsSettings)
    setDurationSettings(initialValues.durationSettings)
    setSyslogSettings(initialValues.syslogSettings)
    setOtherSettings(initialValues.otherSettings)

    setIntercomGain(initialIntercomMicrophone.gain)
    setIntercomAgcMode(initialIntercomMicrophone.agcMode)
    setIntercomAgcModeMaxGain(initialIntercomMicrophone.agcModeMaxGain)
    setIntercomAgcModeTargetLevel(initialIntercomMicrophone.agcModeTargetLevel)
    setIntercomSfxGain(initialIntercomSpeaker.sfxGain)
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
    setSipSfxGain(initialSipSpeaker.sfxGain)
    setSipIntercomGain(initialSipSpeaker.intercomGain)
  }
  
  return (
    <Form className='b-intercom-settings' onSubmit={handleSubmit}>   
      {
        sipServers.length !== 0
        ?
          <>
            <div className='b-intercom-settings-info'>
              {
                !intercomToEdit
                &&
                  <InputField 
                    type='text'
                    innerLabel='ID устройства*'
                    name='device_id'
                    value={mainInfo.device_id}
                    onChange={handleChangeMainInfo}
                  />      
              }
              <InputField 
                type='text'
                innerLabel='SSL ключ*'
                name='ssl_key'
                value={mainInfo.ssl_key}
                onChange={handleChangeMainInfo}
              />    
              <InputField 
                type='text'
                innerLabel='IP адрес*'
                name='host'
                value={mainInfo.host}
                onChange={handleChangeMainInfo}
              />          
              <InputField 
                type='text'
                innerLabel='Версия аппаратного обеспечения'
                name='hardware_version'
                value={mainInfo.hardware_version}
                onChange={handleChangeMainInfo}
              />        
              <InputField 
                type='text'
                innerLabel='Версия программного обеспечения'
                name='software_version'
                value={mainInfo.software_version}
                onChange={handleChangeMainInfo}
              />  
              <SelectField
                label='Статус'
                name='status'
                defaultValue={mainInfo.status}
                values={IntercomStatuses}
                onChange={handleChangeMainInfo}
              />
              <SelectField 
                label={'SIP сервер квартир' + (!intercomToEdit ? '*' : '')}
                name='flat_sip_server_id'
                defaultValue={
                  !intercomToEdit
                  ?
                    flatsSipServersHosts[0]
                  :
                    (defaultFlatsSipServer && defaultFlatsSipServer.host) || ''
                }
                values={flatsSipServersHosts}
                onChange={handleChangeMainInfo}          
              />
              {
                mainInfo.flat_sip_server_id
                &&
                  <SelectField 
                    label='SIP пользователь квартир'
                    name='flats_sip_credential_id'
                    className='b-intercom-settings__flats-sip-credential'
                    selectedValue={(defaultFlatsSipCredential && defaultFlatsSipCredential.login) || ''}
                    values={flatsSipCredentialsLogins}
                    onChange={handleChangeMainInfo}          
                  />
              }
              <SelectField 
                label={'SIP сервер экстренной службы' + (!intercomToEdit ? '*' : '')}
                name='emergency_sip_server_id'
                defaultValue={
                  !intercomToEdit
                  ?
                    emergencySipServersHosts[0]
                  :
                    (defaultEmergencySipServer && defaultEmergencySipServer.host) || ''
                }
                values={emergencySipServersHosts}
                onChange={handleChangeMainInfo}          
              />
              {
                mainInfo.emergency_sip_server_id
                &&
                  <SelectField 
                    label='SIP пользователь экстренной службы'
                    name='emergency_sip_credential_id'
                    className='b-intercom-settings__emergency-sip-credential'
                    selectedValue={(defaultEmergencySipCredential && defaultEmergencySipCredential.login) || ''}
                    values={emergencySipCredentialsLogins}
                    onChange={handleChangeMainInfo}          
                  />
              }
              <SelectField 
                label='FTP сервер'
                name='ftp_server_id'
                selectedValue={(defaultFtpServer && defaultFtpServer.host) || ''}
                values={ftpServersHosts}
                onChange={handleChangeMainInfo}          
              />
              <SelectField 
                label='STUN сервер'
                name='stun_server_id'
                selectedValue={(defaultStunServer && defaultStunServer.host) || ''}
                values={stunServersHosts}
                onChange={handleChangeMainInfo}          
              />
              <SelectField 
                label='Syslog сервер'
                name='syslog_server_id'
                selectedValue={(defaultSyslogServer && defaultSyslogServer.host) || ''}
                values={syslogServersHosts}
                onChange={handleChangeMainInfo}          
              />
              <SelectField 
                label='TURN сервер квартир'
                name='flats_turn_server_id'
                selectedValue={(defaultFlatsTurnServer && defaultFlatsTurnServer.host) || ''}
                values={flatsTurnServersHosts}
                onChange={handleChangeMainInfo}          
              />
              <SelectField 
                label='TURN сервер экстренной службы'
                name='emergency_turn_server_id'
                selectedValue={(defaultEmergencyTurnServer && defaultEmergencyTurnServer.host) || ''}
                values={emergencyTurnServersHosts}
                onChange={handleChangeMainInfo}          
              />
              <RadioButton 
                label='Протокол с шифрованием'
                value={mainInfo.is_ssl}
                onChange={handleChangeMainInfoIsSsl}
              />         
            </div>         
            <h2>
              Настройки домофона
            </h2>  
            <div className='b-intercom-settings-main-settings'>
              <SelectField 
                label='Тип коммутатора'
                name='commutatorType'
                selectedValue={otherSettings.commutatorType}
                values={CommutatorTypes}
                onChange={handleOtherSettingChange}          
              />  
              <InputField 
                label='Порог распознавания лица'
                type='number'
                name='faceRecognitionThreshold'
                value={otherSettings.faceRecognitionThreshold}
                onChange={handleOtherSettingChange}
              /> 
              <RadioButton 
                label='Режим сбора ключей'
                name='collectKeysMode'
                value={otherSettings.collectKeysMode}
                onChange={handleOtherSettingChange}
              />      
              <RangeField 
                label='Диапозон квартир:'
                minNumberName='firstNumber'
                maxNumberName='lastNumber'
                minNumberValue={flatsSettings.firstNumber}
                maxNumberValue={flatsSettings.lastNumber}
                onChange={handleChangeFlatsSettingsNumbers}
              />   
            </div>
            <div className='b-intercom-settings-time-settings'>
              <h3>
                Настройки времени
              </h3> 
              <SelectField 
                label='Часовой пояс:'
                defaultValue=''
                values={momentTimezone.tz.names()}
                onChange={handleTimeZoneChange}          
              />
              <RadioButton 
                label='Настройка времени через NTP сервер'
                value={timeSettings.ntpEnabled}
                onChange={handleChangeTimeSettingsNtpEnabled}
              />    
              {
                !timeSettings.ntpEnabled
                ?
                  <div className='b-intercom-settings-date-picker'>
                    <p>
                      <small>Выбор даты и времени</small>
                    </p>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <DateTimePicker
                        autoOk
                        ampm={false}
                        disableFuture
                        value={dateForPicker || moment()}
                        format="DD/MM/YYYY HH:mm"
                        cancelLabel='Отмена'
                        okLabel='Ок'
                        onChange={handleDateChange}
                      />
                    </MuiPickersUtilsProvider>
                    <button
                      className='b-button'
                      onClick={handleSetTimeFromDevice}
                    >
                      Установить время с устройства
                    </button>
                  </div>
                :
                  <InputField 
                    label='NTP сервер:'
                    type='text'
                    value={timeSettings.ntpServer}
                    onChange={handleNtpServerChange}
                  />
              } 
            </div>
            <div className='b-intercom-settings-voltage-settings'>
              <div className='b-intercom-settings-voltage-settings__header'>
                <h3>
                  Напряжения (0 - 65535)
                </h3>
                <TooltipWrapper 
                  title='
                    Данные параметры необходимы для расчета минимального и максимального
                    значений порога линейного сигнала квартиры. Минимальное значение есть среднее
                    арифметическое между минимальным и средним параметрами напряжений, 
                    максимальное - между средним и максимальным параметрами. Затем, на основе
                    полученных значений порогов вычисляются напряжения на линии, путем умножения
                    каждого из них на 186.
                  ' 
                />
              </div>
              <InputField 
                label='Положенная трубка:'
                type='number'
                value={staticVoltage}
                onChange={handleStaticVoltageChange}
              />
              <InputField 
                label='Поднята:'
                type='number'
                value={buttonPushedVoltage}
                onChange={handleButtonPushedVoltageChange}
              />
              <InputField 
                label='Открытие двери:'
                type='number'
                value={tubeLiftedVoltage}
                onChange={handleTubeLiftedVoltageChange}
              />
            </div>
            <div className='b-intercom-settings-duration-settings'>
              <h3>Длительности, в секундах (0 - 429496)</h3>
              <InputField 
                label='Максимальная длительность звонка:'
                type='number'
                value={setDuration(ringDuration, durationsForCheck.ring)}
                onChange={handleRingDurationChange}
              />
              <InputField 
                label='Максимальная длительность разговора):'
                type='number'
                value={setDuration(callDuration, durationsForCheck.call)}
                onChange={handleCallDurationChange}
              />
              <InputField 
                label='Максимальное время, через которое дверь закроется:'
                type='number'
                value={setDuration(doorOpenDuration, durationsForCheck.doorOpen)}
                onChange={handleDoorOpenDurationChange}
              />
            </div>
            <AudioSettings 
              forIntercom
              isIntercomAudioSettings
              header='Настройки звука домофона'
              gain={intercomGain}
              agcMode={intercomAgcMode}
              agcModeMaxGain={intercomAgcModeMaxGain}
              agcModeTargetLevel={intercomAgcModeTargetLevel}
              sfxGain={intercomSfxGain}
              flatGain={intercomFlatGain}
              sipGain={intercomSipGain}
              changeAgcMode={handleIntercomAgcModeChange}
              changeGain={handleIntercomGainChange}
              changeAgcModeMaxGain={handleIntercomAgcModeMaxGainChange}
              changeAgcModeTargetLevel={handleIntercomAgcModeTargetLevelChange}
              changeSfxGain={handleIntercomSfxGainChange}
              changeFlatGain={handleIntercomFlatGainChange}
              changeSipGain={handleIntercomSipGainChange}
            />
            <AudioSettings
              forIntercom
              header='Настройки звука в квартире'
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
              forIntercom
              header='Настройки SIP звука'
              gain={sipGain}
              agcMode={sipAgcMode}
              agcModeMaxGain={sipAgcModeMaxGain}
              agcModeTargetLevel={sipAgcModeTargetLevel}
              sfxGain={sipSfxGain}
              intercomGain={sipIntercomGain}
              changeAgcMode={handleSipAgcModeChange}
              changeGain={handleSipGainChange}
              changeAgcModeMaxGain={handleSipAgcModeMaxGainChange}
              changeAgcModeTargetLevel={handleSipAgcModeTargetLevelChange}
              changeSfxGain={handleSipSfxGainChange}
              changeIntercomGain={handleSipIntercomGainChange} 
            />
            <div className='b-intercom-settings-syslog-settings'>
              <h3>Настройки Syslog сервера</h3>
              <RadioButton 
                label='Сервер доступен'
                value={syslogSettings.enabled}
                classNameName='b-main-settings__collection-key'
                onChange={handleSyslogServerEnabledChange}
              /> 
              <InputField
                label='Сервер:'
                type='text'
                value={syslogSettings.server}
                onChange={handleSysServerChange}
              />
              <SelectField
                label='Тип присоединения'
                selectedValue={`${syslogSettings.connectionType}`}
                values={ConnectionTypes}
                onChange={handleSysConnectionTypeChange}
              />
            </div>
          </>
        :
          <div className='b-intercom-settings__no-values'>
            Необходимо добавить SIP сервер.
          </div>
      }  
      <button  
        type='submit'
        className='b-button b-modal__submit-btn'
        disabled={
          (!intercomToEdit && !mainInfo.device_id) ||
          !mainInfo.ssl_key || 
          !mainInfo.host ||
          (!intercomToEdit && !mainInfo.flat_sip_server_id) ||
          (!intercomToEdit && !mainInfo.emergency_sip_server_id)
        }
      >
        {
          intercomToEdit
          ?
            'Обновить'
          :
            'Добавить'
        }
      </button>
    </Form>
  )
}

export default IntercomSettings
