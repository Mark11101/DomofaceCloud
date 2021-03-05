import React from 'react'
import Slider from '@material-ui/core/Slider'

import appendClassName from '../../../utils/string/appendClassName'

import './SliderField.css'

const SliderField = (props) => {
  const {
    label,
    min,
    max,
    name,
    className,
    onChange,
  } = props;

  const valuetext = (value) => {
    
    return `${value}°C`;
  }

  return (
    <div className={
      className
      ?
        appendClassName('b-slider-field', className)
      :
        'b-slider-field'
    }>
      {
        label
        &&
          <small>
            {label}
          </small>
      }
      <div className='b-slider-field__input'>
        <Slider
          defaultValue={0}
          getAriaValueText={valuetext}
          aria-labelledby="continuous-slider"
          valueLabelDisplay="auto"
          step={1}
          min={min}
          max={max}
          name={name}
          onChange={onChange}
        />
      </div>
    </div>
  )
}

export default SliderField
