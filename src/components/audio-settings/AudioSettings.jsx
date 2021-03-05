import React, { useState } from 'react'

import Slider from '../subcomponents/slider/Slider'
import RadioButton from '../subcomponents/radio-button/RadioButton'

import './AudioSettings.css'

const AudioSettings = (props) => {
  const {
    forIntercom,
    forFlat,
    isIntercomAudioSettings,
    isFlatAudioSettings,
    isSipAudioSettings,
    header,
    gain,
    agcMode,
    agcModeMaxGain,
    agcModeTargetLevel,
    sfxGain,
    flatGain,
    sipGain,
    intercomGain,
    changeAgcMode,
    changeGain,
    changeAgcModeMaxGain,
    changeAgcModeTargetLevel,
    changeSfxGain,
    changeFlatGain,
    changeSipGain,
    changeIntercomGain,
  } = props;
  
  const [newGain, setNewGain]                             = useState(gain);
  const [newAgcModeMaxGain, setNewAgcModeMaxGain]         = useState(agcModeMaxGain);
  const [newAgcModeTargetLevel, setNewAgcModeTargetLevel] = useState(agcModeTargetLevel);
  const [newSfxGain, setNewSfxGain]                       = useState(sfxGain);
  const [newFlatGain, setNewFlatGain]                     = useState(flatGain);
  const [newSipGain, setNewSipGain]                       = useState(sipGain);
  const [newIntercomGain, setNewIntercomGain]             = useState(intercomGain);

  const handleAgcModeChange = () => {

    changeAgcMode()
  }

  const handleGainChange = (event, value) => {

    setNewGain(value)
  } 

  const handleGainBlur = () => {

    changeGain(newGain)
  }

  const handleAgcModeMaxGainChange = (event, value) => {

    setNewAgcModeMaxGain(value)
  }

  const handleAgcModeMaxGainBlur = () => {

    changeAgcModeMaxGain(newAgcModeMaxGain)
  }

  const handleAgcModeTargetLevelChange = (event, value) => {

    setNewAgcModeTargetLevel(value)
  }

  const handleAgcModeTargetLevelBlur = () => {

    changeAgcModeTargetLevel(newAgcModeTargetLevel)
  }

  const handleSfxGainChange = (event, value) => {

    setNewSfxGain(value)
  }

  const handleSfxGainBlur = () => {

    changeSfxGain(newSfxGain)
  }

  const handleFlatGainChange = (event, value) => {

    setNewFlatGain(value)
  }

  const handleFlatGainBlur = () => {

    changeFlatGain(newFlatGain)
  }

  const handleSipGainChange = (event, value) => {
    
    setNewSipGain(value)
  }

  const handleSipGainBlur = () => {
    
    changeSipGain(newSipGain)
  }

  const handleIntercomGainChange = (event, value) => {

    setNewIntercomGain(value)
  }

  const handleIntercomGainBlur = () => {

    changeIntercomGain(newIntercomGain)
  }

  return (
    <div className='b-audio-setting'>
      <h3 className='b-audio-setting__header'>
        {header}
      </h3>   
      <RadioButton 
        label='Автоматическая настройка микрофона'
        className='b-audio-setting__radio'
        value={agcMode}
        onChange={handleAgcModeChange}
      /> 
      <div>
        <h4>
          Микрофон
        </h4>
        {
          !agcMode
          &&
            <Slider
              header='Чувствительность:'
              value={newGain}
              onChange={handleGainChange}
              onBlur={handleGainBlur}
            />
        }
        {
          agcMode
          &&
            <>
              <Slider
                header='Максимальная чувствительность:'
                value={newAgcModeMaxGain}
                onChange={handleAgcModeMaxGainChange}
                onBlur={handleAgcModeMaxGainBlur}
              />
              <Slider
                header='Требуемый уровень чувствительности:'
                value={newAgcModeTargetLevel}
                step={8}
                onChange={handleAgcModeTargetLevelChange}
                onBlur={handleAgcModeTargetLevelBlur}
              />
            </>
        } 
      </div>
      <h4>
        Динамик
      </h4>
      {
        forIntercom
        &&
          <>
            <Slider
              header='Громкость системных звуков:'
              value={newSfxGain}
              onChange={handleSfxGainChange}
              onBlur={handleSfxGainBlur}
            />
            {
              isIntercomAudioSettings
              ?
                <>
                  <Slider
                    header='Громкость звонка:'
                    value={newFlatGain}
                    onChange={handleFlatGainChange}
                    onBlur={handleFlatGainBlur}
                  />
                  <Slider
                    header='Громкость SIP:'
                    value={newSipGain}
                    onChange={handleSipGainChange}
                    onBlur={handleSipGainBlur}
                  />
                </>
              :
                <Slider
                  header='Громкость звонка:'
                  value={newIntercomGain}
                  onChange={handleIntercomGainChange}
                  onBlur={handleIntercomGainBlur}
                />
            }
          </>
      }
      {
        forFlat
        &&
          <>
            {
              isIntercomAudioSettings
              &&
                <>
                  <Slider
                    header='Громкость звонка:'
                    value={newFlatGain}
                    onChange={handleFlatGainChange}
                    onBlur={handleFlatGainBlur}
                  />
                  <Slider
                    header='Громкость SIP:'
                    value={newSipGain}
                    onChange={handleSipGainChange}
                    onBlur={handleSipGainBlur}
                  />
                </>
            }
            {
              isFlatAudioSettings
              &&
                <>
                  <Slider
                    header='Громкость системных звуков:'
                    value={newSfxGain}
                    onChange={handleSfxGainChange}
                    onBlur={handleSfxGainBlur}
                  />
                  <Slider
                    header='Громкость звонка:'
                    value={newIntercomGain}
                    onChange={handleIntercomGainChange}
                    onBlur={handleIntercomGainBlur}
                  />
                </>
            }
            {
              isSipAudioSettings
              &&
                <Slider
                  header='Громкость звонка:'
                  value={newIntercomGain}
                  onChange={handleIntercomGainChange}
                  onBlur={handleIntercomGainBlur}
                />
            }
          </>
      }
    </div>
  )
}

export default AudioSettings
