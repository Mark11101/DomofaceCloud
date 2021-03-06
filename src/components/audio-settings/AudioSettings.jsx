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
        label='???????????????????????????? ?????????????????? ??????????????????'
        className='b-audio-setting__radio'
        value={agcMode}
        onChange={handleAgcModeChange}
      /> 
      <div>
        <h4>
          ????????????????
        </h4>
        {
          !agcMode
          &&
            <Slider
              header='????????????????????????????????:'
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
                header='???????????????????????? ????????????????????????????????:'
                value={newAgcModeMaxGain}
                onChange={handleAgcModeMaxGainChange}
                onBlur={handleAgcModeMaxGainBlur}
              />
              <Slider
                header='?????????????????? ?????????????? ????????????????????????????????:'
                value={newAgcModeTargetLevel}
                step={8}
                onChange={handleAgcModeTargetLevelChange}
                onBlur={handleAgcModeTargetLevelBlur}
              />
            </>
        } 
      </div>
      <h4>
        ??????????????
      </h4>
      {
        forIntercom
        &&
          <>
            <Slider
              header='?????????????????? ?????????????????? ????????????:'
              value={newSfxGain}
              onChange={handleSfxGainChange}
              onBlur={handleSfxGainBlur}
            />
            {
              isIntercomAudioSettings
              ?
                <>
                  <Slider
                    header='?????????????????? ????????????:'
                    value={newFlatGain}
                    onChange={handleFlatGainChange}
                    onBlur={handleFlatGainBlur}
                  />
                  <Slider
                    header='?????????????????? SIP:'
                    value={newSipGain}
                    onChange={handleSipGainChange}
                    onBlur={handleSipGainBlur}
                  />
                </>
              :
                <Slider
                  header='?????????????????? ????????????:'
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
                    header='?????????????????? ????????????:'
                    value={newFlatGain}
                    onChange={handleFlatGainChange}
                    onBlur={handleFlatGainBlur}
                  />
                  <Slider
                    header='?????????????????? SIP:'
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
                    header='?????????????????? ?????????????????? ????????????:'
                    value={newSfxGain}
                    onChange={handleSfxGainChange}
                    onBlur={handleSfxGainBlur}
                  />
                  <Slider
                    header='?????????????????? ????????????:'
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
                  header='?????????????????? ????????????:'
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
